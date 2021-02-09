<template>
  <div :class="'weather-block' + className">
    <img :src="icon" alt="" :class="'weather-block__icon' + className" />
    <div :class="'weather-block__middle-text' + className">{{ title }}</div>
    <div :class="'weather-block__small-text' + className">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'WeatherBlock',
  props: {
    icon: { type: String, require: true },
    title: { type: String, require: true },
    text: { type: String, default: '' },
  },
  computed: {
    className() {
      return this.text ? '' : ' _without-text'
    },
  },
}
</script>

<style scoped lang="scss">
.weather-block {
  display: flex !important;
  justify-content: center;
  align-items: center;
  @apply flex flex-col py-5 w-1/3;
  &_temp {
    @apply flex-row;
  }

  &_week-day {
    @apply shadow-lg;
  }

  &__icon {
    @apply w-6 h-6 mb-3;

    &._without-text {
      @apply w-10 h-10 mb-2 p-0;
    }
  }

  &__middle-text {
    @apply font-medium text-base leading-5 mb-1;
    &._without-text {
      @apply text-lg p-0;
    }
  }

  &__small-text {
    color: #999;
    font-size: 10px;
    line-height: 12px;

    &._without-text {
      @apply p-0;
    }
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
