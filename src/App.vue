<template>
  <div
    id="app"
    class="layout"
  >
    <Layout>
      <Header>
        <nav-bar />
      </Header>
      <Content style="padding: 20px 50px, flex-grow: 1">
        <Card>
          <router-view />
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
import NavBar from '@/router/NavBar'

export default {
  name: "App",
  components: {
    NavBar
  }
}
</script>

<style lang="stylus">
body
  margin: 0
  font-size: 16px

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

  .layout
    background: #f5f7f9
</style>
