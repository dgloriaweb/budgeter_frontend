<template>
  <div>
    <h1>Balance</h1>
    <b-button v-b-toggle.collapse-1 variant="outline-primary">
      <span class="when-opened">
        <b-icon-caret-up></b-icon-caret-up>
      </span>
      <span class="when-closed">
        <b-icon-caret-down></b-icon-caret-down>
      </span>
      
      GBP 1,346.57
    </b-button>

    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <p class="card-text">
          HSBC 12345675
          <br />
          HSBC A1 current account GBP 86.57

          <b-form-checkbox
            v-model="checked1"
            name="main-balance-check-button2"
            switch
          >
            show in main balance
          </b-form-checkbox>

          <br />
          <b-form-checkbox
            v-model="checked2"
            name="expenses-balance-check-button2"
            switch
          >
            show in expenses balance
          </b-form-checkbox>
        </p>
      </b-card>
    </b-collapse>

    <br />
    <b-button v-b-toggle.collapse-2 variant="outline-primary">
      <span class="when-opened">
        <b-icon-caret-up></b-icon-caret-up>
      </span>
      <span class="when-closed">
        <b-icon-caret-down></b-icon-caret-down>
      </span>
      HUF 14,262.00
    </b-button>

    <b-collapse id="collapse-2" class="mt-2">
      <b-card>
        <p class="card-text">
          HSBC 15436254
          <br />
          HSBC A2 savings account GBP 1240.00 X X
          <br />
          <b-form-checkbox
            v-model="checked3"
            name="main-balance-check-button2"
            switch
          >
            show in main balance
          </b-form-checkbox>

          <br />
          <b-form-checkbox
            v-model="checked4"
            name="expenses-balance-check-button2"
            switch
          >
            show in expenses balance
          </b-form-checkbox>
        </p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: true,
    }
  },
}
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
