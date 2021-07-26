<template>
  <div class="input">
    <label :for="id" class="input__label">Мультипликатор</label>
    <div class="input__block">
      <span class="input__mlt">+</span>
      <input
        autocomplete="off"
        type="text"
        :id="id"
        class="input__field input__field_small"
        :class="{invalid: !$v.value.required || !$v.value.between}"
        v-model.trim="value"
        @input="onInput"
        @focus="isRange = true"
        ref="input"
      />
      <span class="input__result"> = $ {{total}}</span>
      <span v-if="!$v.value.required" class="error-tip">Это поле должно быть заполнено</span>
      <span v-else-if="!$v.value.between" class="error-tip">Неверное значение мультипликатора</span>
    </div>
    <div v-show="isRange" class="multiply__range" ref="rangeWrap">
      <div ref="range"></div>
    </div>
  </div>
</template>

<script>
import noUiSlider from "nouislider";
import { required, between } from "vuelidate/lib/validators";

export default {
  props: {
    id: String,
    label: String,
    currency: String,
    minValue: Number,
    maxValue: Number,
    defaultVal: Number,
    range: Array
  },

  data: () => ({
    value: null,
    isRange: false,
    pattern: /^\d+$/,
    isValid: true
  }),

  validations() {
    return {
      value: { required, between: between(this.minValue, this.maxValue) }
    };
  },

  mounted() {
    this.value = this.defaultVal;
    this.$store.commit("setMultiplier", this.value);
    let { input, rangeWrap } = this.$refs;

    document.addEventListener("click", e => {
      if (
        e.target !== input &&
        e.target.closest(`.${rangeWrap.classList.value}`) === null
      ) {
        this.isRange = false;
      }
    });

    let { range } = this.$refs;
    noUiSlider.create(range, {
      start: 40,
      connect: "lower",
      step: 1,
      animate: true,
      animationDuration: 300,
      range: {
        min: 0,
        max: 40
      },
      pips: {
        mode: "values",
        values: [1, 5, 20, 40],
        density: Infinity
      }
    });
    range.noUiSlider.on("slide", (values, handle) => {
      let value = Math.round(values[handle]);
      this.value = value;

      this.$store.commit("setMultiplier", value);
      this.isValid = !this.$v.$invalid;
    });
  },

  methods: {
    onInput(e) {
      let value = e.target.value;
      if (
        (value.length > 0 && !this.pattern.test(value)) ||
        value < this.range[0] ||
        value > this.range[1]
      ) {
        this.value = this.$store.getters.getMultiplier;
        return;
      }
      this.$store.commit("setMultiplier", value);
      this.isValid = !this.$v.$invalid;

      this.$refs.range.noUiSlider.set(value);
      this.$v.$touch();
    }
  },

  computed: {
    total() {
      return this.$store.getters.getFormattedTotal;
    }
  },
  watch: {
     isValid() {
        this.$store.commit('setValidate', {multiply: this.isValid})
     }
  }
};
</script>

<style lang='scss'>
.multiply__range {
  position: absolute;
  z-index: 2;
  left: -8px;
  bottom: -7px;
  width: 280px;
  height: 60px;
  margin-top: 20px;
  padding: 22px 24px 0;
  box-sizing: border-box;
  transform: translateY(100%);
  background-color: #3a3b3c;
  overflow: hidden;
  &:before {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    top: 0px;
    left: 58%;
    background-color: #3a3b3c;
    transform: rotate(45deg) translateY(-50%);
  }

  .noUi-pips {
    padding-top: 8px;
  }
  .noUi-marker {
    background-color: transparent !important;
  }
  .noUi-value {
    color: #909294;
    font-size: 11px;
  }
  .noUi-target {
    height: 4px;
    padding: 0;
    background: #909294;
    border: none;
    box-shadow: none;
  }
  .noUi-connects {
    margin: 0;
    width: calc(100% - 15px);
  }
  .noUi-connect {
    background: #7e98e5;
  }
  .noUi-horizontal .noUi-handle {
    right: -9px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #7e98e5;
    box-shadow: none;
    border: none;
    &:before {
      width: 6px;
      height: 6px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: #fff;
    }
    &:after {
      display: none;
    }
  }
}
</style>