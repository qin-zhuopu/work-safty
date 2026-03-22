<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftWorkLoc"
});

interface AlarmData {
  addDate: number;
  alarmStatus: number;
  id: number;
  jhr?: string;
  no: string;
  status: number;
  time: number;
}

interface PageData {
  content: AlarmData[];
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
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    unpaged: boolean;
  };
  size: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const alarmTypes = [
  { label: "请选择", value: 0 },
  { label: "检修超员", value: 2 },
  { label: "监护人离岗", value: 3 },
  { label: "一键报警", value: 4 },
  { label: "滞留预警", value: 5 },
  { label: "越界报警", value: 6 },
  { label: "超员预警", value: 7 },
  { label: "缺员预警", value: 8 },
  { label: "静止预警", value: 9 },
  { label: "人员聚集", value: 10 },
  { label: "非授权人员闯入", value: 11 },
  { label: "监护人离岗", value: 12 },
  { label: "作业管控区域滞留", value: 13 },
  { label: "作业管控区域静止", value: 14 },
  { label: "作业管控区域缺员", value: 15 }
];

const alarmStatusOptions = [
  { label: "请选择", value: 0 },
  { label: "未消警", value: 1 },
  { label: "已消警", value: 2 }
];

const searchForm = ref({
  type: 0,
  alarmStatus: 0
});

const tableData = ref<AlarmData[]>([]);
const loading = ref(false);
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
});

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page - 1),
      size: String(pagination.value.pageSize)
    });

    if (searchForm.value.type !== 0) {
      params.append("type", String(searchForm.value.type));
    }
    if (searchForm.value.alarmStatus !== 0) {
      params.append("alarmStatus", String(searchForm.value.alarmStatus));
    }

    const response = await fetch(`/sft/work/loc/list.json?${params}`);
    const data: ApiResponse = await response.json();

    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
      pagination.value.page = page;
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
    type: 0,
    alarmStatus: 0
  };
  fetchData(1);
}

function handleClearAlarm(row: AlarmData) {
  ElMessage.success(`消警成功: ${row.no}`);
}

function handleDetail(row: AlarmData) {
  ElMessage.info(`查看详情: ${row.no}`);
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString("zh-CN");
}

function getAlarmStatusLabel(status: number): string {
  const option = alarmStatusOptions.find(opt => opt.value === status);
  return option?.label || "未知";
}

function getStatusType(
  status: number
): "success" | "warning" | "danger" | "info" {
  return status === 2 ? "success" : "warning";
}

onMounted(() => {
  fetchData(1);
});
</script>

<template>
  <div class="loc-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">特殊工管理</span>
        </div>
      </template>

      <el-form :model="searchForm" inline>
        <el-form-item label="报警类型">
          <el-select
            v-model="searchForm.type"
            placeholder="请选择"
            style="width: 180px"
          >
            <el-option
              v-for="item in alarmTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="消警状态">
          <el-select
            v-model="searchForm.alarmStatus"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option
              v-for="item in alarmStatusOptions"
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
            <el-icon><RefreshLeft /></el-icon>
            重置
          </el-button>
          <el-button type="danger" @click="handleReset">
            <el-icon><Delete /></el-icon>
            消警
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="no" label="编号" min-width="150" />
        <el-table-column prop="jhr" label="监护人" width="120" align="center">
          <template #default="{ row }">
            {{ row.jhr || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          align="center"
        />
        <el-table-column
          prop="alarmStatus"
          label="消警状态"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.alarmStatus)">
              {{ getAlarmStatusLabel(row.alarmStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="报警时间"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatTime(row.time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="danger"
              size="small"
              :disabled="row.alarmStatus === 2"
              @click="handleClearAlarm(row)"
            >
              消警
            </el-button>
            <el-button type="warning" size="small" @click="handleDetail(row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="fetchData"
        @size-change="() => fetchData(1)"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.loc-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}
</style>
