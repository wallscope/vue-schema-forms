<template lang="pug">
.wrapper
  input(
    :type="show ? 'text' : 'password'",
    @input="$emit('input', $event.target.value)",
    :value="inner"
  )
  button(@click="show = !show") Show/Hide
</template>
<script>
export default {
  props: {
    value: { type: [String, Array] },
    default: { type: String, default: () => "" },
    size: { type: Object },
  },
  data() {
    return {
      inner: this.value || this.default,
      show: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
}
</style>
