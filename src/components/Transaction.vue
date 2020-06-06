<template>
  <div>
    <div class="grid-container">
      <div class="grid-item1">
        08/06/2020
      </div>

      <div class="grid-item2">
        {{ transaction.description }}
      </div>
      <div class="grid-item3">
          {{ transaction.amount | toFloat }}
      </div>
      <div class="grid-item3">
          123456.00 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['transaction'],
}
</script>

<style scoped>
/* grid */
.grid-container {
  margin: auto;
  padding: 0.3rem;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.2rem;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  max-width: 40rem;
}
.grid_item_amount {
  text-align: right;
}
.grid-item1, .grid-item2 {
  text-align: left;
}
.grid-item3, .grid-item4 {
  text-align: right;
}
</style>
