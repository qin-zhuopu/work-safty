<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftRiskTarget"
});

interface Creater {
  ushow: string;
}

interface RiskTargetItem {
  id: number;
  name: string;
  hazardCode: string;
  type: number;
  creater: Creater;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: RiskTargetItem[];
    totalElements: number;
  };
}

const tableData = ref<RiskTargetItem[]>([]);
const loading = ref(false);
const searchFormRef = ref<FormInstance>();

const searchForm = ref({
  name: "",
  type: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchForm.value.name) {
      params.append("name", searchForm.value.name);
    }
    if (searchForm.value.type !== "") {
      params.append("type", searchForm.value.type);
    }

    const response = await fetch(
      `/sft/risk/target/list.json?${params.toString()}`
    );
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

function handleSearch() {
  fetchData();
}

function handleReset() {
  searchForm.value = {
    name: "",
    type: ""
  };
  fetchData();
}

function handleAdd() {
  ElMessage.info("新建功能待实现");
}

function handleEdit(row: RiskTargetItem) {
  ElMessage.info(`编辑: ${row.name}`);
}

function handleDelete(row: RiskTargetItem) {
  ElMessage.info(`删除: ${row.name}`);
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="risk-target-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">装置停用记录</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        :inline="true"
        class="search-form"
      >
        <el-form-item label="风险分析对象">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入风险分析对象"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="重大危险源">
          <el-select
            v-model="searchForm.type"
            placeholder="请选择"
            clearable
            style="width: 150px"
          >
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
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
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新建
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="风险分析对象" min-width="300" />
        <el-table-column prop="hazardCode" label="危险源编码" width="150" />
        <el-table-column label="重大危险源" width="120" align="center">
          <template #default="{ row }">
            <span :class="{ 'text-red-600 font-bold': row.type === 1 }">
              {{ row.type === 1 ? "是" : "否" }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="150">
          <template #default="{ row }">
            {{ row.creater?.ushow || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="row.type < 1"
              type="danger"
              size="small"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.risk-target-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.text-red-600 {
  color: #dc2626;
}

.font-bold {
  font-weight: bold;
}
</style>
