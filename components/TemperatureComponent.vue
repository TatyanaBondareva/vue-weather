<template>
  <div class="weather-temperature">
    <div class="weather__block weather__block_temp">
      <span
        class="weather__big-text font-light text-6xl leading-tight leading-4"
        >{{ temp }}</span
      >
      <sup class="weather__temperature-sup-text text-2xl">°C</sup>
    </div>
    <div class="weather__block">
      <div class="weather__max-min weather__max-min_max">{{ maxTemp }}°C</div>
      <div class="weather__max-min weather__max-min_min">{{ minTemp }}°C</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemperatureComponent',
  props: {
    temp: { type: [String, Number] },
    minTemp: { type: [String, Number] },
    maxTemp: { type: [String, Number] },
  },
}
</script>

<style scoped>
.weather-temperature {
  justify-content: space-around;
  width: 66%;
  @apply flex;
}
</style>
