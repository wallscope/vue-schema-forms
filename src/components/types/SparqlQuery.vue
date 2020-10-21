<template lang="pug">
.sparql-query
  template(v-for="f, idx in innerValue")
    .field
      codemirror( @input="input(idx,$event)", :value="f", :options="opts")
      button.delete(
        v-if="size.min < innerValue.length",
        @click="eliminate(idx)"
      ) Delete
  button(v-if="size.max > innerValue.length", @click="addField") Add field
</template>
<script>
import Vue from "vue";
import { codemirror } from "vue-codemirror";
// require styles
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/sparql/sparql"; // explicit import of language mode required for webpack v4+

export default {
  components: {
    codemirror,
  },
  props: {
    value: { type: [String, Array] },
    default: { type: String, default: () => "" },
    size: { type: Object },
  },
  data() {
    let v = this.value;
    if (!this.value || (Array.isArray(this.value) && !this.value.length)) {
      v = this.default;
    }
    v = Array.isArray(v) ? v : [v];
    const end = Math.max(v.length, this.size.min);
    while (v.length < end) {
      v.push("");
    }
    return {
      opts: {
        tabSize: 2,
        mode: "application/sparql-query",
        theme: "monokai",
        lineNumbers: true,
        line: true,
      },
      innerValue: v,
    };
  },
  methods: {
    input(idx, e) {
      Vue.set(this.innerValue, idx, e);
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
  },
};
</script>
<style lang="scss" scoped>
.sparql-query {
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