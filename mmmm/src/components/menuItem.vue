<template>
  <div class="item">
  <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'menubarItem',
  props: ['title', 'bgUrl', 'url'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
 .menubar {
  .item {
    display: inline-block;
    width: 157px;
    position: relative;
    height: 100px;
    background: gray;
    margin-right: 9px;
    box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), -1px 0px 2px rgba(0, 0, 0, 0.15);
    .title {
      position: absolute;
      bottom:0;
      width: 100%;
      font-size: 16px;
      text-align: center;
      padding: 6px;
      box-sizing: border-box;
      background: white;
    }
  }
 }
 
</style>
