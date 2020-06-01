<template>
  <div id="nav-root">
    <Menu
      v-if="role == ROLE.DEFAULT"
      mode="horizontal"
      theme="dark"
    >
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="About" to="/about">About</MenuItem>
    </Menu>

    <Menu
      v-if="role == ROLE.WORKER"
      mode="horizontal"
      theme="dark"
    >
      <MenuItem name="Home" to="/">Home</MenuItem>
      <MenuItem name="Query" to="/query">Query</MenuItem>
      <MenuItem name="Order" to="/pick-order">Order</MenuItem>
      <MenuItem name="Count" to="/count">Count</MenuItem>
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