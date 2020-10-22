<template lang="pug">
.sparql-query
  template(v-for="f, idx in innerValue")
    .field
      codemirror(
        :ref="'editor-' + idx",
        @input="input(idx, $event)",
        :value="f",
        :options="opts"
      )
      button.delete(
        v-if="size.min < innerValue.length",
        @click="eliminate(idx)"
      ) Delete
  button(v-if="size.max > innerValue.length", @click="addField") Add field
</template>
<script>
import Vue from "vue";
import { codemirror } from "vue-codemirror";
import { translate } from "sparqlalgebrajs";
// require styles
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/sparql/sparql"; // explicit import of language mode required for webpack v4+

export default {
  components: {
    codemirror,
  },
  props: {
    field: { type: Object },
    value: { type: [String, Array] },
    default: { type: String, default: () => "" },
    size: { type: Object },
    validateFn: { type: Function },
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
      sparqlTranslate: translate,
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
    validate() {
      const component = this;
      const results = this.innerValue.map((v, i) => {
        try {
          if(typeof this.validateFn === 'function'){
            this.validateFn(v, component);
          }else{
            this.sparqlTranslate(v);
            return true;
          }
        } catch (e) {
          if(e.message.indexOf("Translate only works on complete query or update objects") > -1){
            return false;
          }
          const editor = this.$refs[`editor-${i}`].find((x) => !!x);
          editor.cminstance.addLineClass(e.hash.loc.first_line-1, 'background', 'code-error')
          setTimeout(([err])=>{
            editor.cminstance.removeLineClass(err.hash.loc.first_line-1, 'background', 'code-error')
          },1000,[e])
          this.$emit('error',{message:e.message,index:i})
          return false;
        }
      });
      if(this.required && results.every(v => v === false)){
        this.$emit("error", { message: "This field is required", index: null });
      }
      return results;
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
<style>
.sparql-query .CodeMirror-linebackground {
  transition: 500ms;
}
.code-error {
  background-color: rgba(254, 112, 112, 0.38);
}
</style>