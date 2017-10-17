<template>
  <div>
    <Headerline :user="user"/>
    <Menubar :items="menuItems"/>
    <sideMenuButton :items="menuItems" :user="user" @show-hamburger="isShowHamburger = !isShowHamburger"/>
  </div>
</template>



<script>
import Menubar from './components/menubar.vue'
import Headerline from './components/header.vue'
import sideMenuButton from './components/sideMenuButton.vue'

var appData = {menuItems: []}
appData.user = {
  name: 'User Name',
  url: '#',
  userPic: '#'
}
appData.menuItems = [
  {
    id: 1,
    title: 'Заголовок',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Знаменитости',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Технологии',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Стиль жизни',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Путешествия',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Кино',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Еда',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Путешествия',
    url: '#',
    bgUrl: ''
  },
  {
    id: 1,
    title: 'Кино',
    url: '#',
    bgUrl: ''
  }
  ]

export default {
  name: 'App',
  data() {
      return {
        menuItems: appData.menuItems, 
        user: appData.user
      }
      
  },
  components: { Menubar, Headerline, sideMenuButton }
}

</script>

<style lang="scss">
@import "./css/reset.scss";
$pRed: #db4437;
$pGrey: darkgrey;
$sGrey: darkgrey;
body {
  width: 100%;
  font-family: Roboto;
  font-size: 12px;
}

</style>
