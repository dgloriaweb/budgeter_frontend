<template>
  <div>
    
    <h1>Balance</h1>
    <!-- currency balance aggregate -->
    <div v-for="account in accounts" :key="account.id" class="container">
      <!-- accounts list  -->
      <b-button v-b-toggle.collapse-1 variant="outline-primary">
        <span class="when-opened">
          <b-icon-caret-up></b-icon-caret-up>
        </span>
        <span class="when-closed">
          <b-icon-caret-down></b-icon-caret-down>
        </span>

        {{account.currency}} {{account.balance}}
      </b-button>

      <!-- grid accounts collapse/expand -->
      <b-collapse id="collapse-1" class="mt-2 accounts-collapse">
        <div class="grid-container">
          <div class="grid-item1">HSBC A1</div>
          <div class="grid-item2">current account</div>
          <div class="grid-item3">GBP</div>
          <div class="grid_item_amount">86.57</div>
          <div class="grid-item9">
            <b-icon-gear-fill v-b-toggle.collapse-1-inner class="gear" />
          </div>
          <b-collapse id="collapse-1-inner">
            <div class="grid_item_main_balance_check_button1">
              <b-form-checkbox
                v-model="main_balance_check_button1"
                name="main_balance_check_button1"
                switch
                size="sm"
              >
                show in main balance
              </b-form-checkbox>
            </div>
            <div class="grid_item_expenses_balance_check_button1">
              <b-form-checkbox
                v-model="expenses_balance_check_button1"
                name="expenses_balance_check_button1"
                switch
                size="sm"
              >
                show in expenses balance
              </b-form-checkbox>
            </div>
          </b-collapse>
        </div>
      </b-collapse>
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
      main_balance_check_button1: true,
      expenses_balance_check_button1: false,
      accounts:{}
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
        const accounts = await res.json()
        this.accounts = accounts
      } catch (e) {
        console.log(e)
      }
    },
  }
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
