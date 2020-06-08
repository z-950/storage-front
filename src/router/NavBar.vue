<template>
  <div id="nav-root">
    <Menu v-if="role == ROLE.CUSTOMER" mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="Order" to="/create-order">Order</MenuItem>
    </Menu>

    <Menu v-else-if="role == ROLE.WORKER" mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="Query" to="/query">Query</MenuItem>
      <MenuItem name="Query" to="/product-put">Put Product</MenuItem>
      <MenuItem name="Order" to="/check-order">Order</MenuItem>
      <MenuItem name="Count" to="/count">Count</MenuItem>
    </Menu>

    <Menu v-else mode="horizontal" theme="dark">
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="About" to="/about">About</MenuItem>
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
}
</script>