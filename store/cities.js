export const state = () => ({
  list: [
    {
      label: 'Taganrog',
      value: '484907',
      coordinates: { lat: 47.2362, lon: 38.8969 },
    },
    {
      label: 'Rostov-on-Don',
      value: '501175',
      coordinates: { lat: 47.2364, lon: 39.7139 },
    },
    {
      label: 'Moscow',
      value: '524901',
      coordinates: { lat: 55.7522, lon: 37.6156 },
    },
  ],
  selectedCityId: '484907',
  // selectedCityCoordinates: { lat: 47.2362, lon: 38.8969 },
  weatherData: null,
  loading: false,
  isNightNow: false,
  coordinates: { lat: 47.2362, lon: 38.8969 },
  weatherDataForWeek: null,
})

export const getters = {
  list: (state) => {
    return state.list
  },

  weatherData: (state) => {
    return state.weatherData
  },

  weatherDataForWeek: (state) => {
    return state.weatherDataForWeek
  },

  selectedCityId: (state) => {
    return state.selectedCityId
  },

  selectedCityCoordinates: (state, getters) => {
    const id = getters.selectedCityId
    const obj = state.list.find((item) => {
      return item.id === id
    })
    return obj.coordinates
  },

  loading: (state) => {
    return state.loading
  },

  isNightNow: (state) => {
    return state.isNightNow
  },

  coordinates: (state) => {
    return state.coordinates
  },
}

export const mutations = {
  UPDATE_SELECTED_CITY_ID(state, id) {
    state.selectedCityId = id
  },
  UPDATE_WEATHER_DATA(state, weatherData) {
    state.weatherData = weatherData
  },
  UPDATE_WEATHER_DATA_FOR_WEEK(state, weatherDataForWeek) {
    state.weatherDataForWeek = weatherDataForWeek
  },
  UPDATE_IS_NIGHT_NOW(state, data) {
    state.isNightNow = data
  },
  UPDATE_LOADING(state, data) {
    state.loading = data
  },
  UPDATE_COORDINATES(state, obj) {
    state.selectedCityCoordinates = obj
  },
}

export const actions = {
  updateSelectedCityId({ commit }, id) {
    commit('UPDATE_SELECTED_CITY_ID', id)
  },

  updateSelectedCityCoordinates({ commit }, obj) {
    commit('UPDATE_COORDINATES', obj)
  },

  async getWeatherData({ state, commit, getters }) {
    try {
      commit('UPDATE_LOADING', true)
      const response = await this.$axios.$get('/data/2.5/weather', {
        params: {
          id: state.selectedCityId,
          appid: this.$config.WEATHER_API_KEY,
          units: 'metric',
        },
      })
      commit('UPDATE_WEATHER_DATA', response)
    } catch (e) {
      commit('UPDATE_WEATHER_DATA', null)
    } finally {
      commit('UPDATE_LOADING', false)
    }
  },

  async getWeatherDataForWeek({ state, commit }) {
    try {
      const response = await this.$axios.$get('/data/2.5/onecall', {
        params: {
          lat: state.selectedCityCoordinates.lat,
          lon: state.selectedCityCoordinates.lon,
          exclude: 'alerts,current,hourly,minutely',
          appid: this.$config.WEATHER_API_KEY,
          units: 'metric',
        },
      })
      const { daily } = response
      console.log('daily', daily)
      commit('UPDATE_WEATHER_DATA_FOR_WEEK', daily)
      console.log(response)
    } catch (e) {
      commit('UPDATE_WEATHER_DATA_FOR_WEEK', null)
    }
  },

  updateIsNightNow({ commit }, data) {
    commit('UPDATE_IS_NIGHT_NOW', data)
  },
}
