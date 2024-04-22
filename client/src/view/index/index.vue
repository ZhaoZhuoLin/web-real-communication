<template>
  <el-card style="min-width: 480px" shadow="always">更新时间：</el-card>
  <div class="flex">
    <el-card style="min-width: 480px" class="card-panel">
      <template #header>
        <div class="card-header">
          <span>一楼大屏:信息展板</span>
          <span></span>
        </div>
      </template>
      <template #footer>请注意关注</template>
    </el-card>

  <el-card style="min-width: 480px" class="card-panel">
    <template #header>
      <div class="card-header">
        <span>一楼大屏:管理员展板</span>
        <span></span>
      </div>
    </template>
    <template #footer>请注意关注</template>
  </el-card>
  </div>
  <div class="flex">
    <el-card style="min-width: 480px" class="card-panel">
      <template #header>
        <div class="card-header">
          <span>一楼大屏:信息展板</span>
          <span></span>
        </div>
      </template>
      <template #footer>请注意关注</template>
    </el-card>

  <el-card style="min-width: 480px" class="card-panel">
    <template #header>
      <div class="card-header">
        <span>一楼大屏:管理员展板</span>
        <span></span>
      </div>
    </template>
    <template #footer>请注意关注</template>
  </el-card>
  </div>
</template>
<script setup name="datav">
import WebSocketManager from "../../utils/WebSocketManager.js";
import { ref, onMounted  } from "vue";
const socketUrl = "ws://127.0.0.1:8080";
const name = "test";

const receiveMessage = (res) => {
  console.log(res);
};
onMounted(() => {
  const socketManager = new WebSocketManager(socketUrl, name, receiveMessage);
  socketManager.start(() => {});
});
</script>
<style>
.flex{
  display: flex;
}
.card-header{
  display: flex;
}
.card-panel{
  margin: 25px;
}
</style>
