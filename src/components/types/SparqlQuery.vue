<template lang="pug">
.wrapper
  codemirror(@input="input", :value="value", :options="opts")
</template>
<script>
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
    value: {
      type: [String, Array],
      size: { type: Object },
      default: () => "CONSTRUCT {?s ?p ?o} WHERE {?s ?p ?o}",
    },
  },
  data() {
    return {
      opts: {
        tabSize: 2,
        mode: "application/sparql-query",
        theme: "monokai",
        lineNumbers: true,
        line: true,
      },
    };
  },
  methods: {
    input(evt) {
      this.$emit("input", evt);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin-left: 10px;
}
</style>
