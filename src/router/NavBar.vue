<template>
  <div id="nav-root">
    <Menu v-if="role == ROLE.CUSTOMER" mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="Order" to="/create-order">Order</MenuItem>
    </Menu>

    <Menu v-else-if="role == ROLE.WORKER" mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="Query" to="/query">Query</MenuItem>
      <MenuItem name="put" to="/product-put">Put Product</MenuItem>
      <MenuItem name="Order" to="/check-order">Check Order</MenuItem>
      <MenuItem name="Count" to="/count">Count</MenuItem>
      <MenuItem name="check-return" to="/check-return">Check Return</MenuItem>
    </Menu>

    <Menu v-else-if="role == ROLE.MANAGER" mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="create-count" to="/create-count">Create Order</MenuItem>
      <MenuItem name="query-count" to="/query-count">Query Order</MenuItem>
    </Menu>

    <Menu v-else mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="About" to="/about">About</MenuItem>
    </Menu>

    <Menu v-if="role != ROLE.DEFAULT" mode="horizontal" theme="dark" @on-select="logout">
      <MenuItem name="logout">Logout</MenuItem>
    </Menu>
  </div>
</template>

<script>
import { ROLE } from '@/store/const'

export default {
  name: "NavBar",
  data() {
    return {
      ROLE: ROLE
    }
  },
  computed: {
    role() {
      return this.$store.state.role
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout', () => {
        if (this.$router.currentRoute.path !== '/') {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="stylus">
#nav-root
  display: flex
  justify-content: space-between
</style>