<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftRiskControl"
});

interface RiskTarget {
  id: string;
  name: string;
}

interface Dept {
  id: string;
  name: string;
}

interface RiskControlItem {
  id: string;
  name: string;
  type: string;
  eventName: string;
  evalMethod: string;
  address: string;
  evaLevel: string;
  fixedLevel: string;
  controLevel: string;
  controRank: string;
  target: RiskTarget;
  dept: Dept;
  ushow: string;
  pointsName: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: RiskControlItem[];
    totalElements: number;
    total: number;
  };
}

interface DeptItem {
  id: string;
  name: string;
  children?: DeptItem[];
}

interface DeptResponse {
  success: boolean;
  t: DeptItem[];
}

const tableData = ref<RiskControlItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = ref({
  target: "",
  name: "",
  type1: "",
  controRank: "",
  departmentId: ""
});

const deptOptions = ref<DeptItem[]>([]);
const selectedDeptName = computed(() => {
  if (!searchForm.value.departmentId) return "";
  const findDept = (items: DeptItem[]): string | null => {
    for (const item of items) {
      if (item.id === searchForm.value.departmentId) return item.name;
      if (item.children) {
        const found = findDept(item.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findDept(deptOptions.value) || "";
});

async function fetchDeptData() {
  try {
    const response = await fetch("/sft/sys/dept/top.json");
    const data: DeptResponse = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取部门数据失败:", error);
  }
}

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize.value),
      ...(searchForm.value.target && { target: searchForm.value.target }),
      ...(searchForm.value.name && { name: searchForm.value.name }),
      ...(searchForm.value.type1 && { type1: searchForm.value.type1 }),
      ...(searchForm.value.controRank && {
        controRank: searchForm.value.controRank
      }),
      ...(searchForm.value.departmentId && {
        deptId: searchForm.value.departmentId
      })
    });

    const response = await fetch(`/sft/risk/control/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements || data.t.total || 0;
      currentPage.value = page;
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
  fetchData(1);
}

function handleReset() {
  searchForm.value = {
    target: "",
    name: "",
    type1: "",
    controRank: "",
    departmentId: ""
  };
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("新建功能待实现");
}

function handleDelete(row: RiskControlItem) {
  ElMessageBox.confirm("确认删除该数据？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleEdit(row: RiskControlItem) {
  ElMessage.info("编辑功能待实现");
}

function handleTask(row: RiskControlItem) {
  ElMessage.info("管控任务功能待实现");
}

function handlePoints(row: RiskControlItem) {
  ElMessage.info("选点功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function getLevelType(level: string) {
  switch (level) {
    case "一级":
      return "danger";
    case "二级":
      return "warning";
    case "三级":
      return "";
    case "四级":
      return "primary";
    default:
      return "info";
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case "一级":
      return "#F56C6C";
    case "二级":
      return "#E6A23C";
    case "三级":
      return "#F4D03F";
    case "四级":
      return "#409EFF";
    default:
      return "#909399";
  }
}

onMounted(() => {
  fetchDeptData();
  fetchData();
});
</script>

<template>
  <div class="risk-control-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">风险分级管控</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="风险分析对象">
          <el-input
            v-model="searchForm.target"
            placeholder="风险分析对象"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="风险分析单元名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入风险分析单元名称"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="searchForm.type1"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option label="作业活动类" value="作业活动类" />
            <el-option label="设备设施类" value="设备设施类" />
          </el-select>
        </el-form-item>
        <el-form-item label="管控层级">
          <el-select
            v-model="searchForm.controRank"
            placeholder="请选择"
            clearable
            style="width: 130px"
          >
            <el-option label="公司级" value="公司级" />
            <el-option label="处室级" value="处室级" />
            <el-option label="车间级" value="车间级" />
            <el-option label="工段班组岗位级" value="工段班组岗位级" />
          </el-select>
        </el-form-item>
        <el-form-item label="责任部门">
          <el-cascader
            v-model="searchForm.departmentId"
            :options="deptOptions"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              checkStrictly: true,
              emitPath: false
            }"
            placeholder="请选择部门"
            clearable
            filterable
            style="width: 200px"
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
          <el-button type="success" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新建
          </el-button>
          <el-button type="danger" @click="handleExport">
            <el-icon><Download /></el-icon>
            下载模板
          </el-button>
          <el-button type="primary" @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入
          </el-button>
          <el-button type="warning" @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column label="风险分析对象" min-width="120">
          <template #default="{ row }">
            {{ row.target?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="风险分析单元名称" min-width="150" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column
          prop="eventName"
          label="风险事件名称"
          min-width="120"
        />
        <el-table-column prop="evalMethod" label="评价方法" width="100" />
        <el-table-column prop="address" label="风险位置" width="120" />
        <el-table-column label="风险等级（剩余）" width="130" align="center">
          <template #default="{ row }">
            <el-tag
              v-if="row.evaLevel"
              :type="getLevelType(row.evaLevel)"
              :style="{
                backgroundColor: getLevelColor(row.evaLevel),
                color: '#fff',
                border: 'none'
              }"
            >
              {{ row.evaLevel }}
            </el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="风险等级（固有）" width="130" align="center">
          <template #default="{ row }">
            <el-tag
              v-if="row.fixedLevel"
              :type="getLevelType(row.fixedLevel)"
              :style="{
                backgroundColor: getLevelColor(row.fixedLevel),
                color: '#fff',
                border: 'none'
              }"
            >
              {{ row.fixedLevel }}
            </el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="controLevel" label="管控级别" width="100" />
        <el-table-column prop="controRank" label="管控层级" width="100" />
        <el-table-column label="责任部门" width="120">
          <template #default="{ row }">
            {{ row.dept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="ushow" label="责任人" width="100" />
        <el-table-column prop="pointsName" label="三维位置" width="100" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              link
              type="success"
              size="small"
              @click="handleTask(row)"
            >
              管控任务
            </el-button>
            <el-button
              link
              type="success"
              size="small"
              @click="handlePoints(row)"
            >
              选点
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="fetchData"
        @size-change="() => fetchData(1)"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.risk-control-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}
</style>
