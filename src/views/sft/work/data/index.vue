<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftWorkData"
});

interface WorkDataItem {
  id: string;
  field14: string;
  field15: string;
  type: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: WorkDataItem[];
    totalElements: number;
  };
}

const tableData = ref<WorkDataItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  field14: ""
});

const selectedIds = ref<string[]>([]);

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize),
      ...(searchForm.field14 && { field14: searchForm.field14 })
    });
    const response = await fetch(`/sft/work/data/list/3.json?${params}`);
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
  fetchData(1);
}

function handleReset() {
  searchForm.field14 = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDownloadTemplate() {
  window.open("/pub/xls/施工工器具数据库（注意格式为2003）.xls");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleEdit(row: WorkDataItem) {
  ElMessage.info(`编辑: ${row.id}`);
}

function handleDelete(row: WorkDataItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleSelectionChange(selection: WorkDataItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的数据！");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条数据？`,
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
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="work-data-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">施工工器具数据库</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="机具名称">
          <el-input
            v-model="searchForm.field14"
            placeholder="请输入机具名称"
            clearable
            style="width: 260px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            检索
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="Plus" @click="handleAdd">
            添加
          </el-button>
          <el-button icon="Download" @click="handleDownloadTemplate">
            下载模板
          </el-button>
          <el-button icon="Upload" @click="handleImport">导入</el-button>
          <el-button icon="Download" @click="handleExport">导出</el-button>
          <el-button type="danger" icon="Delete" @click="handleBatchDelete">
            删除
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="field14"
          label="机具名称"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field15"
          label="型号"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.work-data-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
