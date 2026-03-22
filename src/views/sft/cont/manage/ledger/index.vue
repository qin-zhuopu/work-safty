<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftContManageLedger"
});

interface LedgerItem {
  id: number;
  field: string;
  field1: string;
  field3?: string;
  field4?: string;
  status: number;
  level?: string;
  deleteFlag: number;
  field10?: string;
  hmdExamine?: number;
  field9Date?: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: LedgerItem[];
    totalElements: number;
  };
}

interface SearchForm {
  field: string;
  field1: string;
  level: string;
}

const tableData = ref<LedgerItem[]>([]);
const loading = ref(false);
const searchFormRef = ref<FormInstance>();
const searchForm = ref<SearchForm>({
  field: "",
  field1: "",
  level: ""
});
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

const statusMap: Record<number, string> = {
  "-1": "填报",
  0: "审批中",
  1: "驳回",
  2: "通过",
  3: "删除",
  4: "结束"
};

const getStatusText = (item: LedgerItem) => {
  if (item.deleteFlag > 0) {
    return "黑名单";
  }
  return statusMap[item.status] || "提报";
};

const getStatusType = (item: LedgerItem) => {
  if (item.deleteFlag > 0) {
    return "danger";
  }
  switch (item.status) {
    case 2:
      return "success";
    case 1:
      return "danger";
    case 0:
      return "warning";
    default:
      return "info";
  }
};

const levelOptions = [
  { value: "常用", label: "常用" },
  { value: "备用", label: "备用" },
  { value: "设备厂家", label: "设备厂家" }
];

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page - 1),
      size: String(pagination.value.size)
    });

    if (searchForm.value.field) {
      params.append("field", searchForm.value.field);
    }
    if (searchForm.value.field1) {
      params.append("field1", searchForm.value.field1);
    }
    if (searchForm.value.level) {
      params.append("level", searchForm.value.level);
    }

    const response = await fetch(`/sft/cont/manage/ledger/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
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
  pagination.value.page = 1;
  fetchData();
}

function handleReset() {
  searchForm.value = {
    field: "",
    field1: "",
    level: ""
  };
  pagination.value.page = 1;
  fetchData();
}

function handleExport() {
  const params = new URLSearchParams();
  if (searchForm.value.field) {
    params.append("field", searchForm.value.field);
  }
  if (searchForm.value.field1) {
    params.append("field1", searchForm.value.field1);
  }
  if (searchForm.value.level) {
    params.append("level", searchForm.value.level);
  }
  window.open(`/sft/cont/manage/ledger/export?${params}`);
}

function handleViolations(item: LedgerItem) {
  ElMessage.info("违章记录功能待实现");
}

function handleBlacklist(item: LedgerItem) {
  ElMessage.info("加入黑名单功能待实现");
}

function handleFiles(item: LedgerItem) {
  ElMessage.info("文件功能待实现");
}

function handlePersonnel(item: LedgerItem) {
  ElMessage.info("人员功能待实现");
}

function handleDelete(item: LedgerItem) {
  ElMessageBox.confirm(
    "删除本承包商后，承包商内人员会一并删除，请确认!",
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  ).then(() => {
    ElMessage.success("删除成功");
    fetchData();
  });
}

function handleEvaluation(item: LedgerItem) {
  ElMessage.info("作业评价功能待实现");
}

function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  pagination.value.page = 1;
  fetchData();
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="ledger-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商台账（档案）</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline
        class="search-form"
      >
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.field"
            placeholder="请输入名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="对接部门">
          <el-input
            v-model="searchForm.field1"
            placeholder="请输入对接部门"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="承包商级别">
          <el-select
            v-model="searchForm.level"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="opt in levelOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><RefreshLeft /></el-icon>
            重置
          </el-button>
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
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
        :row-class-name="
          ({ row }) => (row.deleteFlag > 0 ? 'blacklist-row' : '')
        "
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="承包商名称" min-width="200" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row)">
              {{ getStatusText(row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="承包商级别"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <span class="level-link">{{ row.level || "/" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="field1"
          label="对接部门"
          width="150"
          align="center"
        />
        <el-table-column
          prop="field3"
          label="当前审批节点"
          width="150"
          align="center"
        />
        <el-table-column prop="field4" label="下一审批节点" min-width="150" />
        <el-table-column
          prop="field10"
          label="驳回原因"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.field4 !== "结束" ? row.field10 || "" : "" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              link
              @click="handleViolations(row)"
            >
              违章记录
            </el-button>
            <el-button
              v-if="!row.hmdExamine && !row.field9Date && row.deleteFlag < 1"
              size="small"
              type="danger"
              link
              @click="handleBlacklist(row)"
            >
              加入黑名单
            </el-button>
            <el-button
              size="small"
              type="warning"
              link
              @click="handleFiles(row)"
            >
              文件
            </el-button>
            <el-button size="small" link @click="handlePersonnel(row)">
              人员
            </el-button>
            <el-button
              v-if="row.deleteFlag < 1"
              size="small"
              type="danger"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button size="small" link @click="handleEvaluation(row)">
              作业评价
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.ledger-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.level-link {
  color: var(--el-color-primary);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

:deep(.blacklist-row) {
  font-weight: bold;
  color: var(--el-color-danger);
}
</style>
