<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { DateModelType } from "element-plus";

defineOptions({
  name: "SftDangerManage"
});

interface ManageItem {
  id: number;
  name: string;
  field: string;
  field1: string;
  addDate: number;
  remarks?: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ManageItem[];
    totalElements: number;
  };
}

const tableData = ref<ManageItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);
const selectedIds = ref<number[]>([]);

const searchForm = reactive({
  name: "",
  startTime: "",
  endTime: ""
});

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    if (searchForm.name) {
      params.append("field", searchForm.name);
    }
    if (searchForm.startTime) {
      params.append("startTime", searchForm.startTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }

    const response = await fetch(`/sft/danger/manage/list.json?${params}`);
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
  searchForm.name = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  fetchData(1);
}

function handleAdd() {
  ElMessageBox.alert("跳转到添加页面", "添加", {
    confirmButtonText: "确定"
  });
}

function handleEdit(row: ManageItem) {
  ElMessageBox.alert(`跳转到编辑页面: ${row.id}`, "编辑", {
    confirmButtonText: "确定"
  });
}

function handleDelete(row: ManageItem) {
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

function handleSelectionChange(selection: ManageItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm("确认删除选中的记录？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      selectedIds.value = [];
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function formatDateTime(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getFileExtension(filename: string): string {
  if (!filename) return "";
  const index = filename.lastIndexOf(".");
  return index !== -1 ? filename.substring(index + 1).toLowerCase() : "";
}

function getFileIcon(filename: string): string {
  const ext = getFileExtension(filename);
  switch (ext) {
    case "pdf":
      return "📄 PDF";
    case "doc":
    case "docx":
      return "📝 Word";
    case "xlsx":
    case "xls":
      return "📊 Excel";
    default:
      return "📎 文件";
  }
}

function handleFileClick(row: ManageItem) {
  if (row.field1) {
    const files = row.field1.split(",");
    if (files.length === 1) {
      window.open(row.field1, "_blank");
    }
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="danger-manage-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">管理制度</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入文件名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始时间"
            value-format="YYYY-MM-DD"
            style="width: 130px"
          />
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束时间"
            value-format="YYYY-MM-DD"
            style="width: 130px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="Plus" @click="handleAdd">
            添加
          </el-button>
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
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="文件名称" min-width="350" />
        <el-table-column prop="field" label="发布单位" width="180" />
        <el-table-column label="资料附件" width="150" align="center">
          <template #default="{ row }">
            <span
              v-if="row.field1"
              class="file-link"
              @click="handleFileClick(row)"
            >
              {{ getFileIcon(row.field1) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" width="150" align="center">
          <template #default="{ row }">
            {{ row.addDate ? formatDateTime(row.addDate) : "" }}
          </template>
        </el-table-column>
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
.danger-manage-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .el-form-item {
    margin-bottom: 8px;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.file-link {
  color: var(--el-color-primary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
