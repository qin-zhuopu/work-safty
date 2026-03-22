<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftEmerresourFp"
});

interface UserInfo {
  id: number;
  uname: string;
  ushow: string;
}

interface DeptInfo {
  id: number;
  name: string;
  parent?: {
    id: number;
    name: string;
  };
}

interface ConfigInfo {
  id: number;
  field: string;
  cycle: string;
}

interface FpItem {
  id: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field4: number;
  next: string;
  remarks: string;
  sysDept?: DeptInfo;
  sysUser?: UserInfo;
  config?: ConfigInfo;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: FpItem[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

interface DeptResponse {
  success: boolean;
  t: DeptInfo[];
}

const tableData = ref<FpItem[]>([]);
const loading = ref(false);
const searchForm = reactive({
  deptId: "-1",
  field: "",
  beginTime: "",
  endTime: ""
});
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const selectedIds = ref<string[]>([]);

const deptOptions = ref<Array<{ value: string; label: string }>>([]);

async function fetchDeptOptions() {
  try {
    const response = await fetch("/sft/sys/dept/all");
    const data: DeptResponse = await response.json();
    if (data.success) {
      function flattenDepts(
        depts: DeptInfo[]
      ): Array<{ value: string; label: string }> {
        const result: Array<{ value: string; label: string }> = [];
        for (const dept of depts) {
          result.push({ value: String(dept.id), label: dept.name });
          if (dept.children && dept.children.length > 0) {
            result.push(...flattenDepts(dept.children));
          }
        }
        return result;
      }
      deptOptions.value = flattenDepts(data.t);
    }
  } catch (error) {
    console.error("获取部门数据失败:", error);
  }
}

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size),
      field: searchForm.field,
      deptId: searchForm.deptId
    });
    if (searchForm.beginTime) {
      params.append("beginTime", searchForm.beginTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }
    const response = await fetch(`/sft/emerresour/fp/list?${params}`);
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
  searchForm.deptId = "-1";
  searchForm.field = "";
  searchForm.beginTime = "";
  searchForm.endTime = "";
  pagination.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDownloadTemplate() {
  window.location.href = "/pub/xls/防汛物资台账模板（注意格式为2003）.xls";
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  const params = new URLSearchParams({
    field: searchForm.field,
    startTime: searchForm.beginTime,
    endTime: searchForm.endTime,
    deptId: searchForm.deptId
  });
  window.open(`/sft/emerresour/fp/export?${params}`);
}

function handleMaintenRecord() {
  const ids = selectedIds.value.join(",");
  if (!ids) {
    ElMessage.warning("请选择要设置台账的记录！");
    return;
  }
  ElMessage.info(`维护记录: ${ids}`);
}

function handleEdit(row: FpItem) {
  ElMessage.info(`编辑: ${row.field}`);
}

function handleDelete(row: FpItem) {
  ElMessageBox.confirm("确认删除该记录？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/emerresour/fp/del/${row.id}`);
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

function handleMaintenRecordRow(row: FpItem) {
  ElMessage.info(`维护记录: ${row.field}`);
}

function handleQrcode(row: FpItem) {
  ElMessage.info(`二维码: ${row.field}`);
}

function handleSelectionChange(selection: FpItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm(
    `相关维修记录也会删除，确认删除选中的 ${selectedIds.value.length} 条记录？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(async () => {
      try {
        const ids = selectedIds.value.join(",");
        const response = await fetch(`/sft/emerresour/fp/delAll?ids=${ids}`);
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

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  fetchDeptOptions();
  fetchData();
});
</script>

<template>
  <div class="fp-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">防汛物资台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="所属部门">
            <el-select
              v-model="searchForm.deptId"
              placeholder="请选择部门"
              clearable
              style="width: 200px"
            >
              <el-option label="请选择部门" value="-1" />
              <el-option
                v-for="dept in deptOptions"
                :key="dept.value"
                :label="dept.label"
                :value="dept.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              v-model="searchForm.field"
              placeholder="请输入名称"
              clearable
              style="width: 180px"
            />
          </el-form-item>
          <el-form-item label="维护日期">
            <el-date-picker
              v-model="searchForm.beginTime"
              type="date"
              placeholder="开始日期"
              value-format="YYYY-MM-DD"
              style="width: 140px"
            />
            <el-date-picker
              v-model="searchForm.endTime"
              type="date"
              placeholder="结束日期"
              value-format="YYYY-MM-DD"
              style="width: 140px; margin-left: 8px"
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
            <el-button type="info" @click="handleExport">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
            <el-button type="primary" @click="handleMaintenRecord">
              <el-icon><Document /></el-icon>
              维护记录
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
        <el-table-column label="车间" width="120" align="center">
          <template #default="{ row }">
            {{ row.sysDept?.parent?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="工段" width="120" align="center">
          <template #default="{ row }">
            {{ row.sysDept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="field" label="名称" min-width="120" />
        <el-table-column label="物资类型" width="120" align="center">
          <template #default="{ row }">
            {{ row.config?.field || "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field1"
          label="规格型号"
          width="100"
          align="center"
        />
        <el-table-column prop="field2" label="数量" width="80" align="center" />
        <el-table-column prop="field3" label="存放位置" min-width="120" />
        <el-table-column label="责任人" width="100" align="center">
          <template #default="{ row }">
            {{ row.sysUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="维护日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field4) }}
          </template>
        </el-table-column>
        <el-table-column label="维护周期" width="100" align="center">
          <template #default="{ row }">
            {{ row.config?.cycle || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="next" label="下次维护日期" min-width="150" />
        <el-table-column label="操作" width="260" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleMaintenRecordRow(row)"
            >
              维护记录
            </el-button>
            <el-button type="danger" size="small" @click="handleQrcode(row)">
              二维码
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
.fp-container {
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
