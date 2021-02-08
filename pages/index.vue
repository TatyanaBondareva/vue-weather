<template>
  <div>
    <div class="container">
      <div class="date-and-city-wrapper">
        <div v-if="todayDay" class="today-date">
          <div class="today-date__text">
            {{ todayDay }} {{ todayDayNumber }}.{{ todayMonth }}.{{
              todayFullYear
            }}
          </div>
          <div class="today-date__text">{{ todayTimeNow }}</div>
        </div>
        <div :v-else="todayDay"></div>
        <SelectCity v-model="selectedCity" :options="list"></SelectCity>
      </div>
      <div v-if="weatherData" class="weather">
        <WeatherBlock
          class-name="weather-block block-without-text"
          :icon="`/images/icons/${clouds.icon}.svg`"
          :title="clouds.text"
        />
        <WeatherBlock
          class-name=" weather-block_temp weather-block"
          :temp="temp"
        />
        <WeatherBlock
          class-name=" weather-block"
          :max-temp="maxTemp"
          :min-temp="minTemp"
        />
        <WeatherBlock
          class-name="weather-block"
          icon="/_nuxt/static/icons/humidity.svg"
          :title="humidity + '%'"
          text="Humidity"
        />
        <WeatherBlock
          class-name="weather-block"
          icon="/_nuxt/static/icons/pressure.svg"
          :title="pressure + ' Bar'"
          text="Pressure"
        />
        <WeatherBlock
          class-name="weather-block"
          icon="/_nuxt/static/icons/windSpeed.svg"
          :title="windSpeed + ' km/h'"
          text="Wind"
        />
        <WeatherBlock
          class-name="weather-block"
          icon="/_nuxt/static/icons/sunrise.svg"
          :title="sunrise"
          text="Sunrise"
        />
        <WeatherBlock
          class-name="weather-block"
          icon="/_nuxt/static/icons/sunset.svg"
          :title="sunset"
          text="Sunset"
        />
        <WeatherBlock
          class-name="weather-block"
          icon="/_nuxt/static/icons/daytime.svg"
          :title="dayLong"
          text="Daytime"
        />
        <div class="weather__carousel">
          <div
            class="weather__blocks-wrapper"
            :style="`left:` + slideLeftPosition + '%'"
          >
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">1</div>
            </div>
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">2</div>
            </div>
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">3</div>
            </div>
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">4</div>
            </div>
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">5</div>
            </div>
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">6</div>
            </div>
            <div class="weather__block">
              <img
                src="../static/icons/daytime.svg"
                alt=""
                class="weather__icon"
              />
              <div class="weather__middle-text">{{ dayLong }}</div>
              <div class="weather__small-text">7</div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-3xl">
        Нет данных! <br />
        Пожалуйста выберите город!
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      sliderX: 0,
      slideLeftPosition: -33,
    }
  },
  computed: {
    ...mapGetters('cities', ['list', 'weatherData', 'selectedCityId']),
    selectedCity: {
      get() {
        return this.selectedCityId
      },
      set(selectedCityId) {
        this.updateSelectedCityId(selectedCityId)
        // this.$store.commit('cities/UPDATE_SELECTED_CITY_ID', selectedCityId)
      },
    },
    maxTemp() {
      return this.weatherData ? Math.round(this.weatherData.main.temp_max) : ''
    },
    minTemp() {
      return this.weatherData ? Math.round(this.weatherData.main.temp_min) : ''
    },
    temp() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : ''
    },
    humidity() {
      return this.weatherData ? this.weatherData.main.humidity : ''
    },
    pressure() {
      return this.weatherData ? this.weatherData.main.pressure : ''
    },
    windSpeed() {
      return this.weatherData ? Math.round(this.weatherData.wind.speed) : ''
    },
    clouds() {
      return this.weatherData
        ? {
            text: this.weatherData.weather[0].main,
            icon: this.weatherData.weather[0].icon,
          }
        : ''
    },
    sunrise() {
      if (this.weatherData) {
        return this.getTimeFromDate(this.weatherData.sys.sunrise)
      }
      return ''
    },
    sunset() {
      if (this.weatherData) {
        return this.getTimeFromDate(this.weatherData.sys.sunset)
      }
      return ''
    },
    dayLong() {
      if (this.weatherData.sys.sunrise && this.weatherData.sys.sunset) {
        const dayLong = this.getNumbersDifference(
          this.weatherData.sys.sunset,
          this.weatherData.sys.sunrise
        )
        return this.getTimeFromDate(dayLong)
      }
      return ''
    },
    todayDay() {
      if (this.weatherData) {
        const day = this.getDate(this.weatherData.dt)
        return this.getDayName(day)
      }
      return ''
    },
    todayDayNumber() {
      if (this.weatherData) {
        return this.getDate(this.weatherData.dt).getDate()
      }
      return ''
    },
    todayMonth() {
      if (this.weatherData) {
        return this.getDate(this.weatherData.dt).getMonth()
      }
      return ''
    },
    todayFullYear() {
      if (this.weatherData) {
        return this.getDate(this.weatherData.dt).getFullYear()
      }
      return ''
    },
    todayTimeNow() {
      if (this.weatherData) {
        return this.getTimeFromDate(this.weatherData.dt)
      }
      return ''
    },
  },

  watch: {
    selectedCityId: {
      handler() {
        this.fetchWeather()
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('cities', ['getWeatherData', 'updateSelectedCityId']),
    fetchWeather() {
      this.getWeatherData()
    },
    getNumbersDifference(firstArg, secondArg) {
      return firstArg - secondArg
    },
    getTimeFromDate(arg) {
      const date = this.getDate(arg)
      const timeHours = date.getHours()
      const timeMinutes = date.getMinutes()
      return `${timeHours}:${timeMinutes}`
    },
    getDate(arg) {
      const dateTime = arg * 1000
      return new Date(dateTime)
    },
    getDayName(date) {
      const thisDay = date.getDay()
      return this.weekdays[thisDay]
    },
    moveWeekWeatherSlide(e) {
      e.pageX > this.sliderX ? this.getNextSlide() : this.getPrevSlide()
      this.sliderX = e.pageX
    },
    getNextSlide() {
      this.slideLeftPosition += 33
    },
    getPrevSlide() {
      this.slideLeftPosition -= 33
    },
  },
}
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  max-width: 375px;
  box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.2);
  @apply -mt-5 bg-white rounded-3xl;
}

.date-and-city-wrapper {
  justify-content: space-between;
  width: 100%;
  font-family: 'Barlow', sans-serif;
  @apply flex;
}

.weather {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width: 190px;
  font-family: 'Barlow', sans-serif;
  max-width: 100%;

  &__block {
    align-items: center;
    justify-content: center;
    @apply flex flex-col py-5 w-1/3;
    &_temp {
      flex-direction: row;
    }
  }

  &__blocks-wrapper {
    position: absolute;
    left: 0%;
    width: 877px;
    @apply flex;
  }

  &__carousel {
    position: relative;
    width: 100%;
    min-height: 100px;
    overflow: hidden;
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

  &__icon {
    @apply w-6 h-6 mb-2;
  }
}

.today-date {
  color: #999;
  @apply px-5 py-4;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
