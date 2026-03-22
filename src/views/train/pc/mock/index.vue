<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

defineOptions({
  name: "TrainPcMock"
});

const router = useRouter();

interface IbankTypeItem {
  id: number;
  name: string;
}

interface ApiResponse {
  success: boolean;
  t: IbankTypeItem[];
}

const ibankTypes = ref<IbankTypeItem[]>([]);
const selectedType = ref<IbankTypeItem | null>(null);
const loading = ref(false);

async function fetchTypes() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/pc/ibank/type.json");
    const data: ApiResponse = await response.json();
    if (data.success) {
      ibankTypes.value = data.t;
      if (data.t.length > 0) {
        selectedType.value = data.t[0];
      }
    } else {
      ElMessage.error("获取题库类型失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function handleConfirm() {
  if (!selectedType.value) {
    ElMessage.warning("请选择题库类型");
    return;
  }
  // 保存选择到本地存储
  localStorage.setItem("mockTypeInfo", JSON.stringify(selectedType.value));
  // 跳转到模拟答题练习页面
  router.push("/train/pc/mock/practice/index");
}

onMounted(() => {
  fetchTypes();
});
</script>

<template>
  <div class="mock-container">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>教育培训</el-breadcrumb-item>
      <el-breadcrumb-item>模拟答题</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card v-loading="loading" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">请选择题库类型</span>
        </div>
      </template>

      <el-radio-group v-model="selectedType" class="type-list">
        <el-radio
          v-for="item in ibankTypes"
          :key="item.id"
          :label="item"
          :value="item"
          class="type-item"
        >
          {{ item.name }}
        </el-radio>
      </el-radio-group>

      <div class="submit-area">
        <el-button type="primary" size="large" @click="handleConfirm">
          确认
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.mock-container {
  padding: 16px;
}

.breadcrumb {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
}

.type-item {
  padding: 12px 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background-color: var(--el-fill-color-light);
  }

  :deep(.el-radio__label) {
    font-size: 14px;
  }
}

.submit-area {
  padding-top: 16px;
  margin-top: 24px;
  text-align: center;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style>
