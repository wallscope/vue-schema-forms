<template lang="pug">
.builder
  template(v-for="f in processedFields")
    slot(
      :name="f.type", 
      :field="f", 
      :input="input",
      :default="f.default",
      :value="inner[f.name]", 
      :submit="submit",
      :size="f.size",
      :error="error",
      v-bind="getProps(f)"
    )
      p {{ f.name }} - {{ f.description }}
      .field
        component(
          :field="f",
          :ref="f.name",
          :is="getComponent(f)",
          @input="input(f.name, $event)",
          @error="error(f.name, $event)",
          :value="inner[f.name]",
          :default="f.default",
          :size="f.size",
          v-bind="getProps(f)"
        )
  slot(name="submit")
    button(type="submit", @click.prevent="submit") Submit
</template>

<script>
import Vue from "vue";
import { components, defaultField } from "./types";

const sizeRegex = /(\d*)([+-])?/;
function parseSize(s) {
  if (!s) return { min: 1, max: 1 };
  let [match, num, sign] = s.match(sizeRegex);
  if (!match) return { min: 1, max: 1 };
  let size = Number(num);
  size = size <= 0 ? 1 : size;
  switch (sign) {
    case "+":
      return { min: size, max: Infinity };
    case "-":
      return { min: 1, max: size };
    default:
      return { min: size, max: size };
  }
}
// TODO: Write spec
export default {
  name: "FormBuilder",
  props: {
    fields: { type: Array, required: true },
    value: { type: Object, default: () => ({}) },
    requireValidation: { type: Boolean, default: () => true },
    overrides: { type: Object, default: () => ({}) },
    validate: {type: Object, default: () => ({}) },
    fieldProps: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      inner: { ...this.value },
    };
  },
  computed: {
    processedFields() {
      return this.fields.map((f) => {
        return { ...f, size: parseSize(f.size) };
      });
    },
  },
  methods: {
    submit() {
      // The nested iteration is because Vue seems to wrap refs in an Array.
      // I guess in case there's multiple refs with the same name
      const allFields = this.fields.flatMap((f) => {
        const results = this.$refs[f.name].flatMap((r) => r.validate());
        return results;
      });
      // Early return if not all fields pass and validation is required
      if(this.requireValidation && allFields.some(x => !x)) {
        return;
      }
      // emit value as submit if they all pass
      this.$emit("submit", this.inner);
    },
    input(field, value) {
      Vue.set(this.inner, field, value);
      this.$emit("input", this.inner);
    },
    error(field, evt) {
      this.$emit("error", { field, error: evt });
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
