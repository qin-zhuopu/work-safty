<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { DateModelType } from "element-plus";

defineOptions({
  name: "SftRiskSpecial"
});

interface SpecialTask {
  id: number;
  taskName: string;
  taskStartTime: number;
  taskEndTime: number;
  taskTypeName: string;
  taskContent: string;
  deleted: string;
  specialUuid: string;
  createDate: number;
  updateDate: number;
  receiveDate: number;
  company: {
    id: number;
    name: string;
  };
}

interface ApiResponse {
  success: boolean;
  t: {
    content: SpecialTask[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

const tableData = ref<SpecialTask[]>([]);
const loading = ref(false);
const searchName = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(pageSize.value)
    });
    if (searchName.value) {
      params.append("name", searchName.value);
    }

    const response = await fetch(`/sft/risk/special/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
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
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  searchName.value = "";
  currentPage.value = 1;
  fetchData();
}

function handleTaskUpdate() {
  ElMessage.info("任务更新成功");
  fetchData();
}

function handleDetail(row: SpecialTask) {
  ElMessage.info(`查看详情: ${row.taskName}`);
}

function handleReport(row: SpecialTask) {
  ElMessage.info(`上报检查情况: ${row.taskName}`);
}

function handleRecord(row: SpecialTask) {
  ElMessage.info(`检查情况记录: ${row.taskName}`);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="special-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">专项检查任务</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" class="search-form">
        <el-form-item label="任务名称">
          <el-input
            v-model="searchName"
            placeholder="任务名称"
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
            <el-icon><RefreshLeft /></el-icon>
            重置
          </el-button>
          <el-button type="success" @click="handleTaskUpdate">
            <el-icon><Refresh /></el-icon>
            任务更新
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="taskName" label="任务名称" min-width="250">
          <template #default="{ row }">
            <el-link type="primary" @click="handleDetail(row)">
              {{ row.taskName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="任务开始日期" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.taskStartTime) }}
          </template>
        </el-table-column>
        <el-table-column label="任务结束日期" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.taskEndTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="taskTypeName"
          label="任务类型名称"
          min-width="200"
        />
        <el-table-column label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.deleted === '1' ? 'danger' : 'success'">
              {{ row.deleted === "1" ? "删除" : "正常" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="handleDetail(row)">
              详情
            </el-button>
            <el-button type="danger" size="small" @click="handleReport(row)">
              上报检查情况
            </el-button>
            <el-button size="small" @click="handleRecord(row)">
              检查情况记录
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
        @current-change="fetchData"
        @size-change="fetchData"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.special-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}
</style>
