<template>
  <div id="app">
    <Notifications />
    <button class="btn -primary" @click="logout" v-if="isConnected">Logout</button>
    <router-link v-else :to="{ name: 'login' }" class="btn -primary">Login</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isConnected() {
      return !!this.$store.state.auth.user
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss"></style>
