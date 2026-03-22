<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftEmerresourMaterial"
});

interface MaterialItem {
  id: number;
  cj: string;
  gd: string;
  field: string;
  type: string;
  field1: string;
  field2: string;
  field3: string;
  sysUser: string;
  field4?: number;
  cycle: string;
  next: string;
  field6: string;
  addUser: string;
  addDate: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: MaterialItem[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

interface DeptItem {
  value: string;
  name: string;
}

const tableData = ref<MaterialItem[]>([]);
const loading = ref(false);
const departments = ref<DeptItem[]>([]);

const searchForm = reactive({
  deptId: "",
  status: "",
  field: "",
  startTime: "",
  endTime: ""
});

const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});

async function fetchDepartments() {
  try {
    const response = await fetch("/sft/sys/dept/all");
    const data = await response.json();
    if (data.success) {
      departments.value = data.t || [];
    }
  } catch (error) {
    console.error("获取部门数据失败:", error);
  }
}

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      size: pagination.size.toString()
    });

    if (searchForm.deptId && searchForm.deptId !== "-1") {
      params.append("deptId", searchForm.deptId);
    }
    if (searchForm.status) {
      params.append("status", searchForm.status);
    }
    if (searchForm.field) {
      params.append("field", searchForm.field);
    }
    if (searchForm.startTime) {
      params.append("beginTime", searchForm.startTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }

    const response = await fetch(`/sft/emerresour/material/list?${params}`);
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
  searchForm.deptId = "";
  searchForm.status = "";
  searchForm.field = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  pagination.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: MaterialItem) {
  ElMessage.info(`编辑: ${row.field}`);
}

function handleDelete(row: MaterialItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
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

function handleMaintenRecord(row: MaterialItem) {
  ElMessage.info(`维护记录: ${row.field}`);
}

function handleQrcode(row: MaterialItem) {
  ElMessage.info(`二维码: ${row.field}`);
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleDownloadTemplate() {
  ElMessage.info("下载模板功能待实现");
}

function handleBatchDelete() {
  ElMessage.info("批量删除功能待实现");
}

function handleBatchMaintenRecord() {
  ElMessage.info("批量维护记录功能待实现");
}

function formatDate(timestamp?: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getRowClassName({ row }: { row: MaterialItem }) {
  return !row.field4 ? "row-warning" : "";
}

onMounted(() => {
  fetchDepartments();
  fetchData();
});
</script>

<template>
  <div class="material-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">应急物资台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="所属部门">
          <el-select
            v-model="searchForm.deptId"
            placeholder="请选择部门"
            clearable
            style="width: 180px"
          >
            <el-option label="请选择部门" value="-1" />
            <el-option
              v-for="dept in departments"
              :key="dept.value"
              :label="dept.name"
              :value="dept.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维护状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option label="正常" value="正常" />
            <el-option label="异常" value="异常" />
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
            v-model="searchForm.startTime"
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
          <el-button type="primary" @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入
          </el-button>
          <el-button type="primary" @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button @click="handleBatchMaintenRecord">
            <el-icon><Document /></el-icon>
            维护记录
          </el-button>
          <el-button type="danger" @click="handleBatchDelete">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        :row-class-name="getRowClassName"
        style="width: 100%"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="cj" label="车间" width="100" />
        <el-table-column prop="gd" label="工段" width="100" />
        <el-table-column prop="field" label="名称" width="120" />
        <el-table-column prop="type" label="物资类型" width="120" />
        <el-table-column prop="field1" label="规格型号" width="100" />
        <el-table-column prop="field2" label="数量" width="70" align="center" />
        <el-table-column prop="field3" label="存放位置" min-width="150" />
        <el-table-column prop="sysUser" label="责任人" width="90" />
        <el-table-column label="维护日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field4) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cycle"
          label="维护周期"
          width="90"
          align="center"
        />
        <el-table-column prop="next" label="下次维护日期" width="130" />
        <el-table-column prop="field6" label="生产厂家" width="160" />
        <el-table-column prop="addUser" label="创建人" width="90" />
        <el-table-column label="创建日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
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
              @click="handleMaintenRecord(row)"
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
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="fetchData"
        @size-change="fetchData"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.material-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

:deep(.row-warning) {
  color: #f56c6c;
}
</style>
