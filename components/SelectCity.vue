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
  top: -32px;
  @apply relative;
  &::before {
    content: '';
    background-image: url('../static/icons/places.svg');
    background-size: 1em;
    background-position: center;
    background-repeat: no-repeat;
    @apply absolute inset-y-0 right-0 w-10;
  }
}

.select {
  outline: none;
  appearance: none;
  cursor: pointer;
  border-top-right-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
  @apply bg-gray-200 text-blue-600 p-3 pr-10;
}
</style>
