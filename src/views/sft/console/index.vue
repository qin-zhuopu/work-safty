<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import type { EChartsOption, ECharts } from "echarts";

defineOptions({
  name: "SftConsole"
});

interface LocationData {
  areaName: string;
  handleRemark: string;
  handleTime: number;
  id: number;
  mac: string;
  name: string;
  time: number;
  type: string;
}

interface AlarmStat {
  algorithmName: string;
  num: number;
}

interface ConsoleData {
  address: string;
  alarmStats: AlarmStat[];
  dangerDepts: string[];
  dangerRects: string[];
  dangerTos: string[];
  dangerTotal: number;
  dh: number;
  dl: number;
  docDepts: string[];
  docDhs: string[];
  docDls: string[];
  docDts: string[];
  docDzs: string[];
  docGcs: string[];
  docLds: string[];
  docMbs: string[];
  docSxs: string[];
  dt: number;
  dz: number;
  field: number;
  field1: number;
  field2: number;
  field3: number;
  field4: number;
  field5: number;
  field6: number;
  gc: number;
  hcDangers: string[];
  hcDepts: string[];
  hcNormals: string[];
  hcNos: string[];
  ld: number;
  locData: LocationData[];
  major: string;
  material: string;
  mb: number;
  noTotal: number;
  normalTotal: number;
  phone: string;
  product: string;
  rectTotal: number;
  riskFive: number;
  riskFour: number;
  riskOne: number;
  riskThree: number;
  riskTwo: number;
  risks: string[];
  sx: number;
  technology: string;
  toTotal: number;
}

interface ApiResponse {
  success: boolean;
  t: ConsoleData;
}

const loading = ref(false);
const consoleData = ref<ConsoleData | null>(null);

// 图表实例
let barYhChart: ECharts | null = null;
let barYh02Chart: ECharts | null = null;
let barFxChart: ECharts | null = null;
let barWorkChart: ECharts | null = null;

// 初始化当日隐患排查图表
function initBarYhChart() {
  const chartDom = document.getElementById("barYh");
  if (!chartDom) return;

  if (!barYhChart) {
    barYhChart = echarts.init(chartDom);
  }

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      formatter: "{a0} : {c0} <br> {a1} : {c1} <br> {a2} : {c2}",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(2,95,253,0.12)"
        }
      }
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 32
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        interval: 0,
        color: "rgba(81, 90, 110, 0.72)",
        padding: 8,
        fontSize: 14
      },
      axisTick: {
        show: false
      },
      data: consoleData.value?.hcDepts || []
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: "正常",
        type: "bar",
        barWidth: "16px",
        stack: "today",
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#36E2E2" },
            { offset: 1, color: "#1C73FF" }
          ]),
          barBorderWidth: 2,
          barBorderColor: "#ffffff"
        },
        data: consoleData.value?.hcNormals || []
      },
      {
        name: "未排查",
        type: "bar",
        barWidth: "16px",
        stack: "today",
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FFDD81" },
            { offset: 1, color: "#FF8700" }
          ]),
          barBorderWidth: 2,
          barBorderColor: "#ffffff"
        },
        data: consoleData.value?.hcNos || []
      },
      {
        name: "存在隐患",
        type: "bar",
        barWidth: "16px",
        stack: "today",
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FFA996" },
            { offset: 1, color: "#FF3508" }
          ]),
          barBorderWidth: 2,
          barBorderColor: "#ffffff"
        },
        data: consoleData.value?.hcDangers || []
      }
    ]
  };

  barYhChart.setOption(option, true);
}

// 初始化日常性隐患排查图表
function initBarYh02Chart() {
  const chartDom = document.getElementById("barYh02");
  if (!chartDom) return;

  if (!barYh02Chart) {
    barYh02Chart = echarts.init(chartDom);
  }

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    angleAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(23, 35, 61, 0.16)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        show: true,
        fontSize: 14,
        color: "rgba(81, 90, 110, 0.72)"
      },
      data: consoleData.value?.dangerDepts || []
    },
    radiusAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        show: true,
        interval: 1,
        fontSize: 13,
        color: "rgba(81, 90, 110, 0.72)"
      }
    },
    polar: {},
    series: [
      {
        type: "bar",
        data: consoleData.value?.dangerRects || [],
        coordinateSystem: "polar",
        name: "立即整改",
        stack: "stack",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 221, 129, 1)" },
            { offset: 1, color: "rgba(255, 135, 0, 1)" }
          ])
        }
      },
      {
        type: "bar",
        data: consoleData.value?.dangerTos || [],
        coordinateSystem: "polar",
        name: "限期整改",
        stack: "stack",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "rgba(54, 226, 226, 1)" },
            { offset: 1, color: "rgba(28, 115, 255, 1)" }
          ])
        }
      }
    ]
  };

  barYh02Chart.setOption(option, true);
}

// 初始化风险管控图表
function initBarFxChart() {
  const chartDom = document.getElementById("barFx");
  if (!chartDom) return;

  if (!barFxChart) {
    barFxChart = echarts.init(chartDom);
  }

  const colorList = ["#FF3508", "#FF8700", "#FFDB38", "#0A5DE1", "#36E2E2"];

  const option: EChartsOption = {
    grid: {
      top: 0,
      bottom: 32,
      left: 0,
      right: 0
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          type: "dotted",
          color: "#515A6E"
        }
      },
      formatter: "{a0}: {c0}<br />{a1}: {c1}",
      backgroundColor: "rgba(0,0,0,0.55)"
    },
    xAxis: {
      type: "category",
      data: ["一级", "二级", "三级", "四级", "五级"],
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        interval: 0,
        color: "rgba(81, 90, 110, 0.72)",
        padding: 8,
        fontSize: 14
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: "风险数量",
        data: consoleData.value?.risks || [],
        type: "bar",
        barWidth: 16,
        showBackground: true,
        stack: "bar",
        backgroundStyle: {
          color: "rgba(10, 93, 225, 0.04)"
        },
        itemStyle: {
          color: (params: any) => colorList[params.dataIndex % colorList.length]
        }
      },
      {
        type: "pictorialBar",
        itemStyle: {
          color: "#ffffff"
        },
        symbolRepeat: "fixed",
        symbolMargin: 2,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [16, 1],
        symbolPosition: "start",
        symbolOffset: [0, 0],
        data: consoleData.value?.risks || [],
        width: 16,
        z: 0,
        zlevel: 1
      }
    ]
  };

  barFxChart.setOption(option, true);
}

// 初始化特殊作业图表
function initBarWorkChart() {
  const chartDom = document.getElementById("barWork");
  if (!chartDom) return;

  if (!barWorkChart) {
    barWorkChart = echarts.init(chartDom);
  }

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: 85,
      right: 16,
      top: 0,
      bottom: 32
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(81, 90, 110, 0.16)"
        }
      },
      axisLabel: {
        interval: 0,
        color: "rgba(81, 90, 110, 0.72)",
        padding: 8,
        fontSize: 14
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(81, 90, 110, 0.12)"
        }
      },
      axisLabel: {
        color: "#515A6E",
        padding: 8,
        fontSize: 13
      },
      axisTick: {
        show: false
      },
      data: consoleData.value?.docDepts || []
    },
    series: [
      {
        name: "动火",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#0B5EE1" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docDhs || []
      },
      {
        name: "受限",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#2BA1FF" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docSxs || []
      },
      {
        name: "高处",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#66D5FF" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docGcs || []
      },
      {
        name: "临电",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#ACE8FF" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docLds || []
      },
      {
        name: "盲板",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#EEF263" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docMbs || []
      },
      {
        name: "吊装",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#FFDD81" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docDzs || []
      },
      {
        name: "动土",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#FFC481" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docDts || []
      },
      {
        name: "断路",
        type: "bar",
        stack: "特殊作业",
        barWidth: "12",
        itemStyle: { color: "#FF8700" },
        emphasis: {
          focus: "series"
        },
        data: consoleData.value?.docDls || []
      }
    ]
  };

  barWorkChart.setOption(option, true);
}

// 初始化所有图表
function initAllCharts() {
  nextTick(() => {
    initBarYhChart();
    initBarYh02Chart();
    initBarFxChart();
    initBarWorkChart();
  });
}

// 获取报警类型名称
function getAlarmTypeName(type: string): string {
  const typeMap: Record<string, string> = {
    stayAlarm: "滞留预警",
    overBoundaryAlarm: "越界报警",
    overNum: "超员预警",
    lackNum: "缺员预警",
    stillAlarm: "静止预警"
  };
  return typeMap[type] || "一键报警";
}

// 格式化时间
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 获取视频监测数量
function getVideoAlarmCount(name: string): number {
  const stat = consoleData.value?.alarmStats?.find(
    s => s.algorithmName === name
  );
  return stat?.num || 0;
}

// 获取数据
async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/console/loadData.json");
    const data: ApiResponse = await response.json();
    if (data.success) {
      consoleData.value = data.t;
      initAllCharts();
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

// 窗口大小改变时重新调整图表大小
function handleResize() {
  barYhChart?.resize();
  barYh02Chart?.resize();
  barFxChart?.resize();
  barWorkChart?.resize();
}

onMounted(() => {
  fetchData();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  barYhChart?.dispose();
  barYh02Chart?.dispose();
  barFxChart?.dispose();
  barWorkChart?.dispose();
});
</script>

<template>
  <div v-loading="loading" class="console-container">
    <!-- 第一行 -->
    <div class="unit-row">
      <!-- 当日隐患排查 -->
      <el-card class="unit yh-today" shadow="never">
        <template #header>
          <div class="title">
            <span>当日隐患排查</span>
            <span>Hidden danger check（Today）</span>
          </div>
        </template>

        <div class="chart-box">
          <div id="barYh" class="chart" />
        </div>

        <div class="legend">
          <div class="legend-item">
            <span>正常</span>
            <span>{{ consoleData?.normalTotal || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>未排查</span>
            <span>{{ consoleData?.noTotal || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>存在隐患</span>
            <span>{{ consoleData?.dangerTotal || 0 }}</span>
          </div>
        </div>
      </el-card>

      <!-- 日常性隐患排查 -->
      <el-card class="unit yh-daily" shadow="never">
        <template #header>
          <div class="title">
            <span>日常性隐患排查</span>
            <span>Hidden danger check（Daily）</span>
          </div>
        </template>

        <div class="chart-box">
          <div id="barYh02" class="chart" />
        </div>

        <div class="legend">
          <div class="legend-item">
            <span>立即整改</span>
            <span>{{ consoleData?.rectTotal || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>限期整改</span>
            <span>{{ consoleData?.toTotal || 0 }}</span>
          </div>
        </div>
      </el-card>

      <!-- 风险分级管控 -->
      <el-card class="unit risk" shadow="never">
        <template #header>
          <div class="title">
            <span>风险分级管控</span>
            <span>Risk control</span>
          </div>
        </template>

        <div class="chart-box">
          <div id="barFx" class="chart" />
        </div>

        <div class="legend">
          <div class="legend-item">
            <span>一级</span>
            <span>{{ consoleData?.riskOne || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>二级</span>
            <span>{{ consoleData?.riskTwo || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>三级</span>
            <span>{{ consoleData?.riskThree || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>四级</span>
            <span>{{ consoleData?.riskFour || 0 }}</span>
          </div>
          <div class="legend-item">
            <span>五级</span>
            <span>{{ consoleData?.riskFive || 0 }}</span>
          </div>
        </div>
      </el-card>

      <!-- 应急预案与应急资源 -->
      <el-card class="unit emergency" shadow="never">
        <template #header>
          <div class="title">
            <span>应急预案与应急资源</span>
            <span>Emergency plan/resources</span>
          </div>
        </template>

        <div class="chart-box" />

        <div class="type-list">
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><Document /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>综合预案</span>
              <span>{{ consoleData?.field || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><Document /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>专项预案</span>
              <span>{{ consoleData?.field1 || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><Document /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>现场处置</span>
              <span>{{ consoleData?.field2 || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><Umbrella /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>防汛物资</span>
              <span>{{ consoleData?.field3 || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><FirstAidKit /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>医疗救护</span>
              <span>{{ consoleData?.field4 || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><Box /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>应急物资</span>
              <span>{{ consoleData?.field5 || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper">
              <el-icon><User /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>应急队伍</span>
              <span>{{ consoleData?.field6 || 0 }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 第二行 -->
    <div class="unit-row">
      <!-- 特殊作业 -->
      <el-card class="unit operation" shadow="never">
        <template #header>
          <div class="title">
            <span>特殊作业</span>
            <span>Special operation management</span>
          </div>
        </template>

        <div class="chart-box">
          <div id="barWork" class="chart" />
        </div>

        <div class="type-list">
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Edit /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>动火</span>
              <span>{{ consoleData?.dh || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Lock /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>受限</span>
              <span>{{ consoleData?.sx || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Top /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>高处</span>
              <span>{{ consoleData?.gc || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Connection /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>临电</span>
              <span>{{ consoleData?.ld || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Hide /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>盲板</span>
              <span>{{ consoleData?.mb || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Van /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>吊装</span>
              <span>{{ consoleData?.dz || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><Grid /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>动土</span>
              <span>{{ consoleData?.dt || 0 }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper work-icon">
              <el-icon><RemoveFilled /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>断路</span>
              <span>{{ consoleData?.dl || 0 }}</span>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 人员定位报警 -->
      <el-card class="unit position" shadow="never">
        <template #header>
          <div class="title">
            <span>人员定位报警</span>
            <span>Personnel positioning alarm</span>
          </div>
        </template>

        <div class="table-container">
          <el-table :data="consoleData?.locData || []" stripe border>
            <el-table-column prop="name" label="人员姓名" width="100" />
            <el-table-column prop="mac" label="定位卡号" width="140" />
            <el-table-column label="报警类型" width="100">
              <template #default="{ row }">
                {{ getAlarmTypeName(row.type) }}
              </template>
            </el-table-column>
            <el-table-column label="报警时间">
              <template #default="{ row }">
                {{ formatTime(row.time) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <!-- 智能视频监控 -->
      <el-card class="unit mor" shadow="never">
        <template #header>
          <div class="title">
            <span>智能视频监控</span>
            <span>Intelligent video analysis</span>
          </div>
        </template>

        <div class="chart-box" />

        <div class="type-list">
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>口罩监测</span>
              <span>{{ getVideoAlarmCount("口罩监测") }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>安全帽监测</span>
              <span>{{ getVideoAlarmCount("安全帽检测") }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>脱岗监测</span>
              <span>{{ getVideoAlarmCount("脱岗监测") }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>入侵监测</span>
              <span>{{ getVideoAlarmCount("入侵监测") }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>打电话监测</span>
              <span>{{ getVideoAlarmCount("打电话监测") }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>火焰监测</span>
              <span>{{ getVideoAlarmCount("火焰监测") }}</span>
            </div>
          </div>
          <div class="type-item">
            <div class="icon-wrapper video-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="text-wrapper">
              <span>烟雾监测</span>
              <span>{{ getVideoAlarmCount("烟雾监测") }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.console-container {
  min-height: calc(100vh - 100px);
  padding: 16px;
  background: #f5f7fa;
}

.unit-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.unit {
  flex: 1;
  min-width: 0;

  :deep(.el-card__header) {
    padding: 12px 16px;
    border-bottom: 1px solid #ebeef5;
  }

  :deep(.el-card__body) {
    padding: 16px;
  }
}

.title {
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }

  span:last-child {
    font-size: 12px;
    color: #909399;
  }
}

.chart-box {
  height: 180px;
  margin-bottom: 16px;

  .chart {
    width: 100%;
    height: 100%;
  }
}

.legend {
  display: flex;
  gap: 8px;
  justify-content: space-around;

  .legend-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;

    span:first-child {
      font-size: 12px;
      color: #909399;
    }

    span:last-child {
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
  }
}

.type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-around;

  .type-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    min-width: 60px;

    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      font-size: 20px;
      color: #fff;
      background: linear-gradient(135deg, #1c73ff 0%, #36e2e2 100%);
      border-radius: 8px;

      &.work-icon {
        background: linear-gradient(135deg, #0b5ee1 0%, #2ba1ff 100%);
      }

      &.video-icon {
        background: linear-gradient(135deg, #ff8700 0%, #ffdd81 100%);
      }
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;

      span:first-child {
        font-size: 12px;
        color: #909399;
      }

      span:last-child {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }
  }
}

.table-container {
  height: 220px;
  overflow: auto;

  :deep(.el-table) {
    font-size: 13px;
  }

  :deep(.el-table__header th) {
    background: #f5f7fa;
  }
}
</style>
