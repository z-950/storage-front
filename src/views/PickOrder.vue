<template>
  <div class="pick-order-root">
    <Table
      border
      :columns="orderColumns"
      :data="orderList"
    >
      <template
        slot-scope="{ row, index }"
        slot="action"
      >
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="checkOrder(index)"
          :disabled="row.isChecked"
        >check</Button>
      </template>
    </Table>
    <Modal
      v-if="current!==-1"
      v-model="show"
      :title="orderList[current].id"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Table
        border
        ref="selection"
        :columns="productColumns"
        :data="orderList[current].list"
        @on-select="checkProduct"
        @on-select-all="checkAllProduct"
      ></Table>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'PickOrder',
  data() {
    return {
      orderColumns: [
        {
          title: 'OrderId',
          key: 'id'
        },
        {
          title: 'IsChecked',
          key: 'isChecked'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      // todo: get data
      orderList: [
        {
          id: "1",
          isChecked: false,
          list: [
            { id: "aaaa", number: 2, isChecked: false },
            { id: "baaa", number: 2, isChecked: false },
            { id: "caaa", number: 2, isChecked: false },
            { id: "daaa", number: 2, isChecked: false },
            { id: "eaaa", number: 2, isChecked: false },
            { id: "faaa", number: 2, isChecked: false },
          ]
        },
      ],
      show: false,
      current: -1,
      productColumns: [
        {
          title: 'ProductId',
          key: 'id'
        },
        {
          title: 'Number',
          key: 'number'
        },
        {
          title: 'IsChecked',
          type: 'selection',
          width: 60,
          align: 'center'
        },
      ],
    }
  },
  computed: {
    enableSubmit() {
      if (this.current === -1) {
        return false
      } else {
        return this.orderList[this.current].list.every((v) => v.isChecked)
      }
    }
  },
  methods: {
    ok() {
      if (this.enableSubmit) {
        // todo: post
        this.$Message.info({ content: 'checked ok', duration: 3 })
      } else {
        this.$Message.warning({ content: 'not finish, checked products are save locally', duration: 3 })
      }
    },
    cancel() {
      this.$Message.warning({ content: 'not finish, checked products are save locally', duration: 3 })
    },
    checkOrder(index) {
      this.show = true
      this.current = index
      this.orderList[this.current].list.forEach((v) => {
        if (v.isChecked) {
          v['_checked'] = true
          v['_disabled'] = true
        }
      })
    },
    // eslint-disable-next-line no-unused-vars
    checkProduct(selection, row) {
      this.orderList[this.current].list.forEach((v) => {
        if (!v.isChecked && v.id === row.id) {
          v.isChecked = true
          v['_checked'] = true
          v['_disabled'] = true
        }
      })
    },
    checkAllProduct() {
      this.orderList[this.current].list.forEach((v) => {
        if (!v.isChecked) {
          v.isChecked = true
          v['_checked'] = true
          v['_disabled'] = true
        }
      })
    },
  },
}
</script>

<style lang="stylus"></style>