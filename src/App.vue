<template>
  <div id="app">
    <InvestmentForm />
    <input type="text" class="url-input" placeholder="Введите url сервера для отправки данных" @change="changeUrl">
  </div>
</template>

<script>
import InvestmentForm from "@/components/InvestmentForm";
export default {
  
  name: 'app',
  components: {
    InvestmentForm,
  },
  methods: {
    changeUrl(e){
      this.$store.commit('setUrl', e.target.value);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Arial Regular', sans-serif;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #232426;
  margin-top: 60px auto;
}

.url-input {
  display: block;
  width: 316px;
  margin: 0 auto;
  padding: 10px 20px;
  box-sizing: border-box;
}


</style>
