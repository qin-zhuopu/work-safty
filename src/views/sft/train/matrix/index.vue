<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftTrainMatrix"
});

interface MatrixItem {
  id: number;
  field1: string; // 分类
  field2: string; // 培训内容
  field3?: string; // 热电维修工段(10)
  field4?: string; // PVC维修工段(6)
  field5?: string; // EDC聚合工段(2)
  field6?: string; // EDCVCM工段(1)
  field7?: string; // 热电维修工段
  field8?: string; // 维修工段
  field9?: string; // 电气工段
  field10?: string; // 整流工段
  field11?: string; // 化水工段
  field12?: string; // 560工段
  field13?: string; // 公用工程工段
  field14?: string; // 汽机工段
  field15?: string; // 双氧水工段
  field16?: string; // 环保工段
  field17?: string; // 锅炉工段
  field18?: string; // 乙炔工段
  field19?: string; // 压滤工段
  field20?: string; // 聚合工段
  field21?: string; // 550工段
  field22?: string; // 合成工段
  field23?: string; // 540工段
  field24?: string; // 530工段
  field25?: string; // 520工段
  field26?: string; // 510工段
}

interface PageResponse {
  content: MatrixItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  t: PageResponse;
}

const tableData = ref<MatrixItem[]>([]);
const loading = ref(false);
const keyWord = ref("");
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

// 表格列定义
const tableColumns = computed(() => [
  { prop: "field1", label: "分类", width: "80" },
  { prop: "field2", label: "培训内容", width: "180" },
  { prop: "field3", label: "热电维修工段(10)", width: "140" },
  { prop: "field4", label: "PVC维修工段(6)", width: "140" },
  { prop: "field5", label: "EDC聚合工段(2)", width: "140" },
  { prop: "field6", label: "EDCVCM工段(1)", width: "140" },
  { prop: "field7", label: "热电维修工段", width: "140" },
  { prop: "field8", label: "维修工段", width: "140" },
  { prop: "field9", label: "电气工段", width: "140" },
  { prop: "field10", label: "整流工段", width: "140" },
  { prop: "field11", label: "化水工段", width: "140" },
  { prop: "field12", label: "560工段", width: "140" },
  { prop: "field13", label: "公用工程工段", width: "150" },
  { prop: "field14", label: "汽机工段", width: "120" },
  { prop: "field15", label: "双氧水工段", width: "130" },
  { prop: "field16", label: "环保工段", width: "120" },
  { prop: "field17", label: "锅炉工段", width: "120" },
  { prop: "field18", label: "乙炔工段", width: "120" },
  { prop: "field19", label: "压滤工段", width: "120" },
  { prop: "field20", label: "聚合工段", width: "120" },
  { prop: "field21", label: "550工段", width: "120" },
  { prop: "field22", label: "合成工段", width: "120" },
  { prop: "field23", label: "540工段", width: "120" },
  { prop: "field24", label: "530工段", width: "120" },
  { prop: "field25", label: "520工段", width: "120" },
  { prop: "field26", label: "510工段", width: "120" }
]);

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page - 1),
      size: String(pagination.value.size)
    });
    if (keyWord.value) {
      params.append("keyWord", keyWord.value);
    }

    const response = await fetch(`/sft/train/matrix/list?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
    } else {
      ElMessage.error(data.message || "获取数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  pagination.value.page = 1;
  fetchData();
}

function handleReset() {
  keyWord.value = "";
  pagination.value.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: MatrixItem) {
  ElMessage.info(`编辑: ${row.field2}`);
}

function handleDelete(row: MatrixItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const response = await fetch(`/sft/train/matrix/delData/${row.id}`);
      const data = await response.json();
      if (data.success) {
        ElMessage.success("删除成功");
        fetchData();
      } else {
        ElMessage.error(data.message || "删除失败");
      }
    })
    .catch(() => {
      // 用户取消
    });
}

function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

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
  <div class="matrix-container">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :inline="true" class="search-form">
        <el-form-item label="关键字">
          <el-input
            v-model="keyWord"
            placeholder="请输入关键字"
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

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          v-for="col in tableColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          show-overflow-tooltip
        />
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
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.matrix-container {
  padding: 16px;
}

.search-form {
  margin-bottom: 16px;
}
</style>
