<template lang="pug">
  .card
    paper-table(title="Payments" :data="payments")


</template>

<script>
  import contract from '@/contract'
  import PaperTable from 'components/UIComponents/PaperTable.vue'

  export default {
    components: {
      PaperTable
    },
    async beforeMount () {
      this.payments = await contract.payments()
      console.log('this.payments', this.payments)
    },
    data () {
      return {
        payments: []
      }
    }
  }
</script>
