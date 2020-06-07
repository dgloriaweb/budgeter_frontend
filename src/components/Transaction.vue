<template>
  <div>
    <div class="grid-container">
      <div class="grid-item">
        {{ transaction.currency }}
      </div>
      <div class="grid-item">
        {{ transaction.account }}
      </div>
      <div class="grid-item">
        {{ transaction.date }}
      </div>
      <div class="grid-item">
        {{ transaction.description }}
      </div>
      <div class="grid-item">
        {{ transaction.amount }}
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
  border:1px solid black;
  margin: auto;
  padding: 0.3rem;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  /* max-width: 40rem; */
}

.grid-item1,
.grid-item2 {
  text-align: left;
}
.grid-item3,
.grid-item4 {
  text-align: right;
}
</style>
