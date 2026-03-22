<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftEmerresourFp"
});

interface FpItem {
  id: string;
  field: string;
  field1: string;
  field2: string;
  field3: string;
  field4: number;
  next: string;
  remarks: string;
  scaleX: string;
  scaleY: string;
  sysDeptName: string;
  sysDeptId: string;
  sysUserName: string;
  addDate: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: FpItem[];
    totalElements: number;
  };
}

const tableData = ref<FpItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedIds = ref<string[]>([]);

// 搜索条件
const searchDeptId = ref("-1");
const searchName = ref("");
const searchStartTime = ref("");
const searchEndTime = ref("");

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: pageSize.value.toString()
    });
    if (searchName.value) {
      params.append("field", searchName.value);
    }
    if (searchDeptId.value && searchDeptId.value !== "-1") {
      params.append("deptId", searchDeptId.value);
    }
    if (searchStartTime.value) {
      params.append("startTime", searchStartTime.value);
    }
    if (searchEndTime.value) {
      params.append("endTime", searchEndTime.value);
    }

    const response = await fetch(`/sft/emerresour/fp/list?${params}`);
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
  searchDeptId.value = "-1";
  searchName.value = "";
  searchStartTime.value = "";
  searchEndTime.value = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleDownloadTemplate() {
  ElMessage.info("下载模板功能待实现");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleMaintenRecord() {
  ElMessage.info("维护记录功能待实现");
}

function handleEdit(row: FpItem) {
  ElMessage.info(`编辑: ${row.field}`);
}

function handleDelete(row: FpItem) {
  ElMessageBox.confirm("确认删除该记录？", "提示", {
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

function handleQrcode(row: FpItem) {
  ElMessage.info(`二维码: ${row.field}`);
}

function handleSelectionChange(selection: FpItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的记录！");
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

function handlePageChange(page: number) {
  fetchData(page);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("zh-CN");
}

onMounted(() => {
  fetchData(1);
});
</script>

<template>
  <div class="fp-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">防汛物资台账</span>
        </div>
      </template>

      <!-- 搜索栏 -->
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <el-select
          v-model="searchDeptId"
          placeholder="请选择部门"
          clearable
          style="width: 150px"
        >
          <el-option label="请选择部门" value="-1" />
          <el-option label="安全管理部" value="1" />
          <el-option label="设备管理部" value="2" />
          <el-option label="后勤保障部" value="3" />
          <el-option label="信息技术部" value="4" />
        </el-select>
        <el-input
          v-model="searchName"
          placeholder="请输入名称"
          clearable
          style="width: 180px"
          @keyup.enter="handleSearch"
        />
        <el-date-picker
          v-model="searchStartTime"
          type="date"
          placeholder="开始日期"
          value-format="YYYY-MM-DD"
          style="width: 140px"
        />
        <el-date-picker
          v-model="searchEndTime"
          type="date"
          placeholder="结束日期"
          value-format="YYYY-MM-DD"
          style="width: 140px"
        />
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-divider direction="vertical" />
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button type="warning" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button type="info" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button type="info" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="primary" @click="handleMaintenRecord">
          <el-icon><Document /></el-icon>
          维护记录
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
        <el-table-column prop="field" label="名称" min-width="120" />
        <el-table-column prop="field1" label="规格" width="100" />
        <el-table-column prop="field2" label="数量" width="80" align="center" />
        <el-table-column prop="field3" label="存放位置" min-width="150" />
        <el-table-column prop="sysDeptName" label="所属部门" width="120" />
        <el-table-column prop="sysUserName" label="责任人" width="100" />
        <el-table-column label="维护日期" width="110" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field4) }}
          </template>
        </el-table-column>
        <el-table-column prop="next" label="下次维护时间" min-width="150" />
        <el-table-column prop="remarks" label="备注" min-width="150" />
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
            <el-button type="info" size="small" @click="handleQrcode(row)">
              二维码
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.fp-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}
</style>
