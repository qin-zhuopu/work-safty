<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftTrainPcLearnFile"
});

interface LearnFile {
  id: string;
  title: string;
  eduType: string;
  createTime: string;
  collectStatus: number;
  collectId: string;
}

interface ApiResponse<T> {
  success: boolean;
  t: T;
}

const tableData = ref<LearnFile[]>([]);
const allFiles = ref<LearnFile[]>([]);
const loading = ref(false);
const searchKeyword = ref("");

// 获取学习资料列表
async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/train/pc/edu/lists");
    const data: ApiResponse<LearnFile[]> = await response.json();
    if (data.success) {
      allFiles.value = data.t;
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

// 格式化日期
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 搜索
function handleSearch() {
  const keyword = searchKeyword.value.trim().toLowerCase();
  if (!keyword) {
    tableData.value = allFiles.value;
    return;
  }
  tableData.value = allFiles.value.filter(
    item =>
      item.title.toLowerCase().includes(keyword) ||
      item.eduType.toLowerCase().includes(keyword)
  );
}

// 清除搜索
function handleClear() {
  searchKeyword.value = "";
  tableData.value = allFiles.value;
}

// 点击行打开课件
function handleRowClick(row: LearnFile) {
  console.log("打开课件:", row);
  // 实际项目中可以跳转到详情页
  // window.location.href = '/sft/train/pc/learn/file/open/index';
}

// 切换收藏状态
async function handleCollectChange(row: LearnFile, index: number) {
  const isCollected = row.collectStatus === 1;
  const url = isCollected
    ? `/sft/train/pc/collect/del/${row.collectId}`
    : `/sft/train/pc/collect/add/2/${row.id}`;

  try {
    const response = await fetch(url);
    const data: ApiResponse<string | null> = await response.json();
    if (data.success) {
      if (!isCollected) {
        // 添加收藏
        row.collectStatus = 1;
        row.collectId = data.t || "";
        ElMessage.success("收藏成功");
      } else {
        // 取消收藏
        row.collectStatus = 0;
        row.collectId = "";
        ElMessage.success("取消收藏成功");
      }
    } else {
      // 恢复开关状态
      row.collectStatus = isCollected ? 1 : 0;
      ElMessage.error("操作失败");
    }
  } catch (error) {
    // 恢复开关状态
    row.collectStatus = isCollected ? 1 : 0;
    ElMessage.error("网络请求失败");
    console.error(error);
  }
}

// 课件类型标签颜色
function getTagType(type: string): "success" | "warning" | "danger" | "info" {
  const typeMap: Record<string, "success" | "warning" | "danger" | "info"> = {
    pdf: "danger",
    ppt: "warning",
    doc: "success",
    video: "info"
  };
  return typeMap[type] || "info";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="learn-file-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">学习资料</span>
        </div>
      </template>

      <!-- 搜索框 -->
      <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入学习资料名称或课件类型进行查询"
          clearable
          style="max-width: 400px"
          @input="handleSearch"
          @clear="handleClear"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
        @row-click="handleRowClick"
      >
        <el-table-column prop="title" label="课件名称" min-width="300" />
        <el-table-column
          prop="eduType"
          label="课件类型"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            <el-tag :type="getTagType(row.eduType)">
              {{ row.eduType.toUpperCase() }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="上传时间"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="收藏状态" width="100" align="center">
          <template #default="{ row, $index }">
            <el-switch
              v-model="row.collectStatus"
              :active-value="1"
              :inactive-value="0"
              active-text="已收藏"
              inactive-text="未收藏"
              inline-prompt
              @change="handleCollectChange(row, $index)"
              @click.stop
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.learn-file-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
}
</style>
