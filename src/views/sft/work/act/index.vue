<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftWorkAct"
});

interface WorkActItem {
  beginTime: number;
  content: string;
  dept: string;
  doc: string;
  docs: string;
  endTime: number;
  environment: string;
  eval?: number;
  fzUserName: string;
  id: string;
  jsaNo: string;
  measures: string;
  nodeStatus?: string;
  operatUnit: string;
  passTime?: number;
  scopeLicense: string;
  status: string;
}

interface DeptItem {
  id: number;
  name: string;
  value: number;
  children?: DeptItem[];
}

interface ApiResponse {
  success: boolean;
  t: {
    content: WorkActItem[];
    totalElements: number;
  };
}

interface DeptResponse {
  success: boolean;
  t: DeptItem[];
}

const tableData = ref<WorkActItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchFormRef = ref<FormInstance>();
const searchForm = ref({
  deptId: "",
  operatUnit: "",
  docs: "",
  status: "",
  eval: "",
  startTime: "",
  endTime: ""
});

const deptOptions = ref<DeptItem[]>([]);

const docOptions = [
  { label: "动火", value: "DH" },
  { label: "受限", value: "SX" },
  { label: "高处检维修", value: "GC" },
  { label: "高处架设", value: "GCJS" },
  { label: "临电", value: "LD" },
  { label: "盲板", value: "Mb" },
  { label: "吊装", value: "DZ" },
  { label: "动土", value: "DT" },
  { label: "断路", value: "DL" },
  { label: "检维修", value: "JWX" }
];

const statusOptions = [
  { label: "审核中", value: "审核中" },
  { label: "已审核", value: "已审核" },
  { label: "已驳回", value: "已驳回" },
  { label: "作废", value: "作废" }
];

const evalOptions = [
  { label: "已评价", value: "1" },
  { label: "未评价", value: "0" }
];

// 格式化时间
function formatTime(timestamp?: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 获取评价状态
function getEvalStatus(row: WorkActItem): {
  text: string;
  type: "success" | "warning" | "danger" | "info";
} {
  if (row.eval) {
    return { text: "已评价", type: "success" };
  }
  if (row.passTime) {
    const now = Date.now();
    const hours = (now - row.passTime) / (1000 * 60 * 60);
    if (hours >= 24) {
      return { text: "未评价", type: "danger" };
    }
  }
  return { text: "未评价", type: "info" };
}

// 获取状态标签类型
function getStatusType(
  status: string
): "success" | "warning" | "danger" | "info" {
  switch (status) {
    case "已审核":
      return "success";
    case "审核中":
      return "warning";
    case "已驳回":
      return "danger";
    case "作废":
      return "info";
    default:
      return "info";
  }
}

// 获取部门列表
async function fetchDeptList() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data: DeptResponse = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取部门列表失败", error);
  }
}

// 获取表格数据
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(pageSize.value)
    });

    if (searchForm.value.deptId && searchForm.value.deptId !== "-1") {
      params.append("deptId", searchForm.value.deptId);
    }
    if (searchForm.value.operatUnit) {
      params.append("operatUnit", searchForm.value.operatUnit);
    }
    if (searchForm.value.docs) {
      params.append("docs", searchForm.value.docs);
    }
    if (searchForm.value.status) {
      params.append("status", searchForm.value.status);
    }
    if (searchForm.value.eval !== "") {
      params.append("eval", searchForm.value.eval);
    }
    if (searchForm.value.startTime) {
      params.append("startTime", searchForm.value.startTime);
    }
    if (searchForm.value.endTime) {
      params.append("endTime", searchForm.value.endTime);
    }

    const response = await fetch(`/sft/work/act/list.json?${params}`);
    const data: ApiResponse = await response.json();
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

// 检索
function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

// 重置
function handleReset() {
  searchFormRef.value?.resetFields();
  searchForm.value = {
    deptId: "",
    operatUnit: "",
    docs: "",
    status: "",
    eval: "",
    startTime: "",
    endTime: ""
  };
  currentPage.value = 1;
  fetchData();
}

// 新建
function handleAdd() {
  ElMessage.info("新建功能待实现");
}

// 导出
function handleExport() {
  ElMessage.info("导出功能待实现");
}

// 详情
function handleDetail(row: WorkActItem) {
  ElMessage.info(`查看详情: ${row.jsaNo}`);
}

// 删除
function handleDelete(row: WorkActItem) {
  ElMessageBox.confirm("确认删除活动及作业票？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {});
}

// 安全分析
function handleSafetyAnalysis(row: WorkActItem) {
  ElMessage.info(`安全分析: ${row.jsaNo}`);
}

// 作业评价
function handleEvaluation(row: WorkActItem) {
  ElMessage.info(`作业评价: ${row.jsaNo}`);
}

// 审批流
function handleApprove(row: WorkActItem) {
  ElMessage.info(`审批流: ${row.jsaNo}`);
}

// 作业票
function handleDoc(row: WorkActItem) {
  ElMessage.info(`作业票: ${row.jsaNo}`);
}

// 二维码
function handleQrcode(row: WorkActItem) {
  ElMessage.info(`二维码: ${row.jsaNo}`);
}

// 分页变化
function handleCurrentChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

onMounted(() => {
  fetchDeptList();
  fetchData();
});
</script>

<template>
  <div class="act-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">作业活动</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline
        class="search-form"
      >
        <el-form-item label="申请单位" prop="deptId">
          <el-select
            v-model="searchForm.deptId"
            placeholder="请选择部门"
            clearable
            filterable
            style="width: 200px"
          >
            <el-option label="请选择部门" value="-1" />
            <el-option
              v-for="dept in deptOptions"
              :key="dept.id"
              :label="dept.name"
              :value="String(dept.value)"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="作业单位" prop="operatUnit">
          <el-input
            v-model="searchForm.operatUnit"
            placeholder="请输入作业单位"
            clearable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="类型" prop="docs">
          <el-select
            v-model="searchForm.docs"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option
              v-for="item in docOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="审核状态" prop="status">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="评价状态" prop="eval">
          <el-select
            v-model="searchForm.eval"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option
              v-for="item in evalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="datetime"
            placeholder="开始日期"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            style="width: 160px"
          />
          <span class="date-separator">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="datetime"
            placeholder="结束日期"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            style="width: 160px"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch"> 检索 </el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleAdd">新建</el-button>
          <el-button @click="handleExport">导出</el-button>
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
        <el-table-column prop="jsaNo" label="编号" min-width="150" />
        <el-table-column prop="fzUserName" label="项目负责人" width="120" />
        <el-table-column prop="dept" label="申请单位" min-width="150" />
        <el-table-column prop="operatUnit" label="作业单位" min-width="180" />
        <el-table-column
          prop="scopeLicense"
          label="许可范围"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="environment"
          label="作业环境及注意事项"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="measures"
          label="防范、应急措施"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column label="评价状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getEvalStatus(row).type">
              {{ getEvalStatus(row).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="作业内容"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column prop="docs" label="类型" width="120" />
        <el-table-column label="审批状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.nodeStatus || row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="预计作业开始时间" width="160" align="center">
          <template #default="{ row }">
            {{ formatTime(row.beginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="预计作业完成时间" width="160" align="center">
          <template #default="{ row }">
            {{ formatTime(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="实际作业完成时间" width="160" align="center">
          <template #default="{ row }">
            {{ formatTime(row.passTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDetail(row)"
            >
              详情
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
              type="primary"
              size="small"
              @click="handleSafetyAnalysis(row)"
            >
              安全分析
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEvaluation(row)"
            >
              作业评价
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleApprove(row)"
            >
              审批流
            </el-button>
            <el-button link type="primary" size="small" @click="handleDoc(row)">
              作业票
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleQrcode(row)"
            >
              二维码
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.act-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  .el-form-item {
    margin-bottom: 12px;
  }
}

.date-separator {
  margin: 0 8px;
  color: var(--el-text-color-secondary);
}
</style>
