<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftDangerCheck"
});

interface CheckItem {
  beginTime: number;
  controRank: string;
  controlId: number;
  controlName: string;
  cycle: string;
  deptName: string;
  dutier: string;
  endTime: number;
  ifDanger: number;
  inspKey: string;
  measureUuid: string;
  taskContent: string;
  taskId: number;
  user: string;
}

interface DeptItem {
  children?: DeptItem[];
  id: number;
  name: string;
  open: boolean;
  parentName: string;
  perId: number;
  value: number;
}

interface ListResponse {
  content: CheckItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface ApiResponse<T> {
  success: boolean;
  t: T;
}

const tableData = ref<CheckItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索表单
const searchForm = ref({
  deptId: "-1",
  name: "",
  beginTime: "",
  endTime: "",
  ifDanger: -1,
  controRank: "",
  userName: "",
  async: -1,
  source: -1
});

// 部门选项
const deptOptions = ref<DeptItem[]>([]);

// 排查结果选项
const ifDangerOptions = [
  { label: "请选择", value: -1 },
  { label: "未排查", value: 0 },
  { label: "正常", value: 1 },
  { label: "逾期", value: 4 },
  { label: "存在隐患", value: 2 },
  { label: "无需排查", value: 3 },
  { label: "其他", value: 5 }
];

// 管控层级选项
const controRankOptions = [
  { label: "请选择", value: "" },
  { label: "公司级", value: "公司级" },
  { label: "处室级", value: "处室级" },
  { label: "车间级", value: "车间级" },
  { label: "工段班组岗位级", value: "工段班组岗位级" }
];

// 省平台对接任务选项
const asyncOptions = [
  { label: "请选择", value: -1 },
  { label: "是", value: 1 },
  { label: "否", value: 0 }
];

// 任务来源选项
const sourceOptions = [
  { label: "请选择", value: -1 },
  { label: "管控任务", value: 1 },
  { label: "巡检任务", value: 2 }
];

// 获取部门列表
async function fetchDeptList() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data: ApiResponse<DeptItem[]> = await response.json();
    if (data.success) {
      deptOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取部门列表失败:", error);
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
    if (searchForm.value.name) {
      params.append("name", searchForm.value.name);
    }
    if (searchForm.value.beginTime) {
      params.append("beginTime", searchForm.value.beginTime);
    }
    if (searchForm.value.endTime) {
      params.append("endTime", searchForm.value.endTime);
    }
    if (searchForm.value.ifDanger !== -1) {
      params.append("ifDanger", String(searchForm.value.ifDanger));
    }
    if (searchForm.value.controRank) {
      params.append("controRank", searchForm.value.controRank);
    }
    if (searchForm.value.userName) {
      params.append("userName", searchForm.value.userName);
    }
    if (searchForm.value.async !== -1) {
      params.append("async", String(searchForm.value.async));
    }
    if (searchForm.value.source !== -1) {
      params.append("source", String(searchForm.value.source));
    }

    const response = await fetch(`/sft/danger/check/list.json?${params}`);
    const data: ApiResponse<ListResponse> = await response.json();
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
  searchForm.value = {
    deptId: "-1",
    name: "",
    beginTime: "",
    endTime: "",
    ifDanger: -1,
    controRank: "",
    userName: "",
    async: -1,
    source: -1
  };
  currentPage.value = 1;
  fetchData();
}

// 设定排查休息日
function handleAddRestDay() {
  ElMessage.info("设定排查休息日功能待实现");
}

// 导出
function handleExport() {
  ElMessage.info("导出功能待实现");
}

// 分页大小改变
function handleSizeChange(size: number) {
  pageSize.value = size;
  fetchData();
}

// 当前页改变
function handleCurrentChange(page: number) {
  currentPage.value = page;
  fetchData();
}

// 格式化时间戳
function formatTimestamp(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("zh-CN");
}

// 获取排查结果标签类型
function getIfDangerTagType(
  value: number
): "success" | "warning" | "danger" | "info" {
  switch (value) {
    case 0:
      return "info";
    case 1:
      return "success";
    case 2:
      return "danger";
    case 3:
      return "info";
    case 4:
      return "danger";
    case 5:
      return "warning";
    default:
      return "info";
  }
}

// 获取排查结果文本
function getIfDangerText(value: number): string {
  const option = ifDangerOptions.find(opt => opt.value === value);
  return option?.label || "未知";
}

onMounted(() => {
  fetchDeptList();
  fetchData();
});
</script>

<template>
  <div class="check-container">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form
        :model="searchForm"
        inline
        class="search-form"
        label-width="100px"
      >
        <el-form-item label="责任部门">
          <el-select
            v-model="searchForm.deptId"
            placeholder="请选择责任部门"
            clearable
            style="width: 180px"
          >
            <el-option label="请选择责任部门" value="-1" />
            <el-option
              v-for="dept in deptOptions"
              :key="dept.value"
              :label="dept.name"
              :value="String(dept.value)"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分析单元名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入分析单元名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="排查时间">
          <el-date-picker
            v-model="searchForm.beginTime"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
          <span class="mx-2">—</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>

        <el-form-item label="排查结果">
          <el-select
            v-model="searchForm.ifDanger"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="opt in ifDangerOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="管控层级">
          <el-select
            v-model="searchForm.controRank"
            placeholder="请选择"
            clearable
            style="width: 140px"
          >
            <el-option
              v-for="opt in controRankOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="排查人">
          <el-input
            v-model="searchForm.userName"
            placeholder="请输入排查人"
            clearable
            style="width: 150px"
          />
        </el-form-item>

        <el-form-item label="省平台对接任务">
          <el-select
            v-model="searchForm.async"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="opt in asyncOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="任务来源">
          <el-select
            v-model="searchForm.source"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="opt in sourceOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <div class="btn-group">
            <el-button type="primary" @click="handleSearch"> 检索 </el-button>
            <el-button @click="handleReset"> 重置 </el-button>
            <el-button type="warning" @click="handleAddRestDay">
              设定排查休息日
            </el-button>
            <el-button @click="handleExport"> 导出 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card shadow="never" class="mt-4">
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="deptName" label="责任部门" min-width="140" />
        <el-table-column
          prop="controlName"
          label="分析单元名称"
          min-width="180"
        />
        <el-table-column
          prop="controRank"
          label="管控层级"
          width="130"
          align="center"
        />
        <el-table-column
          prop="cycle"
          label="排查周期"
          width="100"
          align="center"
        />
        <el-table-column label="排查时间" width="200" align="center">
          <template #default="{ row }">
            {{ formatTimestamp(row.beginTime) }} ~
            {{ formatTimestamp(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="dutier"
          label="责任人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="user"
          label="排查人"
          width="100"
          align="center"
        />
        <el-table-column label="排查结果" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getIfDangerTagType(row.ifDanger)">
              {{ getIfDangerText(row.ifDanger) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="taskContent"
          label="任务内容"
          min-width="300"
          show-overflow-tooltip
        />
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.check-container {
  padding: 16px;
}

.search-form {
  .el-form-item {
    margin-bottom: 12px;
  }
}

.btn-group {
  display: flex;
  gap: 8px;
}

.mx-2 {
  margin: 0 8px;
}

.mt-4 {
  margin-top: 16px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
