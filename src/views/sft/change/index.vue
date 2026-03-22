<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftChange"
});

interface SysUser {
  id: number;
  ushow: string;
  sysDept?: {
    id: number;
    name: string;
  };
}

interface ChangeItem {
  id: string;
  addDate: number;
  name: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field8?: string;
  field9?: number;
  remarks?: string;
  status: string;
  file1?: string;
  file2?: string;
  addUser: SysUser;
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
    content: ChangeItem[];
    totalElements: number;
  };
}

const tableData = ref<ChangeItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const deptOptions = ref<DeptItem[]>([]);

const searchForm = reactive({
  deptId: "",
  addUserName: "",
  startTime: "",
  endTime: "",
  field: "",
  field1: "",
  field2: "",
  status: ""
});

const selectedIds = ref<string[]>([]);

async function fetchDeptList() {
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

    if (searchForm.deptId) params.append("sysDeptId", searchForm.deptId);
    if (searchForm.addUserName)
      params.append("addUserName", searchForm.addUserName);
    if (searchForm.startTime) params.append("startTime", searchForm.startTime);
    if (searchForm.endTime) params.append("endTime", searchForm.endTime);
    if (searchForm.field) params.append("field", searchForm.field);
    if (searchForm.field1) params.append("field1", searchForm.field1);
    if (searchForm.field2) params.append("field2", searchForm.field2);
    if (searchForm.status) params.append("status", searchForm.status);

    const response = await fetch(`/sft/change/change/list.json?${params}`);
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
  searchForm.addUserName = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  searchForm.field = "";
  searchForm.field1 = "";
  searchForm.field2 = "";
  searchForm.status = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleExport() {
  const params = new URLSearchParams();
  if (searchForm.addUserName)
    params.append("addUserName", searchForm.addUserName);
  if (searchForm.field1) params.append("field1", searchForm.field1);
  if (searchForm.field2) params.append("field2", searchForm.field2);
  if (searchForm.field) params.append("field", searchForm.field);
  if (searchForm.status) params.append("status", searchForm.status);
  if (searchForm.startTime) params.append("startTime", searchForm.startTime);
  if (searchForm.endTime) params.append("endTime", searchForm.endTime);
  if (searchForm.deptId) params.append("sysDeptId", searchForm.deptId);

  window.open(`/sft/change/change/export?${params}`);
}

function handleDelete(row: ChangeItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/change/change/del/${row.id}`);
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          fetchData(currentPage.value);
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
      }
    })
    .catch(() => {});
}

function handleApplyFor(row: ChangeItem) {
  window.open(`/sft/change/change/applyfor/${row.id}`);
}

function handleAccept(row: ChangeItem) {
  window.open(`/sft/change/change/accept/${row.id}`);
}

function handleTrain(row: ChangeItem) {
  ElMessage.info(`关联培训: ${row.id}`);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}

function renderFiles(fileStr: string) {
  if (!fileStr) return [];
  return fileStr.split(",");
}

function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext === "doc" || ext === "docx") return "WORD";
  if (ext === "xlsx" || ext === "xls") return "EXCEL";
  return "FILE";
}

function handleSelectionChange(selection: ChangeItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

onMounted(() => {
  fetchDeptList();
  fetchData();
});
</script>

<template>
  <div class="change-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">变更管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="申请人所在部门">
          <el-cascader
            v-model="searchForm.deptId"
            :options="deptOptions"
            :props="{ value: 'value', label: 'name', checkStrictly: true }"
            placeholder="请选择申请人所在部门"
            clearable
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="申请人">
          <el-input
            v-model="searchForm.addUserName"
            placeholder="请输入申请人"
            clearable
            style="width: 160px"
          />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始时间"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="date-separator">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束时间"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item label="变更类型">
          <el-select
            v-model="searchForm.field"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option label="工艺变更" value="工艺变更" />
            <el-option label="设备变更" value="设备变更" />
          </el-select>
        </el-form-item>
        <el-form-item label="变更等级">
          <el-select
            v-model="searchForm.field1"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option label="一般变更" value="一般变更" />
            <el-option label="重要变更" value="重要变更" />
          </el-select>
        </el-form-item>
        <el-form-item label="变更状态">
          <el-select
            v-model="searchForm.field2"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option label="永久变更" value="永久变更" />
            <el-option label="临时变更" value="临时变更" />
            <el-option label="紧急变更" value="紧急变更" />
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option label="审批中" value="审批中" />
            <el-option label="结束" value="结束" />
            <el-option label="驳回" value="驳回" />
          </el-select>
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
        <el-table-column label="申请人" width="100" align="center">
          <template #default="{ row }">
            {{ row.addUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column
          label="申请人所在部门"
          width="140"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            {{ row.addUser?.sysDept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="变更项目名称"
          min-width="160"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field"
          label="变更类型"
          width="100"
          align="center"
        />
        <el-table-column
          prop="field1"
          label="变更等级"
          width="100"
          align="center"
        />
        <el-table-column
          prop="field2"
          label="变更状态"
          width="100"
          align="center"
        />
        <el-table-column label="计划恢复时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field9) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field3"
          label="项目内容简介"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remarks"
          label="备注"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="附件" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.file1" type="info" size="small">
              {{ renderFiles(row.file1).length }} 个文件
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="审批状态"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              :type="
                row.status === '审批中'
                  ? 'warning'
                  : row.status === '结束'
                    ? 'success'
                    : 'danger'
              "
              size="small"
            >
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="field8"
          label="培训资料说明"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="培训资料附件" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.file2" type="info" size="small">
              {{ renderFiles(row.file2).length }} 个文件
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{ row }">
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
              @click="handleApplyFor(row)"
            >
              变更申请
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleAccept(row)"
            >
              变更验收
            </el-button>
            <el-button
              type="primary"
              link
              size="small"
              @click="handleTrain(row)"
            >
              关联培训
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
.change-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .date-separator {
    margin: 0 8px;
    color: #606266;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
