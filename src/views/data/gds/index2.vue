<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "DataGdsIndex2"
});

interface GdsDevice {
  type: string;
  name: string;
  addr: string;
  unit: string;
}

interface DataItem {
  id?: number;
  t: number;
  status: number;
  v: number;
  gdsDevice: GdsDevice;
}

interface ApiResponse {
  success: boolean;
  message: string;
  t: DataItem[];
}

const tableData = ref<DataItem[]>([]);
const loading = ref(false);

// 状态映射
const statusMap: Record<number, string> = {
  1: "正常",
  2: "低报警",
  3: "高报警",
  4: "低低警",
  5: "高高报"
};

// 状态类型映射
const statusTypeMap: Record<number, "success" | "warning" | "danger" | "info"> =
  {
    1: "success",
    2: "warning",
    3: "warning",
    4: "danger",
    5: "danger"
  };

// 格式化时间
function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/data/gds/data2.json");
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t;
    } else {
      ElMessage.error(data.message || "获取数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
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
          <span class="text-lg font-medium">管道设备监测数据</span>
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
        <el-table-column
          prop="gdsDevice.type"
          label="设备类型"
          min-width="120"
        />
        <el-table-column
          prop="gdsDevice.name"
          label="设备名称"
          min-width="150"
        />
        <el-table-column
          prop="gdsDevice.addr"
          label="设备位号"
          min-width="120"
        />
        <el-table-column prop="t" label="时间" width="180" align="center">
          <template #default="{ row }">
            {{ formatTime(row.t) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status" :type="statusTypeMap[row.status]">
              {{ statusMap[row.status] }}
            </el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="v" label="数据值" width="100" align="center" />
        <el-table-column
          prop="gdsDevice.unit"
          label="计量单位"
          width="120"
          align="center"
        />
      </el-table>
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
</style>
