<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftEmerresourConfig"
});

interface UserInfo {
  id: number;
  uname: string;
  ushow: string;
}

interface ConfigItem {
  id: number;
  field: string;
  field1: string;
  cycle: string;
  addUser: UserInfo;
  addDate: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ConfigItem[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

const tableData = ref<ConfigItem[]>([]);
const loading = ref(false);
const searchForm = reactive({
  field: ""
});
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const selectedIds = ref<number[]>([]);

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size),
      field: searchForm.field
    });
    const response = await fetch(`/sft/emerresour/config/list?${params}`);
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
  searchForm.field = "";
  pagination.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDownloadTemplate() {
  window.location.href = "/pub/xls/维护记录配置模板（注意格式为2003）.xls";
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功！");
      fetchData();
    })
    .catch(() => {});
}

function handleRequire(row: ConfigItem) {
  ElMessage.info(`检查要求: ${row.id}`);
}

function handleEdit(row: ConfigItem) {
  ElMessage.info(`编辑: ${row.id}`);
}

function handleDelete(row: ConfigItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/emerresour/config/del/${row.id}`);
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功！");
          fetchData();
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch {
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {});
}

function handleSelectionChange(selection: ConfigItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="config-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">维护记录配置台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="类型">
            <el-input
              v-model="searchForm.field"
              placeholder="请输入类型"
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
            <el-button type="success" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
            <el-button type="warning" @click="handleDownloadTemplate">
              <el-icon><Download /></el-icon>
              下载模板
            </el-button>
            <el-button type="info" @click="handleImport">
              <el-icon><Upload /></el-icon>
              导入
            </el-button>
            <el-button type="danger" @click="handleBatchDelete">
              <el-icon><Delete /></el-icon>
              删除
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="field"
          label="物资类型"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field1"
          label="维护内容"
          min-width="300"
          show-overflow-tooltip
        />
        <el-table-column
          prop="cycle"
          label="维护周期"
          width="120"
          align="center"
        />
        <el-table-column
          prop="addUser.ushow"
          label="创建人"
          width="150"
          align="center"
        />
        <el-table-column
          prop="addDate"
          label="创建日期"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleRequire(row)"
            >
              检查要求
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
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
.config-container {
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
