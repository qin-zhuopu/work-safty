<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftDataGds"
});

interface GdsDevice {
  addr: string;
  comId: number;
  high: number;
  id: number;
  low: number;
  lower: number;
  max: number;
  min: number;
  name: string;
  tag: string;
  type: string;
  unit: string;
  upper: number;
}

interface GdsDataItem {
  delMarks: number;
  gdsDevice: GdsDevice;
  id: number;
  status: number;
  t: number;
  v: number;
}

interface PageData {
  content: GdsDataItem[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<GdsDataItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});

// 搜索表单
const searchForm = reactive({
  name: "",
  beginTime: "",
  endTime: "",
  status: "0"
});

// 状态选项
const statusOptions = [
  { label: "请选择", value: "0" },
  { label: "正常", value: "1" },
  { label: "低报警", value: "2" },
  { label: "高报警", value: "3" },
  { label: "超低警", value: "4" },
  { label: "超高报", value: "5" }
];

// 状态映射
const statusMap: Record<number, string> = {
  1: "正常",
  2: "低报警",
  3: "高报警",
  4: "低低警",
  5: "高高报"
};

// 状态标签类型
const getStatusType = (status: number) => {
  switch (status) {
    case 1:
      return "success";
    case 2:
      return "warning";
    case 3:
      return "warning";
    case 4:
      return "danger";
    case 5:
      return "danger";
    default:
      return "info";
  }
};

// 格式化时间
const formatTime = (timestamp: number) => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size)
    });

    if (searchForm.name) {
      params.append("name", searchForm.name);
    }
    if (searchForm.beginTime) {
      params.append("beginTime", searchForm.beginTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }
    if (searchForm.status && searchForm.status !== "0") {
      params.append("status", searchForm.status);
    }

    const response = await fetch(`/sft/data/gds/data?${params}`);
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
  searchForm.name = "";
  searchForm.beginTime = "";
  searchForm.endTime = "";
  searchForm.status = "0";
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

function handleExport() {
  const params = new URLSearchParams({
    name: searchForm.name,
    status: searchForm.status,
    beginTime: searchForm.beginTime,
    endTime: searchForm.endTime,
    ids: "0"
  });
  window.open(`/sft/data/gds/export?${params}`);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="gds-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">重大危险源监测报警数据</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="报警时间">
          <el-date-picker
            v-model="searchForm.beginTime"
            type="datetime"
            placeholder="开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 200px"
          />
          <span class="mx-2">—</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="datetime"
            placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="算法">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            检索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button @click="handleExport">
            <el-icon><Download /></el-icon>
            导出
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
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="id" label="序号" width="80" align="center" />
        <el-table-column label="设备类型" min-width="120" align="center">
          <template #default="{ row }">
            {{ row.gdsDevice?.type || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="设备名称" min-width="200">
          <template #default="{ row }">
            {{ row.gdsDevice?.name || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="设备位号" min-width="180">
          <template #default="{ row }">
            {{ row.gdsDevice?.addr || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="t" label="时间" width="180" align="center">
          <template #default="{ row }">
            {{ formatTime(row.t) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status" :type="getStatusType(row.status)">
              {{ statusMap[row.status] || "-" }}
            </el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="v" label="数据值" width="100" align="center" />
        <el-table-column label="计量单位" width="120" align="center">
          <template #default="{ row }">
            {{ row.gdsDevice?.unit || "-" }}
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
        class="pagination"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.gds-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
