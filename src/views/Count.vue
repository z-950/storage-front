<template>
  <div class="query-root">
    <div v-if="state === stateMap.beginning">
      <Table border :columns="countColumns" :data="countList">
        <template slot-scope="{ index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="start(index)"
            :disabled="countList[index].finished"
          >start</Button>
        </template>
      </Table>
    </div>
    <div v-else-if="state === stateMap.doing">
      <Row :gutter="16" type="flex" justify="center" align="bottom">
        <Col span="4">
          <span style="font-size: 24px;color: #515a6e;">in shelf:&nbsp;</span>
          <span style="font-size: 24px;color: #2d8cf0;">{{countList[currentIndex].shelfId}}</span>
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
      countColumns: [
        {
          title: 'Id',
          key: 'id'
        },
        {
          title: 'Shelf Id',
          key: 'shelfId'
        },
        {
          title: 'Finished',
          key: 'finished'
        },
        {
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      countList: [],
      currentIndex: -1,
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
    this.prepareCount()
  },
  methods: {
    prepareCount() {
      superGet.bind(this)('/count/not-finished')
        .then(res => {
          if (res !== undefined) {
            this.countList = res
          }
        })
    },
    start(index) {
      this.currentIndex = index
      this.state = this.stateMap.doing
    },
    getOldInfo() {
      superGet.bind(this)(`/product/${this.form.productId}`)
        .then((res) => {
          if (res === null) {
            this.$Message.info('not found')
          } else if (res !== undefined) {
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
      const shelfId = this.countList[this.currentIndex].shelfId
      // create report, must no new product
      this.oldInfoList.forEach((v) => {
        const newInfo = this.newInfoList.find((it) => it.id === v.id)
        if (v.shelfId !== shelfId || v.regionId !== newInfo.regionId || v.number !== newInfo.number) {
          this.result.push({
            id: v.id,
            oldNumber: v.number,
            newNumber: newInfo.number,
            oldRegion: v.regionId,
            newRegion: newInfo.regionId,
            oldShelf: v.shelfId,
            newShelf: shelfId,
          })
        }
      })

      const that = this

      superPatch.bind(that)(`/product/`, that.newInfoList.map(v => {
        v.shelfId = shelfId
        return v
      })).then(res => {
        if (res !== undefined) {
          that.doFinishCount(that.countList[that.currentIndex].id)
        }
      })
    },
    doFinishCount(id) {
      superPatch.bind(this)(`/count/${id}`, null).then(res => {
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
      this.result = []
      this.form.productId = ''
      this.form.regionId = null
      this.form.number = null
      this.prepareCount()
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