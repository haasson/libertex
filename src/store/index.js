import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: '',
    amount: 0,
    multiplier: 0,
    total: 0,
    currency: 'dollar',
    profit: { checked: false },
    loss: { checked: false },
    direction: null,
    validate: { amount: true, multiplier: true, profit: true, loss: true },
  },
  mutations: {
    setAmount(state, value) {
      state.amount = value
      state.total = value * state.multiplier
    },
    setMultiplier(state, value) {
      state.multiplier = value
      state.total = state.amount * value
    },
    setCurrency(state, cur) {
      state.currency = cur
    },
    setValue(state, { value, id, checked }) {
      if (value) {
        let newValue = state.currency === 'dollar'
          ? +value
          : state.total * +value / 100
        state[id].value = Math.round(newValue)
      }
      state[id].checked = checked
    },
    setDirection(state, dir) {
      state.direction = dir
    },
    setValidate(state, obj) {
      let validate = {...state.validate, ...obj}
      state.validate = validate
    },
    setUrl(state, url) {
      state.url = url
    }
  },
  actions: {
    submitForm({ state }) {

      let { url, amount, multiplier, profit, loss, direction } = state
      let data = {
        sumInv: amount,
        mult: multiplier,
        direction
      }
      if (profit.checked) data.takeProfit = profit.value
      if (loss.checked) data.stopLoss = loss.value

      console.log(data);
      
      Axios.post(url, this.formData).then(response => {
        console.log(response);
      });
    }
  },
  getters: {
    getAmount: s => s.amount,
    getMultiplier: s => s.multiplier,
    getTotal: s => s.total,
    getFormattedTotal: s => s.total.toLocaleString(),
    getCurrency: s => s.currency,
    getValidate: s => s.validate,
  },
  modules: {
  }
})
