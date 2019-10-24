<template>
  <div class="wrapper">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      label-position="left"
      class="form"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          placeholder="请输入用户名"
          v-model="form.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
         clearable
         @keyup.enter.native="login"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        没有账号，
        <router-link to="register">立即注册</router-link>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { max: 20, message: "用户名不能超过20个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              min: 6,
              max: 20,
              message: "密码长度在 6 到 20 个字符",
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods: {
      login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$http
            .post("/sessions", this.form)
            .then(res => {
              console.log('res', res)
              const token = res.data.data.token
              localStorage.setItem("token", token)
              this.$http.defaults.headers.common["Authorization"] = token
              this.$router.push("/")
            })

        }
      })
    }
    }
  }
</script>

<style lang="less" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    margin-top: 80px;
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 5px;
    }
  }
</style>
