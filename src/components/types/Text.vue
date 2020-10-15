<template lang="pug">
input(
  type="text",
  @input="$emit('input', $event.target.value)",
  :value="inner"
)
</template>
<script>
export default {
  props: {
    value: { type: String },
    default: { type: String, default:() => "" },
  },
  data() {
    return {
      inner: this.value || this.default,
    };
  },
};
</script>
