<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Search,
  RefreshLeft,
  Plus,
  Upload,
  Download,
  Delete
} from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftAccidentManagement"
});

interface AccidentItem {
  addDate: number;
  field: string;
  field1: string;
  field10: string;
  field11: string;
  field12: string;
  field13: string;
  field14: string;
  field15: string;
  field16: string;
  field17: string;
  field18: number;
  field2: string;
  field3: string;
  field4: string;
  field44: string;
  field44Str: string;
  field4Str: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  fieldDate: number;
  id: number;
  name: string;
  status: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: AccidentItem[];
    totalElements: number;
  };
}

// 搜索表单
const searchForm = reactive({
  name: "",
  field5: "",
  field6: "",
  startTime: "",
  endTime: "",
  startTime1: "",
  endTime1: "",
  field17: ""
});

// 表格数据
const tableData = ref<AccidentItem[]>([]);
const loading = ref(false);
const totalElements = ref(0);

// 分页
const pagination = reactive({
  page: 0,
  size: 10
});

// 表单引用
const formRef = ref<FormInstance>();

// 事故类型选项
const accidentTypes = [
  { label: "生产类", value: "生产类" },
  { label: "设备类", value: "设备类" },
  { label: "安全类", value: "安全类" }
];

// 事故等级选项
const accidentLevels = [
  { label: "重伤及以上", value: "重伤及以上" },
  { label: "轻伤", value: "轻伤" },
  { label: "未遂", value: "未遂" }
];

// 格式化日期
function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("zh-CN");
}

// 格式化日期时间
function formatDateTime(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString("zh-CN");
}

// 获取事故等级标签类型
function getLevelTagType(
  level: string
): "success" | "warning" | "danger" | "info" {
  switch (level) {
    case "重伤及以上":
      return "danger";
    case "轻伤":
      return "warning";
    case "未遂":
      return "info";
    default:
      return "info";
  }
}

// 获取事故类型标签类型
function getTypeTagType(
  type: string
): "success" | "warning" | "danger" | "info" {
  switch (type) {
    case "安全类":
      return "danger";
    case "生产类":
      return "warning";
    case "设备类":
      return "success";
    default:
      return "info";
  }
}

// 获取状态文本
function getStatusText(status: number): string {
  return status === 1 ? "已通过" : "待审核";
}

// 获取状态标签类型
function getStatusTagType(status: number): "success" | "warning" | "info" {
  return status === 1 ? "success" : "warning";
}

// 获取数据
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: pagination.page.toString(),
      size: pagination.size.toString()
    });

    // 添加搜索条件
    if (searchForm.name) params.append("name", searchForm.name);
    if (searchForm.field5) params.append("field5", searchForm.field5);
    if (searchForm.field6) params.append("field6", searchForm.field6);
    if (searchForm.field17) params.append("field17", searchForm.field17);

    const response = await fetch(
      `/sft/accident/list.json?${params.toString()}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      totalElements.value = data.t.totalElements;
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
  pagination.page = 0;
  fetchData();
}

// 重置
function handleReset(formRef?: FormInstance) {
  if (!formRef) return;
  formRef.resetFields();
  pagination.page = 0;
  fetchData();
}

// 添加
function handleAdd() {
  ElMessage.info("添加功能待实现");
}

// 导入
function handleImport() {
  ElMessage.info("导入功能待实现");
}

// 导出
function handleExport() {
  ElMessage.info("导出功能待实现");
}

// 批量删除
function handleBatchDelete() {
  ElMessage.info("批量删除功能待实现");
}

// 编辑
function handleEdit(row: AccidentItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

// 删除
function handleDelete(row: AccidentItem) {
  ElMessageBox.confirm(`确定要删除"${row.name}"吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {
      // 取消删除
    });
}

// 通过
function handlePass(row: AccidentItem) {
  ElMessage.info(`通过: ${row.name}`);
}

// 驳回
function handleReject(row: AccidentItem) {
  ElMessage.info(`驳回: ${row.name}`);
}

// 奖惩
function handleReward(row: AccidentItem) {
  ElMessage.info(`奖惩: ${row.name}`);
}

// 分页变化
function handlePageChange(page: number) {
  pagination.page = page - 1;
  fetchData();
}

// 分页大小变化
function handleSizeChange(size: number) {
  pagination.size = size;
  pagination.page = 0;
  fetchData();
}

// 当前页码（从1开始，供 el-pagination 使用）
const currentPage = computed({
  get: () => pagination.page + 1,
  set: (value: number) => {
    pagination.page = value - 1;
  }
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="am-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">事故管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="formRef"
        :model="searchForm"
        inline
        class="search-form"
        label-width="80px"
      >
        <el-form-item label="事故名称" prop="name">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入事故名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="事故类型" prop="field5">
          <el-select
            v-model="searchForm.field5"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in accidentTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事故等级" prop="field6">
          <el-select
            v-model="searchForm.field6"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="item in accidentLevels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发生时间">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始日期"
            clearable
            style="width: 140px"
          />
          <span class="date-separator">-</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            clearable
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="searchForm.startTime1"
            type="date"
            placeholder="开始日期"
            clearable
            style="width: 140px"
          />
          <span class="date-separator">-</span>
          <el-date-picker
            v-model="searchForm.endTime1"
            type="date"
            placeholder="结束日期"
            clearable
            style="width: 140px"
          />
        </el-form-item>
        <el-form-item label="相关责任人" prop="field17">
          <el-input
            v-model="searchForm.field17"
            placeholder="请输入相关责任人"
            clearable
            style="width: 150px"
          />
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <div class="toolbar">
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="handleReset(formRef)">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button link href="/pub/xls/事故管理模板（注意格式为2003）.xls">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button type="warning" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button @click="handleExport">
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
        style="width: 100%; margin-top: 16px"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="name"
          label="事故名称"
          min-width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field5"
          label="事故类型"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getTypeTagType(row.field5)">
              {{ row.field5 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="field6"
          label="事故等级"
          width="110"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getLevelTagType(row.field6)">
              {{ row.field6 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="field1"
          label="发生地点"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="fieldDate"
          label="发生时间"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.fieldDate) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="field7"
          label="相关部门"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="field17"
          label="相关责任人"
          width="120"
          align="center"
        />
        <el-table-column
          prop="addDate"
          label="上传时间"
          width="160"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDateTime(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              v-if="row.status !== 1"
              type="primary"
              size="small"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="row.status !== 1"
              type="danger"
              size="small"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              v-if="row.status !== 1"
              type="success"
              size="small"
              link
              @click="handlePass(row)"
            >
              通过
            </el-button>
            <el-button
              v-if="row.status !== 1"
              type="warning"
              size="small"
              link
              @click="handleReject(row)"
            >
              驳回
            </el-button>
            <el-button
              v-if="row.status === 1"
              type="info"
              size="small"
              link
              disabled
            >
              编辑
            </el-button>
            <el-button
              v-if="row.status === 1"
              type="info"
              size="small"
              link
              disabled
            >
              删除
            </el-button>
            <el-button
              v-if="row.status === 1"
              type="info"
              size="small"
              link
              disabled
            >
              通过
            </el-button>
            <el-button
              v-if="row.status === 1"
              type="info"
              size="small"
              link
              disabled
            >
              驳回
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="handleReward(row)"
            >
              奖惩
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalElements"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.am-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  :deep(.el-form-item) {
    margin-right: 16px;
    margin-bottom: 12px;
  }
}

.date-separator {
  margin: 0 8px;
  color: var(--el-text-color-secondary);
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
