<template>
  <div>
    SOSAT
    <Menubar/>
  </div>
</template>



<script>
import Menubar from './components/menubar.vue'

export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { Menubar }
}

</script>

<style lang="scss">
@import "./css/reset.scss";

body {
  width: 700px;
  font-family: Roboto;
  font-size: 12px;
}
</style>
