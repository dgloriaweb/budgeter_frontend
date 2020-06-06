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
          {{ transaction.amount | to-float }}
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  max-width: 40rem;
  border: 1px solid black;
  /* font-size: 1rem; */
}
.grid-container > div {
  border: 1px solid black;
  border: none;
}
.grid_item_amount {
  text-align: right;
}
.grid-item1 {
  text-align: left;
}
.grid-item2 {
  text-align: right;
}
</style>
