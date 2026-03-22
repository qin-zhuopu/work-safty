<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftDanger"
});

interface User {
  id: number;
  ushow: string;
}

interface Dept {
  id: number;
  name: string;
}

interface DangerItem {
  id: number;
  name: string;
  status: string;
  addDate: number;
  dangerType?: string;
  classify1?: string;
  level?: string;
  checkType?: string;
  typed?: number;
  addDept: Dept | null;
  addUser: User | null;
  resDept?: Dept | null;
  checkUser?: User | null;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: DangerItem[];
    totalElements: number;
  };
}

const tableData = ref<DangerItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = reactive({
  name: "",
  status: "",
  deptId: "",
  addUserName: "",
  deptId1: "",
  typed: "",
  checkType: "",
  beginTime: "",
  endTime: "",
  dangerType: "",
  classify1: "",
  level: ""
});

const searchFormRef = ref<FormInstance>();

// 隐患状态选项
const statusOptions = [
  { label: "请选择", value: "" },
  { label: "提交", value: "提交" },
  { label: "审批中", value: "审批中" },
  { label: "整改中", value: "整改中" },
  { label: "完成", value: "完成" },
  { label: "超期", value: "超期" },
  { label: "驳回", value: "驳回" }
];

// 治理类型选项
const typedOptions = [
  { label: "请选择", value: "" },
  { label: "立即整改", value: "1" },
  { label: "期限整改", value: "2" }
];

// 排查类型选项
const checkTypeOptions = [
  { label: "请选择", value: "" },
  { label: "日常排查", value: "日常排查" },
  { label: "综合性排查", value: "综合性排查" },
  { label: "专业性排查", value: "专业性排查" },
  { label: "季节性排查", value: "季节性排查" },
  { label: "车间每周综合检查", value: "车间每周综合检查" },
  { label: "重点时段及节假日前排查", value: "重点时段及节假日前排查" },
  { label: "事故类比排查", value: "事故类比排查" },
  { label: "复产复工前排查", value: "复产复工前排查" },
  { label: "外聘专家诊断式排查", value: "外聘专家诊断式排查" },
  { label: "管控措施失效", value: "管控措施失效" },
  { label: "其他", value: "其他" },
  { label: "监管部门监督检查", value: "监管部门监督检查" },
  { label: "重大危险源排查", value: "重大危险源排查" },
  { label: "特殊作业排查", value: "特殊作业排查" },
  { label: "事故排查", value: "事故排查" },
  { label: "排查清单隐患", value: "排查清单隐患" },
  { label: "巡检隐患", value: "巡检隐患" },
  { label: "省平台上传隐患", value: "省平台上传隐患" }
];

// 隐患类型选项
const dangerTypeOptions = [
  { label: "请选择", value: "" },
  { label: "安全", value: "安全" },
  { label: "工艺", value: "工艺" },
  { label: "电气", value: "电气" },
  { label: "仪表", value: "仪表" },
  { label: "消防", value: "消防" },
  { label: "总图", value: "总图" },
  { label: "设备", value: "设备" },
  { label: "环保", value: "环保" },
  { label: "职业健康", value: "职业健康" },
  { label: "安保", value: "安保" },
  { label: "其他", value: "其他" }
];

// 隐患分类选项
const classify1Options = [
  { label: "请选择", value: "" },
  { label: "人的不安全行为", value: "人的不安全行为" },
  { label: "物的不安全状态", value: "物的不安全状态" },
  { label: "环境的不安全因素", value: "环境的不安全因素" },
  { label: "管理的缺陷", value: "管理的缺陷" }
];

// 隐患等级选项
const levelOptions = [
  { label: "请选择", value: "" },
  { label: "一级", value: "一级" },
  { label: "二级", value: "二级" },
  { label: "三级", value: "三级" },
  { label: "四级", value: "四级" }
];

// 获取状态标签类型
function getStatusType(
  status: string
): "success" | "warning" | "danger" | "info" {
  switch (status) {
    case "完成":
      return "success";
    case "超期":
    case "驳回":
      return "danger";
    case "审批中":
    case "整改中":
      return "warning";
    default:
      return "info";
  }
}

// 格式化日期
function formatDate(timestamp: number): string {
  if (!timestamp) return "-";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 获取治理类型文本
function getTypedText(typed?: number): string {
  if (typed === 1) return "立即整改";
  if (typed === 2) return "期限整改";
  return "-";
}

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize.value),
      name: searchForm.name,
      status: searchForm.status,
      dangerType: searchForm.dangerType,
      classify1: searchForm.classify1,
      level: searchForm.level,
      checkType: searchForm.checkType
    });

    const response = await fetch(`/sft/danger/danger/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
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
  searchForm.name = "";
  searchForm.status = "";
  searchForm.deptId = "";
  searchForm.addUserName = "";
  searchForm.deptId1 = "";
  searchForm.typed = "";
  searchForm.checkType = "";
  searchForm.beginTime = "";
  searchForm.endTime = "";
  searchForm.dangerType = "";
  searchForm.classify1 = "";
  searchForm.level = "";
  fetchData(1);
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleRewardsAll() {
  ElMessage.info("批量奖惩功能待实现");
}

function handleAdd() {
  ElMessage.info("新建功能待实现");
}

function handleDownloadTemplate() {
  ElMessage.info("下载模板功能待实现");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleDelete(row: DangerItem) {
  ElMessageBox.confirm("确认删除该隐患吗？", "提示", {
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

function handleRewards(row: DangerItem) {
  ElMessage.info(`奖惩: ${row.name}`);
}

function handleExportRow(row: DangerItem) {
  ElMessage.info(`导出: ${row.name}`);
}

function handlePageChange(page: number) {
  fetchData(page);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="danger-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline
        class="search-form"
      >
        <el-form-item label="隐患描述" prop="name">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入隐患描述"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="隐患状态" prop="status">
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
        <el-form-item label="隐患上传部门" prop="deptId">
          <el-select
            v-model="searchForm.deptId"
            placeholder="请选择隐患上传部门"
            clearable
            style="width: 180px"
          >
            <el-option label="办公室（党委办公室）" value="4" />
            <el-option label="HSE管理部" value="9" />
            <el-option label="运营管理部" value="11" />
            <el-option label="热电车间" value="22" />
          </el-select>
        </el-form-item>
        <el-form-item label="隐患上传人" prop="addUserName">
          <el-input
            v-model="searchForm.addUserName"
            placeholder="请输入隐患上传人"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item label="责任接收部门" prop="deptId1">
          <el-select
            v-model="searchForm.deptId1"
            placeholder="请选择责任接收部门"
            clearable
            style="width: 180px"
          >
            <el-option label="办公室（党委办公室）" value="4" />
            <el-option label="HSE管理部" value="9" />
            <el-option label="运营管理部" value="11" />
            <el-option label="热电车间" value="22" />
          </el-select>
        </el-form-item>
        <el-form-item label="治理类型" prop="typed">
          <el-select
            v-model="searchForm.typed"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="item in typedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排查类型" prop="checkType">
          <el-select
            v-model="searchForm.checkType"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in checkTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上传日期" prop="beginTime">
          <el-date-picker
            v-model="searchForm.beginTime"
            type="date"
            placeholder="yyyy-MM-dd"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item label="—" prop="endTime">
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="yyyy-MM-dd"
            value-format="YYYY-MM-DD"
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item label="隐患类型" prop="dangerType">
          <el-select
            v-model="searchForm.dangerType"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="item in dangerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="隐患分类" prop="classify1">
          <el-select
            v-model="searchForm.classify1"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in classify1Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="隐患等级" prop="level">
          <el-select
            v-model="searchForm.level"
            placeholder="请选择"
            clearable
            style="width: 120px"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          检索
        </el-button>
        <el-button @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button @click="handleRewardsAll">
          <el-icon><Medal /></el-icon>
          奖惩
        </el-button>
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新建
        </el-button>
        <el-button type="warning" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button type="info" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="name"
          label="隐患描述"
          min-width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="status"
          label="隐患状态"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="dangerType"
          label="隐患类型"
          width="90"
          align="center"
        />
        <el-table-column
          prop="classify1"
          label="隐患分类"
          width="120"
          align="center"
        />
        <el-table-column
          prop="level"
          label="隐患等级"
          width="90"
          align="center"
        />
        <el-table-column label="治理类型" width="100" align="center">
          <template #default="{ row }">
            {{ getTypedText(row.typed) }}
          </template>
        </el-table-column>
        <el-table-column prop="checkType" label="排查类型" width="120" />
        <el-table-column label="上传部门" width="150">
          <template #default="{ row }">
            {{ row.addDept?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="上传人" width="100">
          <template #default="{ row }">
            {{ row.addUser?.ushow || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="上传日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button type="warning" size="small" @click="handleRewards(row)">
              奖惩
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleExportRow(row)"
            >
              导出
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
        style="justify-content: flex-end; margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="() => fetchData(1)"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.danger-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
