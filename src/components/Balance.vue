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
        <!-- grid account -->
        <div class="grid-container">
          <div class="item1">HSBC</div>
          <div class="item2">12345675</div>
          <div class="item3">HSBC A1</div>
          <div class="item4">current account</div>
          <div class="item5">GBP</div>
          <div class="item6">86.57</div>
        </div>
        <!-- grid end -->
        <b-form-checkbox
          v-model="hsbc_a1"
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
      


    </b-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hsbc_a1: false,
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

/* grid */
.grid-container {

  margin:auto;
  padding:0.3rem;
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.2rem;
  grid-template-columns: auto auto auto auto;
  text-align:left;
  max-width: 40rem;
  border:1px solid black;

}
.grid-container > div {
  border:1px solid black;
  /* max-width:10rem; */
}
.item2 {
  grid-column-start: 2;
  grid-column-end: 5;
}
.item6 {
  text-align: right;
}

</style>
