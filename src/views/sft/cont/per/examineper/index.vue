<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, RefreshLeft } from "@element-plus/icons-vue";

defineOptions({
  name: "SftContPerExamineper"
});

interface ContPerItem {
  id: string;
  field: string; // 姓名
  field1: string; // 身份证号
  field2?: string; // 照片URL
  cm: string; // 承包商名称
  examine: string; // 审核节点
  sex: string; // 性别
  birthday: string; // 生日
  status: number; // 状态
  type: string; // 类型
  black?: number; // 黑名单状态
}

interface ApiResponse {
  success: boolean;
  t: {
    totalElements: number;
    totalPages: number;
    content: ContPerItem[];
  };
}

const searchForm = reactive({
  cont: "",
  field: "",
  examine: ""
});

const tableData = ref<ContPerItem[]>([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const examineStatusMap: Record<string, string> = {
  采购办专工: "warning",
  安全审批: "info",
  通过: "success",
  培训中: "info",
  部门审批: "warning"
};

const getExamineTagType = (examine: string) => {
  return examineStatusMap[examine] || "info";
};

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(currentPage.value - 1),
      size: String(pageSize.value),
      cont: searchForm.cont,
      field: searchForm.field,
      examine: searchForm.examine
    });

    const response = await fetch(`/sft/cont/per/examiners.json?${params}`);
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
  searchForm.cont = "";
  searchForm.field = "";
  searchForm.examine = "";
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  currentPage.value = 1;
  fetchData();
}

function handlePass(row: ContPerItem) {
  ElMessageBox.confirm(`确认通过 ${row.field} 的审批吗？`, "通过审批", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "success"
  })
    .then(() => {
      ElMessage.success(`已通过 ${row.field} 的审批`);
      fetchData();
    })
    .catch(() => {});
}

function handleNoPass(row: ContPerItem) {
  ElMessageBox.confirm(`确认驳回 ${row.field} 的审批吗？`, "驳回审批", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.warning(`已驳回 ${row.field} 的审批`);
      fetchData();
    })
    .catch(() => {});
}

function handleHmdPass(row: ContPerItem) {
  ElMessage.info(`黑名单通过: ${row.field}`);
}

function handleRemove(row: ContPerItem) {
  ElMessage.info(`黑名单移出: ${row.field}`);
}

function handleFile(row: ContPerItem) {
  ElMessage.info(`查看文件: ${row.field}`);
}

function handleTrained(row: ContPerItem) {
  ElMessage.info(`查看培训记录: ${row.field}`);
}

function handleBmgz(row: ContPerItem) {
  ElMessage.info(`查看保命规则: ${row.field}`);
}

function handleProcess(row: ContPerItem) {
  ElMessage.info(`查看审批流: ${row.field}`);
}

function handleDel(row: ContPerItem) {
  ElMessageBox.confirm(`确认删除 ${row.field} 的记录吗？`, "删除确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  })
    .then(() => {
      ElMessage.success(`已删除 ${row.field} 的记录`);
      fetchData();
    })
    .catch(() => {});
}

function canApprove(row: ContPerItem): boolean {
  return (
    row.status === 0 &&
    row.examine !== "培训中" &&
    row.examine !== "通过" &&
    row.black === undefined
  );
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="examineper-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商人员审批</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="承包商名称">
          <el-input
            v-model="searchForm.cont"
            placeholder="请输入承包商名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.field"
            placeholder="请输入姓名"
            clearable
          />
        </el-form-item>
        <el-form-item label="审核节点">
          <el-input
            v-model="searchForm.examine"
            placeholder="请输入审核节点"
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
        <el-table-column prop="cm" label="承包商名称" min-width="200" />
        <el-table-column prop="field" label="姓名" width="120" />
        <el-table-column prop="field1" label="身份证号" width="180" />
        <el-table-column prop="sex" label="性别" width="80" align="center" />
        <el-table-column prop="birthday" label="出生日期" width="120" />
        <el-table-column prop="examine" label="审核节点" width="150">
          <template #default="{ row }">
            <el-tag :type="getExamineTagType(row.examine)">
              {{ row.examine }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400" align="center" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button
                v-if="canApprove(row)"
                type="primary"
                size="small"
                @click="handlePass(row)"
              >
                通过
              </el-button>
              <el-button
                v-if="canApprove(row)"
                type="danger"
                size="small"
                @click="handleNoPass(row)"
              >
                驳回
              </el-button>
              <el-button
                v-if="row.black === 0"
                type="danger"
                size="small"
                @click="handleHmdPass(row)"
              >
                黑名单通过
              </el-button>
              <el-button
                v-if="row.black === 2"
                type="danger"
                size="small"
                @click="handleRemove(row)"
              >
                黑名单移出
              </el-button>
              <el-button type="warning" size="small" @click="handleFile(row)">
                文件
              </el-button>
              <el-button size="small" @click="handleTrained(row)">
                培训记录
              </el-button>
              <el-button type="danger" size="small" @click="handleBmgz(row)">
                保命规则
              </el-button>
              <el-button size="small" @click="handleProcess(row)">
                审批流
              </el-button>
              <el-button type="info" size="small" @click="handleDel(row)">
                删除
              </el-button>
            </el-button-group>
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
        style="justify-content: flex-end; margin-top: 16px"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.examineper-container {
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
