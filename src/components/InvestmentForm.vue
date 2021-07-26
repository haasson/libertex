<template>
  <form class="card" @submit.prevent="submitHandler">
    <h3 class="card__title">Инвестировать сейчас</h3>
    <div class="card__body">
      <AmountInput
        id="amount"
        class="card__line"
        label="Сумма инвестиции"
        currency="$"
        :minValue="100"
        :defaultVal="5000"
        :range="[0, 200000]"
      />

      <Multiplier
        id="multiplier"
        class="card__line"
        :minValue="1"
        :maxValue="40"
        :defaultVal="40"
        :range="[0, 99]"
      />

      <div class="card__limits">
        <span
          class="card__toggle-limits"
          :class="isCheckboxes ? 'card__toggle-limits_active' : '' "
          @click="isCheckboxes = !isCheckboxes"
        >Ограничить прибыль и убыток</span>

        <div v-show="isCheckboxes" class="card__checkboxes">
          <CurrencyRadios class="card__line card__line_radios" />
          <CheckedInput
            id="profit"
            class="card__line"
            label="Прибыль"
            :range="{min: 10}"
          />
          <CheckedInput id="loss" class="card__line" label="Убыток" :range="{min: 10, max: 100}" />
        </div>
      </div>

      <div class="card__buttons">
        <Button 
          class="card__submit"
          direction="reduction"
        />
        <Button 
          class="card__submit"
          direction="growth"
        />
      </div>

    </div>
  </form>
</template>

<script>
import Axios from "axios";
import AmountInput from "@/components/AmountInput";
import Multiplier from "@/components/Multiplier";
import CurrencyRadios from "@/components/CurrencyRadios";
import CheckedInput from "@/components/CheckedInput";
import Button from "@/components/Button";

export default {
  name: "investment-form",
  components: { AmountInput, Multiplier, CurrencyRadios, CheckedInput, Button },
  data: () => ({
    
    isCheckboxes: false
  }),
  methods: {
    
    submitHandler(e) {
      let isValid = Object.values(this.$store.getters.getValidate).every(v => v)
      if (isValid) this.$store.dispatch('submitForm')
    }
  }
};
</script>

<style lang='scss' scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 316px;
  height: 368px;
  margin: 40px auto;
  box-sizing: border-box;
  background-color: #fff;

  &__title {
    margin: 0;
    padding: 17px 25px 12px;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    text-align: left;
    color: #3a3b3c;
    border-bottom: 1px solid #e0e2e4;
  }

  &__body {
    padding: 20px 23px 20px 29px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  &__line {
    margin-bottom: 8px;
    &_radios {
      margin-bottom: 12px;
    }
  }
  &__limits {
    margin-top: 26px;
    margin-bottom: 8px;
  }
  &__toggle-limits {
    position: relative;
    display: block;
    margin-bottom: 16px;
    color: #909294;
    cursor: pointer;
    &:before {
      position: absolute;
      content: "";
      width: 5px;
      height: 5px;
      left: -15px;
      top: 3px;
      transform: rotate(-45deg);
      transition: transform 0.1s;
      border-right: 2px solid #909294;
      border-bottom: 2px solid #909294;
    }
    &_active:before {
      transform: rotate(45deg);
    }
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
}
</style>