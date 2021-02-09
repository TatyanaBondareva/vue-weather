<template>
  <div class="carousel-container">
    <VueSlickCarousel v-bind="settings">
      <NextDayBlockComponent />
      <NextDayBlockComponent />
      <NextDayBlockComponent />
      <NextDayBlockComponent />
      <NextDayBlockComponent />
      <NextDayBlockComponent />
      <NextDayBlockComponent />
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  name: 'CarouselComponent',
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '20px',
        focusOnSelect: false,
        infinite: false,
        slidesToShow: 3,
        speed: 500,
      },
    }
  },
}
</script>

<style scoped lang="scss">
.carousel-container {
  max-width: 100%;
}

.next-day-block {
  margin: 12px;
  padding: 10px;
  max-width: 100px;
  width: 100%;
  box-shadow: 0 8px 24px rgb(0, 0, 0, 10%);
  border-radius: 16px;
  outline: none;

  &__min-max {
    color: #999;
    font-size: 10px;
    line-height: 12px;
    @apply pr-2;

    &_max {
      background: url('~assets/../static/icons/arrow-top.svg') no-repeat center
        right;
      @apply mr-1;
    }

    &_min {
      background: url('~assets/../static/icons/arrow-bottom.svg') no-repeat
        center right;
    }
  }
}

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
</style>
