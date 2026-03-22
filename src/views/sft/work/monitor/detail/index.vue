<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftWorkMonitorDetail"
});

interface Company {
  id: number;
  name: string;
}

interface MonitorItem {
  id: number;
  name: string;
  num: string;
  chosen?: boolean;
  company?: Company;
}

interface PageData {
  content: MonitorItem[];
  totalElements: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<MonitorItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchName = ref("");

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      size: pageSize.value.toString()
    });

    if (searchName.value) {
      params.append("name", searchName.value);
    }

    const response = await fetch(`/sft/work/monitor/list?${params}`);
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

function handleEdit(row: MonitorItem) {
  ElMessage.info(`编辑: ${row.name}`);
  // TODO: Implement edit dialog
}

function handleVideoList(row: MonitorItem) {
  ElMessage.info(`视频列表: ${row.name}`);
  // TODO: Navigate to video list page
}

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="work-monitor-detail-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">特殊作业监控设备管理</span>
        </div>
      </template>

      <!-- Search Form -->
      <el-form inline class="search-form">
        <el-form-item label="名称">
          <el-input
            v-model="searchName"
            placeholder="请输入名称"
            clearable
            style="width: 200px"
            @keyup.enter="handleSearch"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><i class="ep-search" /></el-icon>
            检索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><i class="ep-refresh" /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <!-- Table -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="名称" min-width="200" />
        <el-table-column prop="num" label="编号" width="150">
          <template #default="{ row }">
            <span :class="row.chosen ? 'text-green-600 font-bold' : ''">
              {{ row.num }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="info" size="small" @click="handleVideoList(row)">
              视频列表
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.work-monitor-detail-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.text-green-600 {
  color: #16a34a;
}

.font-bold {
  font-weight: bold;
}
</style>
