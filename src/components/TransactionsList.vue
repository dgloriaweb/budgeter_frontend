<template>
  <div>
    <!-- START Transaction bit starts here -->

    <h1>Transactions</h1>

    <ul>
      <li
        class="list-group-item"
        v-for="transaction in db_json"
        :key="transaction.id"
      >
        <Transaction :transaction="transaction" />
      </li>
    </ul>

    <!-- END Transaction bit ends here -->
  </div>
</template>

<script>
import Transaction from './Transaction.vue'
import json from '../../db.json'

export default {
  name: 'TransactionsList',
  data() {
    return {
      db_json: json.computed_transactions,
      transactions: [],
    }
  },
  // DON'T DELETE!!! keep this for the real API !!!
  // created: function() {
  //   this.fetchData()
  // },
  methods: {
    // DON'T DELETE!!! keep this for the real API !!!
    // fetchData: async function() {
    //   try {
    //     const res = await fetch(
    //       `https://my-json-server.typicode.com/dgloriaweb/budgeter_frontend/db`
    //     )
    //     const db = await res.json()
    //     this.transactions = db.transactions
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
  },
  components: {
    Transaction,
  },
}
</script>

<style scoped>
.list-group-item {
  padding: 0.1rem;
}
ul {
  list-style: none;
  padding-inline-start: 0.1rem;
}
</style>
