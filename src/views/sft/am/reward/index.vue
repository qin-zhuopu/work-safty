<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftAmReward"
});

interface UserInfo {
  id: number;
  ushow: string;
}

interface RewardItem {
  id: number;
  name: string;
  pers: string;
  content: string;
  way: string;
  opinion: string;
  user: UserInfo;
  createDate: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: RewardItem[];
    totalElements: number;
  };
}

const tableData = ref<RewardItem[]>([]);
const loading = ref(false);
const total = ref(0);

// 查询表单
const queryForm = ref({
  name: "",
  pers: ""
});

const pagination = ref({
  page: 1,
  size: 10
});

const userId = ref("112");

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page),
      size: String(pagination.value.size),
      name: queryForm.value.name,
      pers: queryForm.value.pers
    });

    const response = await fetch(`/sft/am/reward/list/-1?${params.toString()}`);
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
  pagination.value.page = 1;
  fetchData();
}

function handleReset() {
  queryForm.value = {
    name: "",
    pers: ""
  };
  pagination.value.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: RewardItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: RewardItem) {
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

function handleExport() {
  const params = new URLSearchParams({
    name: queryForm.value.name,
    pers: queryForm.value.pers
  });
  ElMessage.info(`导出: /sft/am/reward/export/-1?${params.toString()}`);
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

function canEdit(row: RewardItem): boolean {
  return row.user?.id === Number(userId.value) || userId.value === "2";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="reward-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">事故奖惩</span>
        </div>
      </template>

      <!-- 查询表单 -->
      <el-form :inline="true" :model="queryForm" class="search-form">
        <el-form-item label="事故名称">
          <el-input
            v-model="queryForm.name"
            placeholder="请输入事故名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="奖惩人员">
          <el-input
            v-model="queryForm.pers"
            placeholder="请输入奖惩人员"
            clearable
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
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="事故名称" min-width="150" />
        <el-table-column prop="pers" label="奖惩人员" width="120" />
        <el-table-column prop="content" label="奖惩内容" min-width="150" />
        <el-table-column prop="way" label="奖惩方式" width="120" />
        <el-table-column prop="opinion" label="奖惩意见" width="120" />
        <el-table-column prop="user.ushow" label="填写人" width="120" />
        <el-table-column label="填写时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              v-if="canEdit(row)"
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="canEdit(row)"
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
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="total"
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
.reward-container {
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
