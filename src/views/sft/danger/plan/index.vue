<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftDangerPlan"
});

interface User {
  id: number;
  ushow: string;
}

interface PlanItem {
  id: number;
  name: string;
  type: string;
  cycle: string;
  beginTime: number;
  endTime: number;
  organizer: User | null;
  ushows: string;
  establish: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: PlanItem[];
    totalElements: number;
  };
}

const tableData = ref<PlanItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = reactive({
  name: "",
  type: ""
});

const searchFormRef = ref<FormInstance>();

// 排查类型选项
const typeOptions = [
  { label: "季节性排查", value: "季节性排查" },
  { label: "专业性排查", value: "专业性排查" },
  { label: "重点时段及节假日前排查", value: "重点时段及节假日前排查" },
  { label: "月度综合排查", value: "月度综合排查" },
  { label: "车间每周综合检查", value: "车间每周综合检查" }
];

// 格式化日期
function formatDate(timestamp: number): string {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 格式化计划时间
function formatPlanTime(row: PlanItem): string {
  return `${formatDate(row.beginTime)} — ${formatDate(row.endTime)}`;
}

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize.value),
      name: searchForm.name,
      type: searchForm.type
    });

    const response = await fetch(`/sft/danger/plan/list?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
      currentPage.value = page;
    } else {
      ElMessage.error("获取数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  fetchData(1);
}

function handleReset() {
  searchForm.name = "";
  searchForm.type = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: PlanItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: PlanItem) {
  ElMessageBox.confirm("确认删除该计划吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {});
}

function handleStart(row: PlanItem) {
  ElMessageBox.confirm("确认开始该计划？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("计划开始");
      fetchData();
    })
    .catch(() => {});
}

function handleContent(row: PlanItem) {
  ElMessage.info(`管控任务: ${row.name}`);
}

function handleList(row: PlanItem) {
  ElMessage.info(`排查结果: ${row.name}`);
}

function handlePageChange(page: number) {
  fetchData(page);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="plan-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患排查任务</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline
        class="search-form"
      >
        <el-form-item label="计划名称" prop="name">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入计划名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="排查类型" prop="type">
          <el-select
            v-model="searchForm.type"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          检索
        </el-button>
        <el-button @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新建
        </el-button>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="计划名称" min-width="180" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="cycle" label="周期" width="80" align="center" />
        <el-table-column label="计划时间" min-width="200">
          <template #default="{ row }">
            {{ formatPlanTime(row) }}
          </template>
        </el-table-column>
        <el-table-column label="组织人" width="100">
          <template #default="{ row }">
            {{ row.organizer?.ushow || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ushows"
          label="排查人"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleContent(row)">
              管控任务
            </el-button>
            <template v-if="row.establish === 0">
              <el-button type="primary" size="small" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button type="success" size="small" @click="handleStart(row)">
                开始计划
              </el-button>
            </template>
            <template v-else>
              <el-button type="success" size="small" @click="handleList(row)">
                排查结果
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="() => fetchData(1)"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.plan-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.btn-group {
  margin-bottom: 16px;
}
</style>
