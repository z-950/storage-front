<template>
  <div class="check-return-root">
    <Table
      border
      ref="selection"
      :columns="returnColumns"
      :data="raw"
      @on-select="checkReturn"
      @on-select-all="checkAllReturn"
    ></Table>
  </div>
</template>

<script>
import { superGet, superPatch } from '@/tool/net'

export default {
  name: 'CheckReturn',
  data() {
    return {
      raw: [],
      returnColumns: [
        {
          title: 'Order Id',
          key: 'orderId'
        },
        {
          title: 'Product Id',
          key: 'productId'
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
  created() {
    this.prepareOrder()
  },
  methods: {
    prepareOrder() {
      superGet.bind(this)('/return/not-checked')
        .then(res => {
          if (res !== undefined) {
            this.raw = res
          }
        })
    },
    // eslint-disable-next-line no-unused-vars
    checkReturn(selection, row) {
      this.raw.forEach((v) => {
        if (!v.isChecked && v.uid === row.uid) {
          this.doCheckOrder(v.uid).then(() => {
            v.isChecked = true
            v['_checked'] = true
            v['_disabled'] = true
          })
        }
      })
    },
    checkAllReturn() {
      const that = this

      function syncCheckOrder(index) {
        if (that.raw.length > index) {
          const v = that.raw[index]
          that.doCheckOrder(v.uid).then(() => {
            v.isChecked = true
            v['_checked'] = true
            v['_disabled'] = true
            syncCheckOrder(index + 1)
          })
        }
      }

      syncCheckOrder(0)
    },
    doCheckOrder(uid) {
      return superPatch.bind(this)(`/order/${uid}`)
        .then(res => {
          if (res !== undefined) {
            this.$Message.success({ content: 'order checked', duration: 3 })
          }
        })
    }
  },
}
</script>

<style lang="stylus"></style>