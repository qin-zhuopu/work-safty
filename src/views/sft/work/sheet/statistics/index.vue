<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

defineOptions({
  name: "SftWorkSheetStatistics"
});

interface ApplicantData {
  deptName: string;
  sqz: number;
  spz: number;
  yjs: number;
  ybh: number;
  jjtz: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    sqzList?: number[];
    spzList?: number[];
    yjsList?: number[];
    ybhList?: number[];
    jjtzList?: number[];
    sgdwList?: ApplicantData[];
  };
}

const loading = ref(false);
const barSQChart = ref<echarts.ECharts | null>(null);
const barSGChart = ref<echarts.ECharts | null>(null);

// 日期范围
const startTime = ref("2026-03-01");
const endTime = ref("2026-03-31");

// 申请单位
const applicantDepts = [
  "HSE管理部",
  "运营管理部",
  "供应链管理部",
  "财务管理部",
  "审计合规处",
  "PVC一车间",
  "电解车间",
  "机电仪车间",
  "热电车间",
  "双氧水车间",
  "PVC二车间",
  "研发中心"
];

// 申请单位图表配置
const getApplicantOption = (): EChartsOption => ({
  tooltip: {
    show: true
  },
  grid: {
    top: 32,
    bottom: 96,
    left: 40,
    right: 0
  },
  xAxis: {
    type: "category",
    data: applicantDepts,
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
      show: false
    },
    axisLine: {
      show: false
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
      name: "申请中",
      data: [] as number[],
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(10, 93, 225, 1)" },
          { offset: 1, color: "rgba(10, 93, 225, 0.64)" }
        ])
      }
    },
    {
      name: "审批中",
      data: [] as number[],
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(0, 229, 255, 1)" },
          { offset: 1, color: "rgba(0, 229, 255, 0.64)" }
        ])
      }
    },
    {
      name: "已结束",
      data: [] as number[],
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(126, 229, 67, 1)" },
          { offset: 1, color: "rgba(126, 229, 67, 0.64)" }
        ])
      }
    },
    {
      name: "已驳回",
      data: [] as number[],
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(253, 225, 41, 1)" },
          { offset: 1, color: "rgba(253, 225, 41, 0.64)" }
        ])
      }
    },
    {
      name: "紧急停止",
      data: [] as number[],
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(255, 109, 69, 1)" },
          { offset: 1, color: "rgba(255, 109, 69, 0.64)" }
        ])
      }
    }
  ]
});

// 施工单位图表配置
const getConstructionOption = (): EChartsOption => ({
  tooltip: {
    show: true
  },
  grid: {
    top: 32,
    bottom: 200,
    left: 40,
    right: 0
  },
  xAxis: {
    type: "category",
    data: [] as string[],
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
      fontSize: 12,
      color: "rgba(23, 35, 61, 0.64)"
    }
  },
  yAxis: {
    type: "value",
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
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
      name: "申请中",
      data: [] as number[],
      type: "bar",
      barWidth: 12,
      stack: "pgd",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(10, 93, 225, 1)" },
          { offset: 1, color: "rgba(10, 93, 225, 0.64)" }
        ])
      }
    },
    {
      name: "审批中",
      data: [] as number[],
      type: "bar",
      barWidth: 12,
      stack: "pgd",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(0, 229, 255, 1)" },
          { offset: 1, color: "rgba(0, 229, 255, 0.64)" }
        ])
      }
    },
    {
      name: "已结束",
      data: [] as number[],
      type: "bar",
      barWidth: 10,
      stack: "pgd",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(126, 229, 67, 1)" },
          { offset: 1, color: "rgba(126, 229, 67, 0.64)" }
        ])
      }
    },
    {
      name: "已驳回",
      data: [] as number[],
      type: "bar",
      barWidth: 12,
      stack: "pgd",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(253, 225, 41, 1)" },
          { offset: 1, color: "rgba(253, 225, 41, 0.64)" }
        ])
      }
    },
    {
      name: "紧急停止",
      data: [] as number[],
      type: "bar",
      barWidth: 12,
      stack: "pgd",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(255, 109, 69, 1)" },
          { offset: 1, color: "rgba(255, 109, 69, 0.64)" }
        ])
      }
    }
  ]
});

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/work/sheet/statistics/list?startTime=${startTime.value}&endTime=${endTime.value}`
    );
    const data: ApiResponse = await response.json();
    if (data.success && data.t) {
      updateCharts(data.t);
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

function updateCharts(data: ApiResponse["t"]) {
  if (!barSQChart.value || !barSGChart.value) return;

  // 更新申请单位图表
  const sqOption = barSQChart.value.getOption();
  if (data.sqzList) {
    (sqOption.series as any)[0].data = data.sqzList;
  }
  if (data.spzList) {
    (sqOption.series as any)[1].data = data.spzList;
  }
  if (data.yjsList) {
    (sqOption.series as any)[2].data = data.yjsList;
  }
  if (data.ybhList) {
    (sqOption.series as any)[3].data = data.ybhList;
  }
  if (data.jjtzList) {
    (sqOption.series as any)[4].data = data.jjtzList;
  }
  barSQChart.value.setOption(sqOption);

  // 更新施工单位图表
  if (data.sgdwList && data.sgdwList.length > 0) {
    const deptNames = data.sgdwList.map(item => item.deptName);
    const sqz = data.sgdwList.map(item => item.sqz);
    const spz = data.sgdwList.map(item => item.spz);
    const yjs = data.sgdwList.map(item => item.yjs);
    const ybh = data.sgdwList.map(item => item.ybh);
    const jjtz = data.sgdwList.map(item => item.jjtz);

    const sgOption = barSGChart.value.getOption();
    (sgOption.xAxis as any)[0].data = deptNames;
    (sgOption.series as any)[0].data = sqz;
    (sgOption.series as any)[1].data = spz;
    (sgOption.series as any)[2].data = yjs;
    (sgOption.series as any)[3].data = ybh;
    (sgOption.series as any)[4].data = jjtz;
    barSGChart.value.setOption(sgOption);
  }
}

function handleSearch() {
  fetchData();
}

let autoRefreshTimer: number | null = null;

function initCharts() {
  const barSQEl = document.getElementById("barSQ");
  const barSGEl = document.getElementById("barSG");

  if (barSQEl) {
    barSQChart.value = echarts.init(barSQEl);
    barSQChart.value.setOption(getApplicantOption());
  }

  if (barSGEl) {
    barSGChart.value = echarts.init(barSGEl);
    barSGChart.value.setOption(getConstructionOption());
  }
}

onMounted(() => {
  initCharts();
  fetchData();

  // 5分钟自动刷新
  autoRefreshTimer = window.setInterval(
    () => {
      fetchData();
    },
    5 * 60 * 1000
  );
});

onUnmounted(() => {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
  }
  barSQChart.value?.dispose();
  barSGChart.value?.dispose();
});
</script>

<template>
  <div class="statistics-container">
    <el-card shadow="never">
      <!-- 筛选区域 -->
      <div class="filter-box">
        <div class="filter-item">
          <label>日期</label>
          <el-input v-model="startTime" readonly style="width: 100px" />
        </div>
        <div class="filter-item">
          <el-input v-model="endTime" readonly style="width: 100px" />
        </div>
        <el-button type="primary" :icon="'Search'" @click="handleSearch">
          检索
        </el-button>
      </div>

      <!-- 申请单位派工单统计 -->
      <div class="chart-section">
        <div class="chart-block">
          <div class="chart-title">申请单位派工单统计</div>
          <div class="chart-wrapper">
            <div id="barSQ" class="chart-bar" />
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color applicant" />
              <span>申请中</span>
            </div>
            <div class="legend-item">
              <span class="legend-color reviewing" />
              <span>审批中</span>
            </div>
            <div class="legend-item">
              <span class="legend-color finished" />
              <span>已结束</span>
            </div>
            <div class="legend-item">
              <span class="legend-color rejected" />
              <span>已驳回</span>
            </div>
            <div class="legend-item">
              <span class="legend-color stopped" />
              <span>紧急停止</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 施工单位派工单统计 -->
      <div class="chart-section">
        <div class="chart-block">
          <div class="chart-title">施工单位派工单统计</div>
          <div class="chart-wrapper">
            <div id="barSG" class="chart-bar" />
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color applicant" />
              <span>申请中</span>
            </div>
            <div class="legend-item">
              <span class="legend-color reviewing" />
              <span>审批中</span>
            </div>
            <div class="legend-item">
              <span class="legend-color finished" />
              <span>已结束</span>
            </div>
            <div class="legend-item">
              <span class="legend-color rejected" />
              <span>已驳回</span>
            </div>
            <div class="legend-item">
              <span class="legend-color stopped" />
              <span>紧急停止</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.statistics-container {
  padding: 16px;
}

.filter-box {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;

  .filter-item {
    display: flex;
    gap: 8px;
    align-items: center;

    label {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }
  }
}

.chart-section {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.chart-block {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
}

.chart-title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.chart-wrapper {
  width: 100%;
  height: 400px;
}

.chart-bar {
  width: 100%;
  height: 100%;
}

.chart-legend {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: var(--el-text-color-regular);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;

  &.applicant {
    background: linear-gradient(
      to bottom,
      rgb(10 93 225 / 100%),
      rgb(10 93 225 / 64%)
    );
  }

  &.reviewing {
    background: linear-gradient(
      to bottom,
      rgb(0 229 255 / 100%),
      rgb(0 229 255 / 64%)
    );
  }

  &.finished {
    background: linear-gradient(
      to bottom,
      rgb(126 229 67 / 100%),
      rgb(126 229 67 / 64%)
    );
  }

  &.rejected {
    background: linear-gradient(
      to bottom,
      rgb(253 225 41 / 100%),
      rgb(253 225 41 / 64%)
    );
  }

  &.stopped {
    background: linear-gradient(
      to bottom,
      rgb(255 109 69 / 100%),
      rgb(255 109 69 / 64%)
    );
  }
}
</style>
