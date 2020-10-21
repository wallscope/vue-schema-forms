<template lang="pug">
.mapping
  .header
    p Key
    p Value
  template(v-for="v, key in innerValue")
    .field
      input(type="text", @input="input(key, 0, $event)", :value="innerValue[key][0]")
      input(type="text", @input="input(key, 1, $event)", :value="innerValue[key][1]")
      button.delete(v-if="size.min < innerValue.length", @click="eliminate(key)") Delete
  button(v-if="size.max > innerValue.length",@click="addField") Add field
</template>
<script>
import Vue from "vue";

export default {
  props: {
    value: { type: Object, default: () => ({}) },
    default: { type: String, default: () => "{}" },
    size: { type: Object },
    validateFn: {type: Function}
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
    validate() {
      const component = this;
      return this.innerValue.map((v, i) => {
        try {
          if(typeof this.validateFn === 'function'){
            return this.validateFn(v,component);
          }
          return true;
        } catch (e) {
          this.$emit('error',{message:e.message, index:i})
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mapping {
  .header, .field {
    display: grid;
    grid-template-columns: 3fr 3fr 1fr ;
    margin: 5px 0;
    column-gap: 20px;
    .delete {
      color: #ff7777;
      border: 2px solid #ff7777;
    }
  }
}
</style>
