<template>
<header>
  <div class="header-left">
    <slot name="headLeft"></slot>
  </div>
  <div class="header-title">
    <h1>{{title}}</h1>
  </div>
  <div class="header-right">
    <slot name="headRight"></slot>
  </div>
</header>

</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['title']
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/base.scss";

  $left-width: 5rem;
  $right-width: 5rem;

  header {
    height: 5rem;
    line-height: 5rem;
    position: relative;

    h1 {
      font-size: $font-size-h1;
    }

    .header-left {
      position: absolute;
      left: 0;
      height: 5rem;
      width: $left-width;
    }

    .header-title {
      margin-left: $left-width;
      margin-right: $right-width;
    }

    .header-right {
      position: absolute;
      right: 0;
      height: 5rem;
      width: $right-width;
    }

  }

</style>
