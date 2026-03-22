<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SysRole"
});

interface RoleItem {
  id: number;
  name: string;
  remark: string;
  status: number;
  type: number;
}

interface PageData {
  content: RoleItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<RoleItem[]>([]);
const loading = ref(false);
const pagination = ref({
  page: 0,
  size: 10,
  total: 0
});

async function fetchData(page: number = 0) {
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/sys/role/list.json?page=${page}&size=${pagination.value.size}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
      pagination.value.page = data.t.number;
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
  fetchData(page - 1);
}

function getTypeText(type: number): string {
  return type === 1 ? "管理员" : "其他";
}

function getStatusText(status: number): string {
  return status === 1 ? "可用" : "冻结";
}

function getStatusType(status: number): "success" | "danger" | "info" {
  return status === 1 ? "success" : "danger";
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: RoleItem) {
  ElMessage.info(`编辑角色: ${row.name}`);
}

function handleDelete(row: RoleItem) {
  ElMessageBox.confirm("确认删除该角色吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData(pagination.value.page);
    })
    .catch(() => {
      // 取消删除
    });
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="role-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">角色管理</span>
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon class="mr-1">
              <Plus />
            </el-icon>
            添加
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
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="名称" min-width="150" />
        <el-table-column label="类型" width="120" align="center">
          <template #default="{ row }">
            {{ getTypeText(row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="200" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
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
              v-if="row.id > 2"
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="pagination.total"
          :page-size="pagination.size"
          :current-page="pagination.page + 1"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.role-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
