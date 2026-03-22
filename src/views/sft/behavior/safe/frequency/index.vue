<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftBehaviorSafeFrequency"
});

interface FrequencyItem {
  id?: string;
  ushow: string;
  num: number;
}

interface PageData {
  content: FrequencyItem[];
  totalElements: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<FrequencyItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = ref({
  startTime: "",
  endTime: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      size: pageSize.value.toString()
    });

    if (searchForm.value.startTime) {
      params.append("startTime", searchForm.value.startTime);
    }
    if (searchForm.value.endTime) {
      params.append("endTime", searchForm.value.endTime);
    }

    const response = await fetch(
      `/sft/behavior/safe/frequency/list.json?${params}`
    );
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
  searchForm.value = {
    startTime: "",
    endTime: ""
  };
  currentPage.value = 1;
  fetchData();
}

function handleExport() {
  const params = new URLSearchParams();

  if (searchForm.value.startTime) {
    params.append("startTime", searchForm.value.startTime);
  }
  if (searchForm.value.endTime) {
    params.append("endTime", searchForm.value.endTime);
  }

  window.open(`/sft/behavior/safe/frequency/export?${params}`);
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
  <div class="frequency-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">观察频次分析管理</span>
        </div>
      </template>

      <!-- Search Form -->
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="观察日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><i class="ep-search" /></el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><i class="ep-refresh" /></el-icon>
            重置
          </el-button>
          <el-button @click="handleExport">
            <el-icon><i class="ep-download" /></el-icon>
            导出
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
        <el-table-column type="index" label="序号" width="100" align="center" />
        <el-table-column prop="ushow" label="观察人" min-width="200" />
        <el-table-column
          prop="num"
          label="观察次数"
          width="150"
          align="center"
        />
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
.frequency-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .el-form-item {
    margin-bottom: 12px;
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.mx-2 {
  margin: 0 8px;
}
</style>
