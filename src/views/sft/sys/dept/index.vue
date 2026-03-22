<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox, ElTag } from "element-plus";
import type { TreeNodeData } from "element-plus";

defineOptions({
  name: "SftSysDept"
});

interface DeptNode {
  id: number;
  name: string;
  children?: DeptNode[];
  open?: boolean;
  parentName?: string;
  perId?: number;
  value?: number;
}

interface User {
  id: number;
  ushow: string;
  uname: string;
  telephone: string;
  status: string;
  job: string;
  roles: string;
  remark: string;
}

interface UserListResponse {
  success: boolean;
  t: {
    totalElements: number;
    content: User[];
  };
}

interface DeptListResponse {
  success: boolean;
  t: DeptNode[];
}

const deptTreeData = ref<DeptNode[]>([]);
const tableData = ref<User[]>([]);
const selectedDeptId = ref<number | null>(null);
const selectedDeptName = ref<string>("");
const searchName = ref<string>("");
const searchStatus = ref<string>("");
const loading = ref(false);
const tableLoading = ref(false);
const pagination = ref({
  page: 1,
  size: 10,
  total: 0
});

const treeRef = ref();

const statusTagType = computed(() => (status: string) => {
  switch (status) {
    case "1":
      return "success";
    case "2":
      return "danger";
    case "3":
      return "info";
    default:
      return "";
  }
});

const statusText = computed(() => (status: string) => {
  switch (status) {
    case "1":
      return "正常";
    case "2":
      return "冻结";
    case "3":
      return "删除";
    default:
      return "";
  }
});

async function fetchDeptTree() {
  loading.value = true;
  try {
    const response = await fetch("/sft/sys/dept/all.json");
    const data: DeptListResponse = await response.json();
    if (data.success) {
      deptTreeData.value = data.t;
    } else {
      ElMessage.error("获取部门数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function fetchUserList() {
  tableLoading.value = true;
  try {
    const params = new URLSearchParams({
      page: String(pagination.value.page),
      size: String(pagination.value.size)
    });
    if (selectedDeptId.value) {
      params.append("deptId", String(selectedDeptId.value));
    }
    if (searchName.value) {
      params.append("pname", searchName.value);
    }
    if (searchStatus.value) {
      params.append("status", searchStatus.value);
    }

    const response = await fetch(`/sft/sys/user/list.json?${params}`);
    const data: UserListResponse = await response.json();
    if (data.success) {
      tableData.value = data.t.content;
      pagination.value.total = data.t.totalElements;
    } else {
      ElMessage.error("获取用户列表失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    tableLoading.value = false;
  }
}

function handleNodeClick(data: DeptNode) {
  selectedDeptId.value = data.id;
  selectedDeptName.value = data.name;
  pagination.value.page = 1;
  fetchUserList();
}

function handleAddDept() {
  const selectedNode = getCurrentSelectedNode();
  const parentId = selectedNode ? selectedNode.id : 0;
  ElMessage.info(`添加部门功能：父节点ID=${parentId}`);
}

function handleUpdateDept() {
  const selectedNode = getCurrentSelectedNode();
  if (!selectedNode) {
    ElMessage.warning("请先选择一个部门");
    return;
  }
  ElMessage.info(`修改部门功能：ID=${selectedNode.id}`);
}

function handleDeleteDept() {
  const selectedNode = getCurrentSelectedNode();
  if (!selectedNode) {
    ElMessage.warning("请先选择一个部门");
    return;
  }
  ElMessageBox.confirm(`确认删除部门【${selectedNode.name}】？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchDeptTree();
    })
    .catch(() => {});
}

function handleRefreshDept() {
  fetchDeptTree();
  ElMessage.success("部门树已刷新");
}

function handleAddUser() {
  const selectedNode = getCurrentSelectedNode();
  if (!selectedNode) {
    ElMessage.warning("请先选择一个岗位");
    return;
  }
  ElMessage.info(`添加用户功能：部门ID=${selectedNode.id}`);
}

function handleSearch() {
  pagination.value.page = 1;
  fetchUserList();
}

function handleReset() {
  searchName.value = "";
  searchStatus.value = "";
  pagination.value.page = 1;
  fetchUserList();
}

function handleImport() {
  const selectedNode = getCurrentSelectedNode();
  if (!selectedNode) {
    ElMessage.warning("请先选择一个部门");
    return;
  }
  ElMessage.info(`导入用户功能：部门ID=${selectedNode.id}`);
}

function handleExport() {
  const params = new URLSearchParams();
  if (selectedDeptId.value) {
    params.append("deptId", String(selectedDeptId.value));
  }
  if (searchName.value) {
    params.append("pname", searchName.value);
  }
  if (searchStatus.value) {
    params.append("status", searchStatus.value);
  }
  window.open(`/sft/sys/user/export?${params}`);
}

function handleRefreshUser() {
  fetchUserList();
}

function handleEdit(row: User) {
  ElMessage.info(`编辑用户功能：ID=${row.id}`);
}

function handleDelete(row: User) {
  ElMessageBox.confirm("确认删除该用户？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("删除成功");
      fetchUserList();
    })
    .catch(() => {});
}

function handleResetPassword(row: User) {
  ElMessageBox.confirm("确认重置密码？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success("重置成功");
    })
    .catch(() => {});
}

function handleChangeDept() {
  ElMessage.info("权限调整功能");
}

function handlePageChange(page: number) {
  pagination.value.page = page;
  fetchUserList();
}

function handleSizeChange(size: number) {
  pagination.value.size = size;
  pagination.value.page = 1;
  fetchUserList();
}

function getCurrentSelectedNode(): DeptNode | null {
  if (!treeRef.value) return null;
  const selectedNodes = treeRef.value.getCurrentNode();
  return selectedNodes || null;
}

onMounted(() => {
  fetchDeptTree();
  fetchUserList();
});
</script>

<template>
  <div class="dept-container">
    <el-row :gutter="16">
      <el-col :span="6">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>部门结构</span>
            </div>
          </template>
          <div class="tree-actions">
            <el-button-group>
              <el-button size="small" @click="handleAddDept">
                <el-icon><Plus /></el-icon>
                添加
              </el-button>
              <el-button size="small" @click="handleUpdateDept">
                <el-icon><Edit /></el-icon>
                修改
              </el-button>
              <el-button size="small" @click="handleDeleteDept">
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
              <el-button size="small" @click="handleRefreshDept">
                <el-icon><Refresh /></el-icon>
                刷新
              </el-button>
            </el-button-group>
          </div>
          <el-tree
            ref="treeRef"
            v-loading="loading"
            :data="deptTreeData"
            :props="{ children: 'children', label: 'name' }"
            node-key="id"
            highlight-current
            default-expand-all
            @node-click="handleNodeClick"
          >
            <template #default="{ node }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>人员列表</span>
              <span v-if="selectedDeptName" class="selected-dept">
                当前选择: {{ selectedDeptName }}
              </span>
            </div>
          </template>

          <div class="toolbar">
            <el-button type="primary" size="small" @click="handleAddUser">
              <el-icon><Plus /></el-icon>
              添加
            </el-button>

            <el-input
              v-model="searchName"
              placeholder="请输入姓名"
              style="width: 150px"
              clearable
              @keyup.enter="handleSearch"
            />

            <el-select
              v-model="searchStatus"
              placeholder="人员状态"
              style="width: 120px"
              clearable
            >
              <el-option label="正常" value="1" />
              <el-option label="冻结" value="2" />
            </el-select>

            <el-button-group>
              <el-button type="primary" size="small" @click="handleSearch">
                <el-icon><Search /></el-icon>
                搜索
              </el-button>
              <el-button size="small" @click="handleReset">
                <el-icon><RefreshLeft /></el-icon>
                重置
              </el-button>
              <el-button size="small" @click="handleImport">
                <el-icon><Upload /></el-icon>
                导入
              </el-button>
              <el-button size="small" @click="handleExport">
                <el-icon><Download /></el-icon>
                导出
              </el-button>
              <el-button size="small" @click="handleRefreshUser">
                <el-icon><Refresh /></el-icon>
                刷新
              </el-button>
              <el-button size="small" @click="handleChangeDept">
                <el-icon><Setting /></el-icon>
                权限调整
              </el-button>
            </el-button-group>
          </div>

          <el-table
            v-loading="tableLoading"
            :data="tableData"
            stripe
            border
            style="width: 100%; margin-top: 16px"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="ushow" label="姓名" width="100" />
            <el-table-column prop="uname" label="账号" width="120" />
            <el-table-column prop="telephone" label="电话" width="130" />
            <el-table-column
              prop="status"
              label="状态"
              width="80"
              align="center"
            >
              <template #default="{ row }">
                <el-tag :type="statusTagType(row.status)" size="small">
                  {{ statusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="job" label="岗位" width="120" />
            <el-table-column prop="roles" label="角色" width="120">
              <template #default="{ row }">
                {{ row.roles || "-" }}
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="120" />
            <el-table-column
              label="操作"
              width="200"
              align="center"
              fixed="right"
            >
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
                  type="danger"
                  size="small"
                  link
                  @click="handleDelete(row)"
                >
                  删除
                </el-button>
                <el-button
                  type="warning"
                  size="small"
                  link
                  @click="handleResetPassword(row)"
                >
                  重置密码
                </el-button>
              </template>
            </el-table-column>
          </el-table>

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
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.dept-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .selected-dept {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}

.tree-actions {
  margin-bottom: 12px;
}

.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 14px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
</style>
