<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftWorkDoccamera"
});

interface CameraItem {
  id: number;
  name: string;
  seno: string;
  status: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: CameraItem[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

const tableData = ref<CameraItem[]>([]);
const loading = ref(false);
const total = ref(0);
const totalPages = ref(0);
const pageSize = 10;
const currentPage = ref(0);

async function fetchData(page = 0) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    const response = await fetch(`/sft/work/doccamera/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
      totalPages.value = data.t.totalPages;
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

function handlePlay(row: CameraItem) {
  ElMessage.info(`播放摄像头: ${row.name}`);
}

function handlePlayback(row: CameraItem) {
  ElMessage.info(`回放摄像头: ${row.name}`);
}

function getStatusType(status: number) {
  return status === 1 ? "success" : "danger";
}

function getStatusText(status: number) {
  return status === 1 ? "在线" : "离线";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="doccamera-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">作业票证视频监控</span>
        </div>
      </template>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="id" label="ID" width="100" align="center" />
        <el-table-column
          prop="name"
          label="设备名称"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="seno"
          label="序列号"
          min-width="280"
          show-overflow-tooltip
        />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handlePlay(row)"
            >
              播放
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handlePlayback(row)"
            >
              回放
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
          layout="total, prev, pager, next"
          @current-change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.doccamera-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
