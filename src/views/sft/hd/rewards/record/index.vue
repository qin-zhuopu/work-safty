<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftHdRewardsRecord"
});

interface HiddenDanger {
  id: number;
  name: string;
}

interface RewardRecord {
  content: string;
  filledDate: number;
  filledName: string;
  hiddenDanger?: HiddenDanger;
  sysUserName: string;
  type: string;
  opinion: string;
}

interface PageData {
  content: RewardRecord[];
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<RewardRecord[]>([]);
const loading = ref(false);
const hdName = ref("");
const sysUserName = ref("");
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page),
      size: String(pagination.value.size)
    });
    if (hdName.value) params.append("hdName", hdName.value);
    if (sysUserName.value) params.append("sysUserName", sysUserName.value);

    const response = await fetch(`/sft/hd/rewards/all.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
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
  pagination.value.page = 1;
  fetchData();
}

function handleReset() {
  hdName.value = "";
  sysUserName.value = "";
  pagination.value.page = 1;
  fetchData();
}

function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  pagination.value.page = 1;
  fetchData();
}

function handleExport() {
  const params = new URLSearchParams();
  if (hdName.value) params.append("hdName", hdName.value);
  if (sysUserName.value) params.append("sysUserName", sysUserName.value);
  window.open(`/sft/hd/rewards/export?${params}`);
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
  <div class="rewards-record-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">奖惩管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="{ hdName, sysUserName }">
          <el-form-item label="隐患名称">
            <el-input
              v-model="hdName"
              placeholder="请输入隐患名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="奖惩人员">
            <el-input
              v-model="sysUserName"
              placeholder="请输入奖惩人员"
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
              <el-icon><RefreshLeft /></el-icon>
              重置
            </el-button>
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="隐患名称" min-width="150">
          <template #default="{ row }">
            {{ row.hiddenDanger?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="sysUserName" label="奖惩人员" min-width="120" />
        <el-table-column prop="content" label="奖惩内容" min-width="150" />
        <el-table-column prop="type" label="奖惩方式" min-width="100" />
        <el-table-column prop="opinion" label="奖惩意见" min-width="200" />
        <el-table-column prop="filledName" label="填写人" min-width="100" />
        <el-table-column
          prop="filledDate"
          label="填写时间"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.filledDate) }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container mt-4">
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
.rewards-record-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
