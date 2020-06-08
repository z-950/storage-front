<template>
  <div class="order-create-root">
    <MyUpload accept=".csv, .xml" :onSelect="handler">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>click here to select order file to create order</p>
      </div>
    </MyUpload>
  </div>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { superPost } from '@/tool/net'
import Papa from 'papaparse'

export default {
  name: 'OrderCreate',
  components: {
    MyUpload,
  },
  data() {
    return {}
  },
  methods: {
    handler(file) {
      let suffix = file.name.split(".").pop()
      if (suffix === 'csv') {
        this.parseCsv(file)
      } else {
        this.parseXml(file)
      }
    },
    createOrder(data) {
      if (data.length === 0) return

      const that = this

      // 并发控制
      function syncCreate(index) {
        if (data.length > index)
          return superPost('/order/create', data[index])
            .then(res => {
              if (res === null) {
                that.$Message.error('not found')
              } else if (res !== undefined) {
                that.$Message.success(`successm, order id:${data[index].id}`)
              }
            }).then(() => syncCreate(index + 1))
      }

      syncCreate(0)
    },
    parseCsv(file) {
      const that = this
      // csv
      Papa.parse(file, {
        encoding: 'GBK',
        complete: function (results) {
          const res = results.data.slice(1, -1) // 删除第一行表头和最后一行空行
          let lastId = ''
          let data = {}
          for (let tuple of res) {
            if (tuple[0] === '') {
              tuple[0] = lastId
            } else {
              lastId = tuple[0]
            }

            if (data[tuple[0]] === undefined) {
              data[tuple[0]] = []
            }
            data[tuple[0]].push({ [tuple[1]]: parseInt(tuple[2]) })
          }

          let reqData = []
          for (let [k, v] of Object.entries(data)) {
            reqData.push({
              id: k,
              list: v
            })
          }

          that.createOrder(reqData)
        }
      })
    },
    parseXml(file) {
      const that = this
      // xml
      var reader = new FileReader()
      reader.onload = function () {
        const doc = new DOMParser().parseFromString(reader.result, "application/xml")
        const orderList = doc.getElementsByTagName("list")[0].children

        const reqData = []

        orderList.forEach(element => {
          const id = element.children[0].textContent
          const productList = []

          for (let i = 1; i < element.children.length; i++) {
            const product = element.children[i]
            productList.push({ [product.children[0].textContent]: parseInt(product.children[1].textContent) })
          }

          reqData.push({
            id: id,
            list: productList
          })
        })

        that.createOrder(reqData)
      }
      reader.readAsText(file)
    },
  }
}
</script>

<style lang="stylus">
.order-create-root
  display: flex
  flex-direction: column
  justify-content: center

  .form
    display: flex
    justify-content: center
    padding: 10px 0
</style>