<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftWorkDocIndex"
});

interface Doc {
  id: string;
  title: string;
  docNo: string;
  status: string;
  nodeName: string;
  dept: {
    id: number;
    name: string;
  };
  user: {
    id: string;
    ushow: string;
  };
  createTime: number;
  act: {
    id: string;
    jsaNo: string;
  };
  monitorId?: number;
  cameraId?: number;
  cameraName?: string;
}

interface WorkDocItem {
  deptName: string;
  doc: Doc;
  monitorName?: string;
  start_time: string;
  endTime: string;
  zynr: string;
  files?: string;
  his?: {
    remarks: string;
  };
  failType?: string;
  failReason?: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: WorkDocItem[];
    totalElements: number;
  };
}

const tableData = ref<WorkDocItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  deptId: "",
  status: "",
  title: "",
  name: "",
  startTime: "",
  endTime: ""
});

const deptOptions = ref<Array<{ id: number; name: string }>>([]);

const statusOptions = [
  { label: "所有", value: "" },
  { label: "新建", value: "新建" },
  { label: "审核中", value: "审核中" },
  { label: "作业中", value: "作业中" },
  { label: "中断", value: "中断" },
  { label: "结束", value: "结束" },
  { label: "作废", value: "作废" }
];

const titleOptions = [
  { label: "所有", value: "-1" },
  { label: "动火", value: "动火" },
  { label: "受限", value: "受限" },
  { label: "高处检维修", value: "高处检维修" },
  { label: "高处架设", value: "高处架设" },
  { label: "临电", value: "临时用电安全作业证" },
  { label: "盲板", value: "盲板" },
  { label: "吊装", value: "吊装" },
  { label: "动土", value: "动土" },
  { label: "断路", value: "断路" },
  { label: "设备断电", value: "设备断电" },
  { label: "设备送电", value: "设备送电" },
  { label: "高压断电", value: "高压断电" },
  { label: "高压送电", value: "高压送电" }
];

async function fetchDeptOptions() {
  try {
    const response = await fetch("/sft/sys/dept/cjzr/all.json");
    const data = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取部门列表失败:", error);
  }
}

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    if (searchForm.deptId && searchForm.deptId !== "-1") {
      params.append("deptId", searchForm.deptId);
    }
    if (searchForm.status) {
      params.append("status", searchForm.status);
    }
    if (searchForm.title && searchForm.title !== "-1") {
      params.append("title", searchForm.title);
    }
    if (searchForm.name) {
      params.append("name", searchForm.name);
    }
    if (searchForm.startTime) {
      params.append("startTime", searchForm.startTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }

    const response = await fetch(`/sft/work/doc/list.json?${params}`);
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

function handleSearch() {
  fetchData(1);
}

function handleReset() {
  searchForm.deptId = "";
  searchForm.status = "";
  searchForm.title = "";
  searchForm.name = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  fetchData(1);
}

function handleExport() {
  const params = new URLSearchParams();
  if (searchForm.status) params.append("status", searchForm.status);
  if (searchForm.deptId) params.append("deptId", searchForm.deptId);
  if (searchForm.title && searchForm.title !== "-1") {
    params.append("title", searchForm.title);
  }
  if (searchForm.name) params.append("name", searchForm.name);
  if (searchForm.startTime) params.append("startTime", searchForm.startTime);
  if (searchForm.endTime) params.append("endTime", searchForm.endTime);

  window.open(`/sft/work/doc/export?${params.toString()}`);
}

function handleDetail(row: WorkDocItem) {
  if (row.doc?.id) {
    window.open(`/sft/work/doc/detail/${row.doc.id}`);
  }
}

function handleProcess(row: WorkDocItem) {
  if (row.doc?.id) {
    ElMessageBox.alert(`查看审批流: ${row.doc.id}`, "作业票审批流", {
      confirmButtonText: "关闭"
    });
  }
}

function handleCancel(row: WorkDocItem) {
  ElMessageBox.confirm("确认作废？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("作废成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleDelete(row: WorkDocItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
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

function handleSend(row: WorkDocItem) {
  ElMessageBox.confirm("确认上报数据？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info"
  })
    .then(() => {
      ElMessage.success("上报成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleVideo(row: WorkDocItem) {
  if (!row.doc?.monitorId) {
    ElMessage.warning("未选择监控设备！");
    return;
  }
  ElMessage.info(`跳转到视频列表: ${row.doc.monitorId}`);
}

function handleExamine(row: WorkDocItem) {
  ElMessageBox.alert(`作业票审验: ${row.doc?.id}`, "作业票审验", {
    confirmButtonText: "确定"
  });
}

function formatDateTime(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getStatusType(
  status: string
): "success" | "warning" | "danger" | "info" | "" {
  const statusMap: Record<
    string,
    "success" | "warning" | "danger" | "info" | ""
  > = {
    新建: "info",
    审核中: "warning",
    作业中: "success",
    中断: "warning",
    结束: "",
    作废: "danger"
  };
  return statusMap[status] || "";
}

function handleMonitorClick(monitorId: number) {
  ElMessage.info(`查看监控: ${monitorId}`);
}

function handleCameraClick(cameraId: number) {
  ElMessage.info(`查看布控球: ${cameraId}`);
}

onMounted(() => {
  fetchDeptOptions();
  fetchData();
});
</script>

<template>
  <div class="work-doc-index-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">作业管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="部门">
          <el-select
            v-model="searchForm.deptId"
            placeholder="请选择部门"
            clearable
            style="width: 200px"
          >
            <el-option label="请选择部门" value="-1" />
            <el-option
              v-for="dept in deptOptions"
              :key="dept.id"
              :label="dept.name"
              :value="String(dept.id)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="searchForm.title"
            placeholder="请选择类型"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in titleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入名称"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 130px"
          />
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 130px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            检索
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
          <el-button icon="Download" @click="handleExport">导出</el-button>
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
        <el-table-column label="标题" min-width="120">
          <template #default="{ row }">
            {{ row.doc?.title || "" }}
          </template>
        </el-table-column>
        <el-table-column label="属地工段" min-width="120">
          <template #default="{ row }">
            {{ row.doc?.dept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请部门" min-width="120">
          <template #default="{ row }">
            {{ row.deptName || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template #default="{ row }">
            {{ row.doc?.user?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="关联摄像头" min-width="120">
          <template #default="{ row }">
            <span
              v-if="row.monitorName"
              class="link-text"
              @click="handleMonitorClick(row.doc?.monitorId || 0)"
            >
              {{ row.monitorName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="关联布控球" min-width="120">
          <template #default="{ row }">
            <span
              v-if="row.doc?.cameraName"
              class="link-text"
              @click="handleCameraClick(row.doc?.cameraId || 0)"
            >
              {{ row.doc.cameraName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="作业证编号" min-width="120">
          <template #default="{ row }">
            {{ row.doc?.docNo || "" }}
          </template>
        </el-table-column>
        <el-table-column label="关联JSA编号" min-width="120">
          <template #default="{ row }">
            {{ row.doc?.act?.jsaNo || "" }}
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="150">
          <template #default="{ row }">
            {{ row.zynr || "" }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="140" align="center">
          <template #default="{ row }">
            {{ row.doc?.createTime ? formatDateTime(row.doc.createTime) : "" }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="120" align="center">
          <template #default="{ row }">
            {{ row.start_time || "" }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="120" align="center">
          <template #default="{ row }">
            {{ row.endTime || "" }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag
              v-if="row.doc?.status"
              :type="getStatusType(row.doc.status)"
            >
              {{ row.doc.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="当前节点" width="110">
          <template #default="{ row }">
            {{ row.doc?.nodeName || "" }}
          </template>
        </el-table-column>
        <el-table-column label="驳回原因" width="120">
          <template #default="{ row }">
            {{ row.his?.remarks || "" }}
          </template>
        </el-table-column>
        <el-table-column label="审验错误类型" width="120">
          <template #default="{ row }">
            {{ row.failType || "" }}
          </template>
        </el-table-column>
        <el-table-column label="原因" width="120">
          <template #default="{ row }">
            {{ row.failReason || "" }}
          </template>
        </el-table-column>
        <el-table-column label="附件" width="80" align="center">
          <template #default="{ row }">
            <span v-if="row.files">
              <el-icon color="var(--el-color-primary)"><Document /></el-icon>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handleDetail(row)"
            >
              详情
            </el-button>
            <el-button
              type="warning"
              link
              size="small"
              @click="handleProcess(row)"
            >
              审批流
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleCancel(row)"
            >
              作废
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handleSend(row)"
            >
              上报
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handleVideo(row)"
            >
              视频列表
            </el-button>
            <el-button
              type="warning"
              link
              size="small"
              @click="handleExamine(row)"
            >
              审验
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.work-doc-index-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .el-form-item {
    margin-bottom: 8px;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.link-text {
  color: var(--el-color-primary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
