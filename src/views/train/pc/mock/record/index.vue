<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "TrainPcMockRecord"
});

interface RecordItem {
  id: number;
  correct: number;
  error: number;
  accuracy: number;
  createTime: number;
  ptName: string;
}

interface ApiResponse {
  success: boolean;
  t: RecordItem[];
}

const tableData = ref<RecordItem[]>([]);
const loading = ref(false);

// 计算当前错题总计
const errCount = computed(() => {
  return tableData.value.reduce((sum, item) => sum + item.error, 0);
});

// 格式化日期
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/pc/ibank/test/list.json");
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t;
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

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="train-pc-mock-record-container">
    <el-card shadow="never" class="mb-4">
      <div class="error-count">
        <span class="label">当前错题总计：</span>
        <span class="value">{{ errCount }}</span>
      </div>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">模拟答题记录</span>
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
        <el-table-column
          prop="correct"
          label="正确题目数量"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="error"
          label="错误题目数量"
          min-width="120"
          align="center"
        >
          <template #default="{ row }">
            <span :class="row.error > 0 ? 'text-red-500' : ''">
              {{ row.error }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="accuracy"
          label="正确率"
          min-width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              :type="
                row.accuracy >= 80
                  ? 'success'
                  : row.accuracy >= 60
                    ? 'warning'
                    : 'danger'
              "
            >
              {{ row.accuracy }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          min-width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="ptName" label="题库名称" min-width="200" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.train-pc-mock-record-container {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.error-count {
  display: flex;
  gap: 8px;
  align-items: center;

  .label {
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .value {
    font-size: 18px;
    font-weight: bold;
    color: var(--el-color-danger);
  }
}

.card-header {
  display: flex;
  align-items: center;
}
</style>
