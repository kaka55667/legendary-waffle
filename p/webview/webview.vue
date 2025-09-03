<template>
  <view v-if="src" class="page">
    <!-- #ifdef H5 -->
    <iframe width="100%" height="100%" :src="src" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <web-view :src="src" />
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: '',
      wbStyles: {
        width: '100%',
        height: '100%',
      },
    }
  },
  onLoad(options) {
    this.src = options.url || ''
  },
}
</script>

<style>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}
</style>
