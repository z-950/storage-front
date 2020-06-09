<template>
  <div class="count-query-root">
    <Button type="primary" long @click="query">query</Button>
    <Table :columns="columns" :data="result"></Table>
  </div>
</template>

<script>
import { superGet } from '@/tool/net'

export default {
  name: 'CountQuery',
  data() {
    return {
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: 'ShelfId',
          key: 'shelfId'
        },
        {
          title: 'Worker',
          key: 'worker'
        },
        {
          title: 'Finished',
          key: 'finished'
        },
      ],
      result: [],
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      superGet.bind(this)(`/count/all`)
        .then((res) => {
          if (res === null) {
            this.$Message.info('not found')
          } else if (res !== undefined) {
            this.result = res
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.query-root
  display: flex
  flex-direction: column
  justify-content: center

  .form
    padding: 10px 10px
</style>