<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftInspAbnormal"
});

interface AddUser {
  id: number;
  ushow: string;
}

interface AbnormalItem {
  id: number;
  name: string;
  nodeName: string;
  status: string;
  field: string;
  addDate: number;
  addUser: AddUser;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: AbnormalItem[];
    totalElements: number;
  };
}

const tableData = ref<AbnormalItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const searchForm = reactive({
  name: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      ...(searchForm.name ? { name: searchForm.name } : {})
    });
    const response = await fetch(`/sft/insp/abnormal/list.json?${params}`);
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

function handleViewSite(row: AbnormalItem) {
  ElMessage.info(`查看巡检点: ${row.name}`);
}

function handleViewApprove(row: AbnormalItem) {
  ElMessage.info(`查看审批流: ${row.name}`);
}

function handleDelete(row: AbnormalItem) {
  ElMessageBox.confirm("确认删除该记录?", "提示", {
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

function formatDate(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

function getNodeClassName(nodeName: string): string {
  return nodeName.includes("驳回") ? "text-red-500 font-bold" : "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="abnormal-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">更换台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="异常原因">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入异常原因"
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

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="异常原因" min-width="120" />
        <el-table-column prop="nodeName" label="审批节点" min-width="120">
          <template #default="{ row }">
            <span :class="getNodeClassName(row.nodeName)">
              {{ row.nodeName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审批状态" min-width="100" />
        <el-table-column prop="field" label="异常原因" min-width="120" />
        <el-table-column label="申请时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template #default="{ row }">
            {{ row.addUser?.ushow || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleViewSite(row)">
              巡检点
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleViewApprove(row)"
            >
              审批流
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
.abnormal-container {
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
