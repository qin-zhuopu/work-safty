<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftInspTask"
});

interface SysDept {
  id: number;
  name: string;
}

interface TaskItem {
  id: number;
  name: string;
  dept: string;
  startTeam: number;
  remarks: string;
  sysDept: SysDept;
  createTime: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: TaskItem[];
    totalElements: number;
  };
}

const tableData = ref<TaskItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = reactive({
  name: "",
  deptName: "",
  deptName1: ""
});

const searchFormRef = ref<FormInstance>();

// 起始班组选项
const startTeamOptions = [
  { label: "甲班", value: 1 },
  { label: "乙班", value: 2 },
  { label: "丙班", value: 3 },
  { label: "丁班", value: 4 },
  { label: "长白班", value: 5 }
];

// 获取起始班组名称
function getStartTeamName(team: number): string {
  const option = startTeamOptions.find(opt => opt.value === team);
  return option ? option.label : "";
}

// 获取巡检班组名称（简化处理，实际应该从部门树中查找）
function getDeptName(deptStr: string): string {
  if (!deptStr) return "";
  // 简化处理，返回逗号分隔的ID数量
  const ids = deptStr.split(",");
  return `已选${ids.length}个班组`;
}

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize.value),
      name: searchForm.name,
      deptName: searchForm.deptName,
      deptName1: searchForm.deptName1
    });

    const response = await fetch(`/sft/insp/task/list?${params}`);
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
  searchFormRef.value?.resetFields();
  searchForm.name = "";
  searchForm.deptName = "";
  searchForm.deptName1 = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: TaskItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleItem(row: TaskItem) {
  ElMessage.info(`巡检点: ${row.name}`);
}

function handleDelete(row: TaskItem) {
  ElMessageBox.confirm("确认删除该巡检线路吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      // TODO: 调用删除接口
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {});
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handlePageChange(page: number) {
  fetchData(page);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="task-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">巡检线路管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline
        class="search-form"
      >
        <el-form-item label="巡检路线" prop="name">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入巡检路线"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="所属车间" prop="deptName">
          <el-input
            v-model="searchForm.deptName"
            placeholder="请输入所属车间"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="巡检班组" prop="deptName1">
          <el-input
            v-model="searchForm.deptName1"
            placeholder="请输入巡检班组"
            clearable
            style="width: 200px"
          />
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
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
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="巡检线路名称" min-width="150" />
        <el-table-column prop="sysDept.name" label="所属车间" min-width="120">
          <template #default="{ row }">
            {{ row.sysDept?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="巡检班组" min-width="150">
          <template #default="{ row }">
            {{ getDeptName(row.dept) }}
          </template>
        </el-table-column>
        <el-table-column label="起始班组" width="100" align="center">
          <template #default="{ row }">
            {{ getStartTeamName(row.startTeam) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="info" size="small" @click="handleItem(row)">
              巡检点
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
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
.task-container {
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
