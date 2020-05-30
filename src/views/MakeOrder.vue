<template>
  <div class="make-order-root">
    <h3 style="text-align: center">new order</h3>
    <Table :columns="columns" :data="list"></Table>
    <div class="form">
      <Input
        v-model="form.productId"
        placeholder="Enter product id"
        style="width: auto; margin: 0 10px 0 0"
      />
      <Input type="number" v-model="form.number" placeholder="Enter number" style="width: auto" />
      <Button type="primary" @click="add">add</Button>
    </div>
    <Button type="primary" long :loading="submitLoading" @click="submit">submit</Button>
  </div>
</template>

<script>
import { superGet, superPost } from '@/tool/net'

export default {
  name: 'MakeOrder',
  data() {
    return {
      columns: [
        {
          title: 'ProductId',
          key: 'id'
        },
        {
          title: 'Number',
          key: 'number'
        },
      ],
      list: [],
      form: {
        productId: '',
        number: 0
      },
      submitLoading: false,
    }
  },
  methods: {
    add() {
      superGet.bind(this)(`/product/${this.form.productId}`)
        .then((res) => {
          if (res !== undefined) {
            if (res.number < this.form.number) {
              this.$Message.error("no enough product")
            } else {
              this.$Message.success("success")
              this.list.push({ id: this.form.productId, number: this.form.number })
            }
          }
        })
    },
    submit() {
      this.submitLoading = true
      superPost.bind(this)('/product', this.list)
        .then(res => {
          if (res !== undefined) {
            this.$Message.success("success")
          }
          this.submitLoading = false
        })
    }
  }
}
</script>

<style lang="stylus">
.make-order-root
  display: flex
  flex-direction: column
  justify-content: center

  .form
    display: flex
    justify-content: center
    padding: 10px 0
</style>