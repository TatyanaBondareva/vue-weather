<template>
  <div :class="className">
    <img v-if="icon" :src="icon" alt="" :class="className + '__icon'" />
    <div v-if="title" :class="className + '__middle-text'">{{ title }}</div>
    <div v-if="text" :class="className + '__small-text'">{{ text }}</div>
    <span
      v-if="temp"
      :class="className + '__big-text text-6xl leading-tight leading-4'"
      >{{ temp }}</span
    >
    <sup v-if="temp" :class="className + '__temperature-sup-text text-2xl'"
      >°C</sup
    >
    <div v-if="maxTemp" :class="className + '__max-min weather__max-min_max'">
      {{ maxTemp }}°C
    </div>
    <div v-if="minTemp" :class="className + '__max-min weather__max-min_min'">
      {{ minTemp }}°C
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherBlock',
  props: {
    icon: String,
    title: String,
    text: String,
    temp: Number,
    maxTemp: String,
    minTemp: String,
    className: String,
  },
}
</script>

<style scoped lang="scss">
.weather-block {
  align-items: center;
  justify-content: center;
  @apply flex flex-col py-5 w-1/3;
  &_temp {
    @apply flex-row;
  }

  &__icon {
    @apply w-6 h-6 mb-2;
  }

  &__middle-text {
    @apply font-medium text-base leading-5 mb-1;
  }

  &__small-text {
    color: #999;
    font-size: 8px;
    line-height: 10px;
  }

  &__temperature-sup-text,
  &__max-min {
    color: #666;
  }

  &__max-min {
    @apply pr-3 text-base;

    &_max {
      background: url('~assets/../static/icons/arrow-top.svg') no-repeat center
        right;
    }

    &_min {
      background: url('~assets/../static/icons/arrow-bottom.svg') no-repeat
        center right;
    }
  }
}

.block-without-text {
  &__middle-text {
    @apply font-medium leading-5 text-lg mb-1 p-0;
  }

  &__icon {
    @apply w-8 h-8 mb-2 p-0;
  }

  &__small-text {
    display: none;
  }
}
</style>
