<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftRiskControlStatistics"
});

interface TaskExecutionItem {
  id: number;
  type: string;
  planCount: number;
  completed: number;
  overdue: number;
  incomplete: number;
  rate: string;
}

interface OverdueTaskItem {
  id: number;
  unitName: string;
  level: string;
  dept: string;
  category: string;
  measure: string;
  cycle: string;
  startTime: string;
  endTime: string;
  inspector: string;
}

interface ReportData {
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
}

interface ApiResponse {
  success: boolean;
  t: ReportData;
}

// 默认日期范围：当前月
const getDefaultDateRange = () => {
  const now = dayjs();
  return {
    startTime: now.startOf("month").format("YYYY-MM-DD"),
    endTime: now.endOf("month").format("YYYY-MM-DD")
  };
};

const formData = ref({
  startTime: getDefaultDateRange().startTime,
  endTime: getDefaultDateRange().endTime
});

const loading = ref(false);
const reportData = ref<ReportData | null>(null);

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      startTime: formData.value.startTime,
      endTime: formData.value.endTime
    });
    const response = await fetch(`/sft/risk/control/statistics.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      reportData.value = data.t;
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
  const defaultRange = getDefaultDateRange();
  formData.value.startTime = defaultRange.startTime;
  formData.value.endTime = defaultRange.endTime;
  fetchData();
}

function handleExport() {
  const params = new URLSearchParams({
    startTime: formData.value.startTime,
    endTime: formData.value.endTime
  });
  window.open(`/sft/risk/control/statistics/export?${params}`);
}

function getRateType(rate: string) {
  const numRate = parseFloat(rate);
  if (numRate >= 80) return "success";
  if (numRate >= 60) return "warning";
  return "danger";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="statistics-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患排查及治理情况报告</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="日期">
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            placeholder="开始时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">至</span>
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            placeholder="结束时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            检索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><RefreshLeft /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <el-divider />

      <!-- 报告内容 -->
      <div v-loading="loading" class="report-content">
        <template v-if="reportData">
          <!-- 报告标题 -->
          <div class="report-header">
            <h2 class="report-title">隐患排查及治理情况报告</h2>
            <p class="report-date-range">
              <span>数据范围：</span>
              <span>{{ reportData.dateRange }}</span>
            </p>
          </div>

          <!-- 摘要 -->
          <p class="report-summary">{{ reportData.summary }}</p>

          <el-row :gutter="20">
            <!-- 排查任务执行情况 -->
            <el-col :span="14">
              <div class="report-item">
                <div class="report-item-title">排查任务执行情况</div>
                <p class="report-item-summary">
                  {{ reportData.taskExecution.summary }}
                </p>
                <el-table
                  :data="reportData.taskExecution.list"
                  border
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    type="index"
                    label="序号"
                    width="60"
                    align="center"
                  />
                  <el-table-column
                    prop="type"
                    label="排查类型"
                    min-width="120"
                  />
                  <el-table-column
                    prop="planCount"
                    label="计划任务数"
                    width="100"
                    align="center"
                  />
                  <el-table-column
                    prop="completed"
                    label="已完成"
                    width="80"
                    align="center"
                  />
                  <el-table-column
                    prop="overdue"
                    label="已逾期"
                    width="80"
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
                    width="80"
                    align="center"
                  />
                  <el-table-column
                    prop="rate"
                    label="执行率"
                    width="100"
                    align="center"
                  >
                    <template #default="{ row }">
                      <el-tag :type="getRateType(row.rate)">
                        {{ row.rate }}
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>

            <!-- 逾期未执行任务情况 -->
            <el-col :span="10">
              <div class="report-item">
                <div class="report-item-title">
                  逾期未执行任务情况
                  <el-button
                    type="primary"
                    size="small"
                    style="
                      float: none;
                      display: inline-block;
                      margin-left: 10px;
                    "
                    @click="handleExport"
                  >
                    <el-icon><Download /></el-icon>
                    导出
                  </el-button>
                </div>
                <p class="report-item-summary">
                  {{ reportData.overdueTask.summary }}
                </p>
                <el-table
                  :data="reportData.overdueTask.list"
                  border
                  stripe
                  style="width: 100%"
                  max-height="400"
                >
                  <el-table-column
                    type="index"
                    label="序号"
                    width="60"
                    align="center"
                  />
                  <el-table-column
                    prop="unitName"
                    label="风险分析单元名称"
                    min-width="150"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="level"
                    label="管控层级"
                    width="90"
                    align="center"
                  />
                  <el-table-column
                    prop="dept"
                    label="责任部门"
                    width="100"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="category"
                    label="管控措施分类"
                    width="110"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="measure"
                    label="管控措施"
                    min-width="120"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    prop="cycle"
                    label="排查周期"
                    width="90"
                    align="center"
                  />
                  <el-table-column
                    prop="startTime"
                    label="开始时间"
                    width="100"
                    align="center"
                  />
                  <el-table-column
                    prop="endTime"
                    label="结束时间"
                    width="100"
                    align="center"
                  />
                  <el-table-column
                    prop="inspector"
                    label="排查人员"
                    width="90"
                    align="center"
                  />
                </el-table>
              </div>
            </el-col>
          </el-row>
        </template>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.statistics-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.report-content {
  min-height: 400px;
}

.report-header {
  margin-bottom: 20px;
  text-align: center;

  .report-title {
    margin: 0 0 10px;
    font-size: 20px;
    font-weight: bold;
  }

  .report-date-range {
    margin: 0;
    color: #606266;
  }
}

.report-summary {
  padding: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.8;
  color: #606266;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.report-item {
  padding: 16px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .report-item-title {
    padding-left: 10px;
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    border-left: 3px solid #409eff;
  }

  .report-item-summary {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1.6;
    color: #606266;
  }
}
</style>
