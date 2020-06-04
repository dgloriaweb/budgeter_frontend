<template>
  <div>
    <Balance />
    <TransactionsList />
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
