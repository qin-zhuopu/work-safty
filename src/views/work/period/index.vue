<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "WorkPeriod"
});

interface PeriodItem {
  id: number;
  beginDate: number;
  bTime: string;
  endDate: number;
  eTime: string;
  remark: string;
}

interface PageData {
  content: PeriodItem[];
  totalElements: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<PeriodItem[]>([]);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/work/period/list.json");
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

function formatDateTime(timestamp: number, time: string): string {
  if (!timestamp) return "";
  const date = dayjs(timestamp);
  return date.format("YYYY-MM-DD") + " " + time;
}

function handleAdd() {
  ElMessage.info("打开新建对话框");
}

function handleEdit(row: PeriodItem) {
  ElMessage.info(`编辑: ${row.id}`);
}

function handleDelete(row: PeriodItem) {
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
      // 取消删除
    });
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="period-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">特殊时段</span>
          <el-button type="primary" size="small" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新建
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
        <el-table-column label="起始时间" min-width="180">
          <template #default="{ row }">
            {{ formatDateTime(row.beginDate, row.bTime) }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" min-width="180">
          <template #default="{ row }">
            {{ formatDateTime(row.endDate, row.eTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="200" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
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
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.period-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
