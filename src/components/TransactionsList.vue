<template>
  <div>
    <!-- START Transaction bit starts here -->

    <h1>Transactions</h1>

    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        <Transaction :transaction="transaction" />
      </li>
    </ul>

    <!-- END Transaction bit ends here -->
  </div>
</template>

<script>
import Transaction from './Transaction.vue'

export default {
  name: 'TransactionsList',
  data() {
    return {
      transactions: [],
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData: async function() {
      try {
        const res = await fetch(
          `https://my-json-server.typicode.com/dgloriaweb/budgeter_frontend/db`
        )
        const db = await res.json()
        this.transactions = db.transactions
      } catch (e) {
        console.log(e)
      }
    },
  },
  components:
  {
      Transaction
  }
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
  text-align: left;
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
.grid-item3 {
  padding: 0.5rem;
}
</style>
