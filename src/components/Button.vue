<template>
  <button
    class="button"
    :class="`button_${checkDirection}`"
    type="submit"
    @click="setDirection"
  >
    <span class="button__text">{{innerText}}</span>
  </button>
</template>

<script>
export default {
  props: {
    direction: String
  },
  methods: {
    setDirection() {
      this.$store.commit("setDirection", this.direction);
    }
  },
  computed: {
    checkDirection() {
      return this.direction === "reduction" ? "red" : "green";
    },
    innerText() {
      return this.direction === "reduction" ? "В снижение" : "В рост";
    }
  }
};
</script>

<style lang='scss' scoped>
.button {
  display: block;
  position: relative;
  width: 128px;
  height: 44px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  padding: 0;
  padding-left: 28px;
  cursor: pointer;
  outline: none;
  &_red {
    background-color: #e95f5f;
    &:hover {
      background-color: darken(#e95f5f, 4%);
    }
    &:active {
      background-color: darken(#e95f5f, 7%);
    }
    &:before {
      transform: scaleY(-1);
    }
  }
  &_green {
    background-color: #499c38;
    &:hover {
      background-color: darken(#499c38, 4%);
    }
    &:active {
      background-color: darken(#499c38, 7%);
    }
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 28px;
    background-image: url("../assets/svg/arrow.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  &__text {
    display: block;
    height: 100%;
    line-height: 44px;
    border-radius: 5px;
    background-color: rgba(#fff, 0.1);
  }
}
</style>