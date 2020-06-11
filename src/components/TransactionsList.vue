<template>
  <div>
    <!-- START Transaction bit starts here -->

    <h1>Transactions</h1>
    <table class="my-table">
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td style="text-align:left">
          <small>{{ transaction.date }}</small>
        <br/>
          {{ transaction.description }}
        </td>
        <td style="text-align:right">
          {{ transaction.amount | toFloat }}
        </td>
        <td style="text-align:right">
          123456.00
        </td>

        <td>
          <b-icon-eye
            v-b-toggle="'collapse-1-side' + transaction.id"
            class="eye"
          />
      

        </td>
        <b-collapse
          :id="'collapse-1-side' + transaction.id"
          style="grid-column:1/6;"
        >
          <Transaction :transaction="transaction" />
        </b-collapse>
      <!-- END Transaction bit ends here -->
    </tr>
    
  </table>
  </div>
</template>

<script>
import Transaction from './Transaction.vue'
// import json from '../../db.json'

export default {
  name: 'TransactionsList',
  data() {
    return {
      // db_json: json.computed_transactions,
      transactions: [],
    }
  },
  // DON'T DELETE!!! keep this for the real API !!!
  created: function() {
    this.fetchData()
  },
  methods: {
    // DON'T DELETE!!! keep this for the real API !!!
    fetchData: async function() {
      try {
        const res = await fetch(
          // `https://my-json-server.typicode.com/dgloriaweb/budgeter_frontend/db`
          `https://babiwes.com/budgeter/public/api/accounts`
        )
        const db = await res.json()
        this.transactions = db.transactions
      } catch (e) {
        console.log(e)
      }
    },
  },
  components: {
    Transaction,
  },
}
</script>

<style scoped>

.my-table {
  width:100%;
  max-width:30rem;
  margin:auto;
}
.my-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.my-table td{
  /* border: 1px solid black; */
  max-width:4rem;
  font-size:0.8rem;
  vertical-align:top;
  padding-bottom:1rem;
}
</style>
