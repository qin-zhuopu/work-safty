<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftTrainPcRecordLearn"
});

interface LearnRecord {
  id: number;
  name: string;
  title: string;
  create_time: number;
  timeStr: string;
  count: number;
  learnTimeValue: number;
  setTimeValue: number;
  time: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    list1: LearnRecord[];
    zongTime: number;
    zongTimeStr: string;
  };
}

const tableData = ref<LearnRecord[]>([]);
const totalLearnTime = ref("");
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/pc/edu/my/record");
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.list1;
      totalLearnTime.value = data.t.zongTimeStr;
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
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss") : "";
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

      <div v-loading="loading" class="table-wrapper">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column prop="name" label="学习人" width="120" />
          <el-table-column prop="title" label="标题" min-width="200" />
          <el-table-column label="创建时间" width="180">
            <template #default="{ row }">
              {{ formatDate(row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="timeStr" label="学习时长" width="120" />
          <el-table-column prop="count" label="学习次数" width="100" />
        </el-table>

        <div v-if="totalLearnTime" class="total-time">
          <el-tag type="info" size="large">
            总学习时长：{{ totalLearnTime }}
          </el-tag>
        </div>
      </div>
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

.table-wrapper {
  position: relative;
}

.total-time {
  margin-top: 16px;
  text-align: right;
}
</style>
