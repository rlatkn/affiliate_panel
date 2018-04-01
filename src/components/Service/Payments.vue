<template lang="pug">
  .card
    paper-table(title="Payments" :data="payments" :columns="columns")

</template>

<script>
  import contract from '@/contract'
  import PaperTable from 'components/UIComponents/PaperTable.vue'

  export default {
    components: {
      PaperTable
    },
    async beforeMount () {
      const agent = 0
      this.payments = await contract.agentPayments(agent)
    },
    data () {
      return {
        payments: [],
        columns: ['amount', 'service', 'agent']
      }
    }
  }
</script>
