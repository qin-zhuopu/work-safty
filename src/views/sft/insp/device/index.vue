<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftInspDevice"
});

interface InspectionSite {
  id: number;
  name: string;
}

interface SysDept {
  id: number;
  name: string;
}

interface AddUser {
  id: number;
  ushow: string;
}

interface DeviceItem {
  id: number;
  name: string;
  field: string;
  inspectionSite: InspectionSite | null;
  sysDept: SysDept | null;
  dept: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: number;
  field7: string;
  field8: number;
  field9: string;
  field10: string;
  field11: string;
  field12: string;
  addDate: number;
  addUser: AddUser;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: DeviceItem[];
    totalElements: number;
  };
}

const tableData = ref<DeviceItem[]>([]);
const loading = ref(false);
const selectedIds = ref<number[]>([]);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const searchForm = reactive({
  deptName: "",
  name: "",
  field3: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      ...(searchForm.deptName ? { deptName: searchForm.deptName } : {}),
      ...(searchForm.name ? { name: searchForm.name } : {}),
      ...(searchForm.field3 ? { field3: searchForm.field3 } : {})
    });
    const response = await fetch(`/sft/insp/device/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.total = data.t.totalElements;
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
  pagination.page = 1;
  fetchData();
}

function handleReset() {
  searchForm.deptName = "";
  searchForm.name = "";
  searchForm.field3 = "";
  pagination.page = 1;
  fetchData();
}

function handlePageChange(page: number) {
  pagination.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.size = size;
  pagination.page = 1;
  fetchData();
}

function handleSelectionChange(selection: DeviceItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleAdd() {
  ElMessage.info("添加功能");
}

function handleEdit(row: DeviceItem) {
  ElMessage.info(`编辑: ${row.inspectionSite?.name || row.field}`);
}

function handleDelete(row: DeviceItem) {
  ElMessageBox.confirm("确认删除该记录?", "提示", {
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

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择相应的数据！");
    return;
  }
  ElMessageBox.confirm(`确认删除选中数据？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      selectedIds.value = [];
      fetchData();
    })
    .catch(() => {});
}

function handleDownloadTemplate() {
  ElMessage.success("下载模板");
}

function handleImport() {
  ElMessage.info("导入功能");
}

function handleExport() {
  ElMessage.success("导出成功");
}

function formatDate(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

function getDeptNames(deptStr: string): string {
  // 简化处理，实际项目中应根据ID从部门树中获取名称
  return deptStr || "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="device-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">巡检设备清单管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="车间名称">
            <el-input
              v-model="searchForm.deptName"
              placeholder="请输入车间名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="巡检点名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入巡检点名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="ABC编号">
            <el-input
              v-model="searchForm.field3"
              placeholder="请输入ABC编号"
              clearable
              style="width: 200px"
            />
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
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="btn-group mb-4">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button type="warning" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button type="success" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button type="info" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </div>

      <!-- 表格 -->
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
        <el-table-column label="巡检点名称" min-width="120">
          <template #default="{ row }">
            {{ row.inspectionSite?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="field" label="设备编号" min-width="100" />
        <el-table-column label="所属车间" min-width="120">
          <template #default="{ row }">
            {{ row.sysDept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column label="工段" min-width="120">
          <template #default="{ row }">
            {{ getDeptNames(row.dept) }}
          </template>
        </el-table-column>
        <el-table-column prop="field1" label="设备位号" min-width="100" />
        <el-table-column prop="field2" label="设备名称" min-width="120" />
        <el-table-column prop="field3" label="ABC编号" min-width="100" />
        <el-table-column prop="field4" label="规格型号" min-width="120" />
        <el-table-column prop="field5" label="生产厂家" min-width="150" />
        <el-table-column
          prop="field6"
          label="安装数量"
          width="80"
          align="center"
        />
        <el-table-column prop="field7" label="安装地点号" min-width="100" />
        <el-table-column label="安装日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field8) }}
          </template>
        </el-table-column>
        <el-table-column prop="field9" label="资产编号" min-width="100" />
        <el-table-column prop="field10" label="设备状态" min-width="100">
          <template #default="{ row }">
            <el-tag :type="row.field10 === '正常运行' ? 'success' : 'warning'">
              {{ row.field10 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="field11" label="包机责任人" min-width="100" />
        <el-table-column
          prop="field12"
          label="备注"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="创建时间" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template #default="{ row }">
            {{ row.addUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.device-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}

.btn-group {
  display: flex;
  gap: 8px;
}
</style>
