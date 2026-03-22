<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftWorkSheet"
});

interface SysDept {
  id: number;
  name: string;
}

interface SysUser {
  id: string;
  uname: string;
  ushow: string;
  sysDept: SysDept;
}

interface Act {
  dept: SysDept;
  operatUnit: string;
}

interface SheetItem {
  id: string;
  addUser: SysUser;
  addDate: number;
  field1: string;
  field8Str: string;
  field9Str: string;
  field10: number;
  field11: number;
  field12Str: string;
  field16: string;
  field13: SysUser;
  field14: SysUser;
  field5: string;
  workType: string;
  fixedh: number;
  dhLevel: string;
  gcLevel: string;
  dzLevel: string;
  count: number;
  involves: string;
  remain: string;
  status: string;
  remarks: string;
  act: Act;
}

interface DeptOption {
  id: number;
  name: string;
  value: number;
  children?: DeptOption[];
}

interface ApiResponse {
  success: boolean;
  t: {
    content: SheetItem[];
    totalElements: number;
  };
}

interface DeptResponse {
  success: boolean;
  t: DeptOption[];
}

const tableData = ref<SheetItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const deptOptions = ref<DeptOption[]>([]);
const selectedIds = ref<string[]>([]);

const searchForm = reactive({
  deptId: "-1",
  field8: "",
  field12Str: "",
  status: "",
  startTime: "",
  endTime: "",
  ssd: "",
  user: ""
});

const statusOptions = [
  { label: "申请", value: "申请" },
  { label: "审批", value: "审批" },
  { label: "结束", value: "结束" },
  { label: "驳回", value: "驳回" },
  { label: "紧急停止", value: "紧急停止" }
];

async function fetchDepts() {
  try {
    const response = await fetch("/sft/sys/dept/cjzr/all.json");
    const data: DeptResponse = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取部门数据失败", error);
  }
}

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize),
      deptId: searchForm.deptId,
      ...(searchForm.field8 && { field8: searchForm.field8 }),
      ...(searchForm.field12Str && { field12Str: searchForm.field12Str }),
      ...(searchForm.status && { status: searchForm.status }),
      ...(searchForm.startTime && { startTime: searchForm.startTime }),
      ...(searchForm.endTime && { endTime: searchForm.endTime }),
      ...(searchForm.ssd && { ssd: searchForm.ssd }),
      ...(searchForm.user && { user: searchForm.user })
    });
    const response = await fetch(`/sft/work/sheet/list.json?${params}`);
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
  searchForm.deptId = "-1";
  searchForm.field8 = "";
  searchForm.field12Str = "";
  searchForm.status = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  searchForm.ssd = "";
  searchForm.user = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleApprove(row: SheetItem) {
  ElMessage.info(`审批流: ${row.id}`);
}

function handleDelete(row: SheetItem) {
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

function handleSelectionChange(selection: SheetItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm");
}

function getStatusType(status: string): string {
  switch (status) {
    case "申请":
      return "info";
    case "审批":
      return "warning";
    case "结束":
      return "success";
    case "驳回":
      return "danger";
    case "紧急停止":
      return "danger";
    default:
      return "";
  }
}

onMounted(() => {
  fetchDepts();
  fetchData();
});
</script>

<template>
  <div class="work-sheet-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">派工单管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="申请部门">
          <el-cascader
            v-model="searchForm.deptId"
            :options="deptOptions"
            :props="{
              value: 'value',
              label: 'name',
              children: 'children',
              checkStrictly: true,
              emitPath: false
            }"
            placeholder="请选择申请部门"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="施工单位">
          <el-input
            v-model="searchForm.field8"
            placeholder="请输入施工单位"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="施工位置">
          <el-input
            v-model="searchForm.field12Str"
            placeholder="请输入施工位置"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="作业日期">
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
        <el-form-item label="作业所属地">
          <el-input
            v-model="searchForm.ssd"
            placeholder="请输入作业所属地"
            clearable
            style="width: 190px"
          />
        </el-form-item>
        <el-form-item label="提交人">
          <el-input
            v-model="searchForm.user"
            placeholder="请输入提交人"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="Plus" @click="handleAdd">
            添加
          </el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="addUser.ushow" label="申请人" width="100" />
        <el-table-column
          prop="addUser.sysDept.name"
          label="申请单位"
          width="140"
          show-overflow-tooltip
        />
        <el-table-column label="申请时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="field1" label="作业内容" width="120" />
        <el-table-column
          prop="field8Str"
          label="施工单位名称"
          width="160"
          show-overflow-tooltip
        />
        <el-table-column prop="field9Str" label="施工单位人员" width="120" />
        <el-table-column label="进厂时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.field10) }}
          </template>
        </el-table-column>
        <el-table-column label="出厂时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.field11) }}
          </template>
        </el-table-column>
        <el-table-column prop="field16" label="门禁区域" width="100" />
        <el-table-column
          prop="field12Str"
          label="施工位置"
          width="180"
          show-overflow-tooltip
        />
        <el-table-column label="作业所属地" width="140">
          <template #default="{ row }">
            {{ row.act?.dept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="施工单位" width="140">
          <template #default="{ row }">
            {{ row.act?.operatUnit || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="workType" label="非常规作业类型" width="140" />
        <el-table-column label="固定动火日" width="100" align="center">
          <template #default="{ row }">
            {{ row.fixedh && row.fixedh > 0 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="field5" label="特殊作业类型" width="120" />
        <el-table-column prop="dhLevel" label="动火作业等级" width="120" />
        <el-table-column prop="gcLevel" label="高处作业等级" width="120" />
        <el-table-column prop="dzLevel" label="吊装作业等级" width="120" />
        <el-table-column prop="count" label="作业现场人数" width="120" />
        <el-table-column label="属地负责人" width="120">
          <template #default="{ row }">
            {{ row.field13?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="车间管理人员" width="130">
          <template #default="{ row }">
            {{ row.field14?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="involves"
          label="涉及许可审核部门"
          width="160"
          show-overflow-tooltip
        />
        <el-table-column prop="remain" label="剩余工期" width="100" />
        <el-table-column label="当前状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="驳回原因"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handleApprove(row)"
            >
              审批流
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
.work-sheet-container {
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
