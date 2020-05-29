<template>
  <div id="app">
    <Header />
    <Notifications />
    <button :style="{ margin: '4rem' }" class="pfm-btn -primary">Primary action</button>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header,
  },
  computed: {
    currentBreakpoint() {
      return this.$responsive.currentBreakpoint
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  padding-top: $header-height;
}
.pfm-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
