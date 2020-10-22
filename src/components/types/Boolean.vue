<template lang="pug">
.boolean
  template(v-for="f, idx in innerValue")
    .field
      select(:value="''+f", @input="input(idx, $event)")
        option(disabled, value="") -- SELECT --
        option(value="true") True
        option(value="false") False
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
    value: { type: [Boolean, Array] },
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
    v = v.map((x) => ''+x);
    const end = Math.max(v.length, this.size.min);
    while (v.length < end) {
      v.push(''+this.default);
    }
    return {
      innerValue: v,
    };
  },
  methods: {
    input(idx, e) {
      switch(e.target.value){
        case "true":
          Vue.set(this.innerValue, idx, true);
          break;
        case "false":
          Vue.set(this.innerValue, idx, false);
          break;
      }
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
        this.$emit("input", this.innerValue.filter(x => x !== ''));
      } else {
        this.$emit("input", this.innerValue.filter(x => x !== '')[0]);
      }
    },
    validate() {
      if (this.required && this.innerValue.filter(x => x !== '').length < 1 ) {
        this.$emit("error", { message: "This field is required", index: null });
        return [false];
      }
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