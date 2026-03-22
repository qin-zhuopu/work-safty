<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftWorkDocTmpl"
});

interface Template {
  id: number;
  name: string;
  code: string;
  status: number;
  type: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: Template[];
    totalElements: number;
    totalPages: number;
  };
}

const tableData = ref<Template[]>([]);
const loading = ref(false);
const total = ref(0);
const pageSize = 10;
const currentPage = ref(1);

const searchForm = reactive({
  type: "-1"
});

const typeOptions = [
  { label: "全部", value: "-1" },
  { label: "动火一级", value: "1" },
  { label: "动火二级", value: "9" },
  { label: "动火特级", value: "10" },
  { label: "断路", value: "2" },
  { label: "受限空间", value: "3" },
  { label: "盲板", value: "4" },
  { label: "动土", value: "5" },
  { label: "临电一级", value: "6" },
  { label: "临电二级", value: "13" },
  { label: "临电特级", value: "14" },
  { label: "高处一级", value: "7" },
  { label: "高处二级", value: "11" },
  { label: "高处三级", value: "12" },
  { label: "高处四级", value: "15" },
  { label: "吊装", value: "8" }
];

function getTypeName(type: number): string {
  const typeMap: Record<number, string> = {
    1: "动火",
    2: "断路",
    3: "受限",
    4: "临电",
    5: "盲板",
    6: "吊装",
    7: "动土",
    8: "断路",
    9: "动火二级",
    10: "动火特级",
    11: "高处二级",
    12: "高处三级",
    13: "临电二级",
    14: "临电特级",
    15: "高处四级",
    16: "吊装二、三级",
    17: "高处架设一级",
    18: "高处架设二级",
    19: "高处架设三级",
    20: "高处架设四级",
    21: "设备断电",
    22: "设备送电",
    23: "高压断电",
    24: "高压送电"
  };
  return typeMap[type] || "";
}

async function fetchData(page = 1) {
  loading.value = true;
  currentPage.value = page;
  try {
    const params = new URLSearchParams({
      page: String(page),
      size: String(pageSize)
    });
    if (searchForm.type && searchForm.type !== "-1") {
      params.append("type", searchForm.type);
    }

    const response = await fetch(`/sft/work/doc/tmpl/list1.json?${params}`);
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
  fetchData(1);
}

function handleReset() {
  searchForm.type = "-1";
  fetchData(1);
}

function handleNodes(row: Template) {
  window.location.href = `/sft/work/doc/tmpld/index1/${row.id}`;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="work-doc-tmpl-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">模板管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="类型">
          <el-select
            v-model="searchForm.type"
            placeholder="请选择类型"
            style="width: 150px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleSearch">
            检索
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
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
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" label="名称" min-width="200" />
        <el-table-column label="类型" width="120" align="center">
          <template #default="{ row }">
            {{ getTypeName(row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="warning"
              link
              size="small"
              @click="handleNodes(row)"
            >
              节点
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
.work-doc-tmpl-container {
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
</style>
