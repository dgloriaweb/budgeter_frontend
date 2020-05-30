<template>
  <div>
    <b-button v-b-toggle.collapse-1 variant="default">
      <span class="when-opened">
        <b-icon-caret-up></b-icon-caret-up>
      </span>
      <span class="when-closed">
        <b-icon-caret-down></b-icon-caret-down>
      </span>
      <h1>Balance</h1>
      <table>
        <tr>
          <td>GBP</td>
          <td>1,346.57</td>
        </tr>
        <tr>
          <td>HUF</td>
          <td>14,262.00</td>
        </tr>
      </table></b-button
    >
    <b-collapse id="collapse-1" class="mt-2">
      <b-card>
        <p class="card-text">
          HSBC 12345675 HSBC A1 current account GBP 86.57 X X HSBC 15436254 HSBC
          A2 savings account GBP 1240.00 X X
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
</style>
