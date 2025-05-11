<script setup lang="ts">
import ICO from '@/assets/image/naive.svg'
import UserLogin from '@/views/Login/components/UserLogin.vue'
import UserRegister from '@/views/Login/components/UserRegister.vue'
</script>

<template>
  <div class="login">
    <n-card :bordered="false">
      <div class="title">
        <n-image
          width="40"
          :src="ICO"
          preview-disabled
        />
        <n-gradient-text :size="26" type="success">
          Liu Ning Login
        </n-gradient-text>
      </div>
      <div class="introduce">Liu Ning Login 是目前开发的最牛逼的 web 登录界面</div>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        justify-content="space-evenly"
      >
        <n-tab-pane name="signin" tab="账号登录">
          <UserLogin />
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册账号">
          <UserRegister />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.login {
  padding-top: 80px;
  width: 100%;
  height: 100%;

  .n-card {
    margin: 0 auto;
    width: 400px;

    .title {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;

      .n-image {
        margin-right: 8px;
      }
    }

    .introduce {
      margin-bottom: 30px;
      text-align: center;
      color: #bcbcbc;
      font-size: 13px;
    }
  }
}
</style>
