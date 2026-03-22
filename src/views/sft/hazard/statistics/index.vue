<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import type { EChartsOption, ECharts } from "echarts";

defineOptions({
  name: "SftHazardStatistics"
});

interface ListItem {
  addUserName: string;
  yhCount: string;
}

interface StatisticsData {
  // 部门隐患统计
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
  // 原因统计
  sjyyCount: number;
  sgyyCount: number;
  whyyCount: number;
  syyyCount: number;
  cgyyCount: number;
  qtyyCount: number;
  // 隐患类型
  aqCount: number;
  xfCount: number;
  gyCount: number;
  ztCount: number;
  dqCount: number;
  sbCount: number;
  ybCount: number;
  qtCount: number;
  // 排查类型
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
  // 个人隐患上报
  list: ListItem[];
}

interface ApiResponse {
  success: boolean;
  t: StatisticsData;
}

const loading = ref(false);
const startTime = ref("2026-03-01");
const endTime = ref("2026-03-31");

// Chart instances
let barDptChart: ECharts | null = null;
let pieYhLevelChart: ECharts | null = null;
let pieYhTypeChart: ECharts | null = null;
let pieJcTypeChart: ECharts | null = null;
let barBMChart: ECharts | null = null;
let barPerChart: ECharts | null = null;

// 部门名称
const deptNames = [
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

// 排查类型名称
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

// 排查类型颜色
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

// 隐患类型颜色
const dangerTypeColors = [
  "#0A5DE1",
  "#7CA4EB",
  "#4685F0",
  "#E07BCE",
  "#FF5020",
  "#FDE129",
  "#7EE543",
  "#00E5FF"
];

const dangerTypeNames = [
  "安全",
  "消防",
  "工艺",
  "总图",
  "电气",
  "设备",
  "仪表",
  "其他"
];

// 原因统计颜色
const causeColors = [
  "#F45252",
  "#FF7F00",
  "#FFD064",
  "#4685F0",
  "#34C3C3",
  "#82CCE6"
];

const causeNames = [
  "设计原因",
  "施工原因",
  "维护原因",
  "使用原因",
  "采购原因",
  "其他"
];

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/danger/danger/statistics/list?startTime=${startTime.value}&endTime=${endTime.value}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
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

function updateCharts(data: StatisticsData) {
  // 更新部门隐患统计
  updateBarDptChart(data);

  // 更新原因统计
  updatePieYhLevelChart(data);

  // 更新隐患类型
  updatePieYhTypeChart(data);

  // 更新排查类型
  updatePieJcTypeChart(data);

  // 更新上报部门统计
  updateBarBMChart(data);

  // 更新个人隐患上报统计
  updateBarPerChart(data);
}

function updateBarDptChart(data: StatisticsData) {
  if (!barDptChart) return;

  const option: EChartsOption = {
    tooltip: {
      show: true
    },
    grid: {
      top: 32,
      bottom: 32,
      left: 0,
      right: 0
    },
    legend: {
      data: ["隐患上传", "隐患接收", "已整改", "整改未完成", "整改超期"],
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: "#515A6E"
      }
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
        show: true,
        margin: 10,
        fontSize: 12,
        color: "#515A6E"
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
        barWidth: 10,
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
        barWidth: 10,
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
        barWidth: 10,
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
        barWidth: 10,
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
        barWidth: 10,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 109, 69, 1)" },
            { offset: 1, color: "rgba(255, 109, 69, 0.64)" }
          ])
        }
      }
    ]
  };
  barDptChart.setOption(option, true);
}

function updatePieYhLevelChart(data: StatisticsData) {
  if (!pieYhLevelChart) return;

  const option: EChartsOption = {
    tooltip: {
      show: true
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "80%"],
        center: ["50%", "50%"],
        hoverAnimation: false,
        z: 10,
        label: {
          show: false
        },
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
        labelLine: {
          show: false
        }
      }
    ]
  };
  pieYhLevelChart.setOption(option);
}

function updatePieYhTypeChart(data: StatisticsData) {
  if (!pieYhTypeChart) return;

  const option: EChartsOption = {
    tooltip: {
      show: true
    },
    angleAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#DDE6ED"
        }
      },
      axisLabel: {
        show: true,
        interval: 0,
        margin: 10,
        fontSize: 12,
        color: "#33557F"
      },
      data: dangerTypeNames
    },
    radiusAxis: {},
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
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: (params: any) => dangerTypeColors[params.dataIndex]
        }
      }
    ]
  };
  pieYhTypeChart.setOption(option, true);
}

function updatePieJcTypeChart(data: StatisticsData) {
  if (!pieJcTypeChart) return;

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
    tooltip: {
      show: true
    },
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
          lineStyle: {
            color: "rgba(81, 90, 110, 0.33)"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          show: true,
          margin: 10,
          fontSize: 12,
          color: "#515A6E"
        },
        splitLine: {
          show: false
        }
      },
      { show: false }
    ],
    yAxis: {
      type: "category",
      inverse: true,
      show: false
    },
    series: [
      {
        show: true,
        type: "bar",
        barWidth: 12,
        z: 2,
        itemStyle: {
          color: (params: any) => checkTypeColors[params.dataIndex]
        },
        label: {
          show: true,
          color: "rgba(51, 85, 127, 0.66)",
          fontSize: 13,
          position: "right",
          formatter: (data: any) => tranData[data.dataIndex]
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
          fontSize: 13,
          color: "#33557F",
          formatter: (data: any) => checkTypeNames[data.dataIndex]
        },
        data: tranData
      }
    ]
  };
  pieJcTypeChart.setOption(option);
}

function updateBarBMChart(data: StatisticsData) {
  if (!barBMChart) return;

  const option: EChartsOption = {
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
      data: deptNames,
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
        fontSize: 12,
        color: "#515A6E"
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        fontSize: 12,
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
        name: "数量",
        type: "bar",
        barWidth: 16,
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#0A5DE1" },
            { offset: 1, color: "#00E5FF" }
          ]),
          barBorderRadius: [100, 100, 100, 100]
        },
        label: {
          show: true,
          color: "rgba(23, 35, 61, 0.8)",
          fontSize: 13,
          fontWeight: "bold",
          position: "top"
        },
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
        ]
      }
    ]
  };
  barBMChart.setOption(option);
}

function updateBarPerChart(data: StatisticsData) {
  if (!barPerChart || !data.list) return;

  const dataArr = data.list.map(item => ({
    name: item.addUserName,
    num: parseFloat(item.yhCount)
  }));

  // 排序
  const sortedArr = [...dataArr].sort((a, b) => a.num - b.num);

  const xdataName = sortedArr.map(v => v.name);
  const dataNum = sortedArr.map(v => ({ value: v.num }));
  const maxVal = Math.max(...sortedArr.map(v => v.num));
  const bgData = dataNum.map(() => maxVal + 0.5);

  const option: EChartsOption = {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    xAxis: {
      splitLine: "none" as const,
      axisLine: "none" as const,
      axisLabel: "none" as const,
      axisTick: "none" as const
    },
    yAxis: [
      {
        inverse: false,
        data: xdataName,
        axisLabel: {
          verticalAlign: "bottom" as const,
          align: "left",
          padding: [0, 0, 12, 8],
          color: "#515A6E",
          fontSize: 13
        },
        splitLine: "none" as const,
        axisTick: "none" as const,
        axisLine: "none" as const
      },
      {
        type: "category",
        data: dataNum,
        axisLabel: {
          padding: [0, 16, 12, 0],
          align: "right",
          verticalAlign: "bottom" as const,
          color: "#515A6E",
          fontSize: 13,
          fontWeight: "bold"
        },
        splitLine: "none" as const,
        axisTick: "none" as const,
        axisLine: "none" as const
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
  barPerChart.setOption(option);
}

function initCharts() {
  // 隐患统计柱状图
  const barDptEl = document.getElementById("bar-dpt");
  if (barDptEl) {
    barDptChart = echarts.init(barDptEl);
  }

  // 原因统计饼图
  const pieYhLevelEl = document.getElementById("pie-yh-level");
  if (pieYhLevelEl) {
    pieYhLevelChart = echarts.init(pieYhLevelEl);
  }

  // 隐患类型极坐标图
  const pieYhTypeEl = document.getElementById("pie-yh-type");
  if (pieYhTypeEl) {
    pieYhTypeChart = echarts.init(pieYhTypeEl);
  }

  // 排查类型条形图
  const pieJcTypeEl = document.getElementById("bar-pc-type");
  if (pieJcTypeEl) {
    pieJcTypeChart = echarts.init(pieJcTypeEl);
  }

  // 上报部门统计
  const barBMEl = document.getElementById("barBM");
  if (barBMEl) {
    barBMChart = echarts.init(barBMEl);
  }

  // 个人隐患排查统计
  const barPerEl = document.getElementById("barPer");
  if (barPerEl) {
    barPerChart = echarts.init(barPerEl);
  }

  // 监听窗口大小变化
  window.addEventListener("resize", handleResize);
}

function handleResize() {
  barDptChart?.resize();
  pieYhLevelChart?.resize();
  pieYhTypeChart?.resize();
  pieJcTypeChart?.resize();
  barBMChart?.resize();
  barPerChart?.resize();
}

function handleSearch() {
  fetchData();
}

onMounted(() => {
  initCharts();
  fetchData();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  barDptChart?.dispose();
  pieYhLevelChart?.dispose();
  pieYhTypeChart?.dispose();
  pieJcTypeChart?.dispose();
  barBMChart?.dispose();
  barPerChart?.dispose();
});
</script>

<template>
  <div class="hazard-statistics-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患统计</span>
          <div class="search-form">
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="开始时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="date-picker"
            />
            <span class="date-separator">至</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="结束时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="date-picker"
            />
            <el-button type="primary" :loading="loading" @click="handleSearch">
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
            <div id="bar-dpt" class="chart" />
          </div>
          <div class="legend">
            <div
              v-for="item in [
                '隐患上传',
                '隐患接收',
                '已整改',
                '整改未完成',
                '整改超期'
              ]"
              :key="item"
            >
              <span class="dot" :class="`dot-${item}`" />
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- 排查类型统计 -->
        <div class="chart-block pc-type">
          <div class="title">排查类型统计</div>
          <div class="chart-box">
            <div id="bar-pc-type" class="chart" />
          </div>
        </div>

        <!-- 个人隐患排查统计 -->
        <div class="chart-block yh-person">
          <div class="title">个人隐患排查统计</div>
          <div class="chart-box">
            <div id="barPer" class="chart" />
          </div>
        </div>

        <!-- 原因统计 -->
        <div class="chart-block yh-level">
          <div class="title">原因统计</div>
          <div class="chart-group">
            <div class="chart-box">
              <div id="pie-yh-level" class="chart" />
            </div>
            <div class="tips">
              <div class="tip-item">
                <span>设计原因</span>
                <span id="sjyyCount" />
              </div>
              <div class="tip-item">
                <span>施工原因</span>
                <span id="sgyyCount" />
              </div>
              <div class="tip-item">
                <span>维护原因</span>
                <span id="whyyCount" />
              </div>
              <div class="tip-item">
                <span>使用原因</span>
                <span id="syyyCount" />
              </div>
              <div class="tip-item">
                <span>采购原因</span>
                <span id="cgyyCount" />
              </div>
              <div class="tip-item">
                <span>其他原因</span>
                <span id="qtyyCount" />
              </div>
            </div>
          </div>
        </div>

        <!-- 隐患类型统计 -->
        <div class="chart-block yh-type">
          <div class="title">隐患类型统计</div>
          <div class="chart-box">
            <div id="pie-yh-type" class="chart" />
          </div>
        </div>

        <!-- 上报部门统计 -->
        <div class="chart-block yh-sbbm">
          <div class="title">上报部门统计</div>
          <div class="chart-box">
            <div id="barBM" class="chart" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.hazard-statistics-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search-form {
    display: flex;
    gap: 8px;
    align-items: center;

    .date-picker {
      width: 140px;
    }

    .date-separator {
      color: var(--el-text-color-secondary);
    }
  }
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.chart-block {
  min-height: 280px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;

  @media (width <= 1400px) {
    min-height: 240px;

    .chart-box {
      height: 180px;
    }
  }

  &.department {
    grid-column: span 2;
  }

  .title {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #17263d;
  }

  .chart-box {
    position: relative;
    height: 220px;
  }

  .chart {
    width: 100%;
    height: 100%;
  }

  .legend {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-top: 16px;

    div {
      display: flex;
      gap: 6px;
      align-items: center;
      font-size: 13px;
      color: #515a6e;

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 2px;

        &.dot-隐患上传 {
          background: linear-gradient(
            180deg,
            rgb(10 93 225 / 100%) 0%,
            rgb(10 93 225 / 64%) 100%
          );
        }

        &.dot-隐患接收 {
          background: linear-gradient(
            180deg,
            rgb(0 229 255 / 100%) 0%,
            rgb(0 229 255 / 64%) 100%
          );
        }

        &.dot-已整改 {
          background: linear-gradient(
            180deg,
            rgb(126 229 67 / 100%) 0%,
            rgb(126 229 67 / 64%) 100%
          );
        }

        &.dot-整改未完成 {
          background: linear-gradient(
            180deg,
            rgb(253 225 41 / 100%) 0%,
            rgb(253 225 41 / 64%) 100%
          );
        }

        &.dot-整改超期 {
          background: linear-gradient(
            180deg,
            rgb(255 109 69 / 100%) 0%,
            rgb(255 109 69 / 64%) 100%
          );
        }
      }
    }
  }

  .chart-group {
    display: flex;
    gap: 16px;

    .chart-box {
      flex: 1;
    }

    .tips {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 120px;

      .tip-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13px;
        color: #515a6e;

        span:last-child {
          font-weight: bold;
          color: #17263d;
        }
      }
    }
  }
}
</style>
