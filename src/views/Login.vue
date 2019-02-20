<template>
  <div class="mz-login">
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png">
    </div>
    <div class="login-form">
      <div class="form-group">
        <input placeholder="用户名" class="input-control" type="text" v-model="username" />
      </div>
      <div class="form-group">
        <input placeholder="密码" class="input-control" type="password" v-model="password" />
      </div>
      <div class="submit login-btn" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      axios.post('http://localhost:3000/user/login', {
        userName: this.username,
        passWord: this.password
      }).then(response => {
        var res = response.data;
        if (res.code === 0) {
          sessionStorage.setItem('nickname', res.data.nickName);
          // 跳转页面 - 这里是固定的跳转
          // this.$router.push('/card');
          // 跳转到用户具体想去的页面
          this.$router.replace({
            path: this.$route.query.redirect
          });
        } else {
          alert(res.msg);
        }
        console.log(res);
      })
    }
  }
}
</script>

<style lang="less">
.mz-login {
  font-size: 16px;

  .logo {
    margin: 79px auto 40px;
    text-align: center;
    height: 60px;
    line-height: 60px;

    img {
      height: 60px;
    }
  }

  .login-form {

    .form-group {
      line-height: 55px;
      margin: 0 25px;
      position: relative;

      .input-control {
        height: 15px;
        line-height: 15px;
        padding: 20px 0;
        width: 100%;
        font-size: 15px;
        color: #191a1b;
        border: 0;
        outline-width: 0;
      }
    }

    .submit {
      line-height: 45px;
      font-size: 16px;
      margin: 70px 25px 0;
      border-radius: 3px;
      text-align: center;
      background-color: #ff5f16;
      height: 44px;
      color: #fff;
      border: none;
    }
  }
}
</style>
