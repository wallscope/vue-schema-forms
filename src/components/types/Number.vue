<template lang="pug">
input(
  type="number",
  @input="$emit('input', Number($event.target.value))",
  :value="inner"
)
</template>
<script>
export default {
  props: {
    value: { type: Number },
    default: { type: String },
  },
  data() {
    return {
      inner: this.value || Number(this.default),
    };
  },
};
</script>
