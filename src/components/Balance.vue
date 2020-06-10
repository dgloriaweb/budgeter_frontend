<template>
  <div>
    <h1>Balance</h1>
    <div v-for="currency in currencies" :key="currency.id" git add>
      <!-- result balance sum per currency -->
      <b-button
        v-b-toggle="'collapse-1' + currency.id"
        variant="outline-primary"
        class="currency-button"
      >
        <div class="grid-container-balance">
          <div class="grid-item-balance1">
            {{ currency.code }}
          </div>
          <div class="grid-item-balance2">
            {{ currency.balance | toFloat }}
          </div>
        </div>
        <span class="when-opened">
          <b-icon-caret-up class="b-icon"></b-icon-caret-up>
        </span>
        <span class="when-closed">
          <b-icon-caret-down class="b-icon"></b-icon-caret-down>
        </span>
      </b-button>
      <!-- grid accounts collapse/expand -->
      <div class="grid-container-accounts p-2">
        <div
          class="grid-item-accounts"
          v-for="account in currency.accounts"
          :key="account.id_account"
        >
          <b-collapse
            :id="'collapse-1' + currency.id"
            class="mt-2 accounts-collapse"
          >
            <div>{{ account.acc_nick }}</div>
            <div>{{ account.acc_type }}</div>
            <div>Account number: {{ account.acc_number }}</div>
            <b-form-checkbox
              v-model="account.show_in_main_balance"
              name="account.show_in_main_balance"
              switch
              size="sm"
            >
              show in main balance
            </b-form-checkbox>
            <b-form-checkbox
              v-model="account.show_in_transactions_balance"
              name="account.show_in_transactions_balance"
              switch
              size="sm"
            >
              show in transactions balance
            </b-form-checkbox>
            <div class="amount">
              <strong>Balance: {{ account.amount | toFloat }}</strong>
            </div>
          </b-collapse>
        </div>
      </div>
      <!-- account list end -->
    </div>
  </div>
</template>

<script>
// import json from '../../db.json'
export default {
  data() {
    return {
      currencies: []
      // currencies: json.currencies,
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
        this.currencies = db.currencies
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.b-icon {
  font-size: 2rem;
}
.currency-button {
  min-width: 15rem;
  border: none;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

.grid-container-balance {
  grid-template-columns: 1fr 1fr;
  display: grid;
}
.grid-item-balance1 {
  text-align: left;
}
.grid-item-balance2 {
  text-align: right;
}
/* grid accounts outer for desktop*/
.grid-container-accounts {
  margin: auto;
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  max-width: 65rem;
  padding-bottom: 1rem;
  /* border: 1px dotted #333; */
}
.grid-item-accounts {
  margin: auto;
  max-width: 90%;
  /* border: 1px dotted #333; */
}
.amount {
  text-align: right;
}
</style>
