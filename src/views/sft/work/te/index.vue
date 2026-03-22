<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftWorkTe"
});

interface TeItem {
  id: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: number;
  field8: number;
  field9: string;
  field10: string;
  field11: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: TeItem[];
    totalElements: number;
  };
}

const tableData = ref<TeItem[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  field1: "",
  startTime: "",
  endTime: "",
  startTime1: "",
  endTime1: ""
});

const selectedIds = ref<string[]>([]);

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    if (searchForm.field1) params.append("field1", searchForm.field1);
    if (searchForm.startTime) params.append("startTime", searchForm.startTime);
    if (searchForm.endTime) params.append("endTime", searchForm.endTime);
    if (searchForm.startTime1)
      params.append("startTime1", searchForm.startTime1);
    if (searchForm.endTime1) params.append("endTime1", searchForm.endTime1);

    const response = await fetch(`/sft/work/te/list.json?${params}`);
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

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isExpired(timestamp: number): boolean {
  if (!timestamp) return false;
  return Date.now() > timestamp;
}

function handleSearch() {
  fetchData(1);
}

function handleReset() {
  searchForm.field1 = "";
  searchForm.startTime = "";
  searchForm.endTime = "";
  searchForm.startTime1 = "";
  searchForm.endTime1 = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDownloadTemplate() {
  window.open("/pub/xls/检测设备台账模板（注意格式为2003）.xls");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleEdit(row: TeItem) {
  ElMessage.info(`编辑: ${row.id}`);
}

function handleDelete(row: TeItem) {
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

function handleSelectionChange(selection: TeItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条数据？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      ElMessage.success("删除成功");
      selectedIds.value = [];
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="work-te-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">检测设备台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="仪器名称">
          <el-input
            v-model="searchForm.field1"
            placeholder="请输入仪器名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="检定日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 135px"
          />
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 135px; margin-left: 8px"
          />
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="searchForm.startTime1"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            style="width: 135px"
          />
          <el-date-picker
            v-model="searchForm.endTime1"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 135px; margin-left: 8px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            检索
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
          <el-button type="primary" icon="Plus" @click="handleAdd">
            添加
          </el-button>
          <el-button icon="Download" @click="handleDownloadTemplate">
            下载模板
          </el-button>
          <el-button icon="Upload" @click="handleImport">导入</el-button>
          <el-button icon="Download" @click="handleExport">导出</el-button>
          <el-button type="danger" icon="Delete" @click="handleBatchDelete">
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
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="位号" min-width="80" />
        <el-table-column prop="field1" label="仪器名称" min-width="100" />
        <el-table-column prop="field2" label="规格型号" min-width="100" />
        <el-table-column prop="field3" label="编号" min-width="100" />
        <el-table-column prop="field4" label="检测介质" min-width="100" />
        <el-table-column prop="field5" label="生产厂家" min-width="120" />
        <el-table-column prop="field6" label="检定周期（月）" min-width="110" />
        <el-table-column prop="field7" label="检定日期" min-width="110">
          <template #default="{ row }">
            {{ formatDate(row.field7) }}
          </template>
        </el-table-column>
        <el-table-column prop="field8" label="有效期" min-width="110">
          <template #default="{ row }">
            <span :class="{ 'text-red-600 font-bold': isExpired(row.field8) }">
              {{ formatDate(row.field8) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="field9" label="准确度等级" min-width="100" />
        <el-table-column prop="field10" label="使用部门" min-width="100" />
        <el-table-column prop="field11" label="使用单位" min-width="100" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handleEdit(row)"
            >
              编辑
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
.work-te-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;

  .el-form-item {
    margin-bottom: 8px;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.text-red-600 {
  color: #dc2626;
}

.font-bold {
  font-weight: bold;
}
</style>
