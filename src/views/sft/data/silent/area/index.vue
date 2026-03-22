<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftDataSilentArea"
});

interface SilentAreaItem {
  id: number;
  field: string;
  startTime: number;
  endTime: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: SilentAreaItem[];
    totalElements: number;
  };
}

const tableData = ref<SilentAreaItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});
const searchForm = reactive({
  title: ""
});
const dialogVisible = ref(false);
const dialogTitle = ref("");
const formData = reactive<Partial<SilentAreaItem>>({});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      ...(searchForm.title ? { title: searchForm.title } : {})
    });
    const response = await fetch(`/sft/data/silent/area/list.json?${params}`);
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
  searchForm.title = "";
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
  dialogTitle.value = "新建静默区域";
  Object.assign(formData, {});
  dialogVisible.value = true;
}

function handleEdit(row: SilentAreaItem) {
  dialogTitle.value = "编辑静默区域";
  Object.assign(formData, { ...row });
  dialogVisible.value = true;
}

function handleDelete(row: SilentAreaItem) {
  ElMessageBox.confirm("确认删除该记录?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {});
}

function handleDialogConfirm() {
  if (!formData.field) {
    ElMessage.warning("请输入名称");
    return;
  }
  ElMessage.success(dialogTitle.value === "新建静默区域" ? "新建成功" : "编辑成功");
  dialogVisible.value = false;
  fetchData();
}

function formatDate(timestamp: number): string {
  return timestamp ? dayjs(timestamp).format("YYYY-MM-DD") : "";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="silent-area-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">静默区域</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="名称">
            <el-input
              v-model="searchForm.title"
              placeholder="名称"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              检索
            </el-button>
            <el-button @click="handleReset">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
            <el-button type="primary" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              新建
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="field" label="名称" min-width="200" />
        <el-table-column label="计划开始时间" width="140" align="center">
          <template #default="{ row }">
            {{ formatDate(row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column label="计划结束时间" width="140" align="center">
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
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

    <!-- 新建/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form :model="formData" label-width="120px">
        <el-form-item label="名称" required>
          <el-input v-model="formData.field" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="计划开始时间">
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            placeholder="选择计划开始时间"
            value-format="X"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="计划结束时间">
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            placeholder="选择计划结束时间"
            value-format="X"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.silent-area-container {
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
