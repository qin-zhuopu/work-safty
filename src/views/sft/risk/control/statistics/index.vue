<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftRiskControlStatistics"
});

// 排查任务执行情况数据接口
interface TaskExecutionItem {
  id: number;
  type: string;
  planCount: number;
  completed: number;
  overdue: number;
  incomplete: number;
  rate: string;
}

// 逾期未执行任务数据接口
interface OverdueTaskItem {
  id: number;
  unitName: string;
  controlLevel: string;
  responsibleDept: string;
  measureCategory: string;
  controlMeasure: string;
  checkCycle: string;
  startTime: string;
  endTime: string;
  checkPerson: string;
}

// API 响应接口
interface ApiResponse {
  success: boolean;
  t?: {
    summary: string;
    dateRange: string;
    taskExecution: {
      summary: string;
      list: TaskExecutionItem[];
    };
    overdueTask: {
      summary: string;
      list: OverdueTaskItem[];
    };
  };
}

const loading = ref(false);
const startTime = ref(dayjs().startOf("month").format("YYYY-MM-DD"));
const endTime = ref(dayjs().endOf("month").format("YYYY-MM-DD"));
const summary = ref("");
const dateRangeText = ref("");
const taskExecutionData = ref<TaskExecutionItem[]>([]);
const overdueTaskData = ref<OverdueTaskItem[]>([]);
const overdueSummary = ref("");
const taskExecutionSummary = ref("");

// 计算日期范围显示
const dateRangeDisplay = computed(
  () =>
    `${dayjs(startTime.value).format("YYYY年MM月DD日")}至${dayjs(endTime.value).format("YYYY年MM月DD日")}`
);

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/risk/control/statistics.json?startTime=${startTime.value}&endTime=${endTime.value}`
    );
    const data: ApiResponse = await response.json();
    if (data.success && data.t) {
      summary.value = data.t.summary;
      dateRangeText.value = data.t.dateRange;
      taskExecutionData.value = data.t.taskExecution.list;
      overdueTaskData.value = data.t.overdueTask.list;
      overdueSummary.value = data.t.overdueTask.summary;
      taskExecutionSummary.value = data.t.taskExecution.summary;
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
  startTime.value = dayjs().startOf("month").format("YYYY-MM-DD");
  endTime.value = dayjs().endOf("month").format("YYYY-MM-DD");
  fetchData();
}

function handleExport() {
  const params = `?startTime=${startTime.value}&endTime=${endTime.value}`;
  window.open(`/sft/risk/control/statistics/export${params}`, "_blank");
  ElMessage.success("导出请求已发送");
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="risk-control-statistics">
    <!-- 查询表单 -->
    <el-card shadow="never" class="search-card">
      <el-form :inline="true">
        <el-form-item label="日期">
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="开始时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="date-separator">至</span>
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="结束时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="'Search'" @click="handleSearch">
            检索
          </el-button>
          <el-button :icon="'Refresh'" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 报告内容 -->
    <div v-loading="loading" class="report-container">
      <!-- 报告标题 -->
      <div class="report-header">
        <h2 class="report-title">隐患排查及治理情况报告</h2>
        <p class="report-range">
          <span>数据范围：</span>
          <span>{{ dateRangeText }}</span>
        </p>
      </div>

      <!-- 概要信息 -->
      <div class="report-summary">
        {{ summary }}
      </div>

      <!-- 排查任务执行情况 -->
      <div class="report-item col-7">
        <div class="report-subtitle">排查任务执行情况</div>
        <p class="report-desc">
          {{ taskExecutionSummary }}
        </p>
        <el-table
          :data="taskExecutionData"
          border
          stripe
          style="width: 100%"
          class="report-table"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column prop="type" label="排查类型" min-width="140" />
          <el-table-column
            prop="planCount"
            label="计划任务数"
            width="110"
            align="center"
          />
          <el-table-column
            prop="completed"
            label="已完成"
            width="90"
            align="center"
          />
          <el-table-column
            prop="overdue"
            label="已逾期"
            width="90"
            align="center"
          >
            <template #default="{ row }">
              <span :class="row.overdue > 0 ? 'text-red-500' : ''">
                {{ row.overdue }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="incomplete"
            label="未完成"
            width="90"
            align="center"
          />
          <el-table-column
            prop="rate"
            label="执行率"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <el-tag
                :type="
                  parseFloat(row.rate) >= 80
                    ? 'success'
                    : parseFloat(row.rate) >= 60
                      ? 'warning'
                      : 'danger'
                "
              >
                {{ row.rate }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 逾期未执行任务情况 -->
      <div class="report-item col-9">
        <div class="report-subtitle-with-action">
          <span>逾期未执行任务情况</span>
          <el-button
            type="primary"
            size="small"
            :icon="'Download'"
            @click="handleExport"
          >
            导出
          </el-button>
        </div>
        <p class="report-desc">{{ overdueSummary }}</p>
        <el-table
          :data="overdueTaskData"
          border
          stripe
          style="width: 100%"
          class="report-table"
        >
          <el-table-column
            type="index"
            label="序号"
            width="70"
            align="center"
          />
          <el-table-column
            prop="unitName"
            label="风险分析单元名称"
            min-width="180"
            show-overflow-tooltip
          />
          <el-table-column
            prop="controlLevel"
            label="管控层级"
            width="100"
            align="center"
          />
          <el-table-column
            prop="responsibleDept"
            label="责任部门"
            min-width="120"
            show-overflow-tooltip
          />
          <el-table-column
            prop="measureCategory"
            label="管控措施分类"
            width="120"
            align="center"
          />
          <el-table-column
            prop="controlMeasure"
            label="管控措施"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="checkCycle"
            label="排查周期"
            width="100"
            align="center"
          />
          <el-table-column
            prop="startTime"
            label="开始时间"
            width="110"
            align="center"
          />
          <el-table-column
            prop="endTime"
            label="结束时间"
            width="110"
            align="center"
          />
          <el-table-column
            prop="checkPerson"
            label="排查人员"
            width="100"
            align="center"
          />
        </el-table>
        <el-empty
          v-if="overdueTaskData.length === 0"
          description="暂无逾期未执行任务"
          :image-size="80"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.risk-control-statistics {
  padding: 16px;

  .search-card {
    margin-bottom: 16px;
  }

  .date-separator {
    margin: 0 8px;
    color: var(--el-text-color-regular);
  }

  .report-container {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
  }

  .report-header {
    margin-bottom: 24px;
    text-align: center;

    .report-title {
      margin: 0 0 12px;
      font-size: 22px;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }

    .report-range {
      margin: 0;
      font-size: 14px;
      color: var(--el-text-color-regular);

      span:last-child {
        font-weight: 500;
        color: var(--el-text-color-primary);
      }
    }
  }

  .report-summary {
    padding: 16px;
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--el-text-color-regular);
    background: #f5f7fa;
    border-radius: 4px;
  }

  .report-item {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .report-subtitle {
    padding-left: 12px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    border-left: 4px solid var(--el-color-primary);
  }

  .report-subtitle-with-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    span {
      padding-left: 12px;
      font-size: 16px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      border-left: 4px solid var(--el-color-primary);
    }
  }

  .report-desc {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--el-text-color-regular);
  }

  .report-table {
    margin-bottom: 16px;
  }

  .text-red-500 {
    color: #f56c6c;
  }
}
</style>
