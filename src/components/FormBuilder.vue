<template lang="pug">
.builder
  template(v-for="f in fields")
    slot(:name="f.type", v-bind:field="f", v-bind:input="input")
      p {{ f.name }} - {{ f.description }}
      .field
        component(
          :is="getComponent(f)",
          @input="input(f.name, $event)",
          :value="inner[f.name]",
          :default="f.default",
          v-bind="getProps(f)"
        )
  slot(name="submit")
    button(type="submit", @click.prevent="submit") Submit
</template>

<script>
import Vue from "vue";
import { components, defaultField } from "@/components/types";

// TODO: Write spec
export default {
  name: "FormBuilder",
  props: {
    fields: { type: Array, required: true },
    value: { type: Object, default: () => ({}) },
    overrides: { type: Object, default: () => ({}) },
    fieldProps: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      inner: { ...this.value },
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.inner);
    },
    input(field, value) {
      Vue.set(this.inner, field, value);
      this.$emit("input", this.inner);
    },
    getComponent(p) {
      return this.overrides[p.type] || components[p.type] || defaultField;
    },
    getProps(p) {
      const props = this.fieldProps[p.type] || {};
      return { field: p, ...props };
    },
  },
};
</script>
