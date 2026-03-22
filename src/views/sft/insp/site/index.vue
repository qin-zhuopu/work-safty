<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftInspSite"
});

interface Dept {
  id: number;
  name: string;
}

interface SysUser {
  ushow: string;
}

interface SiteItem {
  id: number;
  name: string;
  code: string;
  dept: Dept | null;
  work: Dept | null;
  sysUser: SysUser | null;
  remarks: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: SiteItem[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

interface DeptResponse {
  success: boolean;
  t: Dept[];
}

const tableData = ref<SiteItem[]>([]);
const loading = ref(false);
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

// 筛选条件
const searchForm = ref({
  name: "",
  workId: null as number | null,
  sysUserName: ""
});

// 工段选项
const workOptions = ref<Dept[]>([]);
const selectedRows = ref<SiteItem[]>([]);

async function fetchWorkOptions() {
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data: DeptResponse = await response.json();
    if (data.success) {
      workOptions.value = data.t;
    }
  } catch (error) {
    console.error("获取工段数据失败", error);
  }
}

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page - 1),
      size: String(pagination.value.size)
    });
    if (searchForm.value.name) {
      params.append("name", searchForm.value.name);
    }
    if (searchForm.value.workId !== null && searchForm.value.workId !== -1) {
      params.append("workId", String(searchForm.value.workId));
    }
    if (searchForm.value.sysUserName) {
      params.append("sysUserName", searchForm.value.sysUserName);
    }

    const response = await fetch(
      `/sft/insp/site/list.json?${params.toString()}`
    );
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
      pagination.value.page = data.t.number + 1;
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
  searchForm.value = {
    name: "",
    workId: null,
    sysUserName: ""
  };
  fetchData(1);
}

function handlePageChange(page: number) {
  fetchData(page);
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  fetchData(1);
}

function handleSelectionChange(selection: SiteItem[]) {
  selectedRows.value = selection;
}

function handleAdd() {
  ElMessage.info("添加功能待实现");
}

function handleEdit(row: SiteItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: SiteItem) {
  ElMessageBox.confirm("确认删除该巡检点吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchData();
    })
    .catch(() => {});
}

function handleQrcode(row: SiteItem) {
  ElMessage.info(`二维码: ${row.code}`);
}

function handleQuota(row: SiteItem) {
  ElMessage.info(`巡检指标: ${row.name}`);
}

function handleExport() {
  const ids = selectedRows.value.map(r => r.id).join(",");
  const params = new URLSearchParams({
    ids: ids || "0",
    name: searchForm.value.name,
    sysUserName: searchForm.value.sysUserName,
    workId: String(searchForm.value.workId ?? "-1")
  });
  ElMessage.info(`导出数据: ${params.toString()}`);
}

function handleImport() {
  ElMessage.info("导入功能待实现");
}

onMounted(() => {
  fetchWorkOptions();
  fetchData();
});
</script>

<template>
  <div class="insp-site-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">巡检点管理</span>
        </div>
      </template>

      <!-- 筛选表单 -->
      <el-form :inline="true" :model="searchForm" class="filter-form">
        <el-form-item label="巡检点名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入巡检点名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="所属工段">
          <el-select
            v-model="searchForm.workId"
            placeholder="请选择所属工段"
            clearable
            style="width: 200px"
          >
            <el-option label="请选择所属工段" :value="-1" />
            <el-option
              v-for="item in workOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工段管理人员">
          <el-input
            v-model="searchForm.sysUserName"
            placeholder="请输入工段管理人员"
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
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
          </el-button>
          <el-button @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="巡检点名称" min-width="150" />
        <el-table-column prop="code" label="巡检编码" min-width="150" />
        <el-table-column prop="dept" label="所属车间" min-width="120">
          <template #default="{ row }">
            {{ row.dept?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="work" label="所属工段" min-width="120">
          <template #default="{ row }">
            {{ row.work?.name || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="sysUser" label="工段管理人员" min-width="120">
          <template #default="{ row }">
            {{ row.sysUser?.ushow || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" min-width="200" />
        <el-table-column label="操作" width="260" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleQrcode(row)">
              二维码
            </el-button>
            <el-button type="success" size="small" @click="handleQuota(row)">
              巡检指标
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
.insp-site-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.filter-form {
  margin-bottom: 16px;
}
</style>
