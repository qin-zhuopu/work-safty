<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftDangerAnalysis"
});

interface AnalysisItem {
  deptId: number;
  deptName: string;
  parentId: number;
  up: number;
  receive?: number;
  finish?: number;
  rate?: string;
  children?: AnalysisItem[];
}

interface ApiResponse {
  code: number;
  data: AnalysisItem[];
  msg: string;
}

const tableData = ref<AnalysisItem[]>([]);
const loading = ref(false);
const expandedRows = ref<AnalysisItem[]>([]);
const dateRange = reactive({
  beginTime: dayjs().subtract(21, "day").format("YYYY-MM-DD"),
  endTime: dayjs().format("YYYY-MM-DD")
});

// 将扁平数据转换为树形结构
function buildTree(data: AnalysisItem[]): AnalysisItem[] {
  const map = new Map<number, AnalysisItem>();
  const roots: AnalysisItem[] = [];

  // 初始化 map
  data.forEach(item => {
    map.set(item.deptId, { ...item, children: [] });
  });

  // 构建树
  data.forEach(item => {
    const node = map.get(item.deptId)!;
    if (item.parentId === -1 || !map.has(item.parentId)) {
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
  });

  return roots;
}

// 扁平化树形数据用于表格展示
function flattenTree(data: AnalysisItem[], level = 0): AnalysisItem[] {
  const result: AnalysisItem[] = [];
  data.forEach(item => {
    result.push({ ...item, _level: level } as AnalysisItem & {
      _level?: number;
    });
    if (item.children && item.children.length > 0) {
      result.push(...flattenTree(item.children, level + 1));
    }
  });
  return result;
}

const flatTableData = computed(() => flattenTree(tableData.value));

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      beginTime: dateRange.beginTime,
      endTime: dateRange.endTime
    });
    const response = await fetch(`/sft/danger/danger/analysis.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.code === 0) {
      tableData.value = buildTree(data.data);
      // 默认展开所有节点
      expandedRows.value = [...tableData.value];
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

function handleExport() {
  const params = new URLSearchParams({
    beginTime: dateRange.beginTime,
    endTime: dateRange.endTime
  });
  window.open(`/sft/danger/danger/exportAnalysis?${params}`, "_blank");
}

function handleExpandChange(row: AnalysisItem, expandedRows: AnalysisItem[]) {
  console.log("展开/折叠:", row.deptName);
}

function getRateClass(rate?: string): string {
  if (!rate) return "";
  const numRate = parseFloat(rate);
  if (numRate >= 90) return "text-green-600";
  if (numRate >= 80) return "text-blue-600";
  if (numRate >= 60) return "text-orange-500";
  return "text-red-500";
}

function hasChildren(row: AnalysisItem): boolean {
  return !!(row.children && row.children.length > 0);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="analysis-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患统计分析</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true">
          <el-form-item label="上传日期">
            <el-date-picker
              v-model="dateRange.beginTime"
              type="date"
              placeholder="开始日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 140px"
            />
            <span class="mx-2">—</span>
            <el-date-picker
              v-model="dateRange.endTime"
              type="date"
              placeholder="结束日期"
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
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="flatTableData"
        stripe
        border
        style="width: 100%"
        row-key="deptId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :expand-row-keys="expandedRows.map(r => String(r.deptId))"
        @expand-change="handleExpandChange"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="deptName"
          label="部门/车间"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="up"
          label="上传隐患"
          width="120"
          align="center"
        />
        <el-table-column
          prop="receive"
          label="接收隐患"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ row.receive ?? "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="finish"
          label="整改完成"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ row.finish ?? "-" }}
          </template>
        </el-table-column>
        <el-table-column label="整改率" width="120" align="center">
          <template #default="{ row }">
            <span v-if="row.rate" :class="getRateClass(row.rate)">
              {{ row.rate }}
            </span>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.analysis-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
