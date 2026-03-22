<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";

defineOptions({
  name: "SftTrainPlanArchives"
});

// 部门树节点
interface DeptNode {
  id: number;
  name: string;
  value: number;
  children?: DeptNode[];
}

// 用户
interface User {
  id: number;
  ushow: string;
}

// 个人基础信息
interface PersonInfo {
  name?: string;
  sex?: string;
  nation?: string;
  education?: string;
  major?: string;
  graduateTime?: string;
  graduateSchool?: string;
  phone?: string;
  idCard?: string;
  politicalStatus?: string;
  address?: string;
  eduFile?: string;
  workStartTime?: string;
  joinCompanyTime?: string;
}

// 三级教育台账(线下)
interface TeoItem {
  id?: number;
  sysUser?: { ushow: string; sex: string };
  post?: string;
  gsDate?: string;
  gsScore?: string;
  gsFile1?: string;
  gsFile2?: string;
  cjDate?: string;
  cjScore?: string;
  cjFile1?: string;
  cjFile2?: string;
  bzDate?: string;
  bzScore?: string;
  bzFile1?: string;
  bzFile2?: string;
  type?: string;
  zgjyDate?: string;
  zgjyScore?: string;
  zgjyFile1?: string;
  zgjyFile2?: string;
}

// 证书管理
interface CertItem {
  id: number;
  userName: string;
  deptName: string;
  idCard: string;
  category: string;
  cardNo: string;
  beginTime: number;
  checkTime: number;
  endTime: number;
  issuedDept: string;
  file1?: string;
}

// 日常教育台账
interface DailyEduItem {
  year: string;
  month: string;
  hours: number;
  examCount: number;
  selfHours: number;
}

interface ApiResponse<T> {
  success: boolean;
  t: T;
}

interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

const loading = ref(false);
const deptTree = ref<DeptNode[]>([]);
const userList = ref<User[]>([]);
const personInfo = ref<PersonInfo>({});
const teoTableData = ref<TeoItem[]>([]);
const certTableData = ref<CertItem[]>([]);
const dailyEduData = ref<DailyEduItem[]>([]);
const teoTotal = ref(0);
const certTotal = ref(0);

// 搜索表单
const searchForm = ref({
  deptId: undefined as number | undefined,
  userId: undefined as number | undefined,
  startTime: "",
  endTime: ""
});

// 分页
const teoPagination = ref({
  page: 1,
  size: 10
});

const certPagination = ref({
  page: 1,
  size: 10
});

// 获取部门列表
async function fetchDeptTree() {
  try {
    const response = await fetch("/sft/sys/dept/cjzr/all.json");
    const data: ApiResponse<DeptNode[]> = await response.json();
    if (data.success) {
      deptTree.value = data.t;
    }
  } catch (error) {
    console.error("获取部门列表失败", error);
  }
}

// 部门变化时获取用户列表
async function onDeptChange() {
  searchForm.value.userId = undefined;
  userList.value = [];
  if (searchForm.value.deptId) {
    await fetchUserList(searchForm.value.deptId);
  }
}

// 获取用户列表
async function fetchUserList(deptId: number) {
  try {
    const response = await fetch(`/sft/sys/user/allListByDept/${deptId}`);
    const data: ApiResponse<User[]> = await response.json();
    if (data.success) {
      userList.value = data.t;
    }
  } catch (error) {
    console.error("获取用户列表失败", error);
  }
}

// 格式化日期
function formatDate(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateTime(timestamp: number): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// 计算证书是否即将过期
function isCertExpiringSoon(endTime: number, checkTime: number): boolean {
  const now = Date.now();
  const daysUntilEnd = (endTime - now) / (24 * 60 * 60 * 1000);
  const daysUntilCheck = (checkTime - now) / (24 * 60 * 60 * 1000);
  return daysUntilEnd <= 30 || daysUntilCheck <= 30;
}

// 获取三级教育台账数据
async function fetchTeoData() {
  if (!searchForm.value.userId) return;
  loading.value = true;
  try {
    const response = await fetch(
      `/sft/train/teo/list.json?sysUserId=${searchForm.value.userId}&page=${teoPagination.value.page}&size=${teoPagination.value.size}`
    );
    const data: ApiResponse<PageResponse<TeoItem>> = await response.json();
    if (data.success) {
      teoTableData.value = data.t.content;
      teoTotal.value = data.t.totalElements;
    }
  } catch (error) {
    console.error("获取三级教育台账失败", error);
  } finally {
    loading.value = false;
  }
}

// 获取证书管理数据
async function fetchCertData() {
  if (!searchForm.value.userId) return;
  try {
    const response = await fetch(
      `/sft/work/special/list.json?sysUserId=${searchForm.value.userId}&page=${certPagination.value.page}&size=${certPagination.value.size}`
    );
    const data: ApiResponse<PageResponse<CertItem>> = await response.json();
    if (data.success) {
      certTableData.value = data.t.content;
      certTotal.value = data.t.totalElements;
    }
  } catch (error) {
    console.error("获取证书管理数据失败", error);
  }
}

// 获取个人基础信息
async function fetchPersonInfo() {
  if (!searchForm.value.userId) return;
  // 这里暂时使用模拟数据，实际应该从接口获取
  personInfo.value = {
    name: "张三",
    sex: "男",
    nation: "汉族",
    education: "本科",
    major: "化学工程",
    graduateTime: "2018-06-01",
    graduateSchool: "某某大学",
    phone: "13800138000",
    idCard: "371401199001011234",
    politicalStatus: "党员",
    address: "山东省德州市德城区",
    workStartTime: "2018-07-01",
    joinCompanyTime: "2018-07-15"
  };
}

// 搜索
function handleSearch() {
  if (!searchForm.value.userId) {
    ElMessage.warning("请选择人员");
    return;
  }
  fetchPersonInfo();
  fetchTeoData();
  fetchCertData();
  // 模拟日常教育数据
  dailyEduData.value = [
    { year: "2024", month: "1", hours: 8, examCount: 2, selfHours: 4 },
    { year: "2024", month: "2", hours: 6, examCount: 1, selfHours: 3 },
    { year: "2024", month: "3", hours: 10, examCount: 2, selfHours: 5 }
  ];
}

// 重置
function handleReset() {
  searchForm.value = {
    deptId: undefined,
    userId: undefined,
    startTime: "",
    endTime: ""
  };
  personInfo.value = {};
  teoTableData.value = [];
  certTableData.value = [];
  dailyEduData.value = [];
}

// 刷新
function handleRefresh() {
  handleSearch();
}

// 打印
function handlePrint() {
  window.print();
}

// 三级教育台账操作
function handleEditTeo(row: TeoItem) {
  ElMessage.info("编辑功能待实现");
}

function handleDeleteTeo(row: TeoItem) {
  ElMessage.info("删除功能待实现");
}

function handleAddTeo() {
  ElMessage.info("添加功能待实现");
}

// 证书管理操作
function handleAddCert() {
  ElMessage.info("添加证书功能待实现");
}

// 分页变化
function handleTeoPageChange(page: number) {
  teoPagination.value.page = page;
  fetchTeoData();
}

function handleCertPageChange(page: number) {
  certPagination.value.page = page;
  fetchCertData();
}

// 部门名称格式化
function formatDeptName(node: DeptNode): string {
  return node.name;
}

onMounted(() => {
  fetchDeptTree();
});
</script>

<template>
  <div class="archives-container">
    <!-- 搜索区域 -->
    <el-card shadow="never" class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="部门">
          <el-cascader
            v-model="searchForm.deptId"
            :options="deptTree"
            :props="{
              value: 'value',
              label: 'name',
              children: 'children',
              checkStrictly: true,
              emitPath: false
            }"
            placeholder="请选择部门"
            clearable
            style="width: 250px"
            @change="onDeptChange"
          />
        </el-form-item>
        <el-form-item label="人员">
          <el-select
            v-model="searchForm.userId"
            placeholder="请选择人员"
            clearable
            style="width: 150px"
          >
            <el-option
              v-for="user in userList"
              :key="user.id"
              :label="user.ushow"
              :value="user.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchForm.startTime"
            type="date"
            placeholder="开始时间"
            value-format="YYYY-MM-DD"
            style="width: 135px"
          />
          <el-date-picker
            v-model="searchForm.endTime"
            type="date"
            placeholder="结束时间"
            value-format="YYYY-MM-DD"
            style="width: 135px; margin-left: 8px"
          />
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
          <el-button @click="handleRefresh">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
          <el-button style="float: right" @click="handlePrint">
            <el-icon><Printer /></el-icon>
            打印
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 个人基础信息 -->
    <el-card shadow="never" class="info-card">
      <template #header>
        <div class="card-header">
          <span>个人基础信息</span>
          <el-button type="primary" size="small" @click="handleEditTeo">
            编辑
          </el-button>
        </div>
      </template>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="姓名">{{
          personInfo.name || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{
          personInfo.sex || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="民族">{{
          personInfo.nation || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="文化程度">{{
          personInfo.education || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="所学专业">{{
          personInfo.major || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="毕业时间">{{
          personInfo.graduateTime || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="毕业学校">{{
          personInfo.graduateSchool || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{
          personInfo.phone || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="身份证号">{{
          personInfo.idCard || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="政治面貌">{{
          personInfo.politicalStatus || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="家庭住址" :span="2">{{
          personInfo.address || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="学历证明">
          <el-button size="small" type="primary" link>查看</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="毕业参加工作时间" :span="2">{{
          personInfo.workStartTime || "-"
        }}</el-descriptions-item>
        <el-descriptions-item label="进入本单位时间">{{
          personInfo.joinCompanyTime || "-"
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 三级教育台账 -->
    <el-card shadow="never" class="table-card">
      <template #header>
        <span>三级教育台账</span>
      </template>
      <el-table
        v-loading="loading"
        :data="teoTableData"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="sysUser.ushow"
          label="姓名"
          width="100"
          align="center"
        >
          <template #default="{ row }">
            {{ row.sysUser?.ushow || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sysUser.sex"
          label="性别"
          width="60"
          align="center"
        >
          <template #default="{ row }">
            {{ row.sysUser?.sex || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="post" label="岗位" width="120" />
        <el-table-column label="公司级" align="center">
          <el-table-column
            prop="gsDate"
            label="培训时间"
            width="110"
            align="center"
          >
            <template #default="{ row }">
              {{
                row.gsDate ? formatDate(new Date(row.gsDate).getTime()) : "-"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="gsScore"
            label="培训成绩"
            width="90"
            align="center"
          />
          <el-table-column
            prop="gsFile1"
            label="详情"
            width="80"
            align="center"
          >
            <template #default="{ row }">
              <el-button v-if="row.gsFile1" type="primary" link size="small"
                >查看</el-button
              >
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="gsFile2"
            label="培训时长（小时）"
            width="130"
            align="center"
          />
        </el-table-column>
        <el-table-column label="车间级" align="center">
          <el-table-column
            prop="cjDate"
            label="培训时间"
            width="110"
            align="center"
          >
            <template #default="{ row }">
              {{
                row.cjDate ? formatDate(new Date(row.cjDate).getTime()) : "-"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="cjScore"
            label="培训成绩"
            width="90"
            align="center"
          />
          <el-table-column
            prop="cjFile1"
            label="详情"
            width="80"
            align="center"
          >
            <template #default="{ row }">
              <el-button v-if="row.cjFile1" type="primary" link size="small"
                >查看</el-button
              >
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="cjFile2"
            label="培训时长（小时）"
            width="130"
            align="center"
          />
        </el-table-column>
        <el-table-column label="班组级" align="center">
          <el-table-column
            prop="bzDate"
            label="培训时间"
            width="110"
            align="center"
          >
            <template #default="{ row }">
              {{
                row.bzDate ? formatDate(new Date(row.bzDate).getTime()) : "-"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="bzScore"
            label="培训成绩"
            width="90"
            align="center"
          />
          <el-table-column
            prop="bzFile1"
            label="详情"
            width="80"
            align="center"
          >
            <template #default="{ row }">
              <el-button v-if="row.bzFile1" type="primary" link size="small"
                >查看</el-button
              >
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bzFile2"
            label="培训时长（小时）"
            width="130"
            align="center"
          />
        </el-table-column>
        <el-table-column label="转岗教育" align="center">
          <el-table-column
            prop="type"
            label="转岗教育类型"
            width="120"
            align="center"
          />
          <el-table-column
            prop="zgjyDate"
            label="培训时间"
            width="110"
            align="center"
          >
            <template #default="{ row }">
              {{
                row.zgjyDate
                  ? formatDate(new Date(row.zgjyDate).getTime())
                  : "-"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="zgjyScore"
            label="培训成绩"
            width="90"
            align="center"
          />
          <el-table-column
            prop="zgjyFile1"
            label="详情"
            width="80"
            align="center"
          >
            <template #default="{ row }">
              <el-button v-if="row.zgjyFile1" type="primary" link size="small"
                >查看</el-button
              >
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="zgjyFile2"
            label="培训时长（小时）"
            width="130"
            align="center"
          />
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="handleEditTeo(row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDeleteTeo(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="teoTotal > 0"
        v-model:current-page="teoPagination.page"
        :page-size="teoPagination.size"
        :total="teoTotal"
        layout="total, prev, pager, next"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handleTeoPageChange"
      />
    </el-card>

    <!-- 三级教育台账(线下) -->
    <el-card shadow="never" class="table-card">
      <template #header>
        <div class="card-header">
          <span>三级教育台账(线下)</span>
          <el-button type="primary" size="small" @click="handleAddTeo">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
        </div>
      </template>
      <el-empty v-if="teoTableData.length === 0" description="暂无数据" />
    </el-card>

    <!-- 日常教育台账 -->
    <el-card shadow="never" class="table-card">
      <template #header>
        <span>日常教育台账</span>
      </template>
      <el-table :data="dailyEduData" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="year" label="年份" width="100" align="center" />
        <el-table-column prop="month" label="月份" width="100" align="center" />
        <el-table-column
          prop="hours"
          label="学时数"
          width="100"
          align="center"
        />
        <el-table-column
          prop="examCount"
          label="考试次数"
          width="100"
          align="center"
        />
        <el-table-column
          prop="selfHours"
          label="自主学习学时"
          width="130"
          align="center"
        />
        <el-table-column label="详情" width="100" align="center">
          <template #default>
            <el-button type="primary" link size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 证书管理 -->
    <el-card shadow="never" class="table-card">
      <template #header>
        <div class="card-header">
          <span>证书管理</span>
          <el-button type="primary" size="small" @click="handleAddCert">
            <el-icon><Plus /></el-icon>
            添加
          </el-button>
        </div>
      </template>
      <el-table
        v-loading="loading"
        :data="certTableData"
        border
        stripe
        :row-class-name="
          ({ row }) =>
            isCertExpiringSoon(row.endTime, row.checkTime) ? 'warning-row' : ''
        "
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          prop="userName"
          label="姓名"
          width="100"
          align="center"
        />
        <el-table-column prop="deptName" label="所属单位" width="130" />
        <el-table-column prop="idCard" label="身份证号" width="170" />
        <el-table-column prop="category" label="特种作业类型" width="180" />
        <el-table-column prop="cardNo" label="证件号" width="170" />
        <el-table-column label="起始时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDateTime(row.beginTime) }}
          </template>
        </el-table-column>
        <el-table-column label="复审时间" width="120" align="center">
          <template #default="{ row }">
            {{ formatDateTime(row.checkTime) }}
          </template>
        </el-table-column>
        <el-table-column label="有效期至" width="120" align="center">
          <template #default="{ row }">
            {{ formatDateTime(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="issuedDept" label="发证单位" width="150" />
        <el-table-column label="附件" width="100" align="center">
          <template #default="{ row }">
            <el-button v-if="row.file1" type="primary" link size="small"
              >查看</el-button
            >
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="certTotal > 0"
        v-model:current-page="certPagination.page"
        :page-size="certPagination.size"
        :total="certTotal"
        layout="total, prev, pager, next"
        style=" justify-content: flex-end;margin-top: 16px"
        @current-change="handleCertPageChange"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.archives-container {
  padding: 16px;

  .search-card {
    margin-bottom: 16px;
  }

  .info-card {
    margin-bottom: 16px;
  }

  .table-card {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

:deep(.warning-row) {
  font-weight: bold;
  color: #f56c6c;
}

@media print {
  .search-card {
    display: none;
  }
}
</style>
