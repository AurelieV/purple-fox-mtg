<template>
  <p>Loading...</p>
</template>

<script>
export default {
  watch: {
    '$route.query.code': {
      immediate: true,
      async handler(code) {
        try {
          await this.$auth.processJudgeAppsToken(code)
          this.$notifier.success('Authentification successfull')
          this.$router.push({ name: 'home' })
        } catch (err) {
          this.$notifier.error('Authentification failed')
          this.$router.push({ name: 'login' })
        }
      },
    },
  },
}
</script>
