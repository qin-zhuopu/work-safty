<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";
import type { TableColumnCtx } from "element-plus";

defineOptions({
  name: "SftEmerresourWm"
});

interface WmItem {
  id: number;
  field: string;
  field1: string;
  cycle: string;
  startTime: number;
  endTime: number;
  perNum: number;
  status: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: WmItem[];
    totalElements: number;
  };
}

const tableData = ref<WmItem[]>([]);
const loading = ref(false);
const searchText = ref("");

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/emerresour/wm/list.json");
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

function formatDate(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

function handleSearch() {
  fetchData();
}

function handleClear() {
  searchText.value = "";
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加排班");
}

function handleEdit(row: WmItem) {
  ElMessage.info(`编辑: ${row.field}`);
}

function handleDelete(row: WmItem) {
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

function handleGenerate(row: WmItem) {
  ElMessageBox.confirm("确认生成值班？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("生成完毕！");
      fetchData();
    })
    .catch(() => {});
}

function handleDelWmp(row: WmItem) {
  ElMessageBox.confirm(
    "删除当天以后未值班的记录，且不可恢复，确认删除？",
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      ElMessage.success("删除成功！");
      fetchData();
    })
    .catch(() => {});
}

function handleWmp(row: WmItem) {
  ElMessage.info(`值班人员: ${row.field}`);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="wm-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">排班管理</span>
        </div>
      </template>

      <!-- 搜索和操作区域 -->
      <div class="search-box">
        <el-form :inline="true">
          <el-form-item label="值班名称">
            <el-input
              v-model="searchText"
              placeholder="请输入值班名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              查询
            </el-button>
            <el-button @click="handleClear">
              <el-icon><RefreshLeft /></el-icon>
              重置
            </el-button>
            <el-button type="primary" @click="handleAdd">
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
        <el-table-column prop="field" label="值班名称" min-width="120">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">
              {{ row.field }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="field1" label="值班内容" min-width="120" />
        <el-table-column prop="cycle" label="值班周期" min-width="100" />
        <el-table-column label="开始日期" min-width="120">
          <template #default="{ row }">
            {{ formatDate(row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column label="结束日期" min-width="120">
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="perNum"
          label="值班人数"
          width="100"
          align="center"
        />
        <el-table-column label="操作" width="240" fixed="right">
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
              v-if="row.status === 1"
              link
              type="success"
              size="small"
              @click="handleGenerate(row)"
            >
              生成值班
            </el-button>
            <el-button
              v-if="row.status === 2"
              link
              type="danger"
              size="small"
              @click="handleDelWmp(row)"
            >
              删除值班
            </el-button>
            <el-button link type="primary" size="small" @click="handleWmp(row)">
              值班人员
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.wm-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-box {
  margin-bottom: 16px;
}
</style>
