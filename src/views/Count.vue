<template>
  <div class="query-root">
    <div v-if="state === stateMap.beginning">
      <Row :gutter="16" type="flex" justify="center" align="middle">
        <Col span="6">
          <Select
            v-model="shelfId"
            style="width:200px"
            placeholder="select shelf"
            :loading="shelfLoading"
          >
            <Option v-for="id in shelfIdList" :value="id" :key="id">{{ id }}</Option>
          </Select>
        </Col>
        <Col span="6">
          <Button type="primary" long @click="start">start</Button>
        </Col>
      </Row>
    </div>
    <div v-else-if="state === stateMap.doing">
      <Row :gutter="16" type="flex" justify="center" align="bottom">
        <Col span="4">
          <span style="font-size: 24px;color: #515a6e;">in shelf:&nbsp;</span>
          <span style="font-size: 24px;color: #2d8cf0;">{{shelfId}}</span>
        </Col>
      </Row>
      <Row :gutter="16" type="flex" justify="center" align="bottom">
        <Col span="6">
          <List header="product id">
            <ListItem>
              <Input
                v-model="form.productId"
                placeholder="Enter product id..."
                @on-blur="getOldInfo"
              />
            </ListItem>
          </List>
        </Col>
        <Col span="4">
          <List header="region id">
            <ListItem>
              <Input v-model="form.regionId" type="number" placeholder="Enter region id..." />
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
              <Button type="primary" long @click="confirm">confirm</Button>
            </ListItem>
          </List>
        </Col>
      </Row>
      <Table :columns="newColumns" :data="newInfoList"></Table>
      <Row :gutter="16" type="flex" justify="center" align="middle" style="padding-top: 12px">
        <Col span="6">
          <Button long @click="back">back to start</Button>
        </Col>
        <Col span="6">
          <Button type="primary" long :loading="finishLoading" @click="finish">finish</Button>
        </Col>
      </Row>
    </div>
    <div v-else-if="state === stateMap.finished">
      <Table :columns="resColumns" :data="result"></Table>
      <Button type="primary" long @click="back">back to start</Button>
    </div>
    <div v-else>impossible</div>
  </div>
</template>

<script>
import { superGet, superPatch } from '@/tool/net'

export default {
  name: 'Count',
  data() {
    const stateMap = {
      "beginning": 0,
      "doing": 10,
      "finished": 100,
    }
    return {
      stateMap: stateMap,
      state: stateMap.beginning,
      shelfId: '',
      shelfIdList: [],
      shelfLoading: true,
      newColumns: [
        {
          title: 'ProductId',
          key: 'id'
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
      form: {
        productId: '',
        regionId: null,
        number: null,
      },
      newInfoList: [],
      oldInfoList: [],
      resColumns: [
        {
          title: 'ProductId',
          key: 'id'
        },
        {
          title: 'Old Number',
          key: 'oldNumber'
        },
        {
          title: 'New Number',
          key: 'newNumber'
        },
        {
          title: 'Old Region',
          key: 'oldRegion'
        },
        {
          title: 'New Region',
          key: 'newRegion'
        },
        {
          title: 'Old Shelf',
          key: 'oldShelf'
        },
        {
          title: 'New Shelf',
          key: 'newShelf'
        },
      ],
      result: [],
      finishLoading: false,
    }
  },
  created() {
    this.prepareShelf()
  },
  methods: {
    prepareShelf() {
      this.shelfId = ''
      this.shelfLoading = true
      superGet.bind(this)('shelf-list')
        .then(res => {
          if (res !== undefined) {
            this.shelfIdList = res
            this.shelfLoading = false
          }
        })
    },
    start() {
      this.state = this.stateMap.doing
    },
    getOldInfo() {
      superGet.bind(this)(`/product/${this.form.productId}`)
        .then((res) => {
          if (res !== undefined) {
            this.oldInfoList.push(res)
            this.form.regionId = res.regionId
            this.form.number = res.number
          }
        })
    },
    confirm() {
      this.newInfoList.push({
        id: this.form.productId,
        regionId: this.form.regionId,
        number: this.form.number
      })
    },
    finish() {
      this.finishLoading = true
      // create report, must no new product
      this.oldInfoList.forEach((v) => {
        const newInfo = this.newInfoList.find((vv) => vv.productId === v.productId)
        if (v.shelfId !== this.shelfId || v.regionId !== newInfo.regionId || v.number !== newInfo.number) {
          this.result.push({
            id: v.productId,
            oldNumber: v.number,
            newNumber: newInfo.number,
            oldRegion: v.regionId,
            newRegion: newInfo.regionId,
            oldShelf: v.shelfId,
            newShelf: this.shelfId,
          })
        }
      })
      superPatch.bind(this)(`/shelf/${this.shelfId}`, this.newInfoList)
        .then(res => {
          if (res !== undefined) {
            this.$Message.success("success")
            this.finishLoading = false
            this.state = this.stateMap.finished
          }
        })
    },
    back() {
      this.state = this.stateMap.beginning
      this.oldInfoList = []
      this.newInfoList = []
      this.form.productId = ''
      this.form.regionId = null
      this.form.number = null
      this.prepareShelf()
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