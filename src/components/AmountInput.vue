<template>
  <div class="input">
    <label :for="id" class="input__label">{{label}}</label>
    <div class="input__block">
      <span class="input__currency">{{currency}}</span>
      <input
        autocomplete="off"
        type="text"
        :id="id"
        class="input__field"
        :class="{invalid: !$v.value.required || !$v.value.minValue}"
        v-model.trim="value"
        @input="onInput"
      />
      <span v-if="!$v.value.minValue" class="error-tip">
        Минимальная сумма инвестиции
        <span class="error-tip_underline">$ {{minValue}}</span>
      </span>
      <span v-else-if="!$v.value.required" class="error-tip">Это поле должно быть заполнено</span>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    id: String,
    label: String,
    currency: String,
    minValue: Number,
    defaultVal: Number,
    range: Array
  },
  data: () => ({
    value: null,
    pattern: /^\d+$/,
    isValid: true
  }),
  validations() {
    return {
      value: { required, minValue: minValue(this.$props.minValue) }
    };
  },
  mounted() {
    this.value = this.defaultVal;
    this.$store.commit("setAmount", this.defaultVal);
  },
  methods: {
    onInput(e) {
      let value = e.target.value;
      if (
        (value.length > 0 && !this.pattern.test(value)) ||
        value < this.range[0] ||
        value > this.range[1]
      ) {
        this.value = this.$store.getters.getAmount;
        return;
      }
      this.$store.commit("setAmount", value);
      this.$v.$touch();

      this.isValid = !this.$v.$invalid;
    }
  },
  watch: {
     isValid() {
        this.$store.commit('setValidate', {amount: this.isValid})
     }
  }
};
</script>

<style lang='scss' scoped>
</style>