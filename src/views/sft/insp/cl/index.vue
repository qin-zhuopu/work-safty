<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftInspCl"
});

interface AddUser {
  id: number;
  ushow: string;
}

interface ListItem {
  id: number;
  deptName: string;
  field: string; // 原手机型号
  field1: string; // 原手机序列号1
  field2: string; // 原手机序列号2
  field3: string; // 更换原因
  field4: string; // 新手机型号
  field5: string; // 新手机序列号1
  field6: string; // 新手机序列号2
  field7: number; // 申请时间
  field8: string; // 申请人
  field9: string; // 申请人电话
  field10: string; // 处理人
  field11: string; // 返厂维修/报废
  field12: string; // 处理结果
  field13: string; // 物联网卡号
  addDate: number;
  addUser: AddUser;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ListItem[];
    totalElements: number;
  };
}

const tableData = ref<ListItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const searchForm = reactive({
  name: ""
});
const multipleSelection = ref<ListItem[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref("添加");

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size),
      ...(searchForm.name ? { name: searchForm.name } : {})
    });
    const response = await fetch(`/sft/insp/cl/list.json?${params}`);
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
  searchForm.name = "";
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

function handleAdd() {
  dialogTitle.value = "添加";
  dialogVisible.value = true;
}

function handleEdit(row: ListItem) {
  dialogTitle.value = "编辑";
  dialogVisible.value = true;
  ElMessage.info(`编辑: ${row.deptName}`);
}

function handleDelete(row: ListItem) {
  ElMessageBox.confirm("确认删除该记录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      tableData.value = tableData.value.filter(item => item.id !== row.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {});
}

function handleSelectionChange(val: ListItem[]) {
  multipleSelection.value = val;
}

function handleDelAll() {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${multipleSelection.value.length} 条记录吗？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      const ids = multipleSelection.value.map(item => item.id);
      tableData.value = tableData.value.filter(item => !ids.includes(item.id));
      ElMessage.success("删除成功");
    })
    .catch(() => {});
}

function handleDownloadTemplate() {
  ElMessage.info("下载模板功能开发中");
}

function handleImport() {
  ElMessage.info("导入功能开发中");
}

function handleExport() {
  ElMessage.info("导出功能开发中");
}

function formatDate(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="cl-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">更换台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="部门">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入部门"
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
      <div class="mb-4 flex flex-wrap gap-2">
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button size="small" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button size="small" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button size="small" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="danger" size="small" @click="handleDelAll">
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
        <el-table-column prop="deptName" label="部门" min-width="150" />
        <el-table-column prop="field" label="原手机型号" min-width="150" />
        <el-table-column prop="field1" label="原手机序列号1" width="160" />
        <el-table-column prop="field2" label="原手机序列号2" width="160" />
        <el-table-column prop="field3" label="更换原因" min-width="120" />
        <el-table-column prop="field4" label="新手机型号" min-width="150" />
        <el-table-column prop="field5" label="新手机序列号1" width="160" />
        <el-table-column prop="field6" label="新手机序列号2" width="160" />
        <el-table-column prop="field13" label="物联网卡号" width="140" />
        <el-table-column label="申请时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDate(row.field7) }}
          </template>
        </el-table-column>
        <el-table-column prop="field8" label="申请人" width="100" />
        <el-table-column prop="field9" label="申请人电话" width="130" />
        <el-table-column prop="field10" label="处理人" width="100" />
        <el-table-column prop="field11" label="返厂维修/报废" width="130" />
        <el-table-column prop="field12" label="处理结果" min-width="120" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
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

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <div class="text-center py-8 text-gray-500">
        {{ dialogTitle }}表单内容待实现
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.cl-container {
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
</style>
