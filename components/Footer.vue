<template>
  <footer :class="className">
    <div class="text-yellow-100">(.c) 2021</div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters('cities', ['isNightNow']),
    thisNight: {
      get() {
        console.log('this.updateIsNightNow', this.isNightNow)
        return this.isNightNow
      },
    },
    className() {
      return this.thisNight ? 'footer footer_night' : 'footer footer_day'
    },
  },
}
</script>

<style scoped lang="scss">
.footer {
  @apply px-5;

  &_day {
    background: linear-gradient(180deg, #54b4f9 5.67%, #fff 127%);
  }

  &_night {
    background: linear-gradient(180deg, #33284b 0%, #111520 100%);
  }
}
</style>
