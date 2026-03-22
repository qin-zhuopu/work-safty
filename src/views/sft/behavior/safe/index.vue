<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftBehaviorSafe"
});

interface User {
  id: string;
  uname: string;
  ushow: string;
}

interface Dept {
  id: number;
  name: string;
  value: number;
  children?: Dept[];
}

interface SafeItem {
  id: string;
  addUser?: User;
  field2?: User;
  field?: Dept;
  field1?: number;
  field5?: User;
  field6?: number;
  field8?: number;
  field11?: number;
  status?: number;
}

interface PageData {
  content: SafeItem[];
  totalElements: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

interface DeptResponse {
  success: boolean;
  t: Dept[];
}

const tableData = ref<SafeItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const deptOptions = ref<Dept[]>([]);
const selectedDeptIds = ref<number[]>([]);

const searchForm = ref({
  addUserName: "",
  field2Name: "",
  field5Name: "",
  status: "-1",
  startTime: "",
  endTime: "",
  startTime1: "",
  endTime1: "",
  startTime2: "",
  endTime2: "",
  deptId: ""
});

const selectedRows = ref<SafeItem[]>([]);

const formatDate = (timestamp?: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getStatusText = (status?: number) => {
  if (!status) return "";
  if (status < 3) return "未整改";
  if (status === 3) return "已整改";
  if (status === 5) return "已验收";
  return "";
};

const getStatusType = (status?: number) => {
  if (!status) return "info";
  if (status < 3) return "danger";
  if (status === 3) return "warning";
  if (status === 5) return "success";
  return "info";
};

async function fetchDepts() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data: DeptResponse = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("Failed to fetch depts:", error);
  }
}

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      size: pageSize.value.toString()
    });

    if (searchForm.value.addUserName) {
      params.append("addUserName", searchForm.value.addUserName);
    }
    if (searchForm.value.field2Name) {
      params.append("field2Name", searchForm.value.field2Name);
    }
    if (searchForm.value.field5Name) {
      params.append("field5Name", searchForm.value.field5Name);
    }
    if (searchForm.value.status !== "-1") {
      params.append("status", searchForm.value.status);
    }
    if (searchForm.value.startTime) {
      params.append("startTime", searchForm.value.startTime);
    }
    if (searchForm.value.endTime) {
      params.append("endTime", searchForm.value.endTime);
    }
    if (searchForm.value.startTime1) {
      params.append("startTime1", searchForm.value.startTime1);
    }
    if (searchForm.value.endTime1) {
      params.append("endTime1", searchForm.value.endTime1);
    }
    if (searchForm.value.startTime2) {
      params.append("startTime2", searchForm.value.startTime2);
    }
    if (searchForm.value.endTime2) {
      params.append("endTime2", searchForm.value.endTime2);
    }
    if (selectedDeptIds.value.length > 0) {
      params.append("fieldId", selectedDeptIds.value[0].toString());
    } else {
      params.append("fieldId", "-1");
    }

    const response = await fetch(`/sft/behavior/safe/list.json?${params}`);
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
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  searchForm.value = {
    addUserName: "",
    field2Name: "",
    field5Name: "",
    status: "-1",
    startTime: "",
    endTime: "",
    startTime1: "",
    endTime1: "",
    startTime2: "",
    endTime2: "",
    deptId: ""
  };
  selectedDeptIds.value = [];
  currentPage.value = 1;
  fetchData();
}

function handleSelectionChange(selection: SafeItem[]) {
  selectedRows.value = selection;
}

async function handleDelete(row: SafeItem) {
  try {
    await ElMessageBox.confirm("确认删除？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
    const response = await fetch(`/sft/behavior/safe/del/${row.id}`, {
      method: "GET"
    });
    const result = await response.json();
    if (result.success) {
      ElMessage.success("删除成功");
      fetchData();
    } else {
      ElMessage.error(result.message || "删除失败");
    }
  } catch {
    // User cancelled
  }
}

async function handleBatchDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning("请选择要删除的记录");
    return;
  }
  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${selectedRows.value.length} 条记录？`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    );
    const ids = selectedRows.value.map(row => row.id).join(",");
    const response = await fetch(`/sft/behavior/safe/delAll?ids=${ids}`, {
      method: "GET"
    });
    const result = await response.json();
    if (result.success) {
      ElMessage.success("删除成功");
      fetchData();
    } else {
      ElMessage.error(result.message || "删除失败");
    }
  } catch {
    // User cancelled
  }
}

function handleExport() {
  const params = new URLSearchParams();

  if (selectedRows.value.length > 0) {
    params.append("ids", selectedRows.value.map(row => row.id).join(","));
  }
  if (searchForm.value.addUserName) {
    params.append("addUserName", searchForm.value.addUserName);
  }
  if (searchForm.value.field2Name) {
    params.append("field2Name", searchForm.value.field2Name);
  }
  if (searchForm.value.field5Name) {
    params.append("field5Name", searchForm.value.field5Name);
  }
  if (searchForm.value.status !== "-1") {
    params.append("status", searchForm.value.status);
  }
  if (searchForm.value.startTime) {
    params.append("startTime", searchForm.value.startTime);
  }
  if (searchForm.value.endTime) {
    params.append("endTime", searchForm.value.endTime);
  }
  if (searchForm.value.startTime1) {
    params.append("startTime1", searchForm.value.startTime1);
  }
  if (searchForm.value.endTime1) {
    params.append("endTime1", searchForm.value.endTime1);
  }
  if (searchForm.value.startTime2) {
    params.append("startTime2", searchForm.value.startTime2);
  }
  if (searchForm.value.endTime2) {
    params.append("endTime2", searchForm.value.endTime2);
  }
  if (selectedDeptIds.value.length > 0) {
    params.append("fieldId", selectedDeptIds.value[0].toString());
  } else {
    params.append("fieldId", "-1");
  }

  window.open(`/sft/behavior/safe/export?${params}`);
}

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

onMounted(() => {
  fetchDepts();
  fetchData();
});
</script>

<template>
  <div class="behavior-safe-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">行为安全观察与沟通管理</span>
        </div>
      </template>

      <!-- Search Form -->
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="观察人">
          <el-input
            v-model="searchForm.addUserName"
            placeholder="请输入观察人"
            clearable
            style="width: 160px"
          />
        </el-form-item>

        <el-form-item label="被观察人">
          <el-input
            v-model="searchForm.field2Name"
            placeholder="请输入被观察人"
            clearable
            style="width: 160px"
          />
        </el-form-item>

        <el-form-item label="整改状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option label="未整改" value="1" />
            <el-option label="已整改" value="3" />
            <el-option label="已验收" value="5" />
          </el-select>
        </el-form-item>

        <el-form-item label="观察日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="被观察部门及区域">
          <el-cascader
            v-model="selectedDeptIds"
            :options="deptOptions"
            :props="{
              value: 'value',
              label: 'name',
              children: 'children',
              checkStrictly: true
            }"
            placeholder="请选择部门"
            clearable
            filterable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="整改责任人">
          <el-input
            v-model="searchForm.field5Name"
            placeholder="请输入整改责任人"
            clearable
            style="width: 160px"
          />
        </el-form-item>

        <el-form-item label="整改期限">
          <el-date-picker
            v-model="searchForm.startTime1"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">-</span>
          <el-date-picker
            v-model="searchForm.endTime1"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="实际整改时间">
          <el-date-picker
            v-model="searchForm.startTime2"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">-</span>
          <el-date-picker
            v-model="searchForm.endTime2"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><i class="ep-search" /></el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><i class="ep-refresh" /></el-icon>
            重置
          </el-button>
          <el-button type="danger" @click="handleBatchDelete">
            <el-icon><i class="ep-delete" /></el-icon>
            删除
          </el-button>
          <el-button @click="handleExport">
            <el-icon><i class="ep-download" /></el-icon>
            导出
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
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="addUser.ushow" label="观察人" width="100" />
        <el-table-column prop="field2.ushow" label="被观察人" width="100" />
        <el-table-column
          prop="field.name"
          label="被观察部门及区域"
          min-width="150"
        />
        <el-table-column label="观察日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field1) }}
          </template>
        </el-table-column>
        <el-table-column prop="field5.ushow" label="整改责任人" width="100" />
        <el-table-column label="整改期限" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field6) }}
          </template>
        </el-table-column>
        <el-table-column label="实际整改时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field8) }}
          </template>
        </el-table-column>
        <el-table-column label="验收时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field11) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="danger"
              size="small"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button type="primary" size="small" link> 详情 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.behavior-safe-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .el-form-item {
    margin-bottom: 12px;
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.mx-2 {
  margin: 0 8px;
}
</style>
