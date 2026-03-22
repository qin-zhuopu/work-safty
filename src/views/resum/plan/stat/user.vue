<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "ResumPlanStatUser"
});

interface StatUserItem {
  cycle: string;
  rate: string;
  ushow: string;
  wxjCount: string;
  yxjCount: string;
  zCount: string;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: StatUserItem[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}

const tableData = ref<StatUserItem[]>([]);
const loading = ref(false);
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

// 日期筛选
const dateRange = ref<[Date, Date] | null>(null);
const beginTime = ref("");
const endTime = ref("");

async function fetchData(page = 1) {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(page - 1),
      size: String(pagination.value.size)
    });
    if (beginTime.value) {
      params.append("beginTime", beginTime.value);
    }
    if (endTime.value) {
      params.append("endTime", endTime.value);
    }

    const response = await fetch(
      `/sft/resum/plan/statistics/user.json?${params.toString()}`
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
  dateRange.value = null;
  beginTime.value = "";
  endTime.value = "";
  fetchData(1);
}

function handlePageChange(page: number) {
  fetchData(page);
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  fetchData(1);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="stat-user-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium"
            >重大危险源包保责任制履职排查人员统计</span
          >
        </div>
      </template>

      <!-- 筛选表单 -->
      <el-form :inline="true" class="filter-form">
        <el-form-item label="排查日期">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="—"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="
              val => {
                beginTime = val?.[0] || '';
                endTime = val?.[1] || '';
              }
            "
          />
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
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="ushow" label="姓名" min-width="120" />
        <el-table-column prop="cycle" label="类型" min-width="120" />
        <el-table-column
          prop="zCount"
          label="总数"
          width="120"
          align="center"
        />
        <el-table-column
          prop="wxjCount"
          label="未排查总数"
          width="140"
          align="center"
        />
        <el-table-column
          prop="yxjCount"
          label="已排查总数"
          width="140"
          align="center"
        />
        <el-table-column prop="rate" label="排查率" width="120" align="center">
          <template #default="{ row }">
            <el-tag
              :type="
                parseFloat(row.rate) >= 80
                  ? 'success'
                  : parseFloat(row.rate) >= 60
                    ? 'warning'
                    : 'danger'
              "
            >
              {{ row.rate }}
            </el-tag>
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
.stat-user-container {
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
