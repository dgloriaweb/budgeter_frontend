<template>
  <div>
      <h1>Balance</h1>
    <b-button v-b-toggle.collapse-1 variant="default">
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
          <br/>
          HSBC A1 current account GBP 86.57 
          <br/>
          show in main balance X 
          <br/>
          show in expenses balance X
        </p>
      </b-card>
    </b-collapse>

    <br />
    <b-button v-b-toggle.collapse-2 variant="default">
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
          <br/>
          HSBC A2 savings account GBP 1240.00 X X
              <br/>
          show in main balance X 
          <br/>
          show in expenses balance X
    </p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

h1 {
    color: #965cd6;
}
</style>
