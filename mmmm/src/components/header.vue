<template>
  <div class="header">
  </div>
  
</template>

<script>


export default {
  name: 'Headerline',
  components: {
  },
  data: function () {
    return { 
    }
      
  },
  computed: {
  }
}
</script>

<style lang="scss">
$pRed: #db4437;
$pGrey: darkgrey;
$sGrey: darkgrey;
.header {
    width: 100%;
    height: 30px;
    background: $pGrey;
    box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), -1px 0px 2px rgba(0, 0, 0, 0.15);
    margin-bottom: 6px;
}

</style>