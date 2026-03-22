<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftResumPlan"
});

interface Company {
  id: number;
  name: string;
}

interface Hazard {
  id: number;
  name: string;
}

interface User {
  id: number;
  uname: string;
  ushow: string;
}

interface PlanItem {
  id: number;
  name: string;
  type: string;
  cycle: string;
  status: number;
  beginTime: number;
  endTime: number;
  company: Company;
  hazard: Hazard;
  user: User;
  pointsName: string;
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
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const searchForm = reactive({
  type: "",
  name: "",
  hazard: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      ...(searchForm.type ? { type: searchForm.type } : {}),
      ...(searchForm.name ? { name: searchForm.name } : {}),
      ...(searchForm.hazard ? { hazard: searchForm.hazard } : {})
    });
    const response = await fetch(`/sft/resum/plan/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.total = data.t.totalElements;
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
  pagination.page = 1;
  fetchData();
}

function handleReset() {
  searchForm.type = "";
  searchForm.name = "";
  searchForm.hazard = "";
  pagination.page = 1;
  fetchData();
}

function handlePageChange(page: number) {
  pagination.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.size = size;
  pagination.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("新建功能");
}

function handleEdit(row: PlanItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: PlanItem) {
  if (row.status !== 0) {
    ElMessage.warning("只能删除未开始的计划");
    return;
  }
  ElMessageBox.confirm("确认删除该计划?", "提示", {
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
  if (row.status !== 0) {
    ElMessage.warning("只能开始未开始的计划");
    return;
  }
  ElMessageBox.confirm("确认开始该计划?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("计划已开始");
      fetchData();
    })
    .catch(() => {});
}

function handleList(row: PlanItem) {
  ElMessage.info(`排查清单: ${row.name}`);
}

function handlePoints(row: PlanItem) {
  ElMessage.info(`选点: ${row.name}`);
}

function formatDate(timestamp: number | null): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

function getStatusText(status: number): {
  text: string;
  type: "success" | "warning" | "info" | "danger";
} {
  const statusMap: Record<
    number,
    { text: string; type: "success" | "warning" | "info" | "danger" }
  > = {
    0: { text: "未开始", type: "info" },
    1: { text: "进行中", type: "warning" },
    2: { text: "已结束", type: "success" }
  };
  return statusMap[status] || { text: "未知", type: "info" };
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
          <span class="text-lg font-medium">三类包保责任制履职排查计划</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="类型">
            <el-select
              v-model="searchForm.type"
              placeholder="请选择"
              clearable
              style="width: 150px"
            >
              <el-option label="操作负责人" value="操作负责人" />
              <el-option label="技术负责人" value="技术负责人" />
              <el-option label="主要负责人" value="主要负责人" />
            </el-select>
          </el-form-item>
          <el-form-item label="计划名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入计划名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="重大危险源">
            <el-input
              v-model="searchForm.hazard"
              placeholder="请输入重大危险源"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              检索
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              新建
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="name"
          label="计划名称"
          min-width="250"
          show-overflow-tooltip
        />
        <el-table-column prop="type" label="类型" width="120" align="center" />
        <el-table-column prop="cycle" label="周期" width="100" align="center" />
        <el-table-column
          prop="hazard"
          label="重大危险源"
          min-width="200"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            {{ row.hazard?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.beginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusText(row.status).type">
              {{ getStatusText(row.status).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              v-if="row.status === 0"
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              v-if="row.status === 0"
              type="success"
              size="small"
              @click="handleStart(row)"
            >
              开始计划
            </el-button>
            <el-button
              v-else
              type="success"
              size="small"
              @click="handleList(row)"
            >
              排查清单
            </el-button>
            <el-button type="info" size="small" @click="handlePoints(row)">
              选点
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
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
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
