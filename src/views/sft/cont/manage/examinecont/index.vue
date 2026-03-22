<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Search, RefreshLeft } from "@element-plus/icons-vue";

defineOptions({
  name: "SftContManageExaminecont"
});

interface ContManageItem {
  id: string;
  field: string;
  status: number;
  field1: string;
  field3: string;
  field4: string;
  nodeId?: string;
  hmdExamine?: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    totalElements: number;
    content: ContManageItem[];
  };
}

const searchForm = reactive({
  field: "",
  field1: ""
});

const tableData = ref<ContManageItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});

const statusMap: Record<number, string> = {
  "-1": "填报",
  0: "审批中",
  1: "驳回",
  2: "通过",
  3: "删除",
  4: "结束"
};

const getStatusType = (status: number) => {
  switch (status) {
    case -1:
      return "info";
    case 0:
      return "warning";
    case 1:
      return "danger";
    case 2:
      return "success";
    case 3:
      return "info";
    case 4:
      return "info";
    default:
      return "info";
  }
};

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      size: String(pagination.size),
      field: searchForm.field,
      field1: searchForm.field1
    });

    const response = await fetch(
      `/sft/cont/manage/examine/list.json?${params}`
    );
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
  searchForm.field = "";
  searchForm.field1 = "";
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

function handleFile(row: ContManageItem) {
  ElMessage.info(`打开文件页面: ${row.field}`);
}

function handlePersonnel(row: ContManageItem) {
  ElMessage.info(`跳转到人员页面: ${row.field}`);
}

function handleProcess(row: ContManageItem) {
  ElMessage.info(`查看审批流: ${row.field}`);
}

function handleApproval(row: ContManageItem) {
  if (row.nodeId) {
    ElMessage.info(`打开审批弹窗: ${row.field}, 节点ID: ${row.nodeId}`);
  }
}

function handleHmdExamine(row: ContManageItem) {
  ElMessage.info(`黑名单审核: ${row.field}`);
}

function handleHmdRemove(row: ContManageItem) {
  ElMessage.info(`移出黑名单: ${row.field}`);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="examinecont-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商审批</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.field"
            placeholder="请输入名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="对接部门">
          <el-input
            v-model="searchForm.field1"
            placeholder="请输入对接部门"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><RefreshLeft /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="承包商名称" min-width="200" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ statusMap[row.status] || "提报" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="field1" label="对接部门" width="150" />
        <el-table-column prop="field3" label="当前审批节点" width="150" />
        <el-table-column prop="field4" label="下一审批节点" min-width="150" />
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button
                v-if="row.hmdExamine === 0"
                type="warning"
                size="small"
                @click="handleHmdExamine(row)"
              >
                黑名单审核
              </el-button>
              <el-button
                v-if="row.hmdExamine === 2"
                type="warning"
                size="small"
                @click="handleHmdRemove(row)"
              >
                移出黑名单
              </el-button>
              <el-button
                v-if="row.nodeId"
                type="primary"
                size="small"
                @click="handleApproval(row)"
              >
                审批
              </el-button>
              <el-button type="danger" size="small" @click="handleFile(row)">
                文件
              </el-button>
              <el-button size="small" @click="handlePersonnel(row)">
                人员
              </el-button>
              <el-button size="small" @click="handleProcess(row)">
                审批流
              </el-button>
            </el-button-group>
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
.examinecont-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 0;
}
</style>
