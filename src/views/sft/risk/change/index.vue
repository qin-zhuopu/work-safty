<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftRiskChange"
});

interface SysUser {
  id: number;
  ushow: string;
  uname?: string;
}

interface TrainPlan {
  id: string;
  name: string;
}

interface ChangeItem {
  id: string;
  creater?: SysUser;
  createDate?: number;
  content?: string;
  field?: string;
  checker?: SysUser;
  checkerDate?: number;
  type?: number;
  status?: string;
  plan?: TrainPlan;
  file1?: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ChangeItem[];
    totalElements: number;
  };
}

const tableData = ref<ChangeItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  ushow: "",
  content: ""
});

const selectedIds = ref<string[]>([]);

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });

    if (searchForm.ushow) params.append("ushow", searchForm.ushow);
    if (searchForm.content) params.append("content", searchForm.content);

    const response = await fetch(`/sft/risk/change/list.json?${params}`);
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
  searchForm.ushow = "";
  searchForm.content = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleExport() {
  const params = new URLSearchParams();
  if (searchForm.ushow) params.append("ushow", searchForm.ushow);
  if (searchForm.content) params.append("content", searchForm.content);

  window.open(`/sft/risk/change/export?${params}`);
  ElMessage.success("导出成功");
}

function handleEdit(row: ChangeItem) {
  if (row.status === "已审核") {
    ElMessage.warning("变更已审核，无法编辑");
    return;
  }
  ElMessage.info("编辑功能待实现");
}

function handleDelete(row: ChangeItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/risk/change/del/${row.id}`);
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          fetchData(currentPage.value);
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
      }
    })
    .catch(() => {});
}

function handleRecord(row: ChangeItem) {
  ElMessage.info(`签字记录: ${row.id}`);
}

function formatDate(timestamp?: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}

function getTrainType(type?: number): string {
  if (type === 1) return "线上培训";
  if (type === 2) return "线下培训";
  return "";
}

function getStatusType(
  status?: string
): "success" | "warning" | "danger" | "info" {
  if (status === "已审核") return "success";
  if (status === "未审核") return "warning";
  if (status === "已驳回") return "danger";
  return "info";
}

function renderFiles(fileStr?: string): string[] {
  if (!fileStr) return [];
  return fileStr.split(",");
}

function getFileExtension(filename: string): string {
  const index = filename.lastIndexOf(".");
  return index >= 0 ? filename.substring(index + 1).toLowerCase() : "";
}

function handleSelectionChange(selection: ChangeItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="risk-change-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">变更管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="变更提出人">
          <el-input
            v-model="searchForm.ushow"
            placeholder="请输入变更提出人"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="主要变更内容">
          <el-input
            v-model="searchForm.content"
            placeholder="请输入主要变更内容"
            clearable
            style="width: 200px"
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
          <el-button icon="Download" @click="handleExport">导出</el-button>
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
        <el-table-column label="变更发起人" width="110" align="center">
          <template #default="{ row }">
            {{ row.creater?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="变更时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="主要变更内容"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field"
          label="涉及属地部门"
          width="120"
          align="center"
        />
        <el-table-column label="变更审核人" width="110" align="center">
          <template #default="{ row }">
            {{ row.checker?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="审核时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.checkerDate) }}
          </template>
        </el-table-column>
        <el-table-column label="培训类型" width="100" align="center">
          <template #default="{ row }">
            {{ getTrainType(row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ row.status || "" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="关联培训"
          width="140"
          align="center"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            {{ row.plan?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="附件" width="100" align="center">
          <template #default="{ row }">
            <span v-if="row.file1">
              <el-tag
                v-for="(file, index) in renderFiles(row.file1)"
                :key="index"
                type="info"
                size="small"
                style="margin: 2px"
              >
                {{ getFileExtension(file) }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
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
            <el-button type="info" link size="small" @click="handleRecord(row)">
              签字记录
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
.risk-change-container {
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
