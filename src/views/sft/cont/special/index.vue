<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox, type DateModelType } from "element-plus";
import {
  Delete,
  Edit,
  Search,
  Refresh,
  Download
} from "@element-plus/icons-vue";

defineOptions({
  name: "SftContSpecial"
});

interface SpecialWorker {
  id: number;
  userName: string;
  deptName: string;
  idCard: string;
  category: string;
  cardNo: string;
  beginTime: number;
  checkTime: number;
  endTime: number;
  issuedDept: string;
  file1?: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: SpecialWorker[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

const tableData = ref<SpecialWorker[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = ref({
  userName: "",
  deptName: "",
  category: "",
  status: "",
  startTime: null as DateModelType,
  endTime: null as DateModelType
});

const selectedIds = ref<number[]>([]);

const categoryOptions = [
  "熔化焊接与热切割作业",
  "压力焊作业",
  "高处安装、维护、拆除作业",
  "登高架设作业",
  "低压电工作业",
  "起重机司机(限流动式起重机)",
  "起重机指挥",
  "建筑架子工(普通脚手架)",
  "化工自动化控制仪表作业",
  "制冷与空调设备运行操作作业",
  "氧化工艺作业",
  "聚合工艺作业",
  "过氧化工艺作业",
  "加氢工艺作业",
  "高压电工作业",
  "防爆电气作业",
  "氯化工艺作业",
  "氯碱电解工艺作业",
  "继电保护作业"
];

const statusOptions = [
  { label: "过期证书", value: "1" },
  { label: "即将过期证书（距离有效期1个月内的）", value: "2" },
  { label: "有效证书", value: "3" }
];

const formatDate = (timestamp: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isExpiring = (endTime: number, checkTime: number) => {
  const now = Date.now();
  const daysToExpire = (endTime - now) / (24 * 60 * 60 * 1000);
  const daysToCheck = (checkTime - now) / (24 * 60 * 60 * 1000);
  return daysToExpire <= 30 || daysToCheck <= 30;
};

const isExpired = (endTime: number) => {
  return Date.now() > endTime;
};

const rowClassName = ({ row }: { row: SpecialWorker }) => {
  if (isExpired(row.endTime)) return "danger-row";
  if (isExpiring(row.endTime, row.checkTime)) return "warning-row";
  return "";
};

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize.value),
      userName: searchForm.value.userName,
      deptName: searchForm.value.deptName,
      category: searchForm.value.category,
      status: searchForm.value.status
    });

    if (searchForm.value.startTime) {
      const startDate = new Date(searchForm.value.startTime as Date);
      params.append("startTime", startDate.getTime().toString());
    }
    if (searchForm.value.endTime) {
      const endDate = new Date(searchForm.value.endTime as Date);
      params.append("endTime", endDate.getTime().toString());
    }

    const response = await fetch(`/sft/cont/special/list.json?${params}`);
    const data: ApiResponse = await response.json();

    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
      currentPage.value = data.t.number + 1;
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
  searchForm.value = {
    userName: "",
    deptName: "",
    category: "",
    status: "",
    startTime: null,
    endTime: null
  };
  fetchData(1);
}

function handleEdit(row: SpecialWorker) {
  ElMessage.info(`编辑: ${row.userName}`);
}

function handleDelete(row: SpecialWorker) {
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

function handleSelectionChange(selection: SpecialWorker[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的记录");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条记录？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      ElMessage.success("删除成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  fetchData(1);
}

function handleCurrentChange(page: number) {
  fetchData(page);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="special-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商特殊工管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.userName"
            placeholder="请输入姓名"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="所属单位">
          <el-input
            v-model="searchForm.deptName"
            placeholder="请输入所属单位"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="特种作业类型">
          <el-select
            v-model="searchForm.category"
            placeholder="请选择"
            clearable
            style="width: 220px"
          >
            <el-option
              v-for="item in categoryOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            clearable
            style="width: 200px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="证书过期时间">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始时间"
            style="width: 140px"
          />
          <span class="mx-2">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束时间"
            style="width: 140px"
          />
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="btn-group">
        <el-button type="primary" :icon="Search" @click="handleSearch">
          检索
        </el-button>
        <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button :icon="Download" @click="handleExport">导出</el-button>
        <el-button type="danger" :icon="Delete" @click="handleBatchDelete">
          删除
        </el-button>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        :row-class-name="rowClassName"
        style="width: 100%; margin-top: 16px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="userName" label="姓名" width="100" />
        <el-table-column prop="deptName" label="所属单位" min-width="180" />
        <el-table-column prop="idCard" label="身份证号" width="160" />
        <el-table-column prop="category" label="特种作业类型" width="180" />
        <el-table-column prop="cardNo" label="证件号" width="150" />
        <el-table-column label="起始时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.beginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="复审时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.checkTime) }}
          </template>
        </el-table-column>
        <el-table-column label="有效期至" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="issuedDept" label="发证单位" min-width="140" />
        <el-table-column label="附件" width="100" align="center">
          <template #default="{ row }">
            <span v-if="!row.file1">-</span>
            <el-link v-else type="primary" :href="row.file1" target="_blank">
              查看
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="handleDelete(row)"
            >
              删除
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
        style="justify-content: flex-end; margin-top: 16px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.special-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .el-form-item {
    margin-bottom: 12px;
  }
}

.btn-group {
  margin-bottom: 16px;

  .el-button {
    margin-right: 8px;
  }
}

:deep(.el-table) {
  .warning-row {
    background-color: #fff7e6;
  }

  .danger-row {
    color: #f56c6c;
    background-color: #fee;
  }
}
</style>
