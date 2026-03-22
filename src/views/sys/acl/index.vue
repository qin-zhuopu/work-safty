<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

defineOptions({
  name: "SysAcl"
});

interface AclItem {
  id: number;
  name: string;
  code: string;
  type: string;
  url?: string;
  parentId: number;
  children?: AclItem[];
  addDate?: number;
}

interface ApiResponse {
  success: boolean;
  t: AclItem[];
}

const tableData = ref<AclItem[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const isAddChild = ref(false);
const currentForm = ref<AclItem>({
  id: 0,
  name: "",
  code: "",
  type: "menu",
  url: "",
  parentId: 0
});

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/sys/acl/list.json");
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

function handleAdd() {
  dialogTitle.value = "添加权限";
  isAddChild.value = false;
  currentForm.value = {
    id: 0,
    name: "",
    code: "",
    type: "menu",
    url: "",
    parentId: 0
  };
  dialogVisible.value = true;
}

function handleAddChild(row: AclItem) {
  dialogTitle.value = "添加子项";
  isAddChild.value = true;
  currentForm.value = {
    id: 0,
    name: "",
    code: "",
    type: "button",
    url: "",
    parentId: row.id
  };
  dialogVisible.value = true;
}

function handleEdit(row: AclItem) {
  dialogTitle.value = "编辑权限";
  isAddChild.value = false;
  currentForm.value = { ...row };
  dialogVisible.value = true;
}

function handleDelete(row: AclItem) {
  ElMessageBox.confirm(`确定要删除"${row.name}"吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteFromTree(tableData.value, row.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {
      // 取消删除
    });
}

function deleteFromTree(list: AclItem[], id: number): boolean {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return true;
    }
    if (list[i].children && list[i].children!.length > 0) {
      if (deleteFromTree(list[i].children!, id)) {
        return true;
      }
    }
  }
  return false;
}

function handleSave() {
  if (!currentForm.value.name.trim()) {
    ElMessage.warning("请输入权限名称");
    return;
  }
  if (!currentForm.value.code.trim()) {
    ElMessage.warning("请输入权限编码");
    return;
  }

  if (currentForm.value.id) {
    // 编辑
    updateInTree(tableData.value, currentForm.value);
    ElMessage.success("编辑成功");
  } else {
    // 添加
    const newId = Math.max(...getAllIds(tableData.value), 0) + 1;
    const newItem: AclItem = {
      ...currentForm.value,
      id: newId,
      addDate: Date.now()
    };

    if (isAddChild.value && currentForm.value.parentId > 0) {
      // 添加为子项
      addToTree(tableData.value, currentForm.value.parentId, newItem);
    } else {
      // 添加为顶级项
      tableData.value.unshift(newItem);
    }
    ElMessage.success("添加成功");
  }

  dialogVisible.value = false;
}

function getAllIds(list: AclItem[]): number[] {
  const ids: number[] = [];
  for (const item of list) {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids.push(...getAllIds(item.children));
    }
  }
  return ids;
}

function updateInTree(list: AclItem[], item: AclItem): boolean {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === item.id) {
      list[i] = { ...list[i], ...item };
      return true;
    }
    if (list[i].children && list[i].children!.length > 0) {
      if (updateInTree(list[i].children!, item)) {
        return true;
      }
    }
  }
  return false;
}

function addToTree(
  list: AclItem[],
  parentId: number,
  newItem: AclItem
): boolean {
  for (const item of list) {
    if (item.id === parentId) {
      if (!item.children) {
        item.children = [];
      }
      item.children.push(newItem);
      return true;
    }
    if (item.children && item.children.length > 0) {
      if (addToTree(item.children, parentId, newItem)) {
        return true;
      }
    }
  }
  return false;
}

function getTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    menu: "菜单",
    button: "按钮",
    api: "接口"
  };
  return typeMap[type] || type;
}

function getTypeTagType(
  type: string
): "success" | "warning" | "info" | "primary" {
  const typeTagMap: Record<string, "success" | "warning" | "info" | "primary"> =
    {
      menu: "primary",
      button: "success",
      api: "info"
    };
  return typeTagMap[type] || "info";
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
  <div class="acl-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">权限管理</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd">
            添加
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        row-key="id"
        stripe
        border
        default-expand-all
        style="width: 100%"
      >
        <el-table-column prop="name" label="权限名称" min-width="200" />
        <el-table-column prop="code" label="权限编码" min-width="180" />
        <el-table-column prop="type" label="类型" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getTypeTagType(row.type)">
              {{ getTypeLabel(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="URL路径" min-width="200">
          <template #default="{ row }">
            {{ row.url || "-" }}
          </template>
        </el-table-column>
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
        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="success" link @click="handleAddChild(row)">
              添加子项
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
        <el-form-item label="权限名称" required>
          <el-input v-model="currentForm.name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限编码" required>
          <el-input v-model="currentForm.code" placeholder="请输入权限编码" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="currentForm.type" placeholder="请选择类型">
            <el-option label="菜单" value="menu" />
            <el-option label="按钮" value="button" />
            <el-option label="接口" value="api" />
          </el-select>
        </el-form-item>
        <el-form-item label="URL路径">
          <el-input v-model="currentForm.url" placeholder="请输入URL路径" />
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
.acl-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
