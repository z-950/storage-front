<template>
  <div class="query-root">
    <div class="form">
      <Input search enter-button="query" placeholder="Enter product id" @on-search="query" />
    </div>
    <Table :columns="columns" :data="result"></Table>
  </div>
</template>

<script>
import { superGet } from '@/tool/net'

export default {
  name: 'Query',
  data() {
    return {
      columns: [
        {
          title: 'ProductId',
          key: 'id'
        },
        {
          title: 'ShelfId',
          key: 'shelfId'
        },
        {
          title: 'RegionId',
          key: 'regionId'
        },
        {
          title: 'Number',
          key: 'number'
        },
      ],
      result: [],
    }
  },
  methods: {
    query(productId) {
      superGet.bind(this)(`/product/${productId}`)
        .then((res) => {
          if (res === null) {
            this.$Message.info('not found')
          } else if (res !== undefined) {
            this.result.push(res)
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