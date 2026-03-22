<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftInspTl"
});

interface AddUser {
  id: number;
  ushow: string;
}

interface TlItem {
  id: number;
  name: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: number | null;
  field7: string;
  field8: string;
  addDate: number;
  addUser: AddUser;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: TlItem[];
    totalElements: number;
  };
}

const tableData = ref<TlItem[]>([]);
const loading = ref(false);
const selectedIds = ref<number[]>([]);
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
    const response = await fetch(`/sft/insp/tl/list.json?${params}`);
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

function handleSelectionChange(selection: TlItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleAdd() {
  ElMessage.info("添加功能");
}

function handleEdit(row: TlItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: TlItem) {
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

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条记录?`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      ElMessage.success("删除成功");
      selectedIds.value = [];
      fetchData();
    })
    .catch(() => {});
}

function handleDownloadTemplate() {
  ElMessage.success("下载模板");
}

function handleImport() {
  ElMessage.info("导入功能");
}

function handleExport() {
  ElMessage.success("导出成功");
}

function formatDate(timestamp: number | null): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="tl-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">发放台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入名称"
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
        <el-button type="warning" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button type="success" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button type="info" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="名称" min-width="120" />
        <el-table-column prop="field" label="型号" min-width="150" />
        <el-table-column prop="field1" label="序列号1" min-width="150" />
        <el-table-column prop="field2" label="序列号2" min-width="150" />
        <el-table-column prop="field8" label="物联网卡号" min-width="150" />
        <el-table-column prop="field3" label="工段" min-width="100" />
        <el-table-column prop="field4" label="路线" min-width="150" />
        <el-table-column prop="field5" label="领用人" min-width="100" />
        <el-table-column label="领用日期" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field6) }}
          </template>
        </el-table-column>
        <el-table-column prop="field7" label="发放人" min-width="100" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
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
.tl-container {
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
