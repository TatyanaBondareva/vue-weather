<template>
  <div class="w-1/2">
    <div class="today-date">
      <div class="today-date__text">
        {{ todayDateString }}
      </div>
      <div class="today-date__text">{{ currentTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentDateComponent',
  data() {
    return {
      intervalTime: null,
      currentTime: '',
    }
  },
  computed: {
    todayDate() {
      return new Date(Date.now())
    },
    todayDateString() {
      const date = this.todayDate
      return date.toDateString()
    },
  },
  mounted() {
    this.getCurrentTime()
  },
  methods: {
    getCurrentTime() {
      this.intervalTime = setInterval(() => {
        console.log('intervalTime')
        const date = new Date(Date.now())
        this.currentTime =
          date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }, 1000)
    },
  },
}
</script>

<!--<style scoped></style>-->
