import Vue from "vue";
import Text from "./Text.vue";
import NumberField from "./Number.vue";
import BooleanField from "./Boolean.vue";
import Sparql from "./SparqlQuery.vue";
import Password from "./Password.vue";
import TriplePattern from "./TriplePattern.vue";
import Mapping from "./Mapping.vue";
import FilePath from "./FilePath.vue";
import NestedForm from "./NestedForm.vue";

export const components = {
  password: Password,
  number: NumberField,
  string: Text,
  uri: Text,
  boolean: BooleanField,
  ["sparql-query"]: Sparql,
  ["triple-pattern"]: TriplePattern,
  mapping: Mapping,
  form: NestedForm,
  filepath: FilePath,
};

export const defaultField = Vue.component("default", {
  render(ce) {
    return ce(
      "p",
      `No component registered for field type '${this.$attrs.field.type}'`
    );
  },
});

export default { components, defaultField };
