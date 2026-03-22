<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftInspPlan"
});

interface InspectionTask {
  id: number;
  name: string;
}

interface PlanItem {
  id: number;
  name: string;
  cycle: number;
  cycleData: string;
  startTime: number;
  endTime: number;
  deptName: string;
  status: number;
  inspectionTask: InspectionTask;
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
const selectedIds = ref<number[]>([]);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const searchForm = reactive({
  name: "",
  startTime: "",
  endTime: "",
  deptName: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      ...(searchForm.name ? { name: searchForm.name } : {}),
      ...(searchForm.startTime ? { startTime: searchForm.startTime } : {}),
      ...(searchForm.endTime ? { endTime: searchForm.endTime } : {}),
      ...(searchForm.deptName ? { deptName: searchForm.deptName } : {})
    });
    const response = await fetch(`/sft/insp/plan/list.json?${params}`);
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
  searchForm.name = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  searchForm.deptName = "";
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
  ElMessage.info("添加功能");
}

function handleEdit(row: PlanItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDetail(row: PlanItem) {
  ElMessage.info(`明细: ${row.name}`);
}

function handleDelete(row: PlanItem) {
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

function handleExport() {
  ElMessage.success("导出成功");
}

function formatDate(timestamp: number | null): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

function getCycleType(cycle: number): string {
  const cycleMap: Record<number, string> = {
    1: "每日",
    2: "每周",
    3: "每月",
    4: "每季度",
    5: "每年"
  };
  return cycleMap[cycle] || "未知";
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
          <span class="text-lg font-medium">巡检计划管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="计划名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入计划名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="searchForm.startTime"
              type="date"
              placeholder="开始日期"
              value-format="YYYY-MM-DD"
              style="width: 140px"
            />
            <span class="mx-2">至</span>
            <el-date-picker
              v-model="searchForm.endTime"
              type="date"
              placeholder="结束日期"
              value-format="YYYY-MM-DD"
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item label="巡检班组">
            <el-input
              v-model="searchForm.deptName"
              placeholder="请输入巡检班组"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button type="success" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
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
        <el-table-column prop="name" label="计划名称" min-width="200" />
        <el-table-column label="巡检周期" width="100" align="center">
          <template #default="{ row }">
            {{ getCycleType(row.cycle) }}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="巡检班组" min-width="150" />
        <el-table-column label="开始时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.startTime) }}
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
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="info" size="small" @click="handleDetail(row)">
              明细
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              @click="handleDelete(row)"
            >
              删除
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
