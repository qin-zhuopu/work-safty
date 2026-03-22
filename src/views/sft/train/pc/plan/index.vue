<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftTrainPcPlan"
});

interface PlanItem {
  id: number;
  name: string;
  startTime: number;
  endTime: number;
  planType: string;
  status: string;
  creater: string;
  sysDeptName: string;
  field3: string;
  exam: number;
  learn: number;
  score: number;
}

interface ApiResponse {
  success: boolean;
  t: PlanItem[];
}

const allPlans = ref<PlanItem[]>([]);
const filteredPlans = ref<PlanItem[]>([]);
const loading = ref(false);
const searchText = ref("");

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/pc/list.json");
    const data: ApiResponse = await response.json();
    if (data.success) {
      allPlans.value = data.t;
      filteredPlans.value = data.t;
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

function getPlanTypeColor(planType: string): string {
  const colorMap: Record<string, string> = {
    双重预防专项培训: "primary",
    两重点一重大专项培训: "success",
    "3月安全月警示教育视频": "warning",
    "3月警示教育": "danger",
    "危险化学品企业特殊作业管理GB-30871": "info",
    安全用电教育培训: "primary",
    职业健康管理制度和操作规程培训: "success",
    "2026年开工第一课": "warning"
  };
  return colorMap[planType] || "default";
}

function getStatusClass(status: string): string {
  return status === "已完成" ? "text-green-600" : "text-orange-600";
}

function handleSearch() {
  if (!searchText.value.trim()) {
    filteredPlans.value = allPlans.value;
  } else {
    filteredPlans.value = allPlans.value.filter(item =>
      item.name.includes(searchText.value)
    );
  }
}

function handleClear() {
  searchText.value = "";
  filteredPlans.value = allPlans.value;
}

function handleClick(item: PlanItem) {
  // 将选中的培训计划信息保存到本地存储
  localStorage.setItem("planSeInfo", JSON.stringify(item));
  ElMessage.info(`已选择: ${item.name}`);
  // 跳转到详情页（如果有详情页的话）
  // router.push('/sft/train/pc/plan/detail/index');
}

// 监听搜索框输入，使用防抖
let searchTimer: ReturnType<typeof setTimeout> | null = null;
function onSearchInput(value: string) {
  if (searchTimer) {
    clearTimeout(searchTimer);
  }
  searchTimer = setTimeout(() => {
    handleSearch();
  }, 500);
}

watch(searchText, () => {
  onSearchInput(searchText.value);
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="plan-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">培训计划</span>
        </div>
      </template>

      <!-- 搜索框 -->
      <div class="search-box">
        <el-input
          v-model="searchText"
          placeholder="请输入培训计划名称搜索"
          clearable
          @clear="handleClear"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- 计划列表 -->
      <div v-loading="loading" class="plan-list">
        <div
          v-for="item in filteredPlans"
          :key="item.id"
          class="plan-item"
          @click="handleClick(item)"
        >
          <p class="plan-name">{{ item.name }}</p>
          <div class="plan-info">
            <span>
              <i class="label">培训时间：</i>
              <i class="value"
                >{{ formatDate(item.startTime) }} -
                {{ formatDate(item.endTime) }}</i
              >
            </span>
            <span>
              <i class="label">计划类型：</i>
              <el-tag :type="getPlanTypeColor(item.planType)" size="small">
                {{ item.planType }}
              </el-tag>
            </span>
            <span>
              <i class="label">培训进度：</i>
              <i class="value" :class="getStatusClass(item.status)">{{
                item.status
              }}</i>
            </span>
          </div>
        </div>

        <el-empty
          v-if="!loading && filteredPlans.length === 0"
          description="暂无数据"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.plan-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-box {
  max-width: 400px;
  margin-bottom: 16px;
}

.plan-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-item {
  padding: 16px;
  cursor: pointer;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    border-color: var(--el-color-primary);
    box-shadow: 0 2px 12px rgb(0 0 0 / 10%);
  }

  .plan-name {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  .plan-info {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    font-size: 14px;
    color: var(--el-text-color-regular);

    span {
      display: flex;
      gap: 4px;
      align-items: center;

      .label {
        color: var(--el-text-color-secondary);
      }

      .value {
        color: var(--el-text-color-primary);
      }
    }
  }
}
</style>
