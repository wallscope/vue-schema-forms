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
  button(v-if="this.size.max > this.innerValue.length",@click="addField") Add field
</template>
<script>
import Vue from "vue";

export default {
  props: {
    value: { type: Object, default: () => ({}) },
    default: { type: String, default: () => "{}" },
    size: { type: Object },
  },
  data() {
    let v = Object.entries(this.value)
    if(!v.length){
     v = Object.entries(JSON.parse(this.default))
    }
    const end = Math.max(v.length,this.size.min)
    while(v.length < end){
      v.push(["",""]);
    }
    return {
      innerValue: v,
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
      const clean = this.innerValue.filter((x) => x[0] && x[1]);
      this.$emit("input", Object.fromEntries(clean));
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
