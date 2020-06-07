<template>
  <div>
    <!-- START Balance bit starts here -->
    <h1>Balance</h1>
    <div v-for="currency in db_json" :key="currency.id" class="container">
      <!-- result balance aggregate -->
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
          <b-icon-caret-up></b-icon-caret-up>
        </span>
        <span class="when-closed">
          <b-icon-caret-down></b-icon-caret-down>
        </span>
      </b-button>
      <!-- grid accounts collapse/expand -->
      <div
        v-for="account in currency.accounts"
        :key="account.id_account"
        class="container"
      >
        <b-collapse
          :id="'collapse-1' + currency.id"
          class="mt-2 accounts-collapse"
        >
          <div class="grid-container">
            <div class="grid-item1">{{ account.acc_nick }}</div>
            <div class="grid-item2">{{ account.acc_type }}</div>
            <div class="grid_item_amount">
              {{ account.amount | toFloat }}
            </div>
            <div class="grid-item3">
              <b-icon-gear-fill
                v-b-toggle="
                  'collapse-1-inner' + currency.id + '-' + account.id_account
                "
                class="gear"
              />
            </div>
            <b-collapse
              :id="'collapse-1-inner' + currency.id + '-' + account.id_account"
              style="grid-column:1/5;"
            >
              <div class="grid_item_main_balance_check_button1">
                <div class="grid-item4">
                  Account number: {{ account.acc_number }}
                </div>

                <b-form-checkbox
                  v-model="account.show_in_main_balance"
                  name="account.show_in_main_balance"
                  switch
                  size="sm"
                >
                  show in main balance
                </b-form-checkbox>
              </div>
              <div class="grid_item_transactions_balance_check_button1">
                <b-form-checkbox
                  v-model="account.show_in_transactions_balance"
                  name="account.show_in_transactions_balance"
                  switch
                  size="sm"
                >
                  show in transactions balance
                </b-form-checkbox>
              </div>
            </b-collapse>
          </div>
        </b-collapse>
      </div>
      <!-- currency list aggregate end -->
    </div>
    <!-- END Balance bit ends here -->
  </div>
</template>

<script>
import json from '../../db.json'
export default {
  data() {
    return {
      db_json: json.currencies,
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
    //     this.currencies = db.currencies
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
  },
}
</script>

<style scoped>
/* .container{

} */
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
.grid-item-balance2 {
  text-align: right;
}
/* grid accounts */
.grid-container {
  margin: auto;
  padding: 0.3rem;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.2rem;
  grid-template-columns: 3fr 5fr 4fr 1fr;
  text-align: left;
  max-width: 40rem;
  /* border: 1px solid black; */
}
.grid-container > div {
  /* border: 1px solid black; */
  border: none;
}
.grid_item_amount {
  text-align: right;
}
.grid-item4 {
  padding: 0.5rem;
}

.gear {
  outline: none;
}
</style>
