<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftDangerLaw"
});

interface LawItem {
  id: number;
  level: string;
  type: string;
  name: string;
  institution: string;
  instDate: string;
  effectDate: string;
  status: string;
  field1: string;
  addDate: string;
}

interface PageData {
  content: LawItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const searchFormRef = ref<FormInstance>();
const tableData = ref<LawItem[]>([]);
const loading = ref(false);
const total = ref(0);

const searchForm = reactive({
  name: "",
  status: ""
});

const pagination = reactive({
  page: 0,
  size: 10
});

const statusOptions = [
  { label: "即将实施", value: "即将实施" },
  { label: "已发布", value: "已发布" },
  { label: "已作废", value: "已作废" }
];

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      field: searchForm.name,
      status: searchForm.status
    });
    const response = await fetch(`/sft/danger/law/list.json?${params}`);
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
  pagination.page = 0;
  fetchData();
}

function handleReset() {
  searchFormRef.value?.resetFields();
  pagination.page = 0;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: LawItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: LawItem) {
  ElMessageBox.confirm("确认删除该法律法规记录？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {
      // 取消删除
    });
}

function handleSizeChange(size: number) {
  pagination.size = size;
  pagination.page = 0;
  fetchData();
}

function handleCurrentChange(page: number) {
  pagination.page = page - 1;
  fetchData();
}

function getFileIcon(filename: string): string {
  if (!filename) return "";
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "📄";
    case "doc":
    case "docx":
      return "📝";
    case "xls":
    case "xlsx":
      return "📊";
    default:
      return "📎";
  }
}

function getStatusType(
  status: string
): "success" | "info" | "danger" | "warning" {
  switch (status) {
    case "已发布":
      return "success";
    case "即将实施":
      return "info";
    case "已作废":
      return "danger";
    default:
      return "info";
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="law-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">法律法规</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form ref="searchFormRef" :model="searchForm" :inline="true">
          <el-form-item label="文件名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入文件名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="发布状态" prop="status">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择"
              clearable
              style="width: 150px"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
            <el-button type="primary" plain @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加
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
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="level" label="级别" width="100" align="center" />
        <el-table-column prop="type" label="类型" width="120" align="center" />
        <el-table-column
          prop="name"
          label="法律法规名称"
          min-width="250"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span class="text-blue-600 cursor-pointer hover:underline">
              {{ row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="institution"
          label="颁布机构"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="instDate"
          label="颁布日期"
          width="120"
          align="center"
        />
        <el-table-column
          prop="effectDate"
          label="生效日期"
          width="120"
          align="center"
        />
        <el-table-column
          prop="status"
          label="发布状态"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="资料附件" width="100" align="center">
          <template #default="{ row }">
            <span v-if="row.field1" class="text-xl">
              {{ getFileIcon(row.field1) }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="addDate"
          label="上传时间"
          width="160"
          align="center"
        />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleEdit(row)"
            >
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
      <div class="pagination-container mt-4">
        <el-pagination
          :current-page="pagination.page + 1"
          :page-size="pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.law-container {
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

.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>
