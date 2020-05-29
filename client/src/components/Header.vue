<template>
  <header class="pfm-header">
    <div class="pfm-header__main">
      <span v-if="name">Bonjour: {{ name }}</span>
    </div>
    <div class="pfm-header__actions">
      <button class="btn -primary" @click="logout" v-if="isConnected">Logout</button>
      <router-link v-else :to="{ name: 'login' }" class="btn -primary">Login</router-link>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    name() {
      const user = this.$store.state.auth.user
      return user && user.judgeapps.name
    },
    isConnected() {
      return !!this.$store.state.auth.uid
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style lang="scss">
.pfm-header {
  height: $header-height;
  background: $primary-color;
  color: white;
  display: flex;
  &__main {
    flex: 1;
    display: flex;
    align-items: center;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
