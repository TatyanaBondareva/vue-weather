<template>
  <div>
    <div v-if="todayDay" class="today-date">
      <div class="today-date__text">
        {{ todayDay }} {{ todayDayNumber }}.{{ todayMonth }}.{{ todayFullYear }}
      </div>
      <div class="today-date__text">{{ todayTimeNow }}</div>
    </div>
    <div :v-else="todayDay"></div>
  </div>
</template>

<script>
export default {
  name: 'CurrentDateComponent',
  props: {
    todayDay: String,
    todayDayNumber: Number,
    todayMonth: Number,
    todayFullYear: Number,
    todayTimeNow: String,
  },
}
</script>

<!--<style scoped></style>-->
