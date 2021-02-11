<template>
  <div>
    <header :class="className">
      <img class="sky-image" :src="'/images/' + skyImageName + '.png'" alt="" />
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters('cities', ['isNightNow']),
    thisNight: {
      get() {
        console.log('this.updateIsNightNow', this.isNightNow)
        return this.isNightNow
      },
    },
    className() {
      return this.thisNight ? 'header header_night' : 'header header_day'
    },
    skyImageName() {
      return this.thisNight ? 'sky-night-background' : 'sky-background'
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;

  &_day {
    background: linear-gradient(180deg, #54b4f9 5.67%, #fff 127%);
  }

  &_night {
    background: linear-gradient(180deg, #33284b 0%, #111520 100%);
  }
}
.sky-image {
  max-width: 375px;
}
</style>
