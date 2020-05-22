<template>
  <div class="make-order-root">
    <h3 style="text-align: center">order list</h3>
    <Table
      :columns="columns"
      :data="list"
    ></Table>
    <div class="form">
      <Input
        v-model="form.productId"
        placeholder="Enter product id"
        style="width: auto; margin: 0 10px 0 0"
      />
      <Input
        type="number"
        v-model="form.number"
        placeholder="Enter number"
        style="width: auto"
      />
      <Button
        type="primary"
        @click="add"
      >add</Button>
    </div>
    <Button
      type="primary"
      long
      @click="submit"
    >submit</Button>
  </div>
</template>

<script>
export default {
  name: 'MakeOrder',
  data() {
    return {
      columns: [
        {
          title: 'ProductId',
          key: 'productId'
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
    }
  },
  methods: {
    add() {
      // todo: check exists
      this.list.push({ productId: this.form.productId, number: this.form.number })
    },
    submit() {
      // todo: network
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