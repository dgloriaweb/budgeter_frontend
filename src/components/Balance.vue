<template>
  <div>
    <h1>Balance</h1>
    <div v-for="currency in currencies" :key="currency.id" class="container">

      <!-- test checkbox -->
      <!-- <input type="checkbox" id="chk1" v-model="currency.checkbox_test" />
      <label for="chk1">my checkbox</label> -->

      <!-- result balance aggregate -->
      <b-button v-b-toggle="'collapse-1' +currency.id"  variant="outline-primary">
        <span class="when-opened">
          <b-icon-caret-up></b-icon-caret-up>
        </span>
        <span class="when-closed">
          <b-icon-caret-down></b-icon-caret-down>
        </span>

        {{ currency.code }} {{ currency.balance }}
      </b-button>
      <!-- grid accounts collapse/expand -->
      <div
        v-for="account in currency.accounts"
        :key="account.id_account"
        class="container"
      >
        <b-collapse :id="'collapse-1' +currency.id" class="mt-2 accounts-collapse">
          <div class="grid-container">
            <div class="grid-item1">{{ account.acc_nick }}</div>
            <div class="grid-item2">{{ account.acc_type }}</div>
            <!-- <div class="grid-item3">{{ account.acc_number }}</div> -->
            <div class="grid_item_amount">{{ account.amount }}</div>
            <div class="grid-item9">
              <b-icon-gear-fill
                v-b-toggle="'collapse-1-inner' +currency.id+'-'+ account.id_account"
                class="gear"
              />
            </div>
            <b-collapse :id="'collapse-1-inner' +currency.id+'-'+ account.id_account"  style="grid-column:1/6;">
              <div class="grid_item_main_balance_check_button1">
            <div class="grid-item3">Account number: {{ account.acc_number }}</div>

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
          `https://my-json-server.typicode.com/dgloriaweb/budgeter_frontend/db`
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
.grid-item3 {
  padding:0.5rem;
}

.gear {
  outline: none;
}
</style>
