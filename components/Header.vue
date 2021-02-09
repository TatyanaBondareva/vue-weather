<template>
  <header :class="className">
    <img src="../assets/images/sky-background.png" alt="" />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  ...mapGetters('cities', ['isNightNow']),
  computed: {
    thisNight: {
      get() {
        return this.isNightNow
      },
      set(isNightNow) {
        this.updateIsNightNow(isNightNow)
      },
    },
    className() {
      return this.thisNight ? 'header header_night' : 'header header_day'
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #54b4f9 5.67%, #fff 127%);
}
</style>
