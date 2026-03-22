<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftContTool"
});

interface UserInfo {
  id: number;
  ushow: string;
  cardNo: string;
  company: {
    id: number;
    name: string;
  };
}

interface ToolItem {
  id: number;
  field: string; // 序列号
  field1: string; // 名称
  field2: string; // 类别 (01-08)
  field3: string; // 型号
  field4: string; // 使用人
  field5: string; // 负责人
  field6: string; // 备注
  field7: string; // 审批状态
  field8: number; // 审批时间
  field9: {
    id: number;
    name: string;
  }; // 申请单位
  field10: UserInfo; // 申请人
  field11: number; // 申请时间
  field12: UserInfo; // 审批人
  pics: string[]; // 照片
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ToolItem[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

const CATEGORY_OPTIONS = [
  { label: "梯子", value: "01" },
  { label: "手持电动工具", value: "02" },
  { label: "配电箱", value: "03" },
  { label: "电焊机", value: "04" },
  { label: "等离子切割机", value: "05" },
  { label: "手拉葫芦（包括电动葫芦）", value: "06" },
  { label: "电动器具", value: "07" },
  { label: "其他类", value: "08" }
];

const STATUS_OPTIONS = [
  { label: "未审批", value: "未审批" },
  { label: "合格", value: "合格" },
  { label: "不合格", value: "不合格" }
];

const tableData = ref<ToolItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索表单
const searchForm = ref({
  field1: "", // 名称
  field2: "", // 类别
  field3: "", // 申请单位
  field7: "", // 审批状态
  startTime: "", // 申请开始时间
  endTime: "" // 申请结束时间
});

const selectedRows = ref<ToolItem[]>([]);

// 类别映射
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

// 格式化日期
const formatDate = (timestamp: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
};

// 获取类别名称
const getCategoryName = (code: string) => {
  return categoryMap[code] || "";
};

// 获取审批状态类型
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

// 获取表格行样式
const tableRowClassName = ({ row }: { row: ToolItem }) => {
  if (row.field7 === "过期") {
    return "warning-row";
  }
  return "";
};

// 获取数据
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value),
      size: String(pageSize.value)
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

    const response = await fetch(`/sft/cont/tool/list?${params.toString()}`);
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

// 查询
function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

// 重置
function handleReset() {
  searchForm.value = {
    field1: "",
    field2: "",
    field3: "",
    field7: "",
    startTime: "",
    endTime: ""
  };
  currentPage.value = 1;
  fetchData();
}

// 导出
function handleExport() {
  ElMessage.info("导出功能开发中");
}

// 批量删除
function handleBatchDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }

  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功！");
      selectedRows.value = [];
      fetchData();
    })
    .catch(() => {
      // 取消删除
    });
}

// 删除单行
function handleDelete(row: ToolItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功！");
      fetchData();
    })
    .catch(() => {
      // 取消删除
    });
}

// 显示二维码
function handleQrcode(row: ToolItem) {
  if (row.field7 !== "合格") {
    ElMessage.warning("审批不合格或已过期！");
    return;
  }
  ElMessage.info(`二维码功能开发中 - 序列号: ${row.field}`);
}

// 选择变化
function handleSelectionChange(selection: ToolItem[]) {
  selectedRows.value = selection;
}

// 分页变化
function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
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
      <el-form :model="searchForm" inline class="search-form">
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
          <span class="mx-2">-</span>
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
              v-for="item in CATEGORY_OPTIONS"
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
              v-for="item in STATUS_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="mb-4">
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button type="success" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        :row-class-name="tableRowClassName"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="序列号" min-width="140" />
        <el-table-column prop="field1" label="名称" min-width="120" />
        <el-table-column label="类别" width="150" align="center">
          <template #default="{ row }">
            {{ getCategoryName(row.field2) }}
          </template>
        </el-table-column>
        <el-table-column prop="field3" label="型号" width="100" />
        <el-table-column prop="field4" label="使用人" width="100" />
        <el-table-column prop="field5" label="负责人" width="100" />
        <el-table-column label="审批状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.field7)">
              {{ row.field7 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审批时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field8) }}
          </template>
        </el-table-column>
        <el-table-column label="审批人" width="100" align="center">
          <template #default="{ row }">
            {{ row.field12?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请单位" width="110" align="center">
          <template #default="{ row }">
            {{ row.field9?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template #default="{ row }">
            {{ row.field10?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field11) }}
          </template>
        </el-table-column>
        <el-table-column label="照片" width="80" align="center">
          <template #default="{ row }">
            <el-tag
              v-if="row.pics && row.pics.length > 0"
              type="info"
              size="small"
            >
              {{ row.pics.length }}张
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="field6" label="备注" min-width="120" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleQrcode(row)">
              二维码
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
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
  margin-bottom: 16px;
}

:deep(.el-table .warning-row) {
  color: #f56c6c;
}
</style>
