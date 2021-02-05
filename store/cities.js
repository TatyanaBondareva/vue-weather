export const state = () => ({
  list: [
    { label: 'Taganrog', value: '484907' },
    { label: 'Rostov-on-Don', value: '501175' },
    { label: 'Moscow', value: '524901' },
  ],
  selectedCityId: '484907',
  weatherData: null,
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
}

export const mutations = {
  UPDATE_SELECTED_CITY_ID(state, id) {
    state.selectedCityId = id
  },
  UPDATE_WEATHER_DATA(state, weatherData) {
    state.weatherData = weatherData
  },
}

export const actions = {
  updateSelectedCityId({ commit }, id) {
    commit('UPDATE_SELECTED_CITY_ID', id)
  },
  /**
   * function(param1, param2, ...paramN) {}
   * param1 = {} = { state, getters }
   * param2 = 123,
   * param3 = 'Str'
   */
  async getWeatherData({ state, commit }) {
    console.log('getWeatherData')
    try {
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
    }
  },
}
