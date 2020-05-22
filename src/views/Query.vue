<template>
  <div class="query-root">
    <div class="form">
      <Input
        search
        enter-button="query"
        placeholder="Enter product id"
        @on-search="query"
      />
    </div>
    <Table
      :columns="columns"
      :data="results"
    ></Table>
  </div>
</template>

<script>
export default {
  name: 'Query',
  data() {
    return {
      columns: [
        {
          title: 'ProductId',
          key: 'productId'
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
      results: [],
    }
  },
  methods: {
    query(productId) {
      // todo: query
      this.results.push({
        productId: productId,
        shelfId: 'A',
        regionId: 12,
        number: 10
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