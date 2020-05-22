<template>
  <div class="home-root">
    <div style="font-size: 24px">welcome shop</div>
    <div>state: {{signState}}</div>
    <div
      v-if="role == ROLE.DEFAULT"
      class="form"
    >
      <div class="input">
        <Input
          v-model="form.username"
          prefix="ios-contact"
          placeholder="Enter username"
          style="width: auto; margin: 0 0 10px 0"
        />
        <Input
          type="password"
          v-model="form.passowrd"
          prefix="ios-lock-outline"
          placeholder="Enter password"
          style="width: auto; margin: 0 0 10px 0"
        />
      </div>
      <Button
        type="primary"
        @click="login"
      >login</Button>
    </div>
    <div v-else>you are [{{username}}]</div>
  </div>
</template>

<script>
import { SIGN_STATE, ROLE } from '@/store/const'

export default {
  name: 'Home',
  data() {
    return {
      SIGN_STATE: SIGN_STATE,
      ROLE: ROLE,
      form: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    signState() {
      return this.$store.state.signState
    },
    username() {
      return this.$store.state.username
    },
    role() {
      return this.$store.state.role
    },
  },
  methods: {
    login() {
      // todo: verify input
      this.$store.dispatch('login', this.form.username, this.form.password)
    }
  }
}
</script>

<style lang="stylus">
.home-root
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  .form
    display: flex
    flex-direction: column
    justify-content: center
    align-items: stretch
    padding: 10px 0

    .input
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
</style>
