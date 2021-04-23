<template lang="pug">
.triple-pattern
  .header
    p Subject
    p Predicate
    p Object
  template(v-for="t, idx in innerValue")
    .field
      input(type="text", @input="input(idx, 's', $event)", :value="t.s")
      input(type="text", @input="input(idx, 'p', $event)", :value="t.p")
      input(type="text", @input="input(idx, 'o', $event)", :value="t.o")
      button.delete(v-if="size.min < innerValue.length", @click="eliminate(idx)") Delete
  button(v-if="size.max > innerValue.length", @click="addField") Add field
</template>
<script>
import Vue from 'vue';

export default {
  props: {
    field: { type: Object },
    value: { type: [Object, Array], default: () => ({ s: '', p: '', o: '' }) },
    default: { type: String, default: () => '{}' },
    size: { type: Object },
    validateFn: { type: Function },
  },
  data() {
    let v = this.value;
    if (!this.value || !Object.keys(this.value).length) {
      v = JSON.parse(this.default);
      Vue.nextTick(() => this.emit());
    }
    v = Array.isArray(v) ? v : [v];
    const end = Math.max(v.length, this.size.min);
    while (v.length < end) {
      v.push(JSON.parse(this.default));
    }
    return {
      innerValue: v,
    };
  },
  methods: {
    input(idx, field, e) {
      Vue.set(this.innerValue[idx], field, e.target.value);
      this.emit();
    },
    addField() {
      this.innerValue.push({ s: '', p: '', o: '' });
    },
    eliminate(idx) {
      Vue.delete(this.innerValue, idx);
      this.emit();
    },
    emit() {
      if (this.size.max > 1) {
        this.$emit('input', this.innerValue);
      } else {
        this.$emit('input', this.innerValue[0]);
      }
    },
    validate() {
      if (
        this.required &&
        Object.entries(this.innerValue).every(([t]) => t.s === '' && t.p === '' && t.o === '')
      ) {
        this.$emit('error', { message: 'This field is required', index: null });
        return [false];
      }
      const component = this;
      return this.innerValue.map((v, i) => {
        try {
          if (typeof this.validateFn === 'function') {
            return this.validateFn(v, component);
          } else {
            if (v.s) {
              new URL(v.s);
            }
            if (v.p) {
              new URL(v.s);
            }
            if (v.o && v.o.startsWith('<') && v.o.endsWith('>')) {
              new URL(v.s);
            }
            return true;
          }
        } catch (e) {
          this.$emit('error', { message: e.message, index: i });
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.triple-pattern {
  .header,
  .field {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 1fr;
    margin: 5px 0;
    column-gap: 20px;
    .delete {
      color: #ff7777;
      border: 2px solid #ff7777;
    }
  }
}
</style>
