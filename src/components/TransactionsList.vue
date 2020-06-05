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

ul{
  list-style: none;
}
</style>
