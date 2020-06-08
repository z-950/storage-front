<template>
  <div class="check-order-root">
    <Table border :columns="taskColumns" :data="orderList">
      <template slot-scope="{ index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="checkTask(index)"
          :disabled="taskIsChecked(index)"
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
        :columns="orderColumns"
        :data="raw[current]"
        @on-select="checkOrder"
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
      taskColumns: [
        {
          title: 'OrderId',
          key: 'id'
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
      raw: [],
      orderColumns: [
        {
          title: 'ProductId',
          key: 'product'
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
    taskIsChecked(index) {
      return this.raw[index].every((it) => it.isChecked)
    },
    prepareOrder() {
      superGet.bind(this)('/order/not-checked')
        .then(res => {
          if (res !== undefined) {
            console.log(res)
            this.raw = res
            this.orderList = []
            res.forEach((list) => {
              this.orderList.push({
                id: list[0].id,
                isChecked: list.every((it) => it.isChecked)
              })
            })
          }
        })
    },
    ok() {
      if (!this.taskIsChecked(this.current)) {
        this.$Message.warning({ content: 'not finish, checked products are saved', duration: 3 })
      }
    },
    cancel() {
      this.$Message.warning({ content: 'not finish, checked products are saved', duration: 3 })
    },
    checkTask(index) {
      this.show = true
      this.current = index
      this.raw[this.current].forEach((v) => {
        if (v.isChecked) {
          v['_checked'] = true
          v['_disabled'] = true
        }
      })
    },
    // eslint-disable-next-line no-unused-vars
    checkOrder(selection, row) {
      this.raw[this.current].forEach((v) => {
        if (!v.isChecked && v.uid === row.uid) {
          this.doCheckOrder(v.uid).then(() => {
            v.isChecked = true
            v['_checked'] = true
            v['_disabled'] = true
          })
        }
      })
    },
    checkAllProduct() {
      function syncCheckOrder(index) {
        if (this.raw[this.current].length > index) {
          this.doCheckOrder(this.raw[this.current][index].uid).then(() => {
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