<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Search,
  Refresh,
  Plus,
  Upload,
  Download,
  Delete
} from "@element-plus/icons-vue";

defineOptions({
  name: "SftEmerresourMa"
});

interface SysDept {
  id: number;
  name: string;
  parent?: {
    name: string;
  };
}

interface SysUser {
  ushow: string;
}

interface MaItem {
  id: number;
  field: string; // 药品名称
  field1: string; // 规格型号
  field2: string; // 数量
  field3: string; // 存放位置
  field5: number; // 生产日期
  field6: number; // 有效期
  sysDept: SysDept;
  sysUser: SysUser;
}

interface DeptItem {
  id: number;
  name: string;
  value: number;
  children?: DeptItem[];
}

interface ListResponse {
  success: boolean;
  t: {
    content: MaItem[];
    totalElements: number;
  };
}

interface DeptResponse {
  success: boolean;
  t: DeptItem[];
}

const tableData = ref<MaItem[]>([]);
const loading = ref(false);
const total = ref(0);

// 查询条件
const queryForm = ref({
  deptId: "",
  field: "",
  startTime: "",
  endTime: ""
});

// 分页
const pagination = ref({
  page: 1,
  size: 10
});

// 部门选项
const deptOptions = ref<DeptItem[]>([]);
const deptTree = ref<DeptItem[]>([]);

// 选中的行
const selectedRows = ref<MaItem[]>([]);

// 判断是否过期
const isExpired = (expireDate: number): boolean => {
  if (!expireDate) return false;
  const now = Date.now();
  return now >= expireDate;
};

// 格式化日期
const formatDate = (timestamp: number): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 获取部门列表
async function fetchDeptList() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data: DeptResponse = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
      deptTree.value = data.t;
    }
  } catch (error) {
    console.error("获取部门列表失败", error);
  }
}

// 获取表格数据
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page),
      size: String(pagination.value.size)
    });

    if (queryForm.value.deptId && queryForm.value.deptId !== "-1") {
      params.append("deptId", queryForm.value.deptId);
    }
    if (queryForm.value.field) {
      params.append("field", queryForm.value.field);
    }
    if (queryForm.value.startTime) {
      params.append("beginTime", queryForm.value.startTime);
    }
    if (queryForm.value.endTime) {
      params.append("endTime", queryForm.value.endTime);
    }

    const response = await fetch(`/sft/emerresour/ma/list?${params}`);
    const data: ListResponse = await response.json();
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

// 查询
function handleSearch() {
  pagination.value.page = 1;
  fetchData();
}

// 重置
function handleReset() {
  queryForm.value = {
    deptId: "",
    field: "",
    startTime: "",
    endTime: ""
  };
  pagination.value.page = 1;
  fetchData();
}

// 添加
function handleAdd() {
  ElMessage.info("添加功能待实现");
}

// 编辑
function handleEdit(row: MaItem) {
  ElMessage.info("编辑功能待实现");
}

// 删除
async function handleDelete(row: MaItem) {
  try {
    await ElMessageBox.confirm("确认删除？", "提示", {
      type: "warning"
    });
    const response = await fetch(`/sft/emerresour/ma/del/${row.id}`, {
      method: "GET"
    });
    const data = await response.json();
    if (data.success) {
      ElMessage.success("删除成功");
      fetchData();
    } else {
      ElMessage.error(data.message || "删除失败");
    }
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
}

// 批量删除
async function handleBatchDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  try {
    await ElMessageBox.confirm("相关维修记录也会删除，确认删除？", "提示", {
      type: "warning"
    });
    const ids = selectedRows.value.map(row => row.id).join(",");
    const response = await fetch(`/sft/emerresour/ma/delAll?ids=${ids}`, {
      method: "GET"
    });
    const data = await response.json();
    if (data.success) {
      ElMessage.success("删除成功");
      fetchData();
    } else {
      ElMessage.error(data.message || "删除失败");
    }
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
}

// 导入
function handleImport() {
  ElMessage.info("导入功能待实现");
}

// 导出
function handleExport() {
  const params = new URLSearchParams();
  if (queryForm.value.field) {
    params.append("field", queryForm.value.field);
  }
  if (queryForm.value.startTime) {
    params.append("startTime", queryForm.value.startTime);
  }
  if (queryForm.value.endTime) {
    params.append("endTime", queryForm.value.endTime);
  }
  if (queryForm.value.deptId && queryForm.value.deptId !== "-1") {
    params.append("deptId", queryForm.value.deptId);
  }
  window.open(`/sft/emerresour/ma/export?${params}`);
}

// 分页改变
function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  pagination.value.page = 1;
  fetchData();
}

// 选择改变
function handleSelectionChange(selection: MaItem[]) {
  selectedRows.value = selection;
}

onMounted(() => {
  fetchDeptList();
  fetchData();
});
</script>

<template>
  <div class="ma-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">医疗救护台账</span>
        </div>
      </template>

      <!-- 查询表单 -->
      <el-form :inline="true" :model="queryForm" class="query-form">
        <el-form-item label="所属部门">
          <el-tree-select
            v-model="queryForm.deptId"
            :data="deptTree"
            :props="{ label: 'name', value: 'id' }"
            clearable
            placeholder="请选择部门"
            check-strictly
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input
            v-model="queryForm.field"
            placeholder="请输入名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="queryForm.startTime"
            type="date"
            placeholder="开始日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="date-separator">-</span>
          <el-date-picker
            v-model="queryForm.endTime"
            type="date"
            placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="handleReset">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button type="warning" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button @click="handleExport">
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
        style="width: 100%; margin-top: 16px"
        :row-class-name="
          ({ row }) => (isExpired(row.field6) ? 'expired-row' : '')
        "
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="车间" width="120">
          <template #default="{ row }">
            {{ row.sysDept?.parent?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="工段" width="120">
          <template #default="{ row }">
            {{ row.sysDept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="field" label="药品名称" min-width="120" />
        <el-table-column prop="field1" label="规格型号" width="100" />
        <el-table-column prop="field2" label="数量" width="80" align="center" />
        <el-table-column prop="field3" label="存放位置" min-width="120" />
        <el-table-column label="责任人" width="100">
          <template #default="{ row }">
            {{ row.sysUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="生产日期" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field5) }}
          </template>
        </el-table-column>
        <el-table-column label="有效期" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field6) }}
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
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.ma-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.query-form {
  margin-bottom: 16px;
}

.date-separator {
  margin: 0 8px;
  color: var(--el-text-color-secondary);
}

.btn-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

:deep(.expired-row) {
  font-weight: bold;
  color: var(--el-color-danger);
}

:deep(.expired-row td) {
  background-color: var(--el-color-danger-light-9) !important;
}
</style>
