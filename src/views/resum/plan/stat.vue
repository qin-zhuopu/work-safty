<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "ResumPlanStat"
});

interface StatItem {
  danger: number;
  finishRate: string;
  finished: number;
  hazardId: string;
  main: number;
  mainRate: string;
  mainTotal: number;
  name: string;
  num: number;
  operate: number;
  operateRate: string;
  operateTotal: number;
  rectedDanger: number;
  technology: number;
  technologyRate: string;
  technologyTotal: number;
}

interface ApiResponse {
  success: boolean;
  t: StatItem[];
}

const tableData = ref<StatItem[]>([]);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/resum/plan/statistics.json");
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t;
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

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="stat-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium"
            >重大危险源包保责任制履职排查计划统计</span
          >
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
        <el-table-column prop="name" label="单元名称" min-width="200" />
        <el-table-column prop="num" label="总数" width="80" align="center" />
        <el-table-column
          prop="finished"
          label="已完成"
          width="80"
          align="center"
        />
        <el-table-column
          prop="finishRate"
          label="完成率"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            <el-tag
              :type="
                parseFloat(row.finishRate) >= 80
                  ? 'success'
                  : parseFloat(row.finishRate) >= 50
                    ? 'warning'
                    : 'danger'
              "
            >
              {{ row.finishRate }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="主要负责人" align="center">
          <el-table-column
            prop="main"
            label="已完成"
            width="80"
            align="center"
          />
          <el-table-column
            prop="mainTotal"
            label="总数"
            width="80"
            align="center"
          />
          <el-table-column
            prop="mainRate"
            label="完成率"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <span
                :class="parseFloat(row.mainRate) < 100 ? 'text-orange-500' : ''"
              >
                {{ row.mainRate }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="技术负责人" align="center">
          <el-table-column
            prop="technology"
            label="已完成"
            width="80"
            align="center"
          />
          <el-table-column
            prop="technologyTotal"
            label="总数"
            width="80"
            align="center"
          />
          <el-table-column
            prop="technologyRate"
            label="完成率"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <span
                :class="
                  parseFloat(row.technologyRate) < 100 ? 'text-orange-500' : ''
                "
              >
                {{ row.technologyRate }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作负责人" align="center">
          <el-table-column
            prop="operate"
            label="已完成"
            width="80"
            align="center"
          />
          <el-table-column
            prop="operateTotal"
            label="总数"
            width="80"
            align="center"
          />
          <el-table-column
            prop="operateRate"
            label="完成率"
            width="100"
            align="center"
          >
            <template #default="{ row }">
              <span
                :class="
                  parseFloat(row.operateRate) < 100 ? 'text-orange-500' : ''
                "
              >
                {{ row.operateRate }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="danger" label="隐患数" width="80" align="center">
          <template #default="{ row }">
            <span :class="row.danger > 0 ? 'text-red-500' : ''">
              {{ row.danger }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rectedDanger"
          label="已整改"
          width="80"
          align="center"
        />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.stat-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
