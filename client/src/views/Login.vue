<template>
  <div class="login-view">
    <section class="login-view__popin">
      <div class="login-view__header">
        <div class="picture">
          <img src="@/assets/fox.svg" />
        </div>
      </div>
      <div class="login-view__content">
        <div class="login-view__title">Welcome to PurpleFox app</div>
        <div class="login-view__body">
          <p>For security reason, PurpleFox needs to know who you are</p>
          <p>
            We will use your <strong>JudgeApps</strong> account for identify you throw the app, and also grant you
            access based on information it provides.
          </p>

          <div class="login-view__actions">
            <button class="btn -primary" type="submit" :disabled="isLoading" @click="login">
              Sure, connect me !
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    login() {
      this.isLoading = true
      this.$auth.loginWithJudgeApps()
    },
  },
}
</script>

<style lang="scss">
.login-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  @include responsive('desktop') {
    min-height: 100vh;
  }

  &__popin {
    width: 100%;
    height: 100vh;
    background: white;
    @include responsive('desktop') {
      height: auto;
      width: 400px;
      background: white;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      border-radius: 5px;
    }
  }
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: $primary-color;
    .picture {
      background-color: white;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    @include responsive('desktop') {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
  &__content {
    padding: $spacing-regular;
  }
  &__title {
    font-size: $title-font-size;
    font-weight: bold;
    text-align: center;
    margin-top: $spacing-half;
    margin-bottom: $spacing-regular;
    color: $secondary-color;
  }
  &__body {
    p:not(:first-child) {
      margin-top: $spacing-double;
    }
    strong {
      font-weight: bold;
      color: $secondary-color;
    }
  }
  &__actions {
    display: flex;
    justify-content: center;
    margin-top: $spacing-double;
  }
}
</style>
