<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftHazardMhs"
});

interface HazardItem {
  id: number;
  title: string;
  level: string;
  filingDate: number;
  planDate: number;
  addDate: number;
  latitude?: number;
  longitude?: number;
  company: {
    id: number;
    name: string;
  };
  sysUser: {
    id: number;
    uname: string;
    ushow: string;
  };
}

interface ApiResponse {
  success: boolean;
  t: {
    content: HazardItem[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

const tableData = ref<HazardItem[]>([]);
const loading = ref(false);
const searchTitle = ref("");
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(pageSize.value)
    });
    if (searchTitle.value) {
      params.append("title", searchTitle.value);
    }
    const response = await fetch(`/sft/hazard/mhs/list.json?${params}`);
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

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  searchTitle.value = "";
  currentPage.value = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: HazardItem) {
  ElMessage.info(`编辑: ${row.title}`);
}

function handleDelete(row: HazardItem) {
  ElMessage.info(`删除: ${row.title}`);
}

function handleDocumentList(row: HazardItem) {
  ElMessage.info(`资料清单: ${row.title}`);
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleDateString("zh-CN");
}

function getLevelType(
  level: string
): "success" | "warning" | "danger" | "info" {
  switch (level) {
    case "Ⅰ级":
      return "danger";
    case "Ⅱ级":
      return "warning";
    case "Ⅲ级":
      return "success";
    case "Ⅳ级":
      return "info";
    default:
      return "info";
  }
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="mhs-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">重大危险源管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form mb-4">
        <el-form :inline="true" :model="{ title: searchTitle }">
          <el-form-item label="标题">
            <el-input
              v-model="searchTitle"
              placeholder="请输入标题"
              clearable
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch"> 查询 </el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="success" @click="handleAdd">添加</el-button>
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
        <el-table-column prop="title" label="单元名称" min-width="200" />
        <el-table-column
          prop="level"
          label="危险等级"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="filingDate"
          label="备案日期"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.filingDate) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="planDate"
          label="计划日期"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.planDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="sysUser.ushow" label="责任人" width="150" />
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              size="small"
              type="warning"
              link
              @click="handleDocumentList(row)"
            >
              资料清单
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="fetchData"
          @current-change="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.mhs-container {
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
