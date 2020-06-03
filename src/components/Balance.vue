<template>
  <div>
    <h1>Balance</h1>
    <!-- result balance aggregate -->
    <div v-for="(currency,mainindex) in currencies" :key="currency.id" class="container">
      <!-- accounts list  -->
      <b-button v-b-toggle.collapse-1 variant="outline-primary">
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
        v-for="(account, subindex) in currency.accounts"
        :key="account.id_account"
        class="container"
      >
        <b-collapse id="collapse-1" class="mt-2 accounts-collapse">
          <div class="grid-container">
            <div class="grid-item1">{{ account.acc_nick }}</div>
            <div class="grid-item2">{{ account.acc_type }}</div>
            <div class="grid-item3">{{ account.acc_number }}</div>
            <div class="grid_item_amount">{{ account.amount }}</div>
            <div class="grid-item9">
              <b-icon-gear-fill
                v-b-toggle="'collapse-1-inner' + mainindex+'-'+subindex"
                class="gear"
              />
            </div>
            <b-collapse :id="'collapse-1-inner'  + mainindex+'-'+ subindex">
              <div class="grid_item_main_balance_check_button1">
                <b-form-checkbox
                  :v-model="account.show_in_main_balance"
                  name="account.show_in_main_balance"
                  switch
                  size="sm"
                >
                  show in main balance
                </b-form-checkbox>
              </div>
              <div class="grid_item_expenses_balance_check_button1">
                <b-form-checkbox
                  :v-model="account.show_in_expenses_balance"
                  name="account.show_in_expenses_balance"
                  switch
                  size="sm"
                >
                  show in expenses balance
                </b-form-checkbox>
              </div>
            </b-collapse>
          </div>
        </b-collapse>
      </div>
      <!-- grid accounts collapse/expand end -->
      <!-- accounts list end -->
    </div>
    <!-- currency list aggregate end -->
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
