<template>
  <div class="check-order-root">
    <Table border :columns="orderColumns" :data="orderList">
      <template slot-scope="{ row, index }" slot="action">
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
      :title="orderList[current].id.toString()"
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
import { superGet, superPatch } from '@/tool/net'

export default {
  name: 'CheckOrder',
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
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      orderList: [],
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
  created() {
    this.prepareOrder()
  },
  methods: {
    prepareOrder() {
      superGet.bind(this)('/order/not-checked')
        .then(res => {
          if (res !== undefined) {
            this.$Message.success("success")
            res.forEach((v) => {
              v.list = v.productList.map((pid, i) => {
                return { id: pid, number: v.numberList[i], isChecked: false }
              })
            })
            this.orderList = res
          }
        })
    },
    ok() {
      if (this.enableSubmit) {
        superPatch.bind(this)(`/order/${this.orderList[this.current].id}`)
          .then(res => {
            if (res !== undefined) {
              this.$Message.success({ content: 'order checked', duration: 3 })
              this.orderList[this.current].isChecked = true
            }
          })
      } else {
        this.discheckAllProduct()
        this.$Message.warning({ content: 'not finish, checked products are not save', duration: 3 })
      }
    },
    cancel() {
      this.discheckAllProduct()
      this.$Message.warning({ content: 'not finish, checked products are not save', duration: 3 })
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
    discheckAllProduct() {
      this.orderList[this.current].list.forEach((v) => {
        v.isChecked = false
        v['_checked'] = false
        v['_disabled'] = false
      })
    }
  },
}
</script>

<style lang="stylus"></style>