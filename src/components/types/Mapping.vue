<template lang="pug">
.wrapper
  .header
    p Key
    p Value
  template(v-for="v, key in innerValue")
    .field
      input(type="text", @input="input(key, 0, $event)", :value="innerValue[key][0]")
      input(type="text", @input="input(key, 1, $event)", :value="innerValue[key][1]")
      p.delete(@click="eliminate(key)") Delete
  button(@click="addField") Add field
</template>
<script>
import Vue from "vue";

export default {
  props: {
    value: { type: Object, default: () => ({}) },
    default: { type: String, default: () => "{}" },
  },
  data() {
    const v = Object.entries(this.value);
    const d = Object.entries(JSON.parse(this.default));
    return {
      innerValue: v && v.length ? v : d,
    };
  },
  methods: {
    input(idx, field, e) {
      Vue.set(this.innerValue[idx], field, e.target.value);
      this.emit();
    },
    addField() {
      this.innerValue.push(["", ""]);
    },
    eliminate(idx) {
      Vue.delete(this.innerValue, idx);
      this.emit();
    },
    emit() {
      const clean = Object.fromEntries(this.innerValue).filter(
        (x) => x[0] && x[1]
      );
      this.$emit("input", clean);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  .field {
    display: flex;
    flex-direction: row;
    p.delete {
      color: #ff7777;
      border: 2px solid #ff7777;
    }
  }
}
</style>
