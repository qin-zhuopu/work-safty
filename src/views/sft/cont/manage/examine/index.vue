<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftContManageExamine"
});

const activeTab = ref("contractor");

// 承包商审核数据
interface ContManageItem {
  id: string;
  field: string;
  status: number;
  field1: string;
  field3: string;
  field4: string;
  nodeId?: string;
  hmdExamine?: number;
}

// 人员审核数据
interface ContPerItem {
  id: string;
  field: string;
  field1: string;
  cm: string;
  examine: string;
  sex: string;
  birthday: string;
  status: number;
}

const contractorData = ref<ContManageItem[]>([]);
const personnelData = ref<ContPerItem[]>([]);
const loading = ref(false);

const statusMap: Record<number, string> = {
  "-1": "填报",
  0: "审批中",
  1: "驳回",
  2: "通过",
  3: "删除",
  4: "结束"
};

const getStatusType = (status: number) => {
  switch (status) {
    case -1:
      return "info";
    case 0:
      return "warning";
    case 1:
      return "danger";
    case 2:
      return "success";
    case 3:
      return "info";
    case 4:
      return "info";
    default:
      return "info";
  }
};

const examineStatusMap: Record<string, string> = {
  采购办专工: "warning",
  安全审批: "info",
  通过: "success",
  培训中: "info",
  部门审批: "warning"
};

const getExamineTagType = (examine: string) => {
  return examineStatusMap[examine] || "info";
};

async function fetchContractorData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/cont/manage/examine/list.json");
    const data = await response.json();
    if (data.success) {
      contractorData.value = data.t.content;
    } else {
      ElMessage.error("获取承包商数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function fetchPersonnelData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/cont/per/examiners.json");
    const data = await response.json();
    if (data.success) {
      personnelData.value = data.t.content;
    } else {
      ElMessage.error("获取人员数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchContractorData();
});
</script>

<template>
  <div class="examine-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">承包商审核</span>
        </div>
      </template>

      <el-tabs
        v-model="activeTab"
        @tab-change="
          name =>
            name === 'contractor' ? fetchContractorData() : fetchPersonnelData()
        "
      >
        <!-- 承包商审核 Tab -->
        <el-tab-pane label="承包商审核" name="contractor">
          <el-table
            v-loading="loading"
            :data="contractorData"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column prop="field" label="承包商名称" min-width="200" />
            <el-table-column
              prop="status"
              label="状态"
              width="100"
              align="center"
            >
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ statusMap[row.status] || "提报" }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="field1" label="对接部门" width="150" />
            <el-table-column prop="field3" label="当前审批节点" width="150" />
            <el-table-column
              prop="field4"
              label="下一审批节点"
              min-width="150"
            />
            <el-table-column
              label="操作"
              width="280"
              align="center"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button-group>
                  <el-button
                    v-if="row.hmdExamine === 0"
                    type="warning"
                    size="small"
                    @click="ElMessage.info(`黑名单审核: ${row.field}`)"
                  >
                    黑名单审核
                  </el-button>
                  <el-button
                    v-if="row.hmdExamine === 2"
                    type="warning"
                    size="small"
                    @click="ElMessage.info(`移出黑名单: ${row.field}`)"
                  >
                    移出黑名单
                  </el-button>
                  <el-button
                    v-if="row.nodeId"
                    type="primary"
                    size="small"
                    @click="ElMessage.info(`审批: ${row.field}`)"
                  >
                    审批
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="ElMessage.info(`文件: ${row.field}`)"
                  >
                    文件
                  </el-button>
                  <el-button
                    size="small"
                    @click="ElMessage.info(`人员: ${row.field}`)"
                  >
                    人员
                  </el-button>
                  <el-button
                    size="small"
                    @click="ElMessage.info(`审批流: ${row.field}`)"
                  >
                    审批流
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 人员审核 Tab -->
        <el-tab-pane label="人员审核" name="personnel">
          <el-table
            v-loading="loading"
            :data="personnelData"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column prop="cm" label="承包商名称" min-width="200" />
            <el-table-column prop="field" label="姓名" width="120" />
            <el-table-column prop="field1" label="身份证号" width="180" />
            <el-table-column
              prop="sex"
              label="性别"
              width="80"
              align="center"
            />
            <el-table-column prop="birthday" label="出生日期" width="120" />
            <el-table-column prop="examine" label="审核节点" width="150">
              <template #default="{ row }">
                <el-tag :type="getExamineTagType(row.examine)">
                  {{ row.examine }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="300"
              align="center"
              fixed="right"
            >
              <template #default="{ row }">
                <el-button-group>
                  <el-button
                    v-if="row.status === 0"
                    type="primary"
                    size="small"
                    @click="ElMessage.success(`通过: ${row.field}`)"
                  >
                    通过
                  </el-button>
                  <el-button
                    v-if="row.status === 0"
                    type="danger"
                    size="small"
                    @click="ElMessage.warning(`驳回: ${row.field}`)"
                  >
                    驳回
                  </el-button>
                  <el-button
                    type="warning"
                    size="small"
                    @click="ElMessage.info(`文件: ${row.field}`)"
                  >
                    文件
                  </el-button>
                  <el-button
                    size="small"
                    @click="ElMessage.info(`培训记录: ${row.field}`)"
                  >
                    培训记录
                  </el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="ElMessage.info(`保命规则: ${row.field}`)"
                  >
                    保命规则
                  </el-button>
                  <el-button
                    size="small"
                    @click="ElMessage.info(`审批流: ${row.field}`)"
                  >
                    审批流
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.examine-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
}
</style>
