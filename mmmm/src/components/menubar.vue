<template>
  <div class="menubar_wrapper">
    <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
    <div class="menubar scroll-me" :style="{'min-width': width + 'px'}">
      <menubar-item v-for="(item, index) in items" :title="item.title" :bg="item.bgUrl" :url="item.url" key="index"/>
    </div>
    </vue-scrollbar>
  </div>
  
</template>

<script>
import menubarItem from './menuItem.vue'
import VueScrollbar from 'vue2-scrollbar'


export default {
  name: 'Menubar',
  components: {
    menubarItem, VueScrollbar
  },
  props: ['items'],
  computed: {
    width() {
      return this.items.length * 166
    }
  }
}
</script>

<style lang="scss">

.menubar_wrapper {
}
.menubar {
  
}
.vue-scrollbar__scrollbar-horizontal  {
    display: none
  }
</style>
