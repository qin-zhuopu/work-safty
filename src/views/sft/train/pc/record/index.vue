<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftTrainPcRecord"
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

function formatDate(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss") : "";
}

function getAccuracyType(
  accuracy: number
): "success" | "warning" | "danger" | "info" {
  if (accuracy >= 90) return "success";
  if (accuracy >= 70) return "warning";
  return "danger";
}

const totalErrorCount = computed(() => {
  return tableData.value.reduce((sum, item) => sum + item.error, 0);
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="record-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">模拟答题记录</span>
        </div>
      </template>

      <!-- 错题总计 -->
      <div class="error-summary">
        <span class="label">当前错题总计：</span>
        <span class="count">{{ totalErrorCount }}</span>
      </div>

      <!-- 答题记录表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
      >
        <el-table-column prop="ptName" label="题库名称" min-width="200" />
        <el-table-column
          prop="correct"
          label="正确题目数量"
          width="120"
          align="center"
        />
        <el-table-column
          prop="error"
          label="错误题目数量"
          width="120"
          align="center"
        />
        <el-table-column label="正确率" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getAccuracyType(row.accuracy)">
              {{ row.accuracy }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交时间"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
      </el-table>

      <el-empty
        v-if="!loading && tableData.length === 0"
        description="暂无答题记录"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.record-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.error-summary {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--el-color-danger-light-9);
  border-radius: 4px;

  .label {
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .count {
    margin-left: 8px;
    font-size: 20px;
    font-weight: bold;
    color: var(--el-color-danger);
  }
}
</style>
