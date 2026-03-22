<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftContAssess"
});

interface ContractorInfo {
  field: string;
}

interface UserInfo {
  ushow: string;
}

interface AssessItem {
  id: number;
  createTime: number;
  endTime: number;
  count: number;
  status: number;
  cm: ContractorInfo;
  user: UserInfo;
}

interface PageData {
  content: AssessItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  t: PageData;
}

const tableData = ref<AssessItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});

// Search form
const searchForm = reactive({
  field: "",
  beginTime: "",
  endTime: ""
});

// Format timestamp to date string
function formatTimestamp(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size)
    });

    if (searchForm.field) {
      params.append("field", searchForm.field);
    }
    if (searchForm.beginTime) {
      params.append("beginTime", searchForm.beginTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }

    const response = await fetch(`/sft/cont/assess/list.json?${params}`);
    const data: ApiResponse = await response.json();

    if (data.success) {
      tableData.value = data.t.content;
      pagination.total = data.t.totalElements;
    } else {
      ElMessage.error(data.message || "获取数据失败");
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
  searchForm.field = "";
  searchForm.beginTime = "";
  searchForm.endTime = "";
  pagination.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleOnlineAssess(row: AssessItem) {
  ElMessage.info("在线评估功能待实现");
}

function handleConclusion(row: AssessItem) {
  ElMessage.info("评估结论功能待实现");
}

function handleDetail(row: AssessItem) {
  ElMessage.info("评估总结详情功能待实现");
}

function handleDelete(row: AssessItem) {
  ElMessageBox.confirm("确认删除该评估？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      // TODO: Call delete API
      ElMessage.success("删除成功！");
      fetchData();
    })
    .catch(() => {
      // User cancelled
    });
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

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="assess-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商评估</span>
        </div>
      </template>

      <!-- Search Form -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="承包商名称">
            <el-input
              v-model="searchForm.field"
              placeholder="请输入承包商名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
              v-model="searchForm.beginTime"
              type="date"
              placeholder="开始日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 140px"
            />
            <span class="date-separator">-</span>
            <el-date-picker
              v-model="searchForm.endTime"
              type="date"
              placeholder="结束日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 140px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch"> 查询 </el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleAdd">添加</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- Table -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="承包商名称" min-width="200">
          <template #default="{ row }">
            {{ row.cm?.field || "" }}
          </template>
        </el-table-column>
        <el-table-column label="发起时间" width="160" align="center">
          <template #default="{ row }">
            {{ formatTimestamp(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="发起人" width="120" align="center">
          <template #default="{ row }">
            {{ row.user?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="评估人员数量" width="120" align="center">
          <template #default="{ row }">
            <el-link
              v-if="row.count"
              type="primary"
              :underline="false"
              @click="handleOnlineAssess(row)"
            >
              {{ row.count }}
            </el-link>
            <span v-else>/</span>
          </template>
        </el-table-column>
        <el-table-column label="评估截止时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 1"
              type="primary"
              size="small"
              @click="handleOnlineAssess(row)"
            >
              在线评估
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleConclusion(row)"
            >
              评估结论
            </el-button>
            <el-button type="warning" size="small" @click="handleDetail(row)">
              评估总结详情
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-container">
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
.assess-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .date-separator {
    margin: 0 8px;
    color: var(--el-text-color-secondary);
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
