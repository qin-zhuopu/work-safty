<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, type FormInstance } from "element-plus";

defineOptions({
  name: "SftInspRecord"
});

// 指标数据项接口
interface ExtDataItem {
  extData: string;
  inspectionSiteQuota: {
    name: string;
    type: number; // 1-数值, 2-判断, 其他-单选/多选/文本
    min: number;
    max: number;
    ext: string;
  };
}

// 记录项接口
interface RecordItem {
  etime: number;
  exts: ExtDataItem[];
  id: number;
  latitude: number;
  longitude: number;
  overdue: number; // 0-未开始, 1-延期, 2-准时
  pname: string;
  ptime: number;
  scode: string;
  sname: string;
  status: number; // 0-未巡检, 1-正常, 2-隐患, 3-异常审批-通过
  stime: number;
  teams: number; // 1-甲, 2-乙, 3-丙, 4-丁, 5-长白班
  tname: string;
  time?: number;
  uhow?: string;
  imgs?: string;
  remarks?: string;
}

// 部门接口
interface DeptItem {
  id: number;
  name: string;
  value: number;
  children?: DeptItem[];
}

// 巡检任务接口
interface TaskItem {
  id: number;
  name: string;
}

// 分页响应接口
interface PageResponse {
  success: boolean;
  t: {
    content: RecordItem[];
    totalElements: number;
  };
}

// 查询参数
interface QueryParams {
  startTime: string;
  endTime: string;
  inspTaskId: string;
  deptId: string;
  teams: string;
  stat: string;
  page: number;
  size: number;
}

const tableData = ref<RecordItem[]>([]);
const loading = ref(false);
const total = ref(0);

// 查询表单
const queryForm = ref<QueryParams>({
  startTime: "",
  endTime: "",
  inspTaskId: "-1",
  deptId: "-1",
  teams: "-1",
  stat: "-1",
  page: 1,
  size: 20
});

// 部门选项
const deptOptions = ref<DeptItem[]>([]);
// 巡检线路选项
const taskOptions = ref<TaskItem[]>([]);
// 班组选项
const teamsOptions = [
  { label: "全部", value: "-1" },
  { label: "甲", value: "1" },
  { label: "乙", value: "2" },
  { label: "丙", value: "3" },
  { label: "丁", value: "4" },
  { label: "长白班", value: "5" }
];
// 状态选项
const statOptions = [
  { label: "全部", value: "-1" },
  { label: "未巡检", value: "0" },
  { label: "指标异常", value: "2" }
];

// 指标详情弹窗
const quotaDialogVisible = ref(false);
const quotaDetailData = ref<ExtDataItem[]>([]);

// 获取记录列表
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    params.append("page", String(queryForm.value.page));
    params.append("size", String(queryForm.value.size));
    if (queryForm.value.startTime) {
      params.append("startTime", queryForm.value.startTime);
    }
    if (queryForm.value.endTime) {
      params.append("endTime", queryForm.value.endTime);
    }
    if (queryForm.value.inspTaskId !== "-1") {
      params.append("taskId", queryForm.value.inspTaskId);
    }
    if (queryForm.value.deptId !== "-1") {
      params.append("deptId", queryForm.value.deptId);
    }
    if (queryForm.value.teams !== "-1") {
      params.append("teams", queryForm.value.teams);
    }
    if (queryForm.value.stat !== "-1") {
      params.append("stat", queryForm.value.stat);
    }

    const response = await fetch(`/sft/insp/record/list?${params.toString()}`);
    const data: PageResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
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

// 获取部门列表
async function fetchDeptList() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取部门列表失败", error);
  }
}

// 获取巡检线路列表
async function fetchTaskList() {
  try {
    const response = await fetch("/sft/insp/task/all.json");
    const data = await response.json();
    if (data.success) {
      taskOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取巡检线路列表失败", error);
  }
}

// 检索
function handleSearch() {
  queryForm.value.page = 1;
  fetchData();
}

// 重置
function handleReset() {
  queryForm.value = {
    startTime: "",
    endTime: "",
    inspTaskId: "-1",
    deptId: "-1",
    teams: "-1",
    stat: "-1",
    page: 1,
    size: 20
  };
  fetchData();
}

// 导出
function handleExport() {
  const params = new URLSearchParams();
  if (queryForm.value.startTime) {
    params.append("startTime", queryForm.value.startTime);
  }
  if (queryForm.value.endTime) {
    params.append("endTime", queryForm.value.endTime);
  }
  if (queryForm.value.inspTaskId !== "-1") {
    params.append("taskId", queryForm.value.inspTaskId);
  }
  if (queryForm.value.deptId !== "-1") {
    params.append("deptId", queryForm.value.deptId);
  }
  if (queryForm.value.stat !== "-1") {
    params.append("stat", queryForm.value.stat);
  }
  if (queryForm.value.teams !== "-1") {
    params.append("teams", queryForm.value.teams);
  }
  window.open(`/sft/insp/record/export?${params.toString()}`, "_blank");
}

// 分页大小改变
function handleSizeChange(size: number) {
  queryForm.value.size = size;
  fetchData();
}

// 页码改变
function handleCurrentChange(page: number) {
  queryForm.value.page = page;
  fetchData();
}

// 格式化时间
function formatTime(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 格式化日期
function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 获取状态文本
function getStatusText(status: number): string {
  switch (status) {
    case 1:
      return "正常";
    case 2:
      return "隐患";
    case 3:
      return "异常审批-通过";
    default:
      return "";
  }
}

// 获取状态类型
function getStatusType(status: number): "success" | "danger" | "warning" | "" {
  switch (status) {
    case 1:
      return "success";
    case 2:
      return "danger";
    case 3:
      return "warning";
    default:
      return "";
  }
}

// 获取延期状态文本
function getOverdueText(overdue: number): string {
  switch (overdue) {
    case 1:
      return "延期";
    case 2:
      return "准时";
    default:
      return "";
  }
}

// 获取延期状态类型
function getOverdueType(overdue: number): "danger" | "success" | "" {
  switch (overdue) {
    case 1:
      return "danger";
    case 2:
      return "success";
    default:
      return "";
  }
}

// 获取班组名称
function getTeamsName(teams: number): string {
  switch (teams) {
    case 1:
      return "甲";
    case 2:
      return "乙";
    case 3:
      return "丙";
    case 4:
      return "丁";
    case 5:
      return "长白班";
    default:
      return "";
  }
}

// 判断指标数据是否异常
function hasAbnormalQuota(exts: ExtDataItem[]): boolean {
  if (!exts || exts.length === 0) return false;
  return exts.some(item => {
    const quota = item.inspectionSiteQuota;
    if (quota.type === 1) {
      // 数值类型
      return (
        quota.min > Number(item.extData) || Number(item.extData) > quota.max
      );
    } else if (quota.type === 2) {
      // 判断类型
      return item.extData !== "是";
    }
    return false;
  });
}

// 获取指标数据状态文本
function getQuotaStatusText(exts: ExtDataItem[]): string {
  return hasAbnormalQuota(exts) ? "异常" : "正常";
}

// 获取指标数据状态类型
function getQuotaStatusType(exts: ExtDataItem[]): "success" | "danger" | "" {
  return hasAbnormalQuota(exts) ? "danger" : "success";
}

// 查看指标数据详情
function handleViewQuota(exts: ExtDataItem[]) {
  quotaDetailData.value = exts;
  quotaDialogVisible.value = true;
}

// 初始化
onMounted(() => {
  // 设置默认时间为今天
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  queryForm.value.startTime = `${year}-${month}-${day}`;

  fetchDeptList();
  fetchTaskList();
  fetchData();
});
</script>

<template>
  <div class="record-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">巡检记录管理</span>
        </div>
      </template>

      <!-- 查询表单 -->
      <el-form :model="queryForm" inline class="query-form">
        <el-form-item label="日期">
          <el-date-picker
            v-model="queryForm.startTime"
            type="date"
            placeholder="开始时间"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">—</span>
          <el-date-picker
            v-model="queryForm.endTime"
            type="date"
            placeholder="结束时间"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="巡检线路">
          <el-select
            v-model="queryForm.inspTaskId"
            placeholder="请选择巡检线路"
            filterable
            style="width: 200px"
          >
            <el-option label="请选择巡检线路" value="-1" />
            <el-option
              v-for="task in taskOptions"
              :key="task.id"
              :label="task.name"
              :value="String(task.id)"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="巡检班组">
          <el-cascader
            v-model="queryForm.deptId"
            :options="deptOptions"
            :props="{
              value: 'value',
              label: 'name',
              children: 'children',
              checkStrictly: true,
              emitPath: false
            }"
            placeholder="请选择巡检班组"
            clearable
            style="width: 250px"
          />
        </el-form-item>

        <el-form-item label="班组">
          <el-select v-model="queryForm.teams" style="width: 100px">
            <el-option
              v-for="item in teamsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="queryForm.stat" style="width: 120px">
            <el-option
              v-for="item in statOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><icon-ep-search /></el-icon>
            检索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><icon-ep-refresh-left /></el-icon>
            重置
          </el-button>
          <el-button @click="handleExport">
            <el-icon><icon-ep-download /></el-icon>
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
        <el-table-column
          prop="ptime"
          label="计划日期"
          width="110"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.ptime) }}
          </template>
        </el-table-column>
        <el-table-column prop="tname" label="巡检任务" width="150" />
        <el-table-column prop="sname" label="巡检点" width="150" />
        <el-table-column
          prop="stime"
          label="开始时间"
          width="160"
          align="center"
        >
          <template #default="{ row }">
            {{ formatTime(row.stime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="etime"
          label="结束时间"
          width="160"
          align="center"
        >
          <template #default="{ row }">
            {{ formatTime(row.etime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="上报时间"
          width="160"
          align="center"
        >
          <template #default="{ row }">
            {{ row.time ? formatTime(row.time) : "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ushow"
          label="上报人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="status"
          label="检查状态"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <el-tag v-if="row.status" :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="exts"
          label="指标数据"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              v-if="row.exts && row.exts.length > 0"
              link
              :type="getQuotaStatusType(row.exts)"
              @click="handleViewQuota(row.exts)"
            >
              {{ getQuotaStatusText(row.exts) }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="overdue"
          label="是否延期"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag v-if="row.overdue" :type="getOverdueType(row.overdue)">
              {{ getOverdueText(row.overdue) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="teams" label="班组" width="80" align="center">
          <template #default="{ row }">
            {{ getTeamsName(row.teams) }}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" min-width="150" />
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryForm.page"
          v-model:page-size="queryForm.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 指标数据详情弹窗 -->
    <el-dialog v-model="quotaDialogVisible" title="指标数据详情" width="700px">
      <el-table :data="quotaDetailData" border>
        <el-table-column prop="inspectionSiteQuota.name" label="指标数据" />
        <el-table-column label="实际数据" min-width="120">
          <template #default="{ row }">
            <span
              v-if="
                row.inspectionSiteQuota.type === 1 &&
                (row.inspectionSiteQuota.min > Number(row.extData) ||
                  Number(row.extData) > row.inspectionSiteQuota.max)
              "
              class="text-red-500"
            >
              "{{ row.extData }}"
            </span>
            <span
              v-else-if="
                row.inspectionSiteQuota.type === 2 && row.extData !== '是'
              "
              class="text-red-500"
            >
              {{ row.extData }}
            </span>
            <span v-else>{{ row.extData }}</span>
          </template>
        </el-table-column>
        <el-table-column label="正常数据" min-width="120">
          <template #default="{ row }">
            <span v-if="row.inspectionSiteQuota.type === 1">
              {{ row.inspectionSiteQuota.min }}-{{
                row.inspectionSiteQuota.max
              }}
            </span>
            <span v-else-if="row.inspectionSiteQuota.type === 2">是</span>
            <span v-else>{{ row.inspectionSiteQuota.ext }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.record-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.query-form {
  margin-bottom: 16px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
