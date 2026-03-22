<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftSysApprovalLibrary"
});

interface SysUser {
  id: number;
  ushow: string;
  uname: string;
  telephone: string;
  job: string;
  status: number;
}

interface SysDept {
  id: number;
  name: string;
}

interface ApprovalLibraryItem {
  id: number;
  sysUser: SysUser;
  sysDept: SysDept;
  type: number;
  delFlag: number;
}

interface PageData {
  content: ApprovalLibraryItem[];
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
const tableData = ref<ApprovalLibraryItem[]>([]);
const loading = ref(false);
const total = ref(0);

const searchForm = reactive({
  type: "-1",
  sysUserName: ""
});

const pagination = reactive({
  page: 0,
  size: 10
});

const typeOptions = [
  { label: "请选择", value: "-1" },
  { label: "HSE管理部审批", value: "1" },
  { label: "公司领导审批", value: "2" }
];

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size)
    });
    if (searchForm.type && searchForm.type !== "-1") {
      params.append("type", searchForm.type);
    }
    if (searchForm.sysUserName) {
      params.append("sysUserName", searchForm.sysUserName);
    }
    const response = await fetch(
      `/sft/sys/approval/library/list.json?${params}`
    );
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
  searchForm.type = "-1";
  searchForm.sysUserName = "";
  pagination.page = 0;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDelete(row: ApprovalLibraryItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
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

function getTypeName(type: number): string {
  const typeMap: Record<number, string> = {
    1: "HSE管理部审批",
    2: "公司领导审批"
  };
  return typeMap[type] || "";
}

function getStatusName(status: number): string {
  const statusMap: Record<number, string> = {
    1: "正常",
    2: "冻结",
    3: "删除"
  };
  return statusMap[status] || "";
}

function getStatusType(status: number): "" | "success" | "danger" | "info" {
  const statusTypeMap: Record<number, "" | "success" | "danger" | "info"> = {
    1: "success",
    2: "danger",
    3: "info"
  };
  return statusTypeMap[status] || "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="approval-library-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">施工作业方案审批库管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form ref="searchFormRef" :model="searchForm" :inline="true">
          <el-form-item label="类型" prop="type">
            <el-select
              v-model="searchForm.type"
              placeholder="请选择"
              clearable
              style="width: 200px"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审批人员" prop="sysUserName">
            <el-input
              v-model="searchForm.sysUserName"
              placeholder="请输入审批人员"
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
        <el-table-column
          prop="sysUser.ushow"
          label="人员"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="sysUser.uname"
          label="账号"
          min-width="140"
          align="center"
        />
        <el-table-column label="人员状态" min-width="100" align="center">
          <template #default="{ row }">
            <el-tag
              v-if="row.sysUser"
              :type="getStatusType(row.sysUser.status)"
            >
              {{ getStatusName(row.sysUser.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="类型" min-width="180" align="center">
          <template #default="{ row }">
            {{ getTypeName(row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sysDept.name"
          label="审批权限"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
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
.approval-library-container {
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
