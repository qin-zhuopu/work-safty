<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { DateModelType } from "element-plus";

defineOptions({
  name: "SftAmAs"
});

interface AccidentItem {
  id: number;
  name: string;
  field: string;
  field1: string;
  field2: number;
  plan?: {
    name: string;
  };
  addDate: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  t: {
    totalElements: number;
    content: AccidentItem[];
  };
}

const tableData = ref<AccidentItem[]>([]);
const loading = ref(false);
const selectedIds = ref<number[]>([]);

// Search form
const searchForm = ref({
  name: "",
  field: "",
  startTime: null as DateModelType,
  endTime: null as DateModelType
});

// Pagination
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

    if (searchForm.value.name) {
      params.append("field", searchForm.value.name);
    }
    if (searchForm.value.field) {
      params.append("field1", searchForm.value.field);
    }
    if (searchForm.value.startTime) {
      params.append("startTime", String(searchForm.value.startTime));
    }
    if (searchForm.value.endTime) {
      params.append("endTime", String(searchForm.value.endTime));
    }

    const response = await fetch(`/sft/am/as/list.json?${params.toString()}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
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
  pagination.value.page = 1;
  fetchData();
}

function handleReset() {
  searchForm.value = {
    name: "",
    field: "",
    startTime: null,
    endTime: null
  };
  pagination.value.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleDelete(row: AccidentItem) {
  ElMessageBox.confirm("查看相关人员也会删除，确认删除？", "提示", {
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
  ElMessageBox.confirm("查看相关人员也会删除，确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      selectedIds.value = [];
      fetchData();
    })
    .catch(() => {});
}

function handleEdit(row: AccidentItem) {
  ElMessage.info("编辑功能待实现");
}

function handleTrain(row: AccidentItem) {
  ElMessage.info("关联培训功能待实现");
}

function handleSelectionChange(selection: AccidentItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getFileIconPath(path: string): string {
  const ext = path.substring(path.lastIndexOf(".") + 1).toLowerCase();
  if (ext === "pdf") {
    return "/sftadmin/img2/PDF.png";
  } else if (ext === "doc" || ext === "docx") {
    return "/sftadmin/img2/word.png";
  } else if (ext === "xlsx" || ext === "xls") {
    return "/sftadmin/img2/excel.png";
  }
  return path;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="as-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">外部事故共享管理</span>
        </div>
      </template>

      <!-- Search Form -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="事故名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入事故名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="事故类型">
          <el-input
            v-model="searchForm.field"
            placeholder="请输入事故类型"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始时间"
            style="width: 135px"
            clearable
          />
          <span class="mx-2">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束时间"
            style="width: 135px"
            clearable
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
          <el-button type="success" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
          <el-button type="warning" @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button type="danger" @click="handleBatchDelete">
            <el-icon><Delete /></el-icon>
            删除
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="事故名称" min-width="150" />
        <el-table-column prop="field" label="事故类型" min-width="120" />
        <el-table-column label="事故相关资料" min-width="150">
          <template #default="{ row }">
            <div v-if="row.field1" class="file-icons">
              <template v-if="row.field1.includes(',')">
                <img
                  v-for="(path, idx) in row.field1.split(',')"
                  :key="idx"
                  :src="getFileIconPath(path)"
                  class="file-icon"
                  width="30"
                  height="30"
                />
              </template>
              <img
                v-else
                :src="getFileIconPath(row.field1)"
                class="file-icon"
                width="30"
                height="30"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="field2"
          label="查看人数"
          width="100"
          align="center"
        />
        <el-table-column label="关联培训" min-width="150">
          <template #default="{ row }">
            {{ row.plan?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="上传时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button type="info" size="small" @click="handleTrain(row)">
              关联培训
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
          @size-change="fetchData"
          @current-change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.as-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.file-icons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.file-icon {
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
