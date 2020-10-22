<template lang="pug">
.string
  template(v-for="f, idx in innerValue")
    .field
      input(type="text", @input="input(idx,$event)", :value="f")
      button.delete(
        v-if="size.min < innerValue.length",
        @click="eliminate(idx)"
      ) Delete
  button(v-if="size.max > innerValue.length", @click="addField") Add field
</template>
<script>
import Vue from "vue";
export default {
  props: {
    field: { type: Object },
    value: { type: [String, Array] },
    default: { type: String, default: () => "" },
    size: { type: Object },
    validateFn: {type: Function}
  },
  data() {
    let v = this.value;
    if (!this.value || (Array.isArray(this.value) && !this.value.length)) {
      v = this.default;
      Vue.nextTick(()=> this.emit())
    }
    v = Array.isArray(v) ? v : [v];
    const end = Math.max(v.length, this.size.min);
    while (v.length < end) {
      v.push(this.default);
    }
    return {
      innerValue: v,
    };
  },
  methods: {
    input(idx, e) {
      Vue.set(this.innerValue, idx, e.target.value);
      this.emit();
    },
    eliminate(idx) {
      Vue.delete(this.innerValue, idx);
      this.emit();
    },
    addField() {
      this.innerValue.push("");
    },
    emit() {
      if (this.size.max > 1) {
        this.$emit("input", this.innerValue);
      } else {
        this.$emit("input", this.innerValue[0]);
      }
    },
    validate() {
      if (this.required && this.innerValue.every((x) => x === "")) {
        this.$emit("error", { message: "This field is required", index: null });
        return [false];
      }
      const component = this;
      return this.innerValue.map((v, i) => {
        try {
          if(typeof this.validateFn === 'function'){
            return this.validateFn(v,component);
          }
          new URL(v)
          return true
        } catch (e) {
          this.$emit('error',{message:e.message, index:i})
          return false
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.string {
  .field {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 5px 0;
    column-gap: 20px;
    .delete {
      color: #ff7777;
      border: 2px solid #ff7777;
    }
  }
}
</style>