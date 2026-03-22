<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "TrainPcRecordLearn"
});

interface LearnRecordItem {
  name: string;
  title: string;
  create_time: number;
  timeStr: string;
  count: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    list1: LearnRecordItem[];
  };
}

const tableData = ref<LearnRecordItem[]>([]);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/pc/edu/my/record");
    const data: ApiResponse = await response.json();
    if (data.success && data.t?.list1) {
      tableData.value = data.t.list1;
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
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="learn-record-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">学习记录列表</span>
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
        <el-table-column prop="name" label="学习人" min-width="120" />
        <el-table-column prop="title" label="标题" min-width="300" />
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="timeStr"
          label="学习时长"
          width="120"
          align="center"
        />
        <el-table-column
          prop="count"
          label="学习次数"
          width="100"
          align="center"
        />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.learn-record-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}
</style>
