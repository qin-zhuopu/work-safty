<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";

defineOptions({
  name: "SftWorkDocMonitor"
});

interface MonitorDevice {
  num: string;
  name: string;
  online: boolean;
}

interface VideoServer {
  clientIp: string;
  clientIp2: string;
  clientIp3: string;
  clientOtherPort: string;
  clientPort: number;
  deviceIp: string;
  deviceIp2: string;
  devicePort: number;
  lanip: string;
  svrid: number;
}

interface ApiResponse {
  IsHttps: number;
  cmsserver: number;
  result: number;
  server: VideoServer;
  monitors?: MonitorDevice[];
}

// 屏幕布局模式：4=2x2, 9=3x3
const screenMode = ref(4);
const currentDevice = ref<MonitorDevice | null>(null);
const deviceList = ref<MonitorDevice[]>([]);
const videoServer = ref<VideoServer | null>(null);
const loading = ref(false);

// 模拟视频播放器状态
const playerStates = ref<number[]>([]);

// 初始化播放器状态
function initPlayerStates() {
  playerStates.value = Array.from({ length: screenMode.value }, () => 0);
}

// 切换屏幕模式
function switchScreenMode(mode: 4 | 9) {
  screenMode.value = mode;
  initPlayerStates();
  ElMessage.success(`已切换至${mode === 4 ? "2x2" : "3x3"}屏模式`);
}

// 选择设备
function selectDevice(device: MonitorDevice) {
  currentDevice.value = device;
  // 模拟切换视频
  if (playerStates.value.length > 0) {
    playerStates.value[0] = 1; // 标记第一个窗口正在播放
  }
  ElMessage.info(`已切换至: ${device.name}`);
}

// 获取数据
async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch("/sft/work/doc/monitor.json");
    const data: ApiResponse = await response.json();
    if (data.result === 0) {
      videoServer.value = data.server;
      // 模拟设备列表数据
      deviceList.value = [
        { num: "23116701244", name: "实华监控设备18（在线）", online: true },
        { num: "23116701245", name: "实华监控设备19（在线）", online: true },
        { num: "23116701246", name: "实华监控设备20（离线）", online: false },
        { num: "23116701247", name: "实华监控设备21（在线）", online: true }
      ];
      // 默认选择第一个在线设备
      const firstOnline = deviceList.value.find(d => d.online);
      if (firstOnline) {
        currentDevice.value = firstOnline;
        playerStates.value[0] = 1;
      }
    } else {
      ElMessage.error("获取监控数据失败");
    }
  } catch (error) {
    ElMessage.error("网络请求失败");
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  initPlayerStates();
  fetchData();
});

onBeforeUnmount(() => {
  // 清理播放器资源
  playerStates.value = [];
});
</script>

<template>
  <div class="monitor-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="text-lg font-medium">特殊作业移动监测监控</span>
          <div class="header-actions">
            <el-button
              :type="screenMode === 4 ? 'primary' : ''"
              size="small"
              @click="switchScreenMode(4)"
            >
              2x2屏
            </el-button>
            <el-button
              :type="screenMode === 9 ? 'primary' : ''"
              size="small"
              @click="switchScreenMode(9)"
            >
              3x3屏
            </el-button>
          </div>
        </div>
      </template>

      <div class="monitor-content" :class="`mode-${screenMode}`">
        <!-- 设备列表 -->
        <div class="device-list">
          <div class="list-header">监控设备</div>
          <div class="list-items">
            <div
              v-for="device in deviceList"
              :key="device.num"
              class="device-item"
              :class="{
                active: currentDevice?.num === device.num,
                offline: !device.online
              }"
              @click="device.online && selectDevice(device)"
            >
              <span class="device-name">{{ device.name }}</span>
              <span
                class="device-status"
                :class="device.online ? 'online' : 'offline'"
              >
                {{ device.online ? "在线" : "离线" }}
              </span>
            </div>
          </div>
        </div>

        <!-- 视频播放区域 -->
        <div class="video-area">
          <div class="video-grid" :class="`grid-${screenMode}`">
            <div
              v-for="(state, index) in playerStates"
              :key="index"
              class="video-cell"
              :class="{ playing: state === 1 }"
            >
              <div v-if="state === 1" class="video-player">
                <div class="player-placeholder">
                  <el-icon class="player-icon" :size="48">
                    <VideoCamera />
                  </el-icon>
                  <p class="player-text">
                    {{ currentDevice?.name || "未选择设备" }}
                  </p>
                  <p class="player-info">
                    设备号: {{ currentDevice?.num || "--" }}
                  </p>
                </div>
                <div class="player-info-bar">
                  <span
                    >{{ currentDevice?.name || "通道" }}{{ index + 1 }}</span
                  >
                  <span class="live-badge">直播</span>
                </div>
              </div>
              <div v-else class="video-placeholder">
                <el-icon class="placeholder-icon" :size="32">
                  <VideoCamera />
                </el-icon>
                <p>通道{{ index + 1 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务器信息 -->
      <div v-if="videoServer" class="server-info">
        <el-descriptions :column="4" size="small" border>
          <el-descriptions-item label="服务器IP">{{
            videoServer.deviceIp
          }}</el-descriptions-item>
          <el-descriptions-item label="服务端口">{{
            videoServer.devicePort
          }}</el-descriptions-item>
          <el-descriptions-item label="客户端IP">{{
            videoServer.clientIp
          }}</el-descriptions-item>
          <el-descriptions-item label="客户端端口">{{
            videoServer.clientPort
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { VideoCamera } from "@element-plus/icons-vue";
export default {
  components: { VideoCamera }
};
</script>

<style scoped lang="scss">
.monitor-container {
  padding: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.monitor-content {
  display: flex;
  gap: 16px;
  min-height: 500px;

  &.mode-4 {
    min-height: 500px;
  }

  &.mode-9 {
    min-height: 650px;
  }
}

// 设备列表
.device-list {
  flex-shrink: 0;
  width: 220px;
  overflow: hidden;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;

  .list-header {
    padding: 12px;
    font-weight: 500;
    text-align: center;
    background: var(--el-fill-color-light);
    border-bottom: 1px solid var(--el-border-color);
  }

  .list-items {
    max-height: 500px;
    overflow-y: auto;
  }

  .device-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid var(--el-border-color-light);
    transition: background 0.2s;

    &:hover:not(.offline) {
      background: var(--el-fill-color-light);
    }

    &.active {
      background: var(--el-color-primary-light-9);
      border-left: 3px solid var(--el-color-primary);
    }

    &.offline {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .device-name {
      flex: 1;
      font-size: 14px;
    }

    .device-status {
      padding: 2px 6px;
      font-size: 12px;
      border-radius: 4px;

      &.online {
        color: var(--el-color-success);
        background: var(--el-color-success-light-9);
      }

      &.offline {
        color: var(--el-color-info);
        background: var(--el-color-info-light-9);
      }
    }
  }
}

// 视频区域
.video-area {
  flex: 1;
  overflow: hidden;
  background: #000;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.video-grid {
  display: grid;
  gap: 2px;
  height: 100%;

  &.grid-4 {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    min-height: 480px;
  }

  &.grid-9 {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    min-height: 630px;
  }
}

.video-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;

  &.playing {
    background: #000;
  }
}

.video-placeholder {
  color: #666;
  text-align: center;

  .placeholder-icon {
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
}

.video-player {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .player-placeholder {
    color: #fff;
    text-align: center;

    .player-icon {
      margin-bottom: 16px;
      color: var(--el-color-primary);
    }

    .player-text {
      margin: 8px 0;
      font-size: 16px;
    }

    .player-info {
      margin: 0;
      font-size: 12px;
      color: #999;
    }
  }

  .player-info-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    font-size: 12px;
    color: #fff;
    background: linear-gradient(to bottom, rgb(0 0 0 / 70%), transparent);

    .live-badge {
      padding: 2px 8px;
      font-weight: 500;
      background: var(--el-color-danger);
      border-radius: 4px;
    }
  }
}

.server-info {
  margin-top: 16px;
}
</style>
