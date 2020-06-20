<template>
  <div>
    <h1>Balance</h1>
    <div v-for="currency in account_groups" :key="currency.id" git add>
      <!-- result balance sum per currency -->
      <b-button
        v-b-toggle="'collapse-1' + currency.id"
        variant="outline-primary"
        class="currency-button"
      >
        <div class="grid-container-balance">
          <div class="grid-item-balance1">{{ currency.currency_code }}</div>
          <div class="grid-item-balance2">{{ currency.sum | toFloat }}</div>
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
        <div class="grid-item-accounts" v-for="account in currency.accounts" :key="account.id">
          <b-collapse :id="'collapse-1' + currency.id" class="mt-2 accounts-collapse">
            <div>{{ account.account_nick }}</div>
            <div>{{ account.account_type_id }}</div>

            <b-form-checkbox
              :checked="!!account.show_in_main_balance"
              name="account.show_in_main_balance"
              switch
              size="sm"
              @change="check_show_in_main_balance(account.id,$event)"
            >show in main balance</b-form-checkbox>
            <b-form-checkbox
              :checked="!!account.show_in_transactions_balance"
              name="account.show_in_transactions_balance"
              switch
              size="sm"
              @change="check_show_in_transactions_balance(account.id,$event)"
            >show in transactions balance</b-form-checkbox>
            <div class="amount">
              <strong>Balance: {{ account.balance.amount | toFloat }}</strong>
            </div>
          </b-collapse>
        </div>
      </div>
      <!-- account list end -->
    </div>
  </div>
</template>

<script>
//local server api
//const api_url = "http://localhost/budgeter_api_v1/public/api/accounts";

//live server api
const api_url = "https://babiwes.com/budgeter/public/api/accounts";
export default {
  data() {
    return {
      account_groups: []
    };
  },
  // DON'T DELETE!!! keep this for the real API !!!
  created: function() {
    this.fetchData();
  },
  methods: {
    // DON'T DELETE!!! keep this for the real API !!!
    // get the accounts list from the api
    fetchData: async function() {
      try {
        const res = await fetch(
          // `http://localhost/budgeter_api_v1/public/api/accounts`
          // `https://babiwes.com/budgeter/public/api/accounts`
          api_url
        );
        const db = await res.json();
        this.account_groups = db.account_groups;
      } catch (e) {
        console.log(e);
      }
    },

    check_show_in_main_balance: function($account_id, e) {
      var post_url =
        api_url + "/" + $account_id;
      const data = {
        id: $account_id,
        fieldname: "show_in_main_balance",
        fieldvalue: e
      };
      fetch(post_url, {
        body: JSON.stringify(data),
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        }
      });
    },

    check_show_in_transactions_balance: function($account_id, e) {
      var post_url =
        api_url + "/" + $account_id;
      const data = {
        id: $account_id,
        fieldname: "show_in_transactions_balance",
        fieldvalue: e
      };
      fetch(post_url, {
        body: JSON.stringify(data),
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        }
      });
    }
  }
};
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
