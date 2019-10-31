<template>
  <div class="hello">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>{{ msg }}</h2>
    <router-link :to="{'name':'index'}">
      <el-button type="success" round>Start Now</el-button>
    </router-link>
    <div class="bottom">
      @copyright: <span>一顿六鸡翅</span> github：<a href="https://github.com/liuyuanju7/simple-vue-element">simple-vue-element</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return{
      msg: 'Welcome to simple admin base of vue-element'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello{
      text-align: center;
      margin-top: 60px;
      h3 {
        margin: 40px 0 0;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline-block;
        margin: 0 10px;
      }
      a {
        color: #42b983;
      }
      .bottom{
        color: #42b983;
        position: fixed;
        bottom: 10px;
        width: 100%;
        text-align: center;
        span{
          font-size: smaller;
        }
      }
  }


</style>
