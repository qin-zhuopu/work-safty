<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftContManageHmd"
});

interface BlacklistItem {
  id: number;
  field: string;
  field1: string;
  field4: string;
  field5: string;
  field10: string;
  addDate: number;
  deleteFlag: number;
  status: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: BlacklistItem[];
    totalElements: number;
  };
}

const tableData = ref<BlacklistItem[]>([]);
const loading = ref(false);
const searchForm = ref({
  field: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchForm.value.field) {
      params.append("field", searchForm.value.field);
    }
    const response = await fetch(`/sft/cont/manage/hmd/list.json?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
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
  fetchData();
}

function handleReset() {
  searchForm.value.field = "";
  fetchData();
}

function handleExport() {
  ElMessage.info("导出功能开发中");
}

function handleRemove(row: BlacklistItem) {
  ElMessageBox.confirm(`确定要将"${row.field}"移出黑名单吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("移出成功");
      fetchData();
    })
    .catch(() => {
      // 取消操作
    });
}

function handleViolations(row: BlacklistItem) {
  ElMessage.info(`查看"${row.field}"的违章记录`);
}

function handleFile(row: BlacklistItem) {
  ElMessage.info(`查看"${row.field}"的文件`);
}

function handlePersonnel(row: BlacklistItem) {
  ElMessage.info(`查看"${row.field}"的人员`);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="hmd-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商黑名单</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="名称">
            <el-input
              v-model="searchForm.field"
              placeholder="请输入名称"
              clearable
              style="width: 200px"
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
            <el-button @click="handleExport">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="名称" min-width="200" />
        <el-table-column prop="field1" label="单位" min-width="150" />
        <el-table-column
          prop="field5"
          label="统一社会信用代码"
          min-width="180"
        />
        <el-table-column prop="field4" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'warning' : 'info'">
              {{ row.field4 }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="field10"
          label="备注"
          min-width="300"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="260" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleRemove(row)"
            >
              移出
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleViolations(row)"
            >
              违章记录
            </el-button>
            <el-button
              link
              type="warning"
              size="small"
              @click="handleFile(row)"
            >
              文件
            </el-button>
            <el-button
              link
              type="success"
              size="small"
              @click="handlePersonnel(row)"
            >
              人员
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.hmd-container {
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
