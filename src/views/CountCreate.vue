<template>
  <div class="count-create-root">
    <Row :gutter="16" type="flex" justify="center" align="middle">
      <Col span="6">
        <Select v-model="shelfId" style="width:200px" placeholder="select shelf">
          <Option v-for="id in shelfIdList" :value="id" :key="id">{{ id }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select v-model="worker" style="width:200px" placeholder="select worker">
          <Option v-for="id in workerList" :value="id" :key="id">{{ id }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Button type="primary" long @click="createCount">create</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import { superGet, superPost } from '@/tool/net'

export default {
  name: "CountCreate",
  data() {
    return {
      shelfId: '',
      shelfIdList: [],
      worker: '',
      workerList: [],
    }
  },
  created() {
    this.prepareShelf()
    this.prepareWorkerHack()
  },
  methods: {
    prepareShelf() {
      this.shelfId = ''
      this.shelfLoading = true
      superGet.bind(this)('/shelf/list')
        .then(res => {
          if (res !== undefined) {
            this.shelfIdList = res
            this.shelfLoading = false
          }
        })
    },
    prepareWorkerHack() {
      this.workerList = [
        "worker1",
        "worker2",
        "worker3",
        "worker4",
      ]
    },
    createCount() {
      superPost.bind(this)("/count/", { shelfId: this.shelfId, worker: this.worker }).then((res) => {
        if (res !== undefined) {
          this.$Message.success("success")
        }
      })
    }
  },
}
</script>