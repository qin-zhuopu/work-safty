<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "ResumContent"
});

interface ContentItem {
  content: string;
  date: number;
  id: number;
  item: string;
  measure: string;
  resum: {
    company: {
      id: number;
      name: string;
    };
    id: number;
    name: string;
    type: number;
  };
  status: number;
  type: string;
  type2: string;
  type3: string;
  user: {
    id: number;
    uname: string;
  };
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ContentItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  };
}

const tableData = ref<ContentItem[]>([]);
const loading = ref(false);
const searchForm = ref({
  type: "",
  content: ""
});
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
});

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page - 1),
      size: String(pagination.value.pageSize)
    });
    if (searchForm.value.type) {
      params.append("type", searchForm.value.type);
    }
    if (searchForm.value.content) {
      params.append("content", searchForm.value.content);
    }

    const response = await fetch(`/sft/resum/content/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
      pagination.value.page = page;
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
  searchForm.value = {
    type: "",
    content: ""
  };
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("新建功能待实现");
}

function handleEdit(row: ContentItem) {
  ElMessage.info(`编辑: ${row.item}`);
}

function handlePageChange(page: number) {
  fetchData(page);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="content-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">三类包保责任制履职排查内容</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :model="searchForm" inline>
        <el-form-item label="类型">
          <el-select
            v-model="searchForm.type"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option label="操作负责人" value="操作负责人" />
            <el-option label="技术负责人" value="技术负责人" />
            <el-option label="主要负责人" value="主要负责人" />
          </el-select>
        </el-form-item>
        <el-form-item label="排查内容">
          <el-input
            v-model="searchForm.content"
            placeholder="请输入排查内容"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch"> 检索 </el-button>
          <el-button @click="handleReset"> 重置 </el-button>
          <el-button type="primary" @click="handleAdd"> 新建 </el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="item" label="编号" width="80" align="center" />
        <el-table-column prop="type" label="类型" width="120" align="center" />
        <el-table-column
          prop="type2"
          label="子类型"
          width="150"
          align="center"
        />
        <el-table-column
          prop="content"
          label="排查内容"
          min-width="300"
          show-overflow-tooltip
        />
        <el-table-column
          prop="measure"
          label="防控措施"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="resum.name"
          label="负责人类型"
          width="120"
          align="center"
        />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? "启用" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="() => fetchData(1)"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.content-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
