<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftEmerresourTeam"
});

interface TeamItem {
  id: string;
  field: string;
  field1: string;
  sysDeptName: string;
  field2: string;
  sysUserName: string;
  field3: string;
  field4: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: TeamItem[];
    totalElements: number;
  };
}

const tableData = ref<TeamItem[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedIds = ref<string[]>([]);
const searchName = ref("");

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/emerresour/team/list?page=${page}&size=${pageSize.value}&field=${encodeURIComponent(searchName.value)}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      total.value = data.t.totalElements;
      currentPage.value = page;
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
  searchName.value = "";
  fetchData(1);
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

function handleExport() {
  ElMessage.info("导出功能待实现");
}

function handleEdit(row: TeamItem) {
  ElMessage.info(`编辑: ${row.field}`);
}

function handleDelete(row: TeamItem) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handleSelectionChange(selection: TeamItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的台账！");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条记录？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      ElMessage.success("删除成功");
      fetchData(currentPage.value);
    })
    .catch(() => {});
}

function handlePageChange(page: number) {
  fetchData(page);
}

onMounted(() => {
  fetchData(1);
});
</script>

<template>
  <div class="team-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">应急队伍台账</span>
        </div>
      </template>

      <!-- 搜索栏 -->
      <div class="mb-4 flex items-center gap-2">
        <el-input
          v-model="searchName"
          placeholder="请输入名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button type="success" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button type="warning" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button type="info" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </div>

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
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="field" label="队伍名称" min-width="120" />
        <el-table-column prop="field1" label="队伍类型" min-width="100" />
        <el-table-column prop="sysDeptName" label="所属部门" min-width="120" />
        <el-table-column prop="field2" label="地址" min-width="150" />
        <el-table-column prop="sysUserName" label="责任人" min-width="100" />
        <el-table-column prop="field3" label="联系电话" min-width="120" />
        <el-table-column
          prop="field4"
          label="总人数"
          width="80"
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
      <div class="mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.team-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}
</style>
