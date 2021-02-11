<template>
  <div class="weather-block next-day-block">
    <img :src="icon" alt="" class="weather-block__icon" />
    <div class="next-day-block__title">{{ day }}, {{ date }}</div>
    <div class="next-day-block__min-max">
      <span class="next-day-block__min-max next-day-block__min-max_max">{{
        max
      }}</span>
      <span class="next-day-block__min-max next-day-block__min-max_min">{{
        min
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextDayBlockComponent',
  props: {
    day: { type: String },
    date: { type: Number },
    icon: { type: String },
    max: { type: Number },
    min: { type: Number },
  },
}
</script>

<style scoped lang="scss">
.next-day-block {
  margin: 12px;
  padding: 10px;
  max-width: 100px;
  width: 100%;
  box-shadow: 0 8px 24px rgb(0, 0, 0, 10%);
  border-radius: 16px;
  outline: none;

  &__title {
    @apply font-medium text-base leading-5 mb-1;
  }

  &__min-max {
    color: #999;
    font-size: 10px;
    line-height: 12px;
    @apply pr-2;

    &_max {
      background: url('~assets/../static/icons/arrow-top.svg') no-repeat center
        right;
      @apply mr-1 pl-2;
    }

    &_min {
      background: url('~assets/../static/icons/arrow-bottom.svg') no-repeat
        center right;
    }
  }
}
</style>
