<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

defineOptions({
  name: "SftTrainCollect"
});

const router = useRouter();

interface StudyMaterial {
  id: number;
  name: string;
  url: string;
  collectTime: string;
}

interface ExamQuestion {
  id: number;
  name: string;
  type: string;
  options: string;
  correctAnswer: string;
}

interface StudyMaterialsResponse {
  success: boolean;
  t: StudyMaterial[];
}

interface ExamQuestionsResponse {
  success: boolean;
  t: ExamQuestions[];
}

const activeTab = ref("material");
const studyMaterials = ref<StudyMaterial[]>([]);
const examQuestions = ref<ExamQuestion[]>([]);
const loading = ref(false);

async function fetchStudyMaterials() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/collect/studyMaterials.json");
    const data: StudyMaterialsResponse = await response.json();
    if (data.success) {
      studyMaterials.value = data.t;
    }
  } catch (error) {
    ElMessage.error("获取学习资料失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function fetchExamQuestions() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/collect/examQuestions.json");
    const data: ExamQuestionsResponse = await response.json();
    if (data.success) {
      examQuestions.value = data.t;
    }
  } catch (error) {
    ElMessage.error("获取考试题目失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function handleCancelCollect(id: number) {
  try {
    await ElMessageBox.confirm("确认取消收藏？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const response = await fetch(`/sft/train/collect/del/${id}`, {
      method: "GET"
    });
    const data = await response.json();

    if (data.success) {
      ElMessage.success("取消收藏成功");
      await fetchStudyMaterials();
    } else {
      ElMessage.error(data.message || "取消收藏失败");
    }
  } catch (error: any) {
    if (error !== "cancel") {
      ElMessage.error("操作失败");
    }
  }
}

function handleBack() {
  router.push("/sft/train/pc/index");
}

function handleTabChange() {
  if (activeTab.value === "material" && studyMaterials.value.length === 0) {
    fetchStudyMaterials();
  } else if (activeTab.value === "exam" && examQuestions.value.length === 0) {
    fetchExamQuestions();
  }
}

onMounted(() => {
  fetchStudyMaterials();
});
</script>

<template>
  <div class="collect-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item to="/sft/train/pc/index">教育培训</el-breadcrumb-item>
      <el-breadcrumb-item>收藏历史</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 操作栏 -->
    <el-card shadow="never" class="action-card">
      <el-button type="primary" size="small" @click="handleBack">
        <el-icon><Back /></el-icon>
        返回
      </el-button>
    </el-card>

    <!-- 内容区 -->
    <el-card shadow="never" class="content-card">
      <!-- Tab 切换 -->
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="学习资料" name="material">
          <el-table
            v-loading="loading"
            :data="studyMaterials"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column prop="name" label="课件名称" min-width="300">
              <template #default="{ row }">
                <el-link
                  :href="row.url"
                  target="_blank"
                  type="primary"
                  :underline="false"
                >
                  {{ row.name }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="collectTime"
              label="收藏时间"
              width="180"
              align="center"
            />
            <el-table-column label="收藏状态" width="120" align="center">
              <template #default="{ row }">
                <el-button
                  type="danger"
                  link
                  size="small"
                  @click="handleCancelCollect(row.id)"
                >
                  取消收藏
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="考试题目" name="exam">
          <el-table
            v-loading="loading"
            :data="examQuestions"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column prop="name" label="题目名称" min-width="200" />
            <el-table-column
              prop="type"
              label="题目形式"
              width="120"
              align="center"
            />
            <el-table-column prop="options" label="题目选项" min-width="250" />
            <el-table-column
              prop="correctAnswer"
              label="正确答案"
              width="120"
              align="center"
            />
            <el-table-column label="收藏状态" width="120" align="center">
              <template #default="{ row }">
                <el-button
                  type="danger"
                  link
                  size="small"
                  @click="handleCancelCollect(row.id)"
                >
                  取消收藏
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.collect-container {
  padding: 16px;
}

.breadcrumb {
  margin-bottom: 16px;
}

.action-card {
  margin-bottom: 16px;
}

.content-card {
  :deep(.el-card__body) {
    padding: 16px;
  }
}
</style>
