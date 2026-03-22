<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftContTool"
});

interface ToolItem {
  id: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8?: string;
  field9?: { name: string };
  field10?: { ushow: string };
  field11?: string;
  field12?: { ushow: string };
  pics?: Array<{ name: string; url: string }>;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ToolItem[];
    totalElements: number;
  };
}

interface SearchForm {
  field1: string;
  field2: string;
  field3: string;
  field7: string;
  startTime: string;
  endTime: string;
}

const categoryMap: Record<string, string> = {
  "01": "梯子",
  "02": "手持电动工具",
  "03": "配电箱",
  "04": "电焊机",
  "05": "等离子切割机",
  "06": "手拉葫芦（包括电动葫芦）",
  "07": "电动器具",
  "08": "其他类"
};

const categoryOptions = Object.entries(categoryMap).map(([value, label]) => ({
  value,
  label
}));

const statusOptions = [
  { value: "未审批", label: "未审批" },
  { value: "合格", label: "合格" },
  { value: "不合格", label: "不合格" }
];

const tableData = ref<ToolItem[]>([]);
const loading = ref(false);
const searchFormRef = ref<FormInstance>();
const searchForm = ref<SearchForm>({
  field1: "",
  field2: "",
  field3: "",
  field7: "",
  startTime: "",
  endTime: ""
});
const selectedIds = ref<string[]>([]);
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

const getCategoryName = (code: string) => categoryMap[code] || "";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("zh-CN");
};

const getStatusType = (status: string) => {
  switch (status) {
    case "合格":
      return "success";
    case "不合格":
      return "danger";
    case "未审批":
      return "warning";
    default:
      return "info";
  }
};

const rowClassName = ({ row }: { row: ToolItem }) => {
  return row.field7 === "过期" ? "row-expired" : "";
};

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page - 1),
      size: String(pagination.value.size)
    });

    if (searchForm.value.field1) {
      params.append("field1", searchForm.value.field1);
    }
    if (searchForm.value.field2) {
      params.append("field2", searchForm.value.field2);
    }
    if (searchForm.value.field3) {
      params.append("field3", searchForm.value.field3);
    }
    if (searchForm.value.field7) {
      params.append("field7", searchForm.value.field7);
    }
    if (searchForm.value.startTime) {
      params.append("beginTime", searchForm.value.startTime);
    }
    if (searchForm.value.endTime) {
      params.append("endTime", searchForm.value.endTime);
    }

    const response = await fetch(
      `/sft/cont/tool/list.json?${params.toString()}`
    );
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
    field1: "",
    field2: "",
    field3: "",
    field7: "",
    startTime: "",
    endTime: ""
  };
  pagination.value.page = 1;
  fetchData();
}

function handleExport() {
  ElMessage.info("导出功能开发中");
}

function handleSelectionChange(selection: ToolItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

async function handleDelete(row: ToolItem) {
  try {
    await ElMessageBox.confirm("确认删除？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
    ElMessage.success("删除成功");
    fetchData();
  } catch {
    // 用户取消
  }
}

async function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的数据");
    return;
  }
  try {
    await ElMessageBox.confirm(
      `确认删除选中的 ${selectedIds.value.length} 条数据？`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }
    );
    ElMessage.success("删除成功");
    selectedIds.value = [];
    fetchData();
  } catch {
    // 用户取消
  }
}

function handleQrCode(row: ToolItem) {
  if (row.field7 !== "合格") {
    ElMessage.warning("审批不合格或已过期！");
    return;
  }
  ElMessage.info("二维码功能开发中");
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  fetchData();
}

function handleCurrentChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="tool-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">工器具管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline
        class="search-form"
      >
        <el-form-item label="申请单位">
          <el-input
            v-model="searchForm.field3"
            placeholder="请输入申请单位"
            clearable
            style="width: 180px"
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
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.field1"
            placeholder="请输入名称"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item label="类别">
          <el-select
            v-model="searchForm.field2"
            placeholder="请选择"
            clearable
            style="width: 180px"
          >
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审批状态">
          <el-select
            v-model="searchForm.field7"
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
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button type="danger" @click="handleBatchDelete">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-form-item>
      </el-form>

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
        <el-table-column prop="field" label="序列号" min-width="140" />
        <el-table-column prop="field1" label="名称" min-width="120" />
        <el-table-column prop="field2" label="类别" width="160" align="center">
          <template #default="{ row }">
            {{ getCategoryName(row.field2) }}
          </template>
        </el-table-column>
        <el-table-column prop="field3" label="型号" width="100" />
        <el-table-column prop="field4" label="使用人" width="100" />
        <el-table-column prop="field5" label="负责人" width="100" />
        <el-table-column
          prop="field7"
          label="审批状态"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.field7)">
              {{ row.field7 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审批时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field8) }}
          </template>
        </el-table-column>
        <el-table-column label="审批人" width="100" align="center">
          <template #default="{ row }">
            {{ row.field12?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请单位" width="140" align="center">
          <template #default="{ row }">
            {{ row.field9?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template #default="{ row }">
            {{ row.field10?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field11) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field6"
          label="备注"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleQrCode(row)"
            >
              二维码
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.tool-container {
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

:deep(.row-expired) {
  color: var(--el-color-danger);
}
</style>
