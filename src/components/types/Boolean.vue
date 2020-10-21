<template lang="pug">
.boolean
  template(v-for="f, idx in innerValue")
    .field
      select(:value="f", @input="input(idx, $event)")
        option(:value="true") True
        option(:value="false") False
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
    value: { type: [Number, Array] },
    default: { type: String, default: () => "" },
    size: { type: Object },
  },
  data() {
    let v = this.value;
    if (!this.value || (Array.isArray(this.value) && !this.value.length)) {
      v = this.default;
    }
    v = Array.isArray(v) ? v : [v];
    v = v.map((x) => x === "true");
    const end = Math.max(v.length, this.size.min);
    while (v.length < end) {
      v.push(false);
    }
    return {
      innerValue: v,
    };
  },
  methods: {
    input(idx, e) {
      Vue.set(this.innerValue, idx, e.target.value === "true");
      this.emit();
    },
    eliminate(idx) {
      Vue.delete(this.innerValue, idx);
      this.emit();
    },
    addField() {
      this.innerValue.push(false);
    },
    emit() {
      if (this.size.max > 1) {
        this.$emit("input", this.innerValue);
      } else {
        this.$emit("input", this.innerValue[0]);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.boolean {
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