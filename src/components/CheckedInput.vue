<template>
  <div class="input">
    <input :id="id" type="checkbox" :name="`${id}-checkbox`" v-model="checkbox" />
    <label :for="id" class="input__label">{{label}}</label>
    <div class="input__block">
      <span class="input__currency">{{currencySymbol}}</span>
      <input
        :class="validate"
        class="input__field"
        type="number"
        name="currency"
        :disabled="!checkbox"
        :value="value"
        @input="onInput"
      />

      <!-- ERROR MESSAGES -->
      <span v-if="!$v.value.minValue && checkbox" class="error-tip">
        Не может быть меньше
        <span class="error-tip_underline">{{errorSum}}</span>
      </span>
      <span v-if="!$v.value.maxValue && checkbox" class="error-tip">
        Не может быть больше
        <span class="error-tip_underline">{{errorSum}}</span>
      </span>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { minValue, maxValue } from "vuelidate/lib/validators";

export default {
  props: {
    id: String,
    label: String,
    range: Object
  },

  data: () => ({
    value: null,
    checkbox: false,
    pattern: /^\d+$/,
    isValid: true
  }),

  validations() {
    let { min, max = 10**100 } = this.range;
    
    let value =
      this.currency === "percent"
        ? { minValue: minValue(min), maxValue: maxValue(max) }
        : {
            minValue: minValue((this.total * min) / 100),
            maxValue: maxValue((this.total * max) / 100)
          };
    return { value };
  },

  mounted() {
    this.value = this.currency === "dollar" ? this.total * 0.3 : 30;
  },

  methods: {
    onInput(e) {
      this.value = e.target.value;
      this.isValid = !this.$v.$invalid;
      this.$v.$touch()
    }
  },

  computed: {
    ...mapGetters({ total: "getTotal", currency: "getCurrency" }),
    currencySymbol() {
      return this.currency === "dollar" ? "$" : "%";
    },
    validate() {
      return {
        invalid:
          this.checkbox &&
          (!this.$v.value.minValue ||
            (this.id === "loss" && !this.$v.value.maxValue))
      };
    },
    errorSum() {
      let { min, max } = this.range;
      let limit;

      if (!this.$v.value.minValue) limit = min;
      else if (!this.$v.value.maxValue) limit = max;    

      return this.currency === "dollar"
        ? `$ ${(this.total * limit) / 100}`
        : limit + "%";
    }
  },

  watch: {
    total() {
      if(!this.$v.value.$dirty) {
        this.value = this.currency === "dollar" ? Math.round(this.total * 0.3) : 30;
      }
      
    },
    currency() {
      let currValue = this.value;
      this.value =
        this.currency === "percent"
          ? Math.round((currValue / this.total) * 100)
          : Math.round((currValue * this.total) / 100);
    },
    isValid() {
      let obj = {}
      let result = this.checkbox ? this.isValid : true;
      obj[this.id] = result
      this.$store.commit('setValidate', obj)
    },
    checkbox() {
      this.isValid = this.checkbox ? !this.$v.$invalid : true;
      this.$store.commit("setValue", {id: this.id, checked: this.checkbox});
    },
    value() {
      let props = {
        value: this.value,
        id: this.id,
        checked: this.checkbox
      };
      this.$store.commit("setValue", props);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>