<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import type { EChartsOption, ECharts } from "echarts";

defineOptions({
  name: "SftDangerStatistics"
});

interface PersonalStat {
  addUserName: string;
  yhCount: string;
}

interface StatisticsData {
  // Department counts
  hseCount: number;
  hseJsCount: number;
  hseZgCount: number;
  hseWwcCount: number;
  hseCqCount: number;
  yyglCount: number;
  yyglJsCount: number;
  yyglZgCount: number;
  yyglWwcCount: number;
  yyglCqCount: number;
  gylCount: number;
  gylJsCount: number;
  gylZgCount: number;
  gylWwcCount: number;
  gylCqCount: number;
  jlyxCount: number;
  jlyxJsCount: number;
  jlyxZgCount: number;
  jlyxWwcCount: number;
  jlyxCqCount: number;
  djcjCount: number;
  djcjJsCount: number;
  djcjZgCount: number;
  djcjWwcCount: number;
  djcjCqCount: number;
  jdycjCount: number;
  jdycjJsCount: number;
  jdycjZgCount: number;
  jdycjWwcCount: number;
  jdycjCqCount: number;
  rdcjCount: number;
  rdcjJsCount: number;
  rdcjZgCount: number;
  rdcjWwcCount: number;
  rdcjCqCount: number;
  sysCount: number;
  sysJsCount: number;
  sysZgCount: number;
  sysWwcCount: number;
  sysCqCount: number;
  taCount: number;
  taJsCount: number;
  taZgCount: number;
  taWwcCount: number;
  taCqCount: number;
  // Cause analysis counts
  sjyyCount: number;
  sgyyCount: number;
  whyyCount: number;
  syyyCount: number;
  cgyyCount: number;
  qtyyCount: number;
  // Type counts
  aqCount: number;
  xfCount: number;
  gyCount: number;
  ztCount: number;
  dqCount: number;
  sbCount: number;
  ybCount: number;
  qtCount: number;
  // Check type counts
  jclxCount: number;
  jclx1Count: number;
  jclx2Count: number;
  jclx3Count: number;
  jclx4Count: number;
  jclx5Count: number;
  jclx6Count: number;
  jclx7Count: number;
  jclx8Count: number;
  jclx9Count: number;
  jclx10Count: number;
  // Additional dept counts
  jsyfcCount: number;
  pvccjCount: number;
  pvcecjCount: number;
  jdyCount: number;
  scyxCount: number;
  // Personal statistics
  list: PersonalStat[];
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

// Chart refs
const barDptChart = ref<ECharts>();
const pieYhLevelChart = ref<ECharts>();
const pieYhTypeChart = ref<ECharts>();
const pieJcTypeChart = ref<ECharts>();
const barPerChart = ref<ECharts>();
const barBMChart = ref<ECharts>();

// Chart element refs
const barDptRef = ref<HTMLElement>();
const pieYhLevelRef = ref<HTMLElement>();
const pieYhTypeRef = ref<HTMLElement>();
const pieJcTypeRef = ref<HTMLElement>();
const barPerRef = ref<HTMLElement>();
const barBMRef = ref<HTMLElement>();

const departmentNames = [
  "HSE管理部",
  "运营管理部",
  "供应链管理部",
  "聚氯乙烯车间",
  "电解车间",
  "机电仪车间",
  "热电车间",
  "双氧水车间",
  "泰安分公司"
];

const checkTypeNames = [
  "日常排查",
  "综合性排查",
  "专业性排查",
  "季节性排查",
  "重点时段及节假日前排查",
  "事故类比排查",
  "复产复工前排查",
  "外聘专家诊断试排查",
  "管控措施失效",
  "监管部门监督检查",
  "其它"
];

const hazardTypeNames = [
  "安全",
  "消防",
  "工艺",
  "总图",
  "电气",
  "设备",
  "仪表",
  "其他"
];

const causeNames = [
  "设计原因",
  "施工原因",
  "维护原因",
  "使用原因",
  "采购原因",
  "其他"
];

const causeColors = [
  "#F45252",
  "#FF7F00",
  "#FFD064",
  "#4685F0",
  "#34C3C3",
  "#82CCE6"
];

const hazardTypeColors = [
  "#0A5DE1",
  "#7CA4EB",
  "#4685F0",
  "#E07BCE",
  "#FF5020",
  "#FDE129",
  "#7EE543",
  "#00E5FF"
];

const checkTypeColors = [
  "#4C98FB",
  "#83CCE6",
  "#32C3C4",
  "#73DEBD",
  "#FBD656",
  "#F56679",
  "#E07BCE",
  "#9D50E0",
  "#025FFD",
  "#FF7F00",
  "#FFD064"
];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function initCharts() {
  if (barDptRef.value) {
    barDptChart.value = echarts.init(barDptRef.value);
  }
  if (pieYhLevelRef.value) {
    pieYhLevelChart.value = echarts.init(pieYhLevelRef.value);
  }
  if (pieYhTypeRef.value) {
    pieYhTypeChart.value = echarts.init(pieYhTypeRef.value);
  }
  if (pieJcTypeRef.value) {
    pieJcTypeChart.value = echarts.init(pieJcTypeRef.value);
  }
  if (barPerRef.value) {
    barPerChart.value = echarts.init(barPerRef.value);
  }
  if (barBMRef.value) {
    barBMChart.value = echarts.init(barBMRef.value);
  }
}

function updateBarDptChart(data: StatisticsData) {
  if (!barDptChart.value) return;

  const option: EChartsOption = {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    legend: {
      data: ["隐患上传", "隐患接收", "已整改", "整改未完成", "整改超期"],
      top: 0,
      textStyle: { fontSize: 12 }
    },
    grid: {
      top: 40,
      bottom: 20,
      left: 0,
      right: 0,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: departmentNames,
      axisLine: { lineStyle: { color: "rgba(23, 35, 61, 0.16)" } },
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        fontSize: 11,
        color: "#515A6E",
        rotate: 30
      }
    },
    yAxis: {
      type: "value",
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(23, 35, 61, 0.12)" } }
    },
    series: [
      {
        name: "隐患上传",
        data: [
          data.hseCount,
          data.yyglCount,
          data.gylCount,
          data.jlyxCount,
          data.djcjCount,
          data.jdycjCount,
          data.rdcjCount,
          data.sysCount,
          data.taCount
        ],
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
        name: "隐患接收",
        data: [
          data.hseJsCount,
          data.yyglJsCount,
          data.gylJsCount,
          data.jlyxJsCount,
          data.djcjJsCount,
          data.jdycjJsCount,
          data.rdcjJsCount,
          data.sysJsCount,
          data.taJsCount
        ],
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
        name: "已整改",
        data: [
          data.hseZgCount,
          data.yyglZgCount,
          data.gylZgCount,
          data.jlyxZgCount,
          data.djcjZgCount,
          data.jdycjZgCount,
          data.rdcjZgCount,
          data.sysZgCount,
          data.taZgCount
        ],
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
        name: "整改未完成",
        data: [
          data.hseWwcCount,
          data.yyglWwcCount,
          data.gylWwcCount,
          data.jlyxWwcCount,
          data.djcjWwcCount,
          data.jdycjWwcCount,
          data.rdcjWwcCount,
          data.sysWwcCount,
          data.taWwcCount
        ],
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
        name: "整改超期",
        data: [
          data.hseCqCount,
          data.yyglCqCount,
          data.gylCqCount,
          data.jlyxCqCount,
          data.djcjCqCount,
          data.jdycjCqCount,
          data.rdcjCqCount,
          data.sysCqCount,
          data.taCqCount
        ],
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
  };
  barDptChart.value.setOption(option);
}

function updatePieYhLevelChart(data: StatisticsData) {
  if (!pieYhLevelChart.value) return;

  const option: EChartsOption = {
    tooltip: { show: true },
    series: [
      {
        type: "pie",
        radius: ["50%", "80%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        label: { show: false },
        data: [
          {
            value: data.sjyyCount,
            name: "设计原因",
            itemStyle: { color: causeColors[0] }
          },
          {
            value: data.sgyyCount,
            name: "施工原因",
            itemStyle: { color: causeColors[1] }
          },
          {
            value: data.whyyCount,
            name: "维护原因",
            itemStyle: { color: causeColors[2] }
          },
          {
            value: data.syyyCount,
            name: "使用原因",
            itemStyle: { color: causeColors[3] }
          },
          {
            value: data.cgyyCount,
            name: "采购原因",
            itemStyle: { color: causeColors[4] }
          },
          {
            value: data.qtyyCount,
            name: "其他",
            itemStyle: { color: causeColors[5] }
          }
        ],
        labelLine: { show: false }
      }
    ]
  };
  pieYhLevelChart.value.setOption(option);
}

function updatePieYhTypeChart(data: StatisticsData) {
  if (!pieYhTypeChart.value) return;

  const option: EChartsOption = {
    tooltip: { show: true },
    angleAxis: {
      type: "category",
      axisLine: { show: true, lineStyle: { color: "#DDE6ED" } },
      axisLabel: {
        show: true,
        interval: 0,
        margin: 10,
        fontSize: 12,
        color: "#33557F"
      },
      data: hazardTypeNames
    },
    radiusAxis: { show: false },
    polar: {},
    series: [
      {
        type: "bar",
        data: [
          data.aqCount,
          data.xfCount,
          data.gyCount,
          data.ztCount,
          data.dqCount,
          data.sbCount,
          data.ybCount,
          data.qtCount
        ],
        coordinateSystem: "polar",
        name: "隐患类型统计",
        stack: "a",
        emphasis: { focus: "series" },
        itemStyle: {
          color: (params: any) =>
            hazardTypeColors[params.dataIndex % hazardTypeColors.length]
        }
      }
    ]
  };
  pieYhTypeChart.value.setOption(option);
}

function updatePieJcTypeChart(data: StatisticsData) {
  if (!pieJcTypeChart.value) return;

  const tranData = [
    data.jclxCount,
    data.jclx1Count,
    data.jclx2Count,
    data.jclx3Count,
    data.jclx4Count,
    data.jclx5Count,
    data.jclx6Count,
    data.jclx7Count,
    data.jclx8Count,
    data.jclx9Count,
    data.jclx10Count
  ];

  const option: EChartsOption = {
    tooltip: { show: true },
    grid: {
      left: 15,
      right: 40,
      bottom: 10,
      top: 0,
      containLabel: true
    },
    xAxis: [
      {
        show: true,
        axisLine: {
          show: true,
          lineStyle: { color: "rgba(81, 90, 110, 0.33)" }
        },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: { show: false }
      },
      { show: false }
    ],
    yAxis: {
      type: "category",
      inverse: true,
      show: false,
      data: checkTypeNames
    },
    series: [
      {
        show: true,
        type: "bar",
        barWidth: 12,
        z: 2,
        itemStyle: {
          color: (params: any) =>
            checkTypeColors[params.dataIndex % checkTypeColors.length]
        },
        label: {
          show: true,
          textStyle: { color: "rgba(51, 85, 127, 0.66)", fontSize: 12 },
          position: "right",
          formatter: (data: any) => tranData[data.dataIndex].toString()
        },
        data: tranData
      },
      {
        show: true,
        type: "bar",
        xAxisIndex: 1,
        barWidth: 12,
        itemStyle: {
          barBorderRadius: 200,
          color: "transparent"
        },
        label: {
          show: true,
          position: [0, -40],
          textStyle: { fontSize: 12, color: "#33557F" },
          formatter: (data: any) => checkTypeNames[data.dataIndex]
        },
        data: tranData
      }
    ]
  };
  pieJcTypeChart.value.setOption(option);
}

function updateBarPerChart(data: StatisticsData) {
  if (!barPerChart.value || !data.list || data.list.length === 0) return;

  const sortedData = [...data.list].sort(
    (a, b) => parseFloat(a.yhCount) - parseFloat(b.yhCount)
  );
  const xdataName = sortedData.map(v => v.addUserName);
  const dataNum = sortedData.map(v => ({ value: parseFloat(v.yhCount) }));
  const maxValue = Math.max(...dataNum.map(v => v.value));
  const bgData = dataNum.map(() => maxValue + 0.5);

  const option: EChartsOption = {
    grid: [{ top: 0, left: 0, right: 0, bottom: 0 }],
    xAxis: [
      {
        splitLine: "none",
        axisLine: "none",
        axisLabel: "none",
        axisTick: "none"
      }
    ],
    yAxis: [
      {
        inverse: false,
        data: xdataName,
        axisLabel: {
          verticalAlign: "bottom",
          align: "left",
          padding: [0, 0, 12, 8],
          textStyle: { color: "#515A6E", fontSize: "12" }
        },
        splitLine: "none",
        axisTick: "none",
        axisLine: "none"
      },
      {
        type: "category",
        data: dataNum,
        axisLabel: {
          padding: [0, 16, 12, 0],
          align: "right",
          verticalAlign: "bottom",
          textStyle: { color: "#515A6E", fontSize: "12", fontWeight: "bold" }
        },
        splitLine: "none",
        axisTick: "none",
        axisLine: "none"
      }
    ],
    series: [
      {
        name: "",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: bgData,
        barWidth: 8,
        itemStyle: {
          color: "#F2F3F8",
          borderRadius: 100
        },
        z: 0
      },
      {
        type: "bar",
        barWidth: 8,
        barGap: "-100%",
        data: dataNum,
        z: 1,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#CDE7FD" },
            { offset: 1, color: "#0A5DE1" }
          ]),
          borderRadius: 100
        }
      }
    ]
  };
  barPerChart.value.setOption(option);
}

function updateBarBMChart(data: StatisticsData) {
  if (!barBMChart.value) return;

  const deptData = [
    data.hseCount,
    data.jsyfcCount,
    data.gylCount,
    data.jlyxCount,
    data.djcjCount,
    data.jdyCount,
    data.rdcjCount,
    data.sysCount,
    data.scyxCount,
    data.taCount
  ];

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    grid: {
      top: 32,
      bottom: 20,
      left: 32,
      right: 0,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: departmentNames,
      axisLine: { lineStyle: { color: "rgba(81, 90, 110, 0.44)" } },
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        fontSize: 11,
        color: "#515A6E",
        rotate: 30
      }
    },
    yAxis: {
      type: "value",
      axisLabel: { show: true, fontSize: 12, color: "#515A6E" },
      axisLine: { lineStyle: { color: "rgba(81, 90, 110, 0.44)" } },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(81, 90, 110, 0.12)" } }
    },
    series: [
      {
        name: "数量",
        type: "bar",
        barWidth: 16,
        emphasis: { focus: "series" },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#0A5DE1" },
            { offset: 1, color: "#00E5FF" }
          ]),
          barBorderRadius: [100, 100, 100, 100]
        },
        label: {
          show: true,
          textStyle: {
            color: "rgba(23, 35, 61, 0.8)",
            fontSize: 12,
            fontWeight: "bold"
          },
          position: "top"
        },
        data: deptData
      }
    ]
  };
  barBMChart.value.setOption(option);
}

async function fetchData() {
  loading.value = true;
  try {
    const [startTime, endTime] = dateRange.value;
    const response = await fetch(
      `/sft/danger/danger/statistics/list.json?startTime=${formatDate(startTime)}&endTime=${formatDate(endTime)}`
    );
    const result: ApiResponse = await response.json();
    if (result.success) {
      updateBarDptChart(result.t);
      updatePieYhLevelChart(result.t);
      updatePieYhTypeChart(result.t);
      updatePieJcTypeChart(result.t);
      updateBarPerChart(result.t);
      updateBarBMChart(result.t);
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

onMounted(async () => {
  await nextTick();
  initCharts();
  fetchData();

  window.addEventListener("resize", () => {
    barDptChart.value?.resize();
    pieYhLevelChart.value?.resize();
    pieYhTypeChart.value?.resize();
    pieJcTypeChart.value?.resize();
    barPerChart.value?.resize();
    barBMChart.value?.resize();
  });
});
</script>

<template>
  <div class="statistics-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患统计</span>
          <div class="header-controls">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              size="small"
            />
            <el-button
              type="primary"
              size="small"
              :loading="loading"
              @click="handleSearch"
            >
              检索
            </el-button>
          </div>
        </div>
      </template>

      <div v-loading="loading" class="charts-container">
        <!-- 隐患统计 -->
        <div class="chart-block department">
          <div class="title">隐患统计</div>
          <div class="chart-box">
            <div
              ref="barDptRef"
              class="chart"
              style="width: 100%; height: 100%"
            />
          </div>
          <div class="legend">
            <div
              v-for="(item, index) in [
                '隐患上传',
                '隐患接收',
                '已整改',
                '整改未完成',
                '整改超期'
              ]"
              :key="index"
            >
              <span :class="`color-${index}`" />
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- 排查类型统计 -->
        <div class="chart-block pc-type">
          <div class="title">排查类型统计</div>
          <div class="chart-box">
            <div
              ref="pieJcTypeRef"
              class="chart"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>

        <!-- 个人隐患排查统计 -->
        <div class="chart-block yh-person">
          <div class="title">个人隐患排查统计</div>
          <div class="chart-box">
            <div
              ref="barPerRef"
              class="chart"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>

        <!-- 原因统计 -->
        <div class="chart-block yh-level">
          <div class="title">原因统计</div>
          <div class="chart-group">
            <div class="chart-box">
              <div
                ref="pieYhLevelRef"
                class="chart"
                style="width: 100%; height: 100%"
              />
            </div>
            <div class="tips">
              <div
                v-for="(name, index) in causeNames"
                :key="index"
                class="tip-item"
              >
                <span>{{ name }}</span>
                <span>{{
                  [
                    "sjyyCount",
                    "sgyyCount",
                    "whyyCount",
                    "syyyCount",
                    "cgyyCount",
                    "qtyyCount"
                  ][index]
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 隐患类型统计 -->
        <div class="chart-block yh-type">
          <div class="title">隐患类型统计</div>
          <div class="chart-box">
            <div
              ref="pieYhTypeRef"
              class="chart"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>

        <!-- 上报部门统计 -->
        <div class="chart-block yh-sbbm">
          <div class="title">上报部门统计</div>
          <div class="chart-box">
            <div
              ref="barBMRef"
              class="chart"
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.statistics-container {
  height: calc(100vh - 120px);
  padding: 16px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }
}

.charts-container {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 240px);
}

.chart-block {
  display: flex;
  flex-direction: column;
  padding: 12px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;

  &.department {
    grid-column: 1 / 3;
  }
}

.title {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.chart-box {
  position: relative;
  flex: 1;
  min-height: 0;
}

.chart-group {
  display: flex;
  flex: 1;
  gap: 16px;
  min-height: 0;

  .chart-box {
    flex: 1;
  }

  .tips {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    width: 120px;
  }
}

.tip-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  font-size: 12px;
  color: #606266;
  background: #f5f7fa;
  border-radius: 4px;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 8px;

  div {
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 12px;
    color: #606266;

    span:first-child {
      width: 12px;
      height: 12px;
      border-radius: 2px;

      &.color-0 {
        background: linear-gradient(
          180deg,
          rgb(10 93 225 / 100%) 0%,
          rgb(10 93 225 / 64%) 100%
        );
      }

      &.color-1 {
        background: linear-gradient(
          180deg,
          rgb(0 229 255 / 100%) 0%,
          rgb(0 229 255 / 64%) 100%
        );
      }

      &.color-2 {
        background: linear-gradient(
          180deg,
          rgb(126 229 67 / 100%) 0%,
          rgb(126 229 67 / 64%) 100%
        );
      }

      &.color-3 {
        background: linear-gradient(
          180deg,
          rgb(253 225 41 / 100%) 0%,
          rgb(253 225 41 / 64%) 100%
        );
      }

      &.color-4 {
        background: linear-gradient(
          180deg,
          rgb(255 109 69 / 100%) 0%,
          rgb(255 109 69 / 64%) 100%
        );
      }
    }
  }
}
</style>
