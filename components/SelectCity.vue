<template>
  <div class="select-wraapper">
    <select v-model="currentCityValue" class="select">
      <option v-for="item in options" :key="item.label" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectCity',
  props: {
    options: { type: Array, default: () => [] },
    value: { type: String, default: '' },
  },
  data() {
    return {
      currentCityValue: this.value,
    }
  },

  watch: {
    currentCityValue() {
      this.$emit('input', this.currentCityValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.select-wraapper {
  align-self: flex-end;
  position: relative;
  top: 0;
  border-top-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  @apply relative bg-gray-200 p-0;

  &::before {
    content: '';
    right: 4px;
    background-image: url('../static/icons/places.svg');
    background-size: 0.6rem;
    background-position: center;
    background-repeat: no-repeat;
    @apply absolute inset-y-0 w-8;
  }
}

.select {
  outline: none;
  appearance: none;
  cursor: pointer;
  font-family: 'Barlow', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #0da0ea;
  border-top-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  @apply bg-gray-200 p-3 px-10;
}
</style>
