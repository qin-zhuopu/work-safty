<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance } from "element-plus";

defineOptions({
  name: "SftInspCl"
});

interface ListItem {
  id: number;
  deptName: string;
  field: string; // 手机型号
  field1: string; // 原IMEI1
  field2: string; // 原IMEI2
  field3: string; // 故障描述
  field4: string; // 新手机型号
  field5: string; // 新IMEI1
  field6: string; // 新IMEI2
  field7: number; // 更换日期
  field8: string; // 领用人
  field9: string; // 联系电话
  field10: string; // 经办人
  field11: string; // 处理方式
  field12: string; // 备注
  field13: string; // 备用字段
}

interface ApiResponse {
  success: boolean;
  t: {
    content: ListItem[];
    totalElements: number;
  };
}

const tableData = ref<ListItem[]>([]);
const loading = ref(false);
const searchForm = ref({
  deptName: ""
});
const multipleSelection = ref<ListItem[]>([]);
const dialogVisible = ref(false);
const dialogTitle = ref("添加");
const dialogFormRef = ref<FormInstance>();
const dialogForm = ref<Partial<ListItem>>({
  deptName: "",
  field: "",
  field1: "",
  field2: "",
  field3: "",
  field4: "",
  field5: "",
  field6: "",
  field7: Date.now(),
  field8: "",
  field9: "",
  field10: "",
  field11: "",
  field12: "",
  field13: ""
});

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/insp/cl/list.json");
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
  searchForm.value.deptName = "";
  fetchData();
}

function handleAdd() {
  dialogTitle.value = "添加";
  dialogForm.value = {
    deptName: "",
    field: "",
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: Date.now(),
    field8: "",
    field9: "",
    field10: "",
    field11: "",
    field12: "",
    field13: ""
  };
  dialogVisible.value = true;
}

function handleEdit(row: ListItem) {
  dialogTitle.value = "编辑";
  dialogForm.value = { ...row };
  dialogVisible.value = true;
}

function handleDelete(row: ListItem) {
  ElMessageBox.confirm("确认删除该记录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      tableData.value = tableData.value.filter(item => item.id !== row.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {});
}

function handleSelectionChange(val: ListItem[]) {
  multipleSelection.value = val;
}

function handleDelAll() {
  if (multipleSelection.value.length === 0) {
    ElMessage.warning("请选择要删除的记录");
    return;
  }
  ElMessageBox.confirm(
    `确认删除选中的 ${multipleSelection.value.length} 条记录吗？`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }
  )
    .then(() => {
      const ids = multipleSelection.value.map(item => item.id);
      tableData.value = tableData.value.filter(item => !ids.includes(item.id));
      ElMessage.success("删除成功");
    })
    .catch(() => {});
}

function handleImport() {
  ElMessage.info("导入功能开发中");
}

function handleExport() {
  ElMessage.info("导出功能开发中");
}

function handleDownloadTemplate() {
  ElMessage.info("下载模板功能开发中");
}

function submitDialog() {
  dialogFormRef.value?.validate(valid => {
    if (valid) {
      if (dialogTitle.value === "添加") {
        tableData.value.unshift({
          ...(dialogForm.value as ListItem),
          id: Date.now(),
          addDate: Date.now()
        } as any);
        ElMessage.success("添加成功");
      } else {
        const index = tableData.value.findIndex(
          item => item.id === dialogForm.value.id
        );
        if (index !== -1) {
          tableData.value[index] = { ...dialogForm.value } as ListItem;
          ElMessage.success("编辑成功");
        }
      }
      dialogVisible.value = false;
    }
  });
}

function formatDate(timestamp: number) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("zh-CN");
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="cl-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">更换台账</span>
        </div>
      </template>

      <!-- 搜索表单 -->
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="部门">
            <el-input
              v-model="searchForm.deptName"
              placeholder="请输入部门"
              clearable
              style="width: 200px"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="handleSearch">
          <el-icon><Search /></el-icon>
          查询
        </el-button>
        <el-button size="small" @click="handleReset">
          <el-icon><RefreshLeft /></el-icon>
          重置
        </el-button>
        <el-button type="primary" size="small" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
        <el-button size="small" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button size="small" @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button size="small" @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
        <el-button type="danger" size="small" @click="handleDelAll">
          <el-icon><Delete /></el-icon>
          删除
        </el-button>
      </div>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%; margin-top: 16px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="deptName" label="部门" min-width="150" />
        <el-table-column prop="field" label="手机型号" min-width="150" />
        <el-table-column prop="field1" label="原IMEI1" width="160" />
        <el-table-column prop="field2" label="原IMEI2" width="160" />
        <el-table-column prop="field3" label="故障描述" min-width="120" />
        <el-table-column prop="field4" label="新手机型号" min-width="150" />
        <el-table-column prop="field5" label="新IMEI1" width="160" />
        <el-table-column prop="field6" label="新IMEI2" width="160" />
        <el-table-column
          prop="field7"
          label="更换日期"
          width="120"
          align="center"
        >
          <template #default="{ row }">
            {{ formatDate(row.field7) }}
          </template>
        </el-table-column>
        <el-table-column prop="field8" label="领用人" width="100" />
        <el-table-column prop="field9" label="联系电话" width="130" />
        <el-table-column prop="field10" label="经办人" width="100" />
        <el-table-column prop="field11" label="处理方式" width="120" />
        <el-table-column prop="field12" label="备注" min-width="120" />
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="dialogFormRef"
        :model="dialogForm"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="部门" prop="deptName" required>
          <el-input v-model="dialogForm.deptName" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="手机型号" prop="field" required>
          <el-input v-model="dialogForm.field" placeholder="请输入手机型号" />
        </el-form-item>
        <el-form-item label="原IMEI1" prop="field1">
          <el-input v-model="dialogForm.field1" placeholder="请输入原IMEI1" />
        </el-form-item>
        <el-form-item label="原IMEI2" prop="field2">
          <el-input v-model="dialogForm.field2" placeholder="请输入原IMEI2" />
        </el-form-item>
        <el-form-item label="故障描述" prop="field3">
          <el-input
            v-model="dialogForm.field3"
            type="textarea"
            placeholder="请输入故障描述"
          />
        </el-form-item>
        <el-form-item label="新手机型号" prop="field4">
          <el-input
            v-model="dialogForm.field4"
            placeholder="请输入新手机型号"
          />
        </el-form-item>
        <el-form-item label="新IMEI1" prop="field5">
          <el-input v-model="dialogForm.field5" placeholder="请输入新IMEI1" />
        </el-form-item>
        <el-form-item label="新IMEI2" prop="field6">
          <el-input v-model="dialogForm.field6" placeholder="请输入新IMEI2" />
        </el-form-item>
        <el-form-item label="更换日期" prop="field7">
          <el-date-picker
            v-model="dialogForm.field7"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            value-format="x"
          />
        </el-form-item>
        <el-form-item label="领用人" prop="field8">
          <el-input v-model="dialogForm.field8" placeholder="请输入领用人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="field9">
          <el-input v-model="dialogForm.field9" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="经办人" prop="field10">
          <el-input v-model="dialogForm.field10" placeholder="请输入经办人" />
        </el-form-item>
        <el-form-item label="处理方式" prop="field11">
          <el-input v-model="dialogForm.field11" placeholder="请输入处理方式" />
        </el-form-item>
        <el-form-item label="备注" prop="field12">
          <el-input
            v-model="dialogForm.field12"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitDialog">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.cl-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
