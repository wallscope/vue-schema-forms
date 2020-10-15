<template lang="pug">
  .slider-container
    range-slider.slider(min="0", max="1", step="0.1", @input="input", :value="value")
    input(type="number", min="0", max="1", step="0.1",
      @input="input($event.target.valueAsNumber)", :value="value")
</template>
<script>
import RangeSlider from 'vue-range-slider';

export default {
  components: { RangeSlider },
  props: {
    value: { type: Number },
  },
  methods: {
    input(evt) {
      this.$emit('input', evt);
    },
  },
};
</script>
<style lang="scss" scoped>
// import the built-in vue-range-slider style
@import '~vue-range-slider/dist/vue-range-slider.scss';
.slider-container{
  display: flex;
  padding: 15px;
  align-items: center;
  background:#d3d3d373;
}
.slider-container input {
  background: white;
  border: 0.5px solid #80808080 !important;
  width:50px;
}
.slider-container input:focus{
  background: white;
  outline: none;
}
span.range-slider-knob {
  background-color: #15bce3!important;
  border: 1px solid rgba(11,45,53,.55);
  height: 20px;
  width: 20px;
  border-radius: 0;
}
.slider {
  width: 250px;
  padding-right: 40px;
}

</style>
