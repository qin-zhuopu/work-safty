<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftWorkDocPl"
});

interface SysUser {
  id: string;
  ushow: string;
  status: string;
  sysDept: {
    name: string;
  };
}

interface WorkDocPlItem {
  id: string;
  type: string;
  docType: string;
  validDate: number | null;
  sysUser: SysUser | null;
  addUser: {
    ushow: string;
  } | null;
  addDate: number | null;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: WorkDocPlItem[];
    totalElements: number;
  };
}

const tableData = ref<WorkDocPlItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  type: "",
  docType: "",
  dept: "",
  name: ""
});

const selectedIds = ref<string[]>([]);

const typeOptions = [
  { label: "监护人", value: "1" },
  { label: "分析人", value: "2" }
];

const docTypeOptions = [
  { label: "动火", value: "1" },
  { label: "受限", value: "2" },
  { label: "高处检维修", value: "3" },
  { label: "高处架设", value: "10" },
  { label: "临电", value: "4" },
  { label: "盲板", value: "5" },
  { label: "吊装", value: "6" },
  { label: "动土", value: "7" },
  { label: "断路", value: "8" },
  { label: "所有", value: "9" }
];

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    if (searchForm.type) params.append("type", searchForm.type);
    if (searchForm.docType) params.append("docType", searchForm.docType);
    if (searchForm.dept) params.append("dept", searchForm.dept);
    if (searchForm.name) params.append("name", searchForm.name);

    const response = await fetch(`/sft/work/doc/pl/list.json?${params}`);
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
  searchForm.type = "";
  searchForm.docType = "";
  searchForm.dept = "";
  searchForm.name = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDownloadTemplate() {
  window.open("/pub/xls/监护人培训模板（注意格式为2003）.xls");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleEdit(row: WorkDocPlItem) {
  ElMessage.info(`调整作业类型: ${row.id}`);
}

function handleDelete(row: WorkDocPlItem) {
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

function handleSelectionChange(selection: WorkDocPlItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择相应的数据！");
    return;
  }
  ElMessageBox.confirm(`确认删除选中数据？`, "提示", {
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

function formatDate(timestamp: number | null): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}

function formatDateTime(timestamp: number | null): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getTypeName(type: string): string {
  if (type === "1") return "监护人";
  if (type === "2") return "分析人";
  return "";
}

function getDocTypeName(docType: string): string {
  const map: Record<string, string> = {
    "1": "动火",
    "2": "受限",
    "3": "高处检维修",
    "10": "高处架设",
    "4": "临电",
    "5": "盲板",
    "6": "吊装",
    "7": "动土",
    "8": "断路",
    "9": "所有"
  };
  return map[docType] || "";
}

function getStatusName(status: string): string {
  if (status === "1") return "正常";
  if (status === "2") return "冻结";
  if (status === "3") return "删除";
  return "";
}

function getStatusType(status: string): "success" | "warning" | "danger" | "" {
  if (status === "1") return "success";
  if (status === "2") return "warning";
  if (status === "3") return "danger";
  return "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="work-doc-pl-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">人员库管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="类别">
          <el-select
            v-model="searchForm.type"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option label="请选择" value="" />
            <el-option label="监护人" value="1" />
            <el-option label="分析人" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="作业类型">
          <el-select
            v-model="searchForm.docType"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option label="请选择" value="0" />
            <el-option label="动火" value="1" />
            <el-option label="受限" value="2" />
            <el-option label="高处检维修" value="3" />
            <el-option label="高处架设" value="10" />
            <el-option label="临电" value="4" />
            <el-option label="盲板" value="5" />
            <el-option label="吊装" value="6" />
            <el-option label="动土" value="7" />
            <el-option label="断路" value="8" />
            <el-option label="所有" value="9" />
          </el-select>
        </el-form-item>
        <el-form-item label="组织部门">
          <el-input
            v-model="searchForm.dept"
            placeholder="请输入组织部门"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="人员名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入人员名称"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="Plus" @click="handleAdd">
            新建
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
        <el-table-column label="部门" min-width="120">
          <template #default="{ row }">
            {{ row.sysUser?.sysDept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" min-width="100">
          <template #default="{ row }">
            {{ row.sysUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="有效期" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.validDate) }}
          </template>
        </el-table-column>
        <el-table-column label="人员状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag
              v-if="row.sysUser"
              :type="getStatusType(row.sysUser.status)"
            >
              {{ getStatusName(row.sysUser.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100" align="center">
          <template #default="{ row }">
            {{ getTypeName(row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="作业类型" width="120" align="center">
          <template #default="{ row }">
            {{ getDocTypeName(row.docType) }}
          </template>
        </el-table-column>
        <el-table-column label="添加人" min-width="100">
          <template #default="{ row }">
            {{ row.addUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template #default="{ row }">
            {{ formatDateTime(row.addDate) }}
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
              调整作业类型
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
.work-doc-pl-container {
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
