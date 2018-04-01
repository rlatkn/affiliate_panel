<template lang="pug">
  .card
    .header
      h4.title Register partner

    .content
      p.text-muted You must be authorized in Metamask/Mist
      form(@submit="register")
        button.btn.btn-info.btn-fill(type="submit" :disabled="!ready") Register

    .content(v-if="ref")
      fg-input(type="text" label="Your referral link" :value="refLink" readonly)
      
</template>

<script>
  import contract from '@/contract'
  export default {
    data () {
      return {
        ref: null
      }
    },
    computed: {
      ready () {
        return true
      },
      refLink () {
        return `https://panel.marquiz.ru?ref=${this.ref}`
      }
    },
    methods: {
      register () {
        if (!this.ready) return
        contract.registerAgent().then(res => {
          console.log(res)
          // TODO remove fake id
          this.ref = 3
        }).catch(e => {
          console.log(e)
          if (e instanceof Error) {
            // TODO parse error message
            // this.$notifications.notify({
            //   message: e.message,
            //   type: 'danger'
            // })
          }
        })
      }
    }
  }
</script>
