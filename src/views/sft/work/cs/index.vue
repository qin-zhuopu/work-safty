<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftWorkCs"
});

interface TableItem {
  id: string;
  name: string;
  addDate: number;
  field1?: { name: string };
  field2: string;
  field3: string;
  field19Str: string;
  field20Str: string;
  field21Str: string;
  field22Str: string;
  nodeName: string;
  status: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: TableItem[];
    totalElements: number;
    number: number;
    size: number;
  };
}

const tableData = ref<TableItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const searchForm = ref({
  operatUnit: ""
});

// 格式化时间
function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 获取数据
async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(pageSize.value)
    });
    if (searchForm.value.operatUnit) {
      params.append("operatUnit", searchForm.value.operatUnit);
    }
    const response = await fetch(`/sft/work/cs/list?${params}`);
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

// 搜索
function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

// 重置
function handleReset() {
  searchForm.value.operatUnit = "";
  currentPage.value = 1;
  fetchData();
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

// 详情
function handleDetail(row: TableItem) {
  ElMessage.info("详情功能待实现");
}

// 删除
function handleDelete(row: TableItem) {
  ElMessageBox.confirm("确认删除活动及作业票？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/work/cs/del/${row.id}`);
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          fetchData();
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
      }
    })
    .catch(() => {});
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="cs-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">施工方案</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="项目名称">
          <el-input
            v-model="searchForm.operatUnit"
            placeholder="请输入项目名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch"> 检索 </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="项目名称" min-width="200" />
        <el-table-column label="申请时间" width="160" align="center">
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="施工单位" width="150">
          <template #default="{ row }">
            {{ row.field1?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="field2" label="工程概况" min-width="150" />
        <el-table-column prop="field3" label="涉及作业" width="120" />
        <el-table-column
          prop="field19Str"
          label="编制人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="field20Str"
          label="审核人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="field21Str"
          label="批准人"
          width="100"
          align="center"
        />
        <el-table-column
          prop="field22Str"
          label="分析人"
          width="100"
          align="center"
        />
        <el-table-column prop="nodeName" label="节点名称" min-width="150" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag
              :type="
                row.status === '审批'
                  ? 'warning'
                  : row.status === '已审核'
                    ? 'success'
                    : 'info'
              "
            >
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleDetail(row)">
              详情
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.cs-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}
</style>
