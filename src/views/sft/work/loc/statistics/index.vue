<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

defineOptions({
  name: "SftWorkLocStatistics"
});

interface StatisticsData {
  deptCountAll: number;
  deptCountList: number[];
  deptCountStr: string;
  deptList: string[];
  field: number;
  field1: number;
  field2: number;
  field3: number;
  field4: number;
  field5: number;
  field6: number;
  field7: number;
  field8: number;
  field9: number;
  field10: number;
  field11: number;
  field12: number;
  field13: number;
  field14: number;
  field15: number;
  field16: number;
  field17: number;
  field18: number;
  field19: number;
  field20: number;
  field21: number;
  field22: number;
  field23: number;
  field24: number;
  field25: number;
  field26: number;
  field27: number;
  typeCountList: number[];
  typeCountStr: string;
  typeList: string[];
}

interface ApiResponse {
  success: boolean;
  t: StatisticsData;
}

const loading = ref(false);
const dateRange = ref<[Date, Date]>([
  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
]);

const statisticsData = ref<StatisticsData>({
  deptCountAll: 0,
  deptCountList: [],
  deptCountStr: "",
  deptList: [],
  field: 0,
  field1: 0,
  field2: 0,
  field3: 0,
  field4: 0,
  field5: 0,
  field6: 0,
  field7: 0,
  field8: 0,
  field9: 0,
  field10: 0,
  field11: 0,
  field12: 0,
  field13: 0,
  field14: 0,
  field15: 0,
  field16: 0,
  field17: 0,
  field18: 0,
  field19: 0,
  field20: 0,
  field21: 0,
  field22: 0,
  field23: 0,
  field24: 0,
  field25: 0,
  field26: 0,
  field27: 0,
  typeCountList: [],
  typeCountStr: "",
  typeList: []
});

let barDepChart: echarts.ECharts | null = null;
let barTypeChart: echarts.ECharts | null = null;
let refreshTimer: number | null = null;

const deptFields = [
  { key: "field", label: "公司领导" },
  { key: "field4", label: "办公室(党委)" },
  { key: "field8", label: "纪委办公室" },
  { key: "field12", label: "党群工作部" },
  { key: "field16", label: "人力资源部" },
  { key: "field1", label: "HSE管理部" },
  { key: "field5", label: "运营管理部" },
  { key: "field9", label: "供应链管理部" },
  { key: "field13", label: "财务管理部" },
  { key: "field17", label: "审计合规处" },
  { key: "field2", label: "技术研发处" },
  { key: "field6", label: "PVC一车间" },
  { key: "field10", label: "电解车间" },
  { key: "field14", label: "机电仪车间" },
  { key: "field18", label: "热电车间" },
  { key: "field3", label: "双氧水车间" },
  { key: "field7", label: "PVC二车间" },
  { key: "field11", label: "研发中心" },
  { key: "field15", label: "承包商" }
];

const typeFields = [
  { key: "field19", label: "检修超员" },
  { key: "field21", label: "监护人离岗" },
  { key: "field23", label: "一键报警" },
  { key: "field25", label: "滞留预警" },
  { key: "field27", label: "越界报警" },
  { key: "field20", label: "超员预警" },
  { key: "field22", label: "缺员预警" },
  { key: "field24", label: "静止预警" },
  { key: "field26", label: "人员聚集" }
];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchData() {
  loading.value = true;
  try {
    const [start, end] = dateRange.value;
    const startTime = formatDate(start);
    const endTime = formatDate(end);

    const response = await fetch(
      `/sft/work/loc/statistics/list.json?startTime=${startTime}&endTime=${endTime}`
    );
    const data: ApiResponse = await response.json();

    if (data.success) {
      statisticsData.value = data.t;
      updateCharts();
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

function getDeptChartOption(): EChartsOption {
  const deptNames = statisticsData.value.deptList || [];
  const deptCounts = statisticsData.value.deptCountList || [];

  return {
    tooltip: {
      show: true,
      trigger: "axis"
    },
    grid: {
      top: 32,
      bottom: 96,
      left: 40,
      right: 0
    },
    xAxis: {
      type: "category",
      data: deptNames,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(23, 35, 61, 0.16)"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        formatter: (value: string) => value.split("").join("\n"),
        show: true,
        margin: 10,
        fontSize: 14,
        color: "rgba(23, 35, 61, 0.64)"
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        interval: 0,
        show: true,
        margin: 10,
        fontSize: 14,
        color: "rgba(23, 35, 61, 0.64)"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(23, 35, 61, 0.16)"
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "rgba(23, 35, 61, 0.12)"
        }
      }
    },
    series: [
      {
        data: deptCounts,
        type: "bar",
        barWidth: 12,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(2, 66, 255, 0.02)"
        },
        label: {
          show: true,
          color: "#17233D",
          fontSize: 16,
          fontWeight: 900,
          position: "top"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#0A5DE1" },
            { offset: 1, color: "#00E5FF" }
          ]),
          borderRadius: [100, 100, 0, 0]
        }
      }
    ]
  };
}

function getTypeChartOption(): EChartsOption {
  const typeNames = statisticsData.value.typeList || [];
  const typeCounts = statisticsData.value.typeCountList || [];

  return {
    tooltip: {
      show: true,
      trigger: "axis"
    },
    grid: {
      top: 32,
      bottom: 96,
      left: 40,
      right: 0
    },
    xAxis: {
      type: "category",
      data: typeNames,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(23, 35, 61, 0.16)"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        formatter: (value: string) => value.split("").join("\n"),
        show: true,
        margin: 10,
        fontSize: 14,
        color: "rgba(23, 35, 61, 0.64)"
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        interval: 0,
        show: true,
        margin: 10,
        fontSize: 14,
        color: "rgba(23, 35, 61, 0.64)"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(23, 35, 61, 0.16)"
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "rgba(23, 35, 61, 0.12)"
        }
      }
    },
    series: [
      {
        data: typeCounts,
        type: "bar",
        barWidth: 12,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(2, 66, 255, 0.02)"
        },
        label: {
          show: true,
          color: "#17233D",
          fontSize: 16,
          fontWeight: 900,
          position: "top"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#7EE543" },
            { offset: 1, color: "#00E5FF" }
          ]),
          borderRadius: [100, 100, 0, 0]
        }
      }
    ]
  };
}

function initCharts() {
  const deptChartEl = document.getElementById("bar-tj-dep");
  const typeChartEl = document.getElementById("bar-tj-type");

  if (deptChartEl) {
    barDepChart = echarts.init(deptChartEl);
  }

  if (typeChartEl) {
    barTypeChart = echarts.init(typeChartEl);
  }

  updateCharts();
}

function updateCharts() {
  if (barDepChart) {
    barDepChart.setOption(getDeptChartOption());
  }

  if (barTypeChart) {
    barTypeChart.setOption(getTypeChartOption());
  }
}

function handleSearch() {
  fetchData();
}

function handleResize() {
  barDepChart?.resize();
  barTypeChart?.resize();
}

onMounted(() => {
  fetchData();
  initCharts();

  window.addEventListener("resize", handleResize);

  // 5分钟自动刷新一次
  refreshTimer = window.setInterval(
    () => {
      fetchData();
    },
    5 * 60 * 1000
  );
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);

  if (refreshTimer !== null) {
    clearInterval(refreshTimer);
  }

  barDepChart?.dispose();
  barTypeChart?.dispose();
});
</script>

<template>
  <div class="statistics-container">
    <!-- 筛选条件 -->
    <el-card shadow="never" class="mb-4">
      <div class="filter-form">
        <el-form :inline="true">
          <el-form-item label="日期">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :clearable="false"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleSearch">
              <el-icon><Search /></el-icon>
              检索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 报警总数 -->
    <div class="alarm-count-card">
      <span class="alarm-count">{{ statisticsData.deptCountAll }}</span>
      <span class="alarm-label">各车间现场人员定位报警/次</span>
    </div>

    <!-- 按属地统计 -->
    <el-card shadow="never" class="mb-4">
      <template #header>
        <div class="card-header">
          <span class="subtitle">按属地</span>
        </div>
      </template>

      <div class="dept-summary">{{ statisticsData.deptCountStr }}</div>

      <div class="dept-grid">
        <div v-for="item in deptFields" :key="item.key" class="dept-grid-item">
          <span class="dept-label">{{ item.label }}</span>
          <span
            :class="[
              'dept-value',
              (statisticsData as any)[item.key] > 0 ? 'alarm-data' : ''
            ]"
          >
            {{ (statisticsData as any)[item.key] }}
          </span>
        </div>
      </div>
    </el-card>

    <!-- 按类型统计 -->
    <el-card shadow="never" class="mb-4">
      <template #header>
        <div class="card-header">
          <span class="subtitle">按类型</span>
        </div>
      </template>

      <div class="type-summary">{{ statisticsData.typeCountStr }}</div>

      <div class="type-grid">
        <div v-for="item in typeFields" :key="item.key" class="type-grid-item">
          <span class="type-label">{{ item.label }}</span>
          <span
            :class="[
              'type-value',
              (statisticsData as any)[item.key] > 0 ? 'alarm-data' : ''
            ]"
          >
            {{ (statisticsData as any)[item.key] }}
          </span>
        </div>
      </div>
    </el-card>

    <!-- 图表区域 -->
    <div class="charts-row">
      <el-card shadow="never" class="chart-card">
        <template #header>
          <div class="card-header">
            <span class="chart-title">按属地统计</span>
          </div>
        </template>
        <div id="bar-tj-dep" class="chart-box" />
      </el-card>

      <el-card shadow="never" class="chart-card">
        <template #header>
          <div class="card-header">
            <span class="chart-title">按报警类型统计</span>
          </div>
        </template>
        <div id="bar-tj-type" class="chart-box" />
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistics-container {
  padding: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.filter-form {
  display: flex;
  align-items: center;
}

.card-header {
  display: flex;
  align-items: center;
}

.subtitle {
  position: relative;
  padding-left: 12px;
  font-weight: 500;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 16px;
    content: "";
    background-color: var(--el-color-primary);
    border-radius: 2px;
    transform: translateY(-50%);
  }
}

.alarm-count-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin-bottom: 16px;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;

  .alarm-count {
    margin-right: 12px;
    font-size: 48px;
    font-weight: bold;
  }

  .alarm-label {
    font-size: 18px;
  }
}

.dept-summary,
.type-summary {
  margin-bottom: 24px;
  line-height: 1.6;
  color: var(--el-text-color-regular);
}

.dept-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.dept-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: var(--el-color-primary);
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  }

  .dept-label {
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .dept-value {
    font-size: 18px;
    font-weight: bold;
    color: var(--el-text-color-primary);

    &.alarm-data {
      color: #f56c6c;
    }
  }
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.type-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    border-color: var(--el-color-primary);
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  }

  .type-label {
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .type-value {
    font-size: 18px;
    font-weight: bold;
    color: var(--el-text-color-primary);

    &.alarm-data {
      color: #f56c6c;
    }
  }
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.chart-card {
  .chart-title {
    font-weight: 500;
  }

  .chart-box {
    height: 400px;
  }
}

@media (width <= 1200px) {
  .dept-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .type-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
