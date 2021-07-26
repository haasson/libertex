<template>
   <div class="input">
      <span class="input__label">
         Ограничения в
      </span>
      <div class="input__block">
        <input type="radio" name="currency" value="percent" v-model="currency"> %
        <input type="radio" name="currency" value="dollar" v-model="currency"> $
      </div>

   </div>
</template>

<script>
export default {
   data: () => ({
      currency: ''
   }),
   mounted() {
      this.currency= this.$store.getters.getCurrency
   },
   watch: {
      currency() {
         this.$store.commit('setCurrency', this.currency);
      }
   }

}
</script>

<style lang='scss' scoped>

</style>