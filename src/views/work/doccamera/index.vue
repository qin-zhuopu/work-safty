<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "WorkDoccamera"
});

interface CameraItem {
  id: number;
  name: string;
  seno: string;
  status: number;
}

interface PageData {
  content: CameraItem[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<CameraItem[]>([]);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/work/doccamera/list.json");
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

function handlePlay(row: CameraItem) {
  ElMessage.info(`播放: ${row.name}`);
}

function handlePlayback(row: CameraItem) {
  ElMessage.info(`回放: ${row.name}`);
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
          <span class="text-lg font-medium">文档摄像头</span>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="设备名称" min-width="150" />
        <el-table-column prop="seno" label="序列号" min-width="200" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? "在线" : "离线" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handlePlay(row)">
              播放
            </el-button>
            <el-button type="success" size="small" @click="handlePlayback(row)">
              回放
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
</style>
