<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

defineOptions({
  name: "TrainPlantype"
});

interface PlantypeItem {
  id: number;
  name: string;
  addDate: number;
}

interface ApiResponse {
  success: boolean;
  t: {
    content: PlantypeItem[];
    totalElements?: number;
  };
}

const tableData = ref<PlantypeItem[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const currentForm = ref<PlantypeItem>({
  id: 0,
  name: "",
  addDate: 0
});

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/plantype/list.json");
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

function handleAdd() {
  dialogTitle.value = "添加培训类型";
  currentForm.value = {
    id: 0,
    name: "",
    addDate: 0
  };
  dialogVisible.value = true;
}

function handleEdit(row: PlantypeItem) {
  dialogTitle.value = "编辑培训类型";
  currentForm.value = { ...row };
  dialogVisible.value = true;
}

function handleDelete(row: PlantypeItem) {
  ElMessageBox.confirm(`确定要删除"${row.name}"吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      tableData.value = tableData.value.filter(item => item.id !== row.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {
      // 取消删除
    });
}

function handleSave() {
  if (!currentForm.value.name.trim()) {
    ElMessage.warning("请输入培训类型名称");
    return;
  }

  if (currentForm.value.id) {
    // 编辑
    const index = tableData.value.findIndex(
      item => item.id === currentForm.value.id
    );
    if (index !== -1) {
      tableData.value[index] = { ...currentForm.value };
    }
    ElMessage.success("编辑成功");
  } else {
    // 添加
    const newId = Math.max(...tableData.value.map(item => item.id), 0) + 1;
    tableData.value.unshift({
      id: newId,
      name: currentForm.value.name,
      addDate: Date.now()
    });
    ElMessage.success("添加成功");
  }

  dialogVisible.value = false;
}

function formatDate(timestamp: number): string {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleString("zh-CN");
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="plantype-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">培训类型管理</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd">
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
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="培训类型" min-width="300" />
        <el-table-column
          prop="addDate"
          label="添加时间"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.addDate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="currentForm" label-width="100px">
        <el-form-item label="培训类型" required>
          <el-input
            v-model="currentForm.name"
            placeholder="请输入培训类型名称"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.plantype-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
