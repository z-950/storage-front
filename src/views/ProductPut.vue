<template>
  <div class="put-root">
    <Row :gutter="16" type="flex" justify="center" align="bottom">
      <Col span="6">
        <List header="product id">
          <ListItem>
            <Input v-model="form.productId" placeholder="Enter product id..." />
          </ListItem>
        </List>
      </Col>
      <Col span="4">
        <List header="number">
          <ListItem>
            <Input v-model="form.number" type="number" placeholder="Enter number..." />
          </ListItem>
        </List>
      </Col>
      <Col span="4">
        <List header>
          <ListItem>
            <Button type="primary" long @click="put">put</Button>
          </ListItem>
        </List>
      </Col>
    </Row>
    <Table :columns="columns" :data="result"></Table>
  </div>
</template>

<script>
import { superPost } from '@/tool/net'

export default {
  name: 'ProductPut',
  data() {
    return {
      form: {
        productId: '',
        number: null,
      },
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
    put() {
      superPost.bind(this)(`/product/put`, { id: this.form.productId, number: parseInt(this.form.number) })
        .then((res) => {
          if (res === null) {
            this.$Message.error('failed')
          } else if (res !== undefined) {
            this.result.push(res)
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.put-root
  display: flex
  flex-direction: column
  justify-content: center

  .form
    padding: 10px 10px
</style>