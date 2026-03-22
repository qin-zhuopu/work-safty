<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftTrainPlan"
});

interface PlanItem {
  id: number;
  name: string;
  planType: string;
  field: number;
  field1: number;
  field2: string;
  target: string;
  sysDeptName: string;
  field3: string;
  startTime: number;
  endTime: number;
  epNum: string;
  eaNum: string;
  eRate: string;
  tpNum: string;
  taNum: string;
  tRate: string;
  ifTest: number;
  redFlag?: number;
  userId?: number;
}

interface DeptItem {
  id: number;
  name: string;
  value: number;
  children?: DeptItem[];
}

interface PageData {
  content: PlanItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
  message?: string;
}

interface DeptResponse {
  success: boolean;
  t: DeptItem[];
}

// 培训方式选项
const trainingMethodOptions = [
  { label: "请选择", value: "" },
  { label: "培训+考核", value: 1 },
  { label: "仅培训", value: 2 },
  { label: "仅考核", value: 3 },
  { label: "线下培训+考核", value: 4 }
];

// 培训类型选项
const trainingTypeOptions = [
  { label: "请选择", value: "" },
  { label: "三级教育厂级", value: 1 },
  { label: "三级教育车间级", value: 2 },
  { label: "三级教育工段班组级", value: 3 },
  { label: "日常教育", value: 4 },
  { label: "转岗培训", value: 5 },
  { label: "复岗培训", value: 6 },
  { label: "承包商月度培训", value: 7 }
];

const tableData = ref<PlanItem[]>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 搜索表单
const searchForm = ref({
  name: "",
  field: "",
  field1: "",
  sysDeptId: ""
});

// 部门选项
const deptOptions = ref<DeptItem[]>([]);
const currentUserId = ref(112); // 默认用户ID

// 获取部门列表（扁平化）
const flatDeptOptions = computed(() => {
  function flatten(items: DeptItem[]): DeptItem[] {
    const result: DeptItem[] = [];
    items.forEach(item => {
      result.push({ id: item.id, name: item.name, value: item.value });
      if (item.children && item.children.length > 0) {
        result.push(...flatten(item.children));
      }
    });
    return result;
  }
  return flatten(deptOptions.value);
});

async function fetchDeptData() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
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
      page: String(page - 1),
      size: String(pageSize.value)
    });

    if (searchForm.value.name) {
      params.append("name", searchForm.value.name);
    }
    if (searchForm.value.field) {
      params.append("field", searchForm.value.field);
    }
    if (searchForm.value.field1) {
      params.append("field1", searchForm.value.field1);
    }
    if (searchForm.value.sysDeptId && searchForm.value.sysDeptId !== "-1") {
      params.append("sysDeptId", searchForm.value.sysDeptId);
    }

    const response = await fetch(`/sft/train/plan/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
      currentPage.value = page;
    } else {
      ElMessage.error(data.message || "获取数据失败");
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
    name: "",
    field: "",
    field1: "",
    sysDeptId: ""
  };
  fetchData(1);
}

function handlePageChange(page: number) {
  fetchData(page);
}

function getTrainingMethodLabel(field: number): string {
  const option = trainingMethodOptions.find(o => o.value === field);
  return option?.label || "";
}

function getTrainingTypeLabel(field1: number): string {
  const option = trainingTypeOptions.find(o => o.value === field1);
  return option?.label || "";
}

function formatDateTime(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD HH:mm") : "";
}

function getRateColor(rate: string): string {
  const numRate = parseFloat(rate);
  if (numRate >= 80) return "success";
  if (numRate >= 50) return "warning";
  return "danger";
}

function handlePerson(row: PlanItem) {
  if (row.userId === currentUserId.value || currentUserId.value === 2) {
    ElMessage.info("指定人员功能");
    // TODO: 跳转到指定人员页面
  } else {
    ElMessage.warning("非培训发起人，不可操作！");
  }
}

function handleCourse(row: PlanItem) {
  ElMessage.info("课件管理功能");
  // TODO: 跳转到课件管理页面
}

function handlePaper(row: PlanItem) {
  ElMessage.info("试卷管理功能");
  // TODO: 跳转到试卷管理页面
}

function handleRecord(row: PlanItem) {
  ElMessage.info("培训记录功能");
  // TODO: 跳转到培训记录页面
}

function handleEdit(row: PlanItem) {
  if (row.userId === currentUserId.value || currentUserId.value === 2) {
    ElMessage.info("编辑功能");
    // TODO: 打开编辑对话框
  } else {
    ElMessage.warning("非培训发起人，不可操作！");
  }
}

function handleDelete(row: PlanItem) {
  if (row.userId !== currentUserId.value) {
    ElMessage.warning("非培训发起人，不可操作！");
    return;
  }

  ElMessageBox.confirm(
    "该计划删除后，关联学习考试记录一并删除，请确认？",
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      ElMessage.success("删除成功！");
      // TODO: 调用删除接口
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleEvaluate(row: PlanItem) {
  ElMessage.info("效果评价功能");
  // TODO: 打开效果评价对话框
}

function getRowClassName({ row }: { row: PlanItem }) {
  return row.redFlag === 1 ? "red-flag-row" : "";
}

onMounted(() => {
  fetchDeptData();
  fetchData();
});
</script>

<template>
  <div class="plan-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">计划管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <fieldset class="search-fieldset">
        <el-form :inline="true" class="search-form">
          <el-form-item label="计划名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入计划名称"
              clearable
              style="width: 180px"
            />
          </el-form-item>
          <el-form-item label="培训方式">
            <el-select
              v-model="searchForm.field"
              placeholder="请选择"
              clearable
              style="width: 150px"
            >
              <el-option
                v-for="item in trainingMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="培训类型">
            <el-select
              v-model="searchForm.field1"
              placeholder="请选择"
              clearable
              style="width: 180px"
            >
              <el-option
                v-for="item in trainingTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发起部门">
            <el-select
              v-model="searchForm.sysDeptId"
              placeholder="发起部门"
              clearable
              style="width: 180px"
            >
              <el-option
                v-for="item in flatDeptOptions"
                :key="item.id"
                :label="item.name"
                :value="String(item.value)"
              />
            </el-select>
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
            <el-button type="success" @click="ElMessage.info('添加功能')">
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
          </el-form-item>
        </el-form>
      </fieldset>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        :row-class-name="getRowClassName"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="计划名称" min-width="150" />
        <el-table-column prop="planType" label="考试类型" min-width="150" />
        <el-table-column
          prop="field"
          label="培训方式"
          width="110"
          align="center"
        >
          <template #default="{ row }">
            {{ getTrainingMethodLabel(row.field) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field1"
          label="培训类型"
          width="150"
          align="center"
        >
          <template #default="{ row }">
            {{ getTrainingTypeLabel(row.field1) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field2"
          label="培训内容"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="target"
          label="计划目标"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="sysDeptName"
          label="发起部门"
          width="120"
          align="center"
        />
        <el-table-column
          prop="field3"
          label="授课人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="startTime"
          label="计划开始时间"
          width="160"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDateTime(row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="计划结束时间"
          width="160"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDateTime(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="学习统计" align="center">
          <el-table-column
            prop="epNum"
            label="计划人数"
            width="90"
            align="center"
          />
          <el-table-column
            prop="eaNum"
            label="完成人数"
            width="90"
            align="center"
          />
          <el-table-column
            prop="eRate"
            label="完成率"
            width="90"
            align="center"
          >
            <template #default="{ row }">
              <el-tag :type="getRateColor(row.eRate)" size="small">
                {{ row.eRate }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="考试统计" align="center">
          <el-table-column
            prop="tpNum"
            label="计划人数"
            width="90"
            align="center"
          />
          <el-table-column
            prop="taNum"
            label="完成人数"
            width="90"
            align="center"
          />
          <el-table-column
            prop="tRate"
            label="完成率"
            width="90"
            align="center"
          >
            <template #default="{ row }">
              <el-tag :type="getRateColor(row.tRate)" size="small">
                {{ row.tRate }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="320" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handlePerson(row)">
              指定人员
            </el-button>
            <el-button
              v-if="row.field !== 3"
              type="default"
              size="small"
              @click="handleCourse(row)"
            >
              课件管理
            </el-button>
            <el-button
              v-if="row.ifTest === 1"
              type="default"
              size="small"
              @click="handlePaper(row)"
            >
              试卷管理
            </el-button>
            <el-button type="info" size="small" @click="handleRecord(row)">
              培训记录
            </el-button>
            <el-button type="warning" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="handleEvaluate(row)"
            >
              效果评价
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="() => fetchData(1)"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.plan-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-fieldset {
  padding: 18px;
  margin-bottom: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.search-fieldset :deep(.el-form-item) {
  margin-bottom: 0;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

:deep(.red-flag-row) {
  font-weight: bold;
  color: red;
}
</style>
