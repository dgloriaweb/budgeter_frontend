<template>
  <div>
    <input type="checkbox" id="chk1" v-model="results[0].checkbox_test"/>
    <label for="chk1">my checkbox</label>
    <h1>Balance</h1>
    <!-- result balance aggregate -->
    <!-- currency list aggregate end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: {},
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      try {
        const res = await fetch(
          `https://my-json-server.typicode.com/dgloriaweb/budgeter_frontend/results`
        )
        const results = await res.json()
        this.results = results
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
