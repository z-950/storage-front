<template>
  <div :class="[prefixCls]">
    <div :class="classes" @click="handleClick">
      <input
        ref="input"
        type="file"
        :class="[prefixCls + '-input']"
        @change="handleChange"
        :accept="accept"
      />
      <slot></slot>
    </div>
    <slot name="tip"></slot>
  </div>
</template>
<script>
const prefixCls = 'ivu-upload'

export default {
  name: 'MyUpload',
  props: {
    accept: {
      type: String
    },
    onSelect: {
      type: Function,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-select`]: false,
          [`${prefixCls}-drag`]: true,
          [`${prefixCls}-dragOver`]: false
        }
      ]
    },
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    handleChange(e) {
      this.onSelect(e.target.files[0])
    },
  },
};
</script>
