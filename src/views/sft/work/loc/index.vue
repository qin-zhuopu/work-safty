<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftWorkLoc"
});

interface LocItem {
  id: string;
  jhr: string;
  docNo: string;
  title: string;
  no: string;
  status: number;
  time: number;
  alarmStatus: number;
  field: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: LocItem[];
    totalElements: number;
  };
}

const tableData = ref<LocItem[]>([]);
const loading = ref(false);
const total = ref(0);

const searchForm = ref({
  type: "0",
  alarmStatus: "0"
});

const pagination = ref({
  page: 1,
  size: 10
});

const selectedIds = ref<string[]>([]);

const alarmTypeMap: Record<number, string> = {
  2: "检修超员",
  3: "监护人离岗",
  4: "一键报警",
  5: "滞留预警",
  6: "越界报警",
  7: "超员预警",
  8: "缺员预警",
  9: "静止预警",
  10: "人员聚集",
  11: "非授权人员闯入",
  12: "监护人离岗",
  13: "作业管控区域滞留",
  14: "作业管控区域静止",
  15: "作业管控区域缺员"
};

const alarmTypeOptions = [
  { label: "请选择", value: "0" },
  { label: "检修超员", value: "2" },
  { label: "监护人离岗", value: "3" },
  { label: "一键报警", value: "4" },
  { label: "滞留预警", value: "5" },
  { label: "越界报警", value: "6" },
  { label: "超员预警", value: "7" },
  { label: "缺员预警", value: "8" },
  { label: "静止预警", value: "9" },
  { label: "人员聚集", value: "10" },
  { label: "非授权人员闯入", value: "11" },
  { label: "监护人离岗", value: "12" },
  { label: "作业管控区域滞留", value: "13" },
  { label: "作业管控区域静止", value: "14" },
  { label: "作业管控区域缺员", value: "15" }
];

const alarmStatusOptions = [
  { label: "请选择", value: "0" },
  { label: "未消警", value: "1" },
  { label: "已消警", value: "2" }
];

function getAlarmTypeText(status: number): string {
  return alarmTypeMap[status] || "";
}

function getAlarmStatusText(status: number): string {
  return status === 2 ? "已消警" : "未消警";
}

function getAlarmStatusType(status: number): "success" | "warning" {
  return status === 2 ? "success" : "warning";
}

function formatTime(time: number): string {
  return dayjs(time).format("YYYY-MM-DD HH:mm");
}

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page),
      size: String(pagination.value.size)
    });

    if (searchForm.value.type !== "0") {
      params.append("type", searchForm.value.type);
    }
    if (searchForm.value.alarmStatus !== "0") {
      params.append("alarmStatus", searchForm.value.alarmStatus);
    }

    const response = await fetch(`/sft/work/loc/list.json?${params}`);
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
  pagination.value.page = 1;
  fetchData();
}

function handleReset() {
  searchForm.value = {
    type: "0",
    alarmStatus: "0"
  };
  pagination.value.page = 1;
  fetchData();
}

function handleSelectionChange(selection: LocItem[]) {
  selectedIds.value = selection.map(item => item.id);
}

function handleClearAlarm(row?: LocItem) {
  const ids = row ? [row.id] : selectedIds.value;

  if (ids.length === 0) {
    ElMessage.warning("请选择要消警的台账！");
    return;
  }

  ElMessageBox.confirm("确认要消警选中的记录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    ElMessage.success("消警成功");
    fetchData();
  });
}

function handleDetail(row: LocItem) {
  ElMessage.info("查看详情: " + row.jhr);
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  fetchData();
}

function handleCurrentChange(page: number) {
  pagination.value.page = page;
  fetchData();
}

onMounted(() => {
  fetchData();
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

      <el-form :inline="true" :model="searchForm">
        <el-form-item label="报警类型">
          <el-select v-model="searchForm.type" style="width: 180px">
            <el-option
              v-for="opt in alarmTypeOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="消警状态">
          <el-select v-model="searchForm.alarmStatus" style="width: 150px">
            <el-option
              v-for="opt in alarmStatusOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><i class="layui-icon">&#xe615;</i></el-icon>
            检索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><i class="layui-icon">&#xe64d;</i></el-icon>
            重置
          </el-button>
          <el-button type="danger" @click="handleClearAlarm()">
            <el-icon><i class="layui-icon">&#xe629;</i></el-icon>
            消警
          </el-button>
        </el-form-item>
      </el-form>

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
        <el-table-column prop="jhr" label="姓名" min-width="100" />
        <el-table-column prop="docNo" label="票号" min-width="150" />
        <el-table-column prop="title" label="标题" min-width="120" />
        <el-table-column prop="no" label="卡号" min-width="120" />
        <el-table-column prop="status" label="报警类型" min-width="120">
          <template #default="{ row }">
            {{ getAlarmTypeText(row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="time" label="报警时间" min-width="160">
          <template #default="{ row }">
            {{ formatTime(row.time) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="alarmStatus"
          label="消警状态"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getAlarmStatusType(row.alarmStatus)">
              {{ getAlarmStatusText(row.alarmStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="field" label="处理反馈" min-width="120" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              type="danger"
              size="small"
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
        v-model:page-size="pagination.size"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        style=" justify-content: flex-end;margin-top: 16px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
