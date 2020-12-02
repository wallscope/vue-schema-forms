<template lang="pug">
  .form
    vue-walls-forms(
      ref="nested",
      @input="input",
      :value="innerValue",
      @error="error",
      :fields="field.fields"
    )
      //- this slot makes the package not compile
      //- template(v-slot:submit)
        //- Empty div to hide inner submit since Vue doesn't allow empty slots
        //- div
</template>

<script>
import Vue from "vue";
export default {
  name: "NestedForm",
  // Need a dynamic import here to prevent circular references:
  // https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  components: {
    VueWallsForms: () => import("../vue-walls-forms.vue"),
  },
  props: {
    field: { type: Object },
    value: { type: Object },
    default: { type: String, default: () => "{}" },
    validateFn: { type: Function },
  },
  data() {
    let v = this.value;
    if (!this.value || Object.keys(this.value).length) {
      v = JSON.parse(this.default);
      Vue.nextTick(() => this.emit());
    }
    return {
      innerValue: { ...v },
    };
  },
  methods: {
    input(val) {
      this.innerValue = val;
      this.emit();
    },
    emit() {
      this.$emit("input", this.innerValue);
    },
    error(evt) {
      this.$emit("error", {
        ...evt,
        field: `${this.field.name}.${evt.field.name}`,
      });
    },
    validate() {
      const component = this;
      if (typeof this.validateFn === "function") {
        return this.validateFn(this.innerValue, component);
      }
      return true; // Validation is delegated to the nested components
    },
  },
};
</script>

<style scoped>
.form {
  margin-left: 10px;
}
</style>
