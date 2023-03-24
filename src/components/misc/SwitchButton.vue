<template>
  <button class="py-2 px-4 text-xs" :class="[active ? 'bg-primary text-white' : 'text-primary']" @click="clicked">
    <span>{{ label }}</span>
    <span v-if="labelSuffix.length > 0"> {{ labelSuffix }}</span>
  </button>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    label: {
      type: [String, Number],
      required: true
    },
    labelSuffix: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clicked() {
      this.$emit('clicked', this.label)
    }
  }
}
</script>
