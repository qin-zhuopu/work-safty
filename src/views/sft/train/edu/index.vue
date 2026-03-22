<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, RefreshLeft, Plus } from "@element-plus/icons-vue";

defineOptions({
  name: "SftTrainEdu"
});

// 类型枚举映射
const EDUCATION_TYPE_MAP: Record<number, string> = {
  1: "三级教育厂级",
  2: "三级教育车间级",
  3: "三级教育工段班组级",
  4: "日常教育",
  5: "转岗培训",
  6: "复岗培训"
};

// 级别枚举映射
const LEVEL_MAP: Record<number, string> = {
  1: "厂级",
  2: "车间级",
  3: "工段班组级"
};

// 资源类型枚举映射
const RESOURCE_TYPE_MAP: Record<number, string> = {
  1: "本地",
  2: "外链"
};

interface EduItem {
  id: number;
  title: string;
  field: string; // 课程简介
  field1: number; // 类型 1-6
  isOpen: number; // 是否公开 0-公开 1-不公开
  field2: string; // 课件类型
  level: number; // 级别 1-3
  type: number; // 资源类型 1-本地 2-外链
  createTime: number; // 创建时间戳
  file1: string; // 本地地址
  file2: string; // 外链地址
}

interface ApiResponse {
  success: boolean;
  t: {
    content: EduItem[];
    totalElements: number;
    total: number;
  };
}

const tableData = ref<EduItem[]>([]);
const loading = ref(false);
const searchTitle = ref("");
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

// 获取列表数据
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page - 1), // 后端从0开始
      size: String(pagination.value.size)
    });
    if (searchTitle.value) {
      params.append("title", searchTitle.value);
    }

    const response = await fetch(`/sft/train/edu/list?${params}`);
    const data: ApiResponse = await response.json();

    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements || data.t.total || 0;
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

// 格式化时间
function formatTime(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 获取资源地址
function getFileUrl(row: EduItem): string {
  if (row.type === 1) {
    return row.file1 || "-";
  } else if (row.type === 2) {
    return row.file2 || "-";
  }
  return "-";
}

// 获取资源链接URL
function getFileLink(row: EduItem): string {
  if (row.type === 1) {
    return `/files/${row.file1}`; // 本地文件路径
  } else if (row.type === 2) {
    return row.file2; // 外链直接返回
  }
  return "";
}

// 搜索
function handleSearch() {
  pagination.value.page = 1;
  fetchData();
}

// 重置
function handleReset() {
  searchTitle.value = "";
  pagination.value.page = 1;
  fetchData();
}

// 添加
function handleAdd() {
  ElMessage.info("添加功能待实现");
}

// 编辑
function handleEdit(row: EduItem) {
  ElMessage.info(`编辑: ${row.title}`);
}

// 删除
function handleDelete(row: EduItem) {
  ElMessageBox.confirm("确认删除该教育培训记录？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      // 实际应该调用删除接口
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {
      // 取消删除
    });
}

// 分页变化
function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

// 每页数量变化
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
  <div class="edu-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">教育培训管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" @submit.prevent="handleSearch">
          <el-form-item label="标题">
            <el-input
              v-model="searchTitle"
              placeholder="请输入标题"
              clearable
              style="width: 200px"
              @keyup.enter="handleSearch"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>
              检索
            </el-button>
            <el-button @click="handleReset">
              <el-icon><RefreshLeft /></el-icon>
              重置
            </el-button>
            <el-button type="success" @click="handleAdd">
              <el-icon><Plus /></el-icon>
              添加
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
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="title" label="标题" min-width="180" />
        <el-table-column
          prop="field"
          label="课程简介"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column prop="field1" label="类型" width="150" align="center">
          <template #default="{ row }">
            {{ EDUCATION_TYPE_MAP[row.field1] || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="isOpen"
          label="是否公开"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="row.isOpen === 0 ? 'success' : 'info'">
              {{ row.isOpen === 0 ? "公开" : "不公开" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="field2"
          label="课件类型"
          width="100"
          align="center"
        />
        <el-table-column prop="level" label="级别" width="120" align="center">
          <template #default="{ row }">
            {{ LEVEL_MAP[row.level] || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="资源类型"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            {{ RESOURCE_TYPE_MAP[row.type] || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatTime(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="file" label="地址" min-width="180">
          <template #default="{ row }">
            <a
              v-if="getFileUrl(row) !== '-'"
              :href="getFileLink(row)"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              {{ getFileUrl(row) }}
            </a>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper mt-4 flex justify-end">
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
.edu-container {
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

.pagination-wrapper {
  :deep(.el-pagination) {
    justify-content: flex-end;
  }
}
</style>
