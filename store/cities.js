export const state = () => ({
  list: [
    { label: 'Taganrog', value: '484907' },
    { label: 'Rostov-on-Don', value: '501175' },
    { label: 'Moscow', value: '524901' },
  ],
  selectedCityId: '484907',
  weatherData: null,
  loading: false,
  isNightNow: false,
})

export const getters = {
  list: (state) => {
    return state.list
  },

  weatherData: (state) => {
    return state.weatherData
  },

  selectedCityId: (state) => {
    return state.selectedCityId
  },

  loading: (state) => {
    return state.loading
  },

  isNightNow: (state) => {
    return state.isNightNow
  },
}

export const mutations = {
  UPDATE_SELECTED_CITY_ID(state, id) {
    state.selectedCityId = id
  },
  UPDATE_WEATHER_DATA(state, weatherData) {
    state.weatherData = weatherData
  },
  UPDATE_IS_NIGHT_NOW(state, data) {
    state.isNightNow = data
  },
  UPDATE_LOADING(state, data) {
    state.loading = data
  },
}

export const actions = {
  updateSelectedCityId({ commit }, id) {
    commit('UPDATE_SELECTED_CITY_ID', id)
  },

  updateIsNightNow({ commit }, data) {
    commit('UPDATE_IS_NIGHT_NOW', data)
  },

  /**
   * function(param1, param2, ...paramN) {}
   * param1 = {} = { state, getters }
   * param2 = 123,
   * param3 = 'Str'
   */
  async getWeatherData({ state, commit }) {
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
}
