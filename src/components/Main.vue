<template>
  <div>
    <div>
      <Balance />
    </div>
    <div>
      <TransactionsList />
    </div>
  </div>
</template>

<script>
import Balance from './Balance'
import TransactionsList from './TransactionsList'

export default {
  components: {
    Balance,
    TransactionsList,
  },
}
</script>

<style scoped></style>
