<template>
  <div>
    <div v-if="!dataLoading" class="container">
      <div class="date-and-city-wrapper">
        <CurrentDateComponent />
        <SelectCity v-model="selectedCity" :options="list"></SelectCity>
      </div>
      <div v-if="weatherData" class="weather">
        <WeatherBlock
          :icon="`/images/icons/${clouds.icon}.svg`"
          :title="clouds.text"
        />
        <TemperatureComponent
          :max-temp="maxTemp"
          :min-temp="minTemp"
          :temp="temp"
        />

        <WeatherBlock
          icon="/icons/humidity.svg"
          :title="humidity + '%'"
          text="Humidity"
        />
        <WeatherBlock
          icon="/icons/pressure.svg"
          :title="pressure + ' Bar'"
          text="Pressure"
        />
        <WeatherBlock
          icon="/icons/windSpeed.svg"
          :title="windSpeed + ' km/h'"
          text="Wind"
        />
        <WeatherBlock
          icon="/icons/sunrise.svg"
          :title="sunrise"
          text="Sunrise"
        />
        <WeatherBlock icon="/icons/sunset.svg" :title="sunset" text="Sunset"
          >345</WeatherBlock
        >
        <WeatherBlock
          icon="/icons/daytime.svg"
          :title="dayLong"
          text="Daytime"
        />
        <CarouselComponent
          v-if="nextWeekWeatherData"
          :next-week-weather="nextWeekWeatherData"
        />
      </div>
      <p v-else>Empty data</p>
    </div>
    <LoadingComponent v-else />
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
      slideLeftPosition: 0,
    }
  },
  computed: {
    ...mapGetters('cities', [
      'list',
      'weatherData',
      'selectedCityId',
      'selectedCityCoordinates',
      'loading',
      'isNightNow',
      'weatherDataForWeek',
    ]),
    selectedCity: {
      get() {
        return this.selectedCityId
      },
      set(selectedCity) {
        this.updateSelectedCityId(selectedCity)
        // this.$store.commit('cities/UPDATE_SELECTED_CITY_ID', selectedCityId)
      },
    },
    cityCoordinates: {
      get() {
        return this.selectedCityCoordinates
      },
      set() {
        const res = this.list.find((item) => {
          return this.list.id === this.selectedCity
        })
        this.updateSelectedCityCoordinates(res)
        // this.$store.commit('cities/UPDATE_SELECTED_CITY_ID', selectedCityId)
      },
    },
    isNight: {
      get() {
        return this.isNightNow
      },
      set(isNightNow) {
        this.updateIsNightNow(isNightNow)
      },
    },
    dataLoading() {
      return this.loading
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
    nextWeekWeatherData() {
      return this.getWeatherForWeek()
    },
  },

  watch: {
    selectedCityId: {
      handler() {
        this.fetchWeather()
      },
      immediate: true,
    },
    weatherData: {
      handler() {
        this.checkTimeNow()
      },
    },
    nextWeekWeatherData: {
      handler() {
        this.getWeatherForWeek()
      },
    },
  },
  methods: {
    ...mapActions('cities', [
      'getWeatherData',
      'updateSelectedCityId',
      'updateIsNightNow',
      'getWeatherDataForWeek',
      'updateSelectedCityCoordinates',
    ]),
    fetchWeather() {
      // Promise.all([this.getWeatherData(), this.getWeatherDataForWeek()])
      Promise.resolve()
        .then(this.getWeatherData())
        .then(this.getWeatherDataForWeek())
    },
    getNumbersDifference(firstArg, secondArg) {
      return firstArg - secondArg
    },
    getTimeFromDate(arg) {
      const date = typeof arg !== 'object' ? this.getDate(arg) : arg
      const timeHours = date.getHours()
      const timeMinutes = date.getMinutes()
      console.log(this.nextWeekWeatherData, 'weatherDataForWeek')
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
    checkTimeNow() {
      if (this.weatherData) {
        this.isNight = this.weatherData.dt - this.weatherData.sys.sunset > 0
      }
    },
    getWeatherForWeek() {
      if (this.weatherDataForWeek) {
        return this.weatherDataForWeek.map((item) => {
          return {
            date: this.getDate(item.dt),
            temp: item.temp,
            icon: item.weather[0].icon,
          }
        })
      }
      return null
    },
    setCoordinates() {
      const res = this.list.find((item) => {
        return this.list.id === this.selectedCity
      })
      this.updateSelectedCityCoordinates(res)
      // this.$store.commit('cities/UPDATE_SELECTED_CITY_ID', selectedCityId)
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
  overflow: hidden;
  @apply -mt-4 bg-white rounded-3xl;
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
  padding-top: 0.68rem;
  @apply px-4;

  &__text {
    text-align: left;
    @apply text-sm leading-4;
  }
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
