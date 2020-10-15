<template lang="pug">
select(:value="value", @input="$emit('input', $event.target.value === 'true')")
  option(value="true") True
  option(value="false") False
</template>

<script>
export default {
  props: {
    value: { type: Boolean },
    default: { type: String },
  },
  data() {
    return {
      inner: this.value ? this.value : this.default === "true",
    };
  },
};
</script>
