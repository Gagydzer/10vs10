<template>
  <div class="item">
  <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'menubarItem',
  props: ['title'],
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
    width: 110px;
    position: relative;
    height: 70px;
    background: gray;
    margin-right: 5px;
    box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), -1px 0px 2px rgba(0, 0, 0, 0.15);
    .title {
      position: absolute;
      bottom:0;
      width: 100%;
      text-align: center;
      padding: 6px;
      box-sizing: border-box;
      background: white;
    }
  }
 }
 
</style>
