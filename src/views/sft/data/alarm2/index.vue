<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import dayjs from "dayjs";

defineOptions({
  name: "SftDataAlarm2"
});

interface AlarmItem {
  id: number;
  algorithmName: string;
  cameraName: string;
  deviceCode?: string;
  channelCode?: string;
  deviceIp: string;
  deviceName: string;
  discernArea: string;
  pic_data?: string;
  timeStamp: number;
  comId: number;
}

interface PageData {
  content: AlarmItem[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  t: PageData;
}

const tableData = ref<AlarmItem[]>([]);
const loading = ref(false);
const selectedIds = ref<number[]>([]);
const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
});

// 搜索表单
const searchForm = reactive({
  beginTime: "",
  endTime: "",
  algorithmName: ""
});

// 算法选项
const algorithmOptions = [
  { label: "请选择", value: "" },
  { label: "口罩检测", value: "口罩检测" },
  { label: "安全帽检测", value: "安全帽检测" },
  { label: "脱岗检测", value: "脱岗检测" },
  { label: "入侵检测", value: "入侵检测" },
  { label: "打电话检测", value: "打电话检测" },
  { label: "火焰检测", value: "火焰检测" },
  { label: "烟雾检测", value: "烟雾检测" }
];

// 格式化时间
const formatTime = (timestamp: number) => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};

// 格式化图片URL
const getImageUrl = (picData: string) => {
  // 根据原有代码的 getImg 函数处理
  return `/file/download?path=${picData}`;
};

// 选择变化
const handleSelectionChange = (selection: AlarmItem[]) => {
  selectedIds.value = selection.map(item => item.id);
};

async function fetchData() {
  loading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.page - 1),
      size: String(pagination.size)
    });

    if (searchForm.algorithmName) {
      params.append("algorithmName", searchForm.algorithmName);
    }
    if (searchForm.beginTime) {
      params.append("beginTime", searchForm.beginTime);
    }
    if (searchForm.endTime) {
      params.append("endTime", searchForm.endTime);
    }

    const response = await fetch(`/sft/data/alarm2/list?${params}`);
    const data: ApiResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.total = data.t.totalElements;
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
  pagination.page = 1;
  fetchData();
}

function handleReset() {
  searchForm.beginTime = "";
  searchForm.endTime = "";
  searchForm.algorithmName = "";
  pagination.page = 1;
  fetchData();
}

function handlePageChange(page: number) {
  pagination.page = page;
  fetchData();
}

function handleSizeChange(size: number) {
  pagination.size = size;
  pagination.page = 1;
  fetchData();
}

// 删除单条
function handleDelete(id: number) {
  ElMessageBox.confirm("确认删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/data/alarm2/del/${id}`, {
          method: "GET"
        });
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          fetchData();
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
        console.error(error);
      }
    })
    .catch(() => {});
}

// 误报
function handleMiss(id: number) {
  ElMessageBox.confirm("确认标记为误报并删除？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/data/alarm2/del/${id}`, {
          method: "GET"
        });
        const data = await response.json();
        if (data.success) {
          ElMessage.success("操作成功");
          fetchData();
        } else {
          ElMessage.error(data.message || "操作失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
        console.error(error);
      }
    })
    .catch(() => {});
}

// 上报
function handleSend(id: number) {
  ElMessageBox.confirm("确认上报数据？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info"
  })
    .then(async () => {
      try {
        const response = await fetch(`/sft/data/alarm2/send/${id}`, {
          method: "GET"
        });
        const data = await response.json();
        if (data.success) {
          ElMessage.success("上报成功");
          fetchData();
        } else {
          ElMessage.error(data.message || "上报失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
        console.error(error);
      }
    })
    .catch(() => {});
}

// 批量删除
function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择相应的数据！");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${selectedIds.value.length} 条数据？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(async () => {
      try {
        const response = await fetch("/sft/data/alarm2/dels", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `ids=${selectedIds.value.join(",")}`
        });
        const data = await response.json();
        if (data.success) {
          ElMessage.success("删除成功");
          selectedIds.value = [];
          fetchData();
        } else {
          ElMessage.error(data.message || "删除失败");
        }
      } catch (error) {
        ElMessage.error("网络请求失败");
        console.error(error);
      }
    })
    .catch(() => {});
}

// 导出
function handleExport() {
  const ids = selectedIds.value.length > 0 ? selectedIds.value.join(",") : "0";
  const params = new URLSearchParams({
    algorithmName: searchForm.algorithmName,
    beginTime: searchForm.beginTime,
    endTime: searchForm.endTime,
    ids: String(ids)
  });
  window.open(`/sft/data/alarm2/export?${params}`);
}

// 图片预览
const showImageDialog = ref(false);
const previewImageUrl = ref("");

function handleImagePreview(picData: string) {
  previewImageUrl.value = getImageUrl(picData);
  showImageDialog.value = true;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="alarm2-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">视频报警管理</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="报警时间">
          <el-date-picker
            v-model="searchForm.beginTime"
            type="datetime"
            placeholder="开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 200px"
          />
          <span class="mx-2">—</span>
          <el-date-picker
            v-model="searchForm.endTime"
            type="datetime"
            placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="算法">
          <el-select
            v-model="searchForm.algorithmName"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option
              v-for="item in algorithmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch"> 检索 </el-button>
          <el-button @click="handleReset"> 重置 </el-button>
          <el-button type="danger" @click="handleBatchDelete"> 删除 </el-button>
          <el-button @click="handleExport"> 导出 </el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
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
        <el-table-column
          prop="timeStamp"
          label="报警时间"
          width="180"
          align="center"
        >
          <template #default="{ row }">
            {{ formatTime(row.timeStamp) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="algorithmName"
          label="报警类型"
          width="120"
          align="center"
        />
        <el-table-column prop="cameraName" label="摄像头" min-width="200" />
        <el-table-column prop="deviceCode" label="设备编码" min-width="150" />
        <el-table-column prop="channelCode" label="通道编码" min-width="150" />
        <el-table-column label="报警结果图片" width="130" align="center">
          <template #default="{ row }">
            <el-image
              v-if="row.pic_data"
              :src="getImageUrl(row.pic_data)"
              :preview-src-list="[getImageUrl(row.pic_data)]"
              fit="cover"
              style="width: 80px; height: 80px; cursor: pointer"
              :preview-teleported="true"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="() => {}">
              修改
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row.id)">
              删除
            </el-button>
            <el-button size="small" @click="handleMiss(row.id)">
              误报
            </el-button>
            <el-button size="small" @click="handleSend(row.id)">
              上报
            </el-button>
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
        class="pagination"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.alarm2-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  margin-bottom: 16px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>
