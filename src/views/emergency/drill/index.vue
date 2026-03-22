<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { DrillItem, DrillType } from "./types";

defineOptions({
  name: "EmergencyDrillIndex"
});

interface PageData {
  content: DrillItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<DrillItem[]>([]);
const loading = ref(false);
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/emergency/drill/list?page=${pagination.value.page}&size=${pagination.value.size}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
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

function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  pagination.value.page = 1;
  fetchData();
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: DrillItem) {
  ElMessage.info(`编辑: ${row.title}`);
}

function handlePerson(row: DrillItem) {
  ElMessage.info(`指定人员: ${row.title}`);
}

function handleRecord(row: DrillItem) {
  ElMessage.info(`演练记录: ${row.title}`);
}

function handleRectifyRecord(row: DrillItem) {
  ElMessage.info(`整改记录: ${row.title}`);
}

function handleDelete(row: DrillItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {
      // 用户取消
    });
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="drill-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
          <el-button type="warning" size="small">
            <el-icon><Download /></el-icon>
            下载模板
          </el-button>
          <el-button size="small" @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="drillType.name" label="类型" width="120" />
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column
          prop="content"
          label="内容"
          min-width="200"
          show-overflow-tooltip
        />
        <el-table-column prop="planTime" label="演练计划时间" width="120" />
        <el-table-column
          prop="remarks"
          label="备注"
          width="120"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="280" align="center" fixed="right">
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
              type="success"
              size="small"
              @click="handlePerson(row)"
            >
              指定人员
            </el-button>
            <el-button
              link
              type="warning"
              size="small"
              @click="handleRecord(row)"
            >
              演练记录
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              link
              type="warning"
              size="small"
              @click="handleRectifyRecord(row)"
            >
              整改记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
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
.drill-container {
  padding: 16px;
}

.card-header {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
