<template>
    <div>
        index
      <el-button @click="login">Login</el-button>
      <el-button @click="getInfo">GetInfo</el-button>
    </div>
</template>

<script>
import { UserAPI } from '@/api'

export default {
  name: 'Index',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      }
    }
  },
  created() {
    UserAPI.logout().then(resp => {
      console.log(resp)
    })
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        console.log('login successful')
      })
    },
    getInfo() {
      this.$store.dispatch('user/getInfo').then((data) => {
        console.log(data)
        console.log('getInfo successful')
      })
    }
  }
}
</script>

<style scoped>

</style>
