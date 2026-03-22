<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftTrainItembank"
});

interface PlanType {
  id: number;
  name: string;
}

interface ItembankItem {
  id: number;
  planType: PlanType;
  type: number; // 1=判断 2=单选 3=多选
  title: string;
  options: string;
  answer: string;
}

interface ListResponse {
  content: ItembankItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  t: ListResponse;
}

const tableData = ref<ItembankItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

const searchForm = ref({
  typeId: -1,
  title: ""
});

const planTypes = ref<PlanType[]>([]);
const selectedIds = ref<number[]>([]);

async function fetchPlanTypes() {
  try {
    const response = await fetch("/sft/train/plantype/all.json");
    const data = await response.json();
    if (data.success) {
      planTypes.value = data.t || [];
    }
  } catch (error) {
    console.error("获取考试类型失败:", error);
  }
}

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(pageSize.value)
    });
    if (searchForm.value.typeId !== -1) {
      params.append("typeId", String(searchForm.value.typeId));
    }
    if (searchForm.value.title) {
      params.append("title", searchForm.value.title);
    }

    const response = await fetch(`/sft/train/itembank/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
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
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  searchForm.value = {
    typeId: -1,
    title: ""
  };
  currentPage.value = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("打开题库添加弹窗");
  // TODO: 实现添加弹窗
}

function handleImport() {
  ElMessage.info("打开题库导入弹窗");
  // TODO: 实现导入弹窗
}

function handleExport() {
  const params = new URLSearchParams({
    typeId: String(searchForm.value.typeId),
    title: searchForm.value.title
  });
  window.open(`/sft/train/itembank/export?${params}`);
}

function handleDelete(item: ItembankItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/train/itembank/del/${item.id}.json`);
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          fetchData();
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("删除失败");
        console.error(error);
      }
    })
    .catch(() => {});
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择相应的数据！");
    return;
  }

  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条数据？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(async () => {
      try {
        const response = await fetch("/sft/train/itembank/dels.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ids: selectedIds.value.join(",") })
        });
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          selectedIds.value = [];
          fetchData();
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("删除失败");
        console.error(error);
      }
    })
    .catch(() => {});
}

function handleSelectionChange(selection: ItembankItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function getTypeName(type: number): string {
  switch (type) {
    case 1:
      return "判断";
    case 2:
      return "单选";
    case 3:
      return "多选";
    default:
      return "未知";
  }
}

function handleEdit(item: ItembankItem) {
  ElMessage.info(`编辑题目: ${item.title}`);
  // TODO: 实现编辑弹窗
}

onMounted(() => {
  fetchPlanTypes();
  fetchData();
});
</script>

<template>
  <div class="itembank-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">题库管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="类型">
          <el-select
            v-model="searchForm.typeId"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option label="请选择" :value="-1" />
            <el-option
              v-for="type in planTypes"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input
            v-model="searchForm.title"
            placeholder="请输入标题"
            style="width: 150px"
            clearable
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
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
          <el-button type="primary" @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入题库
          </el-button>
          <el-button
            tag="a"
            href="/pub/xls/题库模板（注意格式为2003）.xls"
            download
          >
            <el-icon><Download /></el-icon>
            下载题库模板
          </el-button>
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button type="danger" @click="handleBatchDelete">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-form-item>
      </el-form>

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
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column
          prop="planType.name"
          label="考试类型"
          min-width="150"
        />
        <el-table-column label="题目形式" width="100" align="center">
          <template #default="{ row }">
            {{ getTypeName(row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="300"
          show-overflow-tooltip
        />
        <el-table-column
          prop="options"
          label="选项"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="answer"
          label="答案"
          width="100"
          align="center"
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
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="fetchData"
        @size-change="fetchData"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.itembank-container {
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
