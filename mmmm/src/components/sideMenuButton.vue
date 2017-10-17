<template>
<div>
  <div class="menu-button" :class="{'fixed': menuFixed}" :style="{'border-radius': menuBorderRadius + '%', 'width':menuHeight + 'px', 'height': menuHeight + 'px', 'top': menuTop + 'px'}">
  </div>
  <div class="sticky-bar" :class="{'fixed': stickyFixed}" :style="{'opacity': stickyOpacity}">
    <span class="title">10vs10 /</span><span class="subtitle">main page</span>
  </div>
</div>
</template>

<script>

window.onscroll = function() {
  let scrolled = window.pageYOffset || document.documentElement.scrollTop;
  
  return scrolled
}

export default {
  name: 'sideMenu',
  components: {
  },
  prop: ['items'],
  data: function () {
    return {
      scroll: false
    }
  },
  computed: {
    buttonPhase() {
      let scroll = this.scroll
      if (this.scroll < 50) return 0
      if (this.scroll > 50 && this.scroll < 100) return Math.round(100*(0.02 * scroll - 1))
      else return 100
    },
    menuBorderRadius() {
      if (this.scroll < 50) return 50
      if (this.scroll > 50 && this.scroll < 100) return -0.8 * this.scroll + 90
      else return 10
    },
    menuTop() {
      if (this.scroll < 50) return 110
      if (this.scroll > 50 && this.scroll < 100) return 0.35 * this.scroll + 110
      else return 145
    },
    menuHeight() {
      return -0.25 * this.buttonPhase + 55
    },
    menuFixed() {
      if (this.scroll < 135) return false
      else return true
    },
    stickyFixed() {
      if (this.scroll < 138) return false
      else return true
    },
    stickyOpacity() {
      if (this.scroll <= 91) return 0
      if (this.scroll > 91 && this.scroll < 138) return 0.021 * this.scroll  - 1.9
      else return 1
    }

  },
  methods: {
      handleScroll(){
        let scrl = window.pageYOffset || document.documentElement.scrollTop
        console.log(scrl + 'px')
        this.scroll = scrl
      }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
$pRed: #db4437;
$pGrey: #444444;
$sGrey: darkgrey;

.menu-button {
  
    width: 55px;
    height: 55px;
    border-radius: 50%;
    position: absolute;
    top: 110px;
    right: 10px;
    cursor: pointer;
    box-shadow: 0px 2px 5px #666;
    z-index: 101;
    background: {
      color: $pRed;
      image: url(menu.svg);
      size: 65%;
      position: center;
      repeat: no-repeat
    }
}
.menu-button.fixed {
  position: fixed;
  top: 7px !important;
  
}
.sticky-bar {
  box-sizing: border-box;
  height: 45px;
  width: 100%;
  opacity: 0;
  background: $pGrey;
  transition: all .1 linear;
  z-index: 100;
  padding: 4px;
  line-height: 38px;
  .title {
    color: white;
    font-size: 32px;
    text-align: bottom
  }
  .subtitle {
    color: white;
    font-size: 18px;
    text-align: bottom
  }
}
.sticky-bar.fixed {
  position: fixed; 
  top: 0px !important;
}
</style>