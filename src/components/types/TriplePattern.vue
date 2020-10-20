<template lang="pug">
.wrapper
  .triple(v-for="t, idx in innerValue")
    .field
      p Subject
      input(type="text", @input="input(idx, 's', $event)")
    .field
      p Predicate
      input(type="text", @input="input(idx, 'p', $event)")
    .field
      p Object
      input(type="text", @input="input(idx, 'o', $event)")
    .cross(@click="eliminate(idx)")
      p Delete
  button(@click="addField") Add field
</template>
<script>
import Vue from "vue";

export default {
  props: {
    value: { type: [Object, Array], default: () => ({ s: "", p: "", o: "" }) },
    size: { type: Object },
  },
  data() {
    return {
      innerValue: this.value || [],
    };
  },
  methods: {
    input(idx, field, e) {
      Vue.set(this.innerValue[idx], field, e.target.value);
      this.$emit("input", this.innerValue);
    },
    addField() {
      this.innerValue.push({ s: "", p: "", o: "" });
    },
    eliminate(idx) {
      Vue.delete(this.innerValue, idx);
      this.$emit("input", this.innerValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  .triple {
    display: flex;
    flex-direction: row;
  }
  margin-left: 10px;
}
</style>
