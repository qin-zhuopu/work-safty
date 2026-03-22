<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

defineOptions({
  name: "SftWorkDocStatistics"
});

interface ActItem {
  deptName: string;
  num: number;
}

interface DocItem {
  deptName: string;
  num: number;
}

interface DocTypeItem {
  dtName: string;
  hgNum: number;
  bhgNum: number;
}

interface StatisticsData {
  actList: ActItem[];
  docList: DocItem[];
  docList1: DocTypeItem[];
  bbCount: number;
  cbsCount: number;
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
  actList: [],
  docList: [],
  docList1: [],
  bbCount: 0,
  cbsCount: 0
});

let barActChart: echarts.ECharts | null = null;
let barDocChart: echarts.ECharts | null = null;
let barTypeChart: echarts.ECharts | null = null;
let pieChart: echarts.ECharts | null = null;
let refreshTimer: number | null = null;

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
      `/sft/work/doc/statistics/list.json?startTime=${startTime}&endTime=${endTime}`
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

function getActChartOption(): EChartsOption {
  const actList = statisticsData.value.actList || [];
  const deptNames = actList.map(item => item.deptName);
  const numData = actList.map(item => item.num);

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: 8,
      bottom: 20,
      left: 0,
      right: 0
    },
    xAxis: {
      type: "category",
      data: deptNames,
      boundaryGap: true,
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
        show: true,
        margin: 8,
        fontSize: 12,
        color: "rgba(81, 90, 110, 0.72)"
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: [4, 4],
          dashOffset: 4,
          color: "rgba(23, 35, 61, 0.16)"
        }
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
          type: [4, 4],
          dashOffset: 4,
          color: "rgba(23, 35, 61, 0.16)"
        }
      }
    },
    series: [
      {
        data: numData,
        type: "bar",
        barWidth: 16,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(2, 66, 255, 0.02)"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#00D6B9" },
            { offset: 1, color: "#61F2C3" }
          ])
        },
        label: {
          show: true,
          color: "#00929A",
          fontSize: 14,
          fontWeight: "bold",
          position: "top"
        }
      }
    ]
  };
}

function getDocChartOption(): EChartsOption {
  const docList = statisticsData.value.docList || [];
  const deptNames = docList.map(item => item.deptName);
  const numData = docList.map(item => item.num);

  return {
    tooltip: {
      show: false,
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: 8,
      bottom: 20,
      left: 0,
      right: 0
    },
    xAxis: {
      type: "category",
      data: deptNames,
      boundaryGap: true,
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
        show: true,
        margin: 8,
        fontSize: 12,
        color: "rgba(81, 90, 110, 0.72)"
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: [4, 4],
          dashOffset: 4,
          color: "rgba(23, 35, 61, 0.16)"
        }
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
          type: [4, 4],
          dashOffset: 4,
          color: "rgba(23, 35, 61, 0.16)"
        }
      }
    },
    series: [
      {
        data: numData,
        type: "bar",
        barWidth: 16,
        showBackground: true,
        backgroundStyle: {
          color: "rgba(2, 66, 255, 0.02)"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#0A5DE1" },
            { offset: 1, color: "#68AAF6" }
          ])
        },
        label: {
          show: true,
          color: "#0A5DE1",
          fontSize: 14,
          fontWeight: "bold",
          position: "top"
        }
      },
      {
        type: "pictorialBar",
        itemStyle: {
          color: "#F2F3F8"
        },
        symbolRepeat: "fixed",
        symbolMargin: 2,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [16, 1],
        symbolPosition: "bottom",
        symbolOffset: [0, 0],
        data: numData,
        width: 16,
        z: 0,
        zlevel: 2
      }
    ]
  };
}

function getTypeChartOption(): EChartsOption {
  const docTypeList = statisticsData.value.docList1 || [];
  const typeNames = docTypeList.map(item => item.dtName);
  const hgData = docTypeList.map(item => item.hgNum);
  const bhgData = docTypeList.map(item => item.bhgNum);

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      top: 32,
      bottom: 32,
      left: 32,
      right: 0
    },
    xAxis: {
      type: "category",
      data: typeNames,
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.44)"
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        show: true,
        margin: 10,
        fontSize: 13,
        color: "#515A6E"
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        fontSize: 13,
        color: "#515A6E"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.44)"
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "rgba(81, 90, 110, 0.12)"
        }
      }
    },
    series: [
      {
        name: "合格",
        type: "bar",
        barWidth: 12,
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#0A5DE1" },
            { offset: 1, color: "#68AAF6" }
          ]),
          barBorderRadius: [100, 100, 0, 0]
        },
        data: hgData
      },
      {
        name: "不合格",
        type: "bar",
        barWidth: 12,
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FF8700" },
            { offset: 1, color: "#FFC566" }
          ]),
          barBorderRadius: [100, 100, 0, 0]
        },
        data: bhgData
      }
    ]
  };
}

function getPieChartOption(): EChartsOption {
  return {
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "承包商和本部统计",
        type: "pie",
        radius: ["50%", "80%"],
        center: ["50%", "50%"],
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 10
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "32",
            fontWeight: "bold"
          }
        },
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: statisticsData.value.bbCount || 0,
            name: "本部统计",
            itemStyle: {
              color: "#025FFD"
            }
          },
          {
            value: statisticsData.value.cbsCount || 0,
            name: "承包商统计",
            itemStyle: {
              color: "#56E3AB"
            }
          }
        ]
      }
    ]
  };
}

function initCharts() {
  const actChartEl = document.getElementById("bar-act");
  const docChartEl = document.getElementById("bar-doc");
  const typeChartEl = document.getElementById("bar-type");
  const pieChartEl = document.getElementById("pie-cbs");

  if (actChartEl) {
    barActChart = echarts.init(actChartEl);
  }
  if (docChartEl) {
    barDocChart = echarts.init(docChartEl);
  }
  if (typeChartEl) {
    barTypeChart = echarts.init(typeChartEl);
  }
  if (pieChartEl) {
    pieChart = echarts.init(pieChartEl);
  }

  updateCharts();
}

function updateCharts() {
  if (barActChart) {
    barActChart.setOption(getActChartOption());
  }
  if (barDocChart) {
    barDocChart.setOption(getDocChartOption());
  }
  if (barTypeChart) {
    barTypeChart.setOption(getTypeChartOption());
  }
  if (pieChart) {
    pieChart.setOption(getPieChartOption());
  }
}

function handleSearch() {
  fetchData();
}

function handleResize() {
  barActChart?.resize();
  barDocChart?.resize();
  barTypeChart?.resize();
  pieChart?.resize();
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

  barActChart?.dispose();
  barDocChart?.dispose();
  barTypeChart?.dispose();
  pieChart?.dispose();
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
              检索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 活动统计 -->
    <el-card shadow="never" class="mb-4 chart-section">
      <template #header>
        <div class="card-header">
          <span class="title-cn">活动统计</span>
          <span class="title-en">Work activity statistics</span>
        </div>
      </template>
      <div id="bar-act" class="chart-box" />
    </el-card>

    <!-- 作业统计 -->
    <el-card shadow="never" class="mb-4 chart-section">
      <template #header>
        <div class="card-header">
          <span class="title-cn">作业统计</span>
          <span class="title-en">Work statistics</span>
        </div>
      </template>
      <div id="bar-doc" class="chart-box" />
    </el-card>

    <!-- 作业类型统计和承包商统计 -->
    <div class="charts-row">
      <el-card shadow="never" class="chart-section">
        <template #header>
          <div class="card-header">
            <span class="title-cn">作业类型统计</span>
            <span class="title-en">Work time statistics</span>
          </div>
        </template>
        <div id="bar-type" class="chart-box-small" />
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot legend-blue" />
            <span>合格</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot legend-orange" />
            <span>不合格</span>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="chart-section">
        <template #header>
          <div class="card-header">
            <span class="title-cn">承包商和本部统计</span>
            <span class="title-en">Contractors and Headquarters</span>
          </div>
        </template>
        <div id="pie-cbs" class="chart-box-small" />
        <div class="pie-legend">
          <div class="legend-item">
            <span class="legend-dot legend-blue" />
            <span>本部</span>
            <span class="legend-value">{{ statisticsData.bbCount }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot legend-green" />
            <span>承包商</span>
            <span class="legend-value">{{ statisticsData.cbsCount }}</span>
          </div>
        </div>
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
  gap: 12px;
  align-items: center;

  .title-cn {
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  .title-en {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}

.chart-section {
  .chart-box {
    height: 300px;
  }

  .chart-box-small {
    height: 250px;
  }
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.chart-legend,
.pie-legend {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 16px;

  .legend-item {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    color: var(--el-text-color-regular);

    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;

      &.legend-blue {
        background-color: #0a5de1;
      }

      &.legend-orange {
        background-color: #ff8700;
      }

      &.legend-green {
        background-color: #56e3ab;
      }
    }

    .legend-value {
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }
}

@media (width <= 768px) {
  .charts-row {
    grid-template-columns: 1fr;
  }
}
</style>
