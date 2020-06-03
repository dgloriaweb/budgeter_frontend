<template>
  <div>
        <div v-for="(currency,mainindex) in currencies" :key="currency.id" class="container">

    <input type="checkbox" id="chk1" v-model="currencies[mainindex].checkbox_test"/>
    <label for="chk1">my checkbox</label>
    <h1>Balance</h1>
    <!-- result balance aggregate -->
    
    <!-- currency list aggregate end -->
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencies: {},
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      try {
        const res = await fetch(
          `https://my-json-server.typicode.com/dgloriaweb/budgeter_frontend/currencies`
        )
        const currencies = await res.json()
        this.currencies = currencies
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

.accounts-collapse {
  background: azure;
}

/* grid */
.grid-container {
  margin: auto;
  padding: 0.3rem;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.2rem;
  grid-template-columns: auto auto auto auto auto;
  text-align: left;
  max-width: 40rem;
  /* border: 1px solid black; */
}
.grid-container > div {
  /* border: 1px solid black; */
}
.grid_item_amount {
  text-align: right;
}
#collapse-1-inner {
  grid-column-start: 1;
  grid-column-end: 6;
}
.gear {
  outline: none;
}
</style>
