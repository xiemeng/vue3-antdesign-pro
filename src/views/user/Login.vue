<template>
  <div id="main">
    <!-- 登录 -->
    <a-form
      class="form"
      layout="vertical"
      :model="form"
      ref="ruleForm"
      :rules="rules">
      <h2>Welcome back to Kolify2</h2>
      <a-form-item label="username" name="username">
        <a-input placeholder="Your username" v-model="form.username"></a-input>
      </a-form-item>
      <a-form-item label="Password" name="password">
        <a-input placeholder="Your password" type="password" v-model="form.password"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="large" style="width:100%;" @click="submit" :loading="loading">Log in</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { getUrlValue } from '@/utils/util'
import { login } from '@/api/login'
import { userStore } from '@/stores/user'
export default {
  data() {
    return {
      user: userStore(),
      status: 'login',
      rules: {
        password: [
          { required: true, message: 'Please input password' }
        ],
        password1: [
          { required: true, message: 'Password（At least 8 digits, must contain letters and numbers）', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/ }
        ],
        password2: [
          { required: true, message: 'Password（At least 8 digits, must contain letters and numbers）', pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/ }
        ],
        username: [
          { required: true, message: 'Please input username' }
        ],
      },
      form: {
        username: '',
        password: '',
      },
      passwordForm: {
        password2: '',
        password1: ''
      },
      loading: false,
      passwordLoading: false,
    }
  },
  computed: {
    redirect() {
      return this.$route.query.redirect
    },
    loginId() {
      return getUrlValue(this.redirect, 'loginId')
    }
  },
  created() {
    // this.login()
  },
  methods: {
    submit() {
      console.log(this.$refs)
      this.login()
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
      //     this.login()
      //   } else {
      //     return false;
      //   }
      // });
    },
    login() {
      const params = {
        password: this.form.password,
        username: this.form.username,
      }
      this.loading = true
      login(params)
        .then(res => this.loginSuccess(res))
        .catch((error) => {
          this.$message.error(error || 'Network error')
          console.log(error)
        }).finally(() => {
          this.loading = false
        })
    },
    loginSuccess() {
      console.log(this.user)

      localStorage.setItem('ACCESS_TOKEN', 'hah')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: #fff;
  .form {
    display: block;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }
  h2 {
    padding: 0px;
    margin: 0px 0px 24px;
    font-size: 32px;
    font-weight: bold;
    color: rgb(36, 55, 78);
    line-height: normal;
  }
}
</style>
