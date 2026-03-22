<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftWorkDocFail"
});

interface DeptOption {
  id: number;
  name: string;
  value: number;
}

interface DocInfo {
  id: string;
  title: string;
  docNo: string;
  failType: string;
  failReason: string;
  createTime: number;
  dept: { name: string };
  user: { ushow: string };
  act: {
    id: string;
    jsaNo: string;
    beginTime: number;
    endTime: number;
    status: number;
    nodeStatus: number;
    content: string;
  };
}

interface FailItem {
  id: string;
  deptName: string;
  zynr: string;
  doc: DocInfo;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: FailItem[];
    totalElements: number;
  };
}

const tableData = ref<FailItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  deptId: "",
  title: "",
  failType: "",
  name: "",
  startTime: "",
  endTime: ""
});

const deptOptions = ref<DeptOption[]>([]);

const typeOptions = [
  { label: "所有", value: "" },
  { label: "动火", value: "动火" },
  { label: "受限", value: "受限" },
  { label: "高处检维修", value: "高处" },
  { label: "高处架设", value: "架设" },
  { label: "临电", value: "临时用电安全作业证" },
  { label: "盲板", value: "盲板" },
  { label: "吊装", value: "吊装" },
  { label: "动土", value: "动土" },
  { label: "断路", value: "断路" }
];

const failTypeOptions = [
  { label: "所有", value: "" },
  { label: "票证基础信息有误", value: "票证基础信息有误" },
  { label: "作业人选取不当", value: "作业人选取不当" },
  { label: "作业分析不合规", value: "作业分析不合规" },
  { label: "危害辨识不适用", value: "危害辨识不适用" },
  { label: "安全措施确认不当", value: "安全措施确认不当" },
  { label: "未选取记录仪", value: "未选取记录仪" },
  { label: "签字无法辨认", value: "签字无法辨认" },
  { label: "票证未及时验收", value: "票证未及时验收" },
  { label: "盲板图不合规", value: "盲板图不合规" },
  { label: "受限空间进出登记表不合规", value: "受限空间进出登记表不合规" },
  { label: "其他", value: "其他" }
];

async function fetchDepts() {
  try {
    const response = await fetch("/sft/sys/dept/cjzr/all.json");
    const data = await response.json();
    if (data.success) {
      deptOptions.value = flattenDepts(data.t);
    }
  } catch (error) {
    console.error("获取部门数据失败:", error);
  }
}

function flattenDepts(items: any[]): DeptOption[] {
  const result: DeptOption[] = [];
  function traverse(node: any) {
    if (node.name && node.id) {
      result.push({ id: node.id, name: node.name, value: node.value });
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }
  items.forEach(traverse);
  return result;
}

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    if (searchForm.deptId) params.append("deptId", searchForm.deptId);
    if (searchForm.title) params.append("title", searchForm.title);
    if (searchForm.failType) params.append("failType", searchForm.failType);
    if (searchForm.name) params.append("name", searchForm.name);
    if (searchForm.startTime) params.append("startTime", searchForm.startTime);
    if (searchForm.endTime) params.append("endTime", searchForm.endTime);

    const response = await fetch(`/sft/work/doc/fails.json?${params}`);
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
  searchForm.title = "";
  searchForm.failType = "";
  searchForm.name = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  fetchData(1);
}

function handleExport() {
  const params = new URLSearchParams();
  if (searchForm.failType) params.append("failType", searchForm.failType);
  if (searchForm.deptId) params.append("deptId", searchForm.deptId);
  if (searchForm.title) params.append("title", searchForm.title);
  if (searchForm.name) params.append("name", searchForm.name);
  if (searchForm.startTime) params.append("startTime", searchForm.startTime);
  if (searchForm.endTime) params.append("endTime", searchForm.endTime);

  window.open(`/sft/work/doc/exportFails?${params.toString()}`);
}

function handleDetail(row: FailItem) {
  window.open(`/sft/work/doc/detail/${row.doc.id}`);
}

function handleExamine(row: FailItem) {
  ElMessage.info(`审验弹窗: ${row.doc.id}`);
}

function handleDelete(row: FailItem) {
  ElMessageBox.confirm("确认删除该票证审验记录？", "提示", {
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

function formatDate(timestamp: number): string {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleDateString("zh-CN");
}

onMounted(() => {
  fetchDepts();
  fetchData();
});
</script>

<template>
  <div class="fail-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">审验作业管理</span>
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
              :value="String(dept.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="searchForm.title"
            placeholder="所有"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="opt in typeOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="错误类型">
          <el-select
            v-model="searchForm.failType"
            placeholder="所有"
            clearable
            style="width: 200px"
          >
            <el-option
              v-for="opt in failTypeOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 140px; margin-left: 8px"
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
            {{ row.doc?.title || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="属地工段" min-width="120">
          <template #default="{ row }">
            {{ row.doc?.dept?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="申请部门" min-width="120" />
        <el-table-column label="申请人" width="100">
          <template #default="{ row }">
            {{ row.doc?.user?.ushow || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="作业证编号" min-width="140">
          <template #default="{ row }">
            {{ row.doc?.docNo || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80" align="center">
          <template #default>
            <el-tag type="danger">不合格</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="关联JSA编号" min-width="140">
          <template #default="{ row }">
            {{ row.doc?.act?.jsaNo || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="zynr" label="名称" min-width="150" />
        <el-table-column label="创建时间" width="110">
          <template #default="{ row }">
            {{ formatDate(row.doc?.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="审验错误类型" min-width="140">
          <template #default="{ row }">
            {{ row.doc?.failType || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="原因" min-width="150">
          <template #default="{ row }">
            {{ row.doc?.failReason || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
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
              @click="handleExamine(row)"
            >
              审验
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row)"
            >
              删除
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
.fail-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
