<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftEmerresourEp"
});

interface UserInfo {
  id: number;
  uname: string;
  ushow: string;
}

interface EpItem {
  id: number;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  bzUserName: string;
  pzUserName: string;
  sysUserName: string;
  addDate: number;
  file1: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: EpItem[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

const tableData = ref<EpItem[]>([]);
const loading = ref(false);
const searchForm = reactive({
  field: "",
  field2: "",
  field3: ""
});
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const selectedIds = ref<number[]>([]);

const levelOptions = [
  { label: "公司级", value: "公司级" },
  { label: "处室级", value: "处室级" },
  { label: "车间级", value: "车间级" },
  { label: "工段班组岗位级", value: "工段班组岗位级" }
];

const statusOptions = [
  { label: "未审核", value: "未审核" },
  { label: "已审核", value: "已审核" },
  { label: "驳回", value: "驳回" }
];

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size),
      field: searchForm.field,
      field2: searchForm.field2,
      field3: searchForm.field3
    });
    const response = await fetch(`/sft/emerresour/ep/list?${params}`);
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
  searchForm.field2 = "";
  searchForm.field3 = "";
  pagination.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm("相关结构化预案也会删除，确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const ids = selectedIds.value.join(",");
        const response = await fetch(`/sft/emerresour/ep/delAll?ids=${ids}`);
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

function handleEdit(row: EpItem) {
  ElMessage.info(`编辑: ${row.id}`);
}

function handleDelete(row: EpItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/emerresour/ep/del/${row.id}`);
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

function handleStructuredPlan(row: EpItem) {
  ElMessage.info(`结构化预案: ${row.id}`);
}

function handleSelectionChange(selection: EpItem[]) {
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

function getFileIcon(filePath: string): { icon: string; isLink: boolean } {
  if (!filePath) return { icon: "", isLink: false };
  const ext = filePath.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf") {
    return { icon: "PDF", isLink: true };
  } else if (ext === "doc" || ext === "docx") {
    return { icon: "WORD", isLink: true };
  }
  return { icon: "FILE", isLink: false };
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="ep-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">应急预案台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="预案名称">
            <el-input
              v-model="searchForm.field"
              placeholder="请输入预案名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="级别">
            <el-select
              v-model="searchForm.field2"
              placeholder="请选择"
              clearable
              style="width: 180px"
            >
              <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="searchForm.field3"
              placeholder="请选择"
              clearable
              style="width: 120px"
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
            <el-button type="success" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加
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
          label="预案名称"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field1"
          label="预案类型"
          width="120"
          align="center"
        />
        <el-table-column
          prop="field2"
          label="级别"
          width="120"
          align="center"
        />
        <el-table-column prop="field3" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag
              :type="
                row.field3 === '已审核'
                  ? 'success'
                  : row.field3 === '驳回'
                    ? 'danger'
                    : 'info'
              "
            >
              {{ row.field3 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="bzUserName"
          label="编制人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="pzUserName"
          label="批准人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="sysUserName"
          label="审核人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="addDate"
          label="上传日期"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="file1" label="附件" width="100" align="center">
          <template #default="{ row }">
            <span v-if="row.file1" class="file-icon">
              {{ getFileIcon(row.file1).icon }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{ row }">
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
            <el-button
              link
              type="primary"
              size="small"
              @click="handleStructuredPlan(row)"
            >
              结构化预案
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
.ep-container {
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

.file-icon {
  font-size: 12px;
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
