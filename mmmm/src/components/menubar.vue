<template>
  <div class="menubar_wrapper">
    <vue-scrollbar classes="my-scrollbar" ref="Scrollbar">
    <div class="menubar scroll-me" :style="{'min-width': width + 'px'}">
      <menubar-item v-for="(item, index) in items" :title="item" key="index"/>
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
  data: function () {
    return { 
      items: ['Заголовок', 'Знаменитости', 'Технологии', 'Стиль жизни', 'Путешествия', 'Кино', 'Еда', 'Путешествия', 'Кино', 'Еда', 'Путешествия', 'Кино', 'Еда',]
    }
  },
  computed: {
    width() {
      return this.items.length * 115
    }
  }
}
</script>

<style lang="scss">

.menubar_wrapper {
}
.menubar {
}

</style>
