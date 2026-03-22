<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftContPerHmd"
});

interface Contractor {
  field: string;
}

interface BlacklistItem {
  id: number;
  field: string;
  field1: string;
  field10: string;
  field10Date: number;
  cm?: Contractor;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: BlacklistItem[];
    totalElements: number;
  };
}

const tableData = ref<BlacklistItem[]>([]);
const loading = ref(false);
const searchForm = ref({
  field: "",
  field1: "",
  field2: ""
});

const formatDate = (timestamp: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchForm.value.field) params.append("field", searchForm.value.field);
    if (searchForm.value.field1)
      params.append("field1", searchForm.value.field1);
    if (searchForm.value.field2)
      params.append("field2", searchForm.value.field2);

    const response = await fetch(
      `/sft/cont/per/hmd/list.json?${params.toString()}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
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
  fetchData();
}

function handleReset() {
  searchForm.value = {
    field: "",
    field1: "",
    field2: ""
  };
  fetchData();
}

function handleExport() {
  const params = new URLSearchParams();
  if (searchForm.value.field) params.append("field", searchForm.value.field);
  if (searchForm.value.field1) params.append("field1", searchForm.value.field1);
  if (searchForm.value.field2) params.append("field2", searchForm.value.field2);

  const url = `/sft/cont/per/hmd/export?${params.toString()}`;
  window.open(url, "_blank");
  ElMessage.success("正在导出...");
}

async function handleRemove(row: BlacklistItem) {
  try {
    await ElMessageBox.confirm("确认移出该人员？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const response = await fetch(`/sft/cont/per/remove/${row.id}`);
    const data = await response.json();

    if (data.success) {
      ElMessage.success("移出成功");
      fetchData();
    } else {
      ElMessage.error(data.message || "移出失败");
    }
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("操作失败");
      console.error(error);
    }
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="hmd-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商人员黑名单</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="姓名">
            <el-input
              v-model="searchForm.field"
              placeholder="请输入姓名"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input
              v-model="searchForm.field1"
              placeholder="请输入身份证号"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="承包商名称">
            <el-input
              v-model="searchForm.field2"
              placeholder="请输入承包商名称"
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
            <el-button type="success" @click="handleExport">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="姓名" min-width="120" />
        <el-table-column prop="field1" label="身份证号" min-width="180" />
        <el-table-column label="所属承包商" min-width="200">
          <template #default="{ row }">
            {{ row.cm?.field || "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field10"
          label="进入黑名单原因"
          min-width="300"
          show-overflow-tooltip
        />
        <el-table-column label="进入黑名单时间" width="140" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field10Date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="handleRemove(row)">
              移出
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.hmd-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}
</style>
