<template>
  <div>
    <!-- START Transaction bit starts here -->

    <h1>Transactions</h1>

    <div
      class="grid-container"
      v-for="transaction in db_json"
      :key="transaction.id"
    >
      <div class="grid-item1">
        {{ transaction.date }}
      </div>

      <div class="grid-item2">
        {{ transaction.description }}
      </div>
      <div class="grid-item3">
        {{ transaction.amount | toFloat }}
      </div>
      <div class="grid-item4">
        123456.00
      </div>
      
      <div class="grid-item5">

      <b-icon-eye
        v-b-toggle="'collapse-1-side' + transaction.id "
        class="eye"
      />
      </div>

      <b-collapse
        :id="'collapse-1-side' + transaction.id "
              style="grid-column:1/6;"
        >
        <Transaction :transaction="transaction" />
      </b-collapse>
    </div>

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
/* grid */
.grid-container {
  margin: auto;
  padding: 0.3rem;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.2rem;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  max-width: 40rem;
}
</style>
