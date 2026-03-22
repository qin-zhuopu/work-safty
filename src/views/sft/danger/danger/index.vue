<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftDangerDanger"
});

interface User {
  id: number;
  ushow: string;
  sysDept?: {
    name: string;
  };
}

interface DangerItem {
  id: number;
  name: string;
  type: number;
  status: string;
  termStatus?: number;
  immeStatus?: number;
  pics?: string;
  rectPics?: string;
  gdUser?: User;
  gdDate?: number;
  jcbmUser?: User;
  jcbmDate?: number;
  level: string;
  zxjcmc?: string;
  dangerType?: string;
  classify1?: string;
  classify2?: string;
  checkType?: string;
  securityCosts?: number;
  causeAnalysis?: string;
  recomRequ?: string;
  rectifyDate?: number;
  zrbmUser?: User;
  zrbmDate?: number;
  rectUser?: User;
  rectDate?: number;
  rectMeasures?: string;
  cjUser?: User;
  cjDate?: number;
  verification?: string;
  lhpcr?: string;
  addUser?: User;
  addDate?: number;
}

interface PageData {
  content: DangerItem[];
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

interface DeptItem {
  id: number;
  name: string;
  value: number;
  children?: DeptItem[];
}

interface DeptResponse {
  success: boolean;
  t: DeptItem[];
}

const formRef = ref<FormInstance>();
const tableData = ref<DangerItem[]>([]);
const loading = ref(false);
const deptOptions = ref<DeptItem[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = ref({
  name: "",
  status: "0",
  deptId: "",
  addUserName: "",
  deptId1: "",
  typed: "-1",
  checkType: "",
  beginTime: "",
  endTime: "",
  dangerType: "",
  classify1: "",
  level: ""
});

const statusOptions = [
  { label: "请选择", value: "0" },
  { label: "提交", value: "1" },
  { label: "审批中", value: "2" },
  { label: "整改中", value: "3" },
  { label: "完成", value: "4" },
  { label: "超期", value: "5" },
  { label: "驳回", value: "6" }
];

const typeOptions = [
  { label: "请选择", value: "-1" },
  { label: "立即整改", value: "1" },
  { label: "期限整改", value: "2" }
];

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

const classifyOptions = [
  { label: "请选择", value: "" },
  { label: "人的不安全行为", value: "人的不安全行为" },
  { label: "物的不安全状态", value: "物的不安全状态" },
  { label: "环境的不安全因素", value: "环境的不安全因素" },
  { label: "管理的缺陷", value: "管理的缺陷" }
];

const levelOptions = [
  { label: "请选择", value: "" },
  { label: "一级", value: "一级" },
  { label: "二级", value: "二级" },
  { label: "三级", value: "三级" },
  { label: "四级", value: "四级" }
];

async function fetchDeptOptions() {
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
      page: String(page),
      size: String(pageSize.value),
      name: searchForm.value.name,
      status: searchForm.value.status,
      deptId: searchForm.value.deptId || "-1",
      addUserName: searchForm.value.addUserName,
      deptId1: searchForm.value.deptId1 || "-1",
      typed: searchForm.value.typed,
      checkType: searchForm.value.checkType,
      beginTime: searchForm.value.beginTime,
      endTime: searchForm.value.endTime,
      dangerType: searchForm.value.dangerType,
      classify1: searchForm.value.classify1,
      level: searchForm.value.level
    });

    const response = await fetch(
      `/sft/danger/danger/list?${params.toString()}`
    );
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
    status: "0",
    deptId: "",
    addUserName: "",
    deptId1: "",
    typed: "-1",
    checkType: "",
    beginTime: "",
    endTime: "",
    dangerType: "",
    classify1: "",
    level: ""
  };
  fetchData(1);
}

function handleExport() {
  const params = new URLSearchParams({
    level: searchForm.value.level,
    typed: searchForm.value.typed,
    status: searchForm.value.status,
    checkType: searchForm.value.checkType,
    dangerType: searchForm.value.dangerType,
    classify1: searchForm.value.classify1,
    beginTime: searchForm.value.beginTime,
    endTime: searchForm.value.endTime,
    name: searchForm.value.name,
    addUserName: searchForm.value.addUserName,
    deptId: searchForm.value.deptId || "-1",
    deptId1: searchForm.value.deptId1 || "-1"
  });
  window.open(`/sft/danger/danger/export?${params.toString()}`);
}

function handleAdd() {
  ElMessage.info("新建功能待实现");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleDelete(row: DangerItem) {
  ElMessageBox.confirm("确认删除该隐患？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/danger/danger/del/${row.id}`, {
          method: "GET"
        });
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

function handleRowExport(row: DangerItem) {
  window.open(`/sft/danger/danger/detail/${row.id}`);
}

function formatDate(timestamp?: number): string {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("zh-CN");
}

function formatDateTime(timestamp?: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function getTypeName(type: number): string {
  return type === 2 ? "期限整改" : "立即整改";
}

function getApprovalStatus(row: DangerItem): string {
  if (row.type === 2) {
    const statusMap: Record<number, string> = {
      1: "提交",
      2: "工段管理人员驳回",
      3: "工段管理人员通过",
      4: "检查部门负责人驳回",
      5: "检查部门负责人通过",
      6: "责任部门接收人驳回",
      7: "责任部门接收人通过",
      8: "整改人填写信息",
      9: "车间安全全员驳回",
      10: "车间安全全员通过",
      11: "工段管理人员（二次审批）驳回",
      12: "结束"
    };
    return statusMap[row.termStatus || 0] || "";
  } else {
    const statusMap: Record<number, string> = {
      1: "提交",
      2: "工段管理人员驳回",
      3: "工段管理人员通过",
      4: "检查部门负责人驳回",
      5: "结束"
    };
    return statusMap[row.immeStatus || 0] || "";
  }
}

function getResponsibleUser(row: DangerItem): string {
  if (row.type === 2) {
    return row.zrbmUser?.ushow || "";
  }
  return row.gdUser?.ushow || "";
}

function getResponsibleDept(row: DangerItem): string {
  if (row.type === 2) {
    return row.zrbmUser?.sysDept?.name || "";
  }
  return row.gdUser?.sysDept?.name || "";
}

function getResponsibleDate(row: DangerItem): string {
  if (row.type === 2) {
    return formatDateTime(row.zrbmDate);
  }
  return formatDateTime(row.gdDate);
}

onMounted(() => {
  fetchDeptOptions();
  fetchData();
});
</script>

<template>
  <div class="danger-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">隐患管理</span>
        </div>
      </template>

      <el-form ref="formRef" :model="searchForm" inline class="search-form">
        <el-form-item label="隐患描述">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入隐患描述"
            clearable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="隐患状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
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

        <el-form-item label="隐患上传部门">
          <el-select
            v-model="searchForm.deptId"
            placeholder="请选择"
            clearable
            filterable
            style="width: 200px"
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.name"
              :value="String(item.value)"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="隐患上传人">
          <el-input
            v-model="searchForm.addUserName"
            placeholder="请输入隐患上传人"
            clearable
            style="width: 150px"
          />
        </el-form-item>

        <el-form-item label="责任接收部门">
          <el-select
            v-model="searchForm.deptId1"
            placeholder="请选择"
            clearable
            filterable
            style="width: 200px"
          >
            <el-option
              v-for="item in deptOptions"
              :key="item.id"
              :label="item.name"
              :value="String(item.value)"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="治理类型">
          <el-select
            v-model="searchForm.typed"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="排查类型">
          <el-select
            v-model="searchForm.checkType"
            placeholder="请选择"
            clearable
            style="width: 180px"
          >
            <el-option
              v-for="item in checkTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="上传日期">
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

        <el-form-item label="隐患类型">
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

        <el-form-item label="隐患分类">
          <el-select
            v-model="searchForm.classify1"
            placeholder="请选择"
            clearable
            style="width: 180px"
          >
            <el-option
              v-for="item in classifyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="隐患等级">
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

        <el-form-item>
          <el-button type="primary" @click="handleSearch"> 检索 </el-button>
          <el-button @click="handleReset"> 重置 </el-button>
          <el-button @click="handleExport"> 导出 </el-button>
          <el-button type="success" @click="handleAdd"> 新建 </el-button>
          <el-button @click="handleImport"> 导入 </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never" class="mt-4">
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column type="selection" width="55" align="center" />

        <el-table-column
          prop="name"
          label="隐患描述"
          min-width="150"
          show-overflow-tooltip
        />

        <el-table-column label="治理类型" width="100" align="center">
          <template #default="{ row }">
            {{ getTypeName(row.type) }}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态" width="80" align="center" />

        <el-table-column label="审批状态" width="150" align="center">
          <template #default="{ row }">
            {{ getApprovalStatus(row) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="level"
          label="隐患等级"
          width="100"
          align="center"
        />

        <el-table-column
          prop="dangerType"
          label="隐患类型"
          width="100"
          align="center"
        />

        <el-table-column
          prop="classify1"
          label="中化隐患分类（一）"
          width="150"
          align="center"
          show-overflow-tooltip
        />

        <el-table-column
          prop="checkType"
          label="排查类型"
          width="130"
          align="center"
          show-overflow-tooltip
        />

        <el-table-column label="整改完成时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.rectifyDate) }}
          </template>
        </el-table-column>

        <el-table-column
          label="责任部门"
          width="150"
          align="center"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            {{ getResponsibleDept(row) }}
          </template>
        </el-table-column>

        <el-table-column label="责任部门接收人" width="120" align="center">
          <template #default="{ row }">
            {{ getResponsibleUser(row) }}
          </template>
        </el-table-column>

        <el-table-column label="整改人" width="100" align="center">
          <template #default="{ row }">
            {{ row.rectUser?.ushow || "" }}
          </template>
        </el-table-column>

        <el-table-column label="隐患上传人" width="100" align="center">
          <template #default="{ row }">
            {{ row.addUser?.ushow || "" }}
          </template>
        </el-table-column>

        <el-table-column
          label="隐患上传部门"
          width="150"
          align="center"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            {{ row.addUser?.sysDept?.name || "" }}
          </template>
        </el-table-column>

        <el-table-column label="上传日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleRowExport(row)"
            >
              导出
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="fetchData"
          @size-change="() => fetchData(1)"
        />
      </div>
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
  .el-form-item {
    margin-bottom: 12px;
  }
}
</style>
