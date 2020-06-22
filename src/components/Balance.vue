<template>
  <div>
    <h1>Balance</h1>
    <div v-for="account_group in account_groups" :key="account_group.id" git add>
      <!-- result balance sum per account_group -->
      <b-button
        v-b-toggle="'collapse-1' + account_group.id"
        variant="outline-primary"
        class="account_group-button"
      >
        <div class="grid-container-balance">
          <div class="grid-item-balance1">{{ account_group.currency_code }}</div>
          <div class="grid-item-balance2">{{ account_group.sum | toFloat }}</div>
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
        <div class="grid-item-accounts" v-for="account in account_group.accounts" :key="account.id">
          <b-collapse :id="'collapse-1' + account_group.id" class="mt-2 accounts-collapse">
            <div>{{ account.account_nick }}</div>
            <div>{{ account.account_type_id }}</div>

            <b-form-checkbox
              :checked="!!account.show_in_main_balance"
              name="account.show_in_main_balance"
              switch
              size="sm"
              @change="checkbox_modified(account.id,'show_in_main_balance',$event)"
            >show in main balance</b-form-checkbox>
            <b-form-checkbox
              :checked="!!account.show_in_transactions_balance"
              name="account.show_in_transactions_balance"
              switch
              size="sm"
              @change="checkbox_modified(account.id,'show_in_transactions_balance',$event)"
            >show in transactions balance</b-form-checkbox>
            <div class="amount">
              <label for="balance">Balance:</label>
              <input type="text" v-model="account.balance.amount" @blur="edit_amount(account.id,$event)" />
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
const groups_api_url =
  "http://localhost/budgeter_api_v1/public/api/account_groups";

//live server api
// const groups_api_url = "https://babiwes.com/budgeter/public/api/account_groups";

//local accounts api
const accounts_api_url = "http://localhost/budgeter_api_v1/public/api/accounts";

//live server api
// const accounts_api_url = "https://babiwes.com/budgeter/public/api/accounts";

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
          // `http://localhost/budgeter_api_v1/public/api/account_groups`
          // `https://babiwes.com/budgeter/public/api/account_groups`
          groups_api_url
        );
        const db = await res.json();
        this.account_groups = db.account_groups;
      } catch (e) {
        console.log(e);
      }
    },

    //does this require validation?
    checkbox_modified: function(account_id, chk_name, event) {
      if (typeof e !== "undefined") {
        var post_url = accounts_api_url + "/" + account_id;
        const data = {
          [chk_name]: event
        };

        fetch(post_url, {
          body: JSON.stringify(data),
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          }
        });
        console.log(event);
      }
    },
    edit_amount: function(account_id,event){
      if(typeof account_id !== "undefined"){
        //set the amount for this account
        var post_url = accounts_api_url + "/" + account_id;
        const data = {
          "amount": event.target.value
        };

        fetch(post_url, {
          body: JSON.stringify(data),
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          }
        });
        console.log(event);
      }
    }

  }
};
</script>

<style scoped>
.b-icon {
  font-size: 2rem;
}
.account_group-button {
  min-width: 15rem;
  border: 0.2rem 0.2rem 0 0;
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
.btn-outline {
  padding: 0.1rem;
  color: #20c997;
}
</style>
