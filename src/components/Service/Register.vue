<template lang="pug">
  .card
    .header
      h4.title Register service

    .content
      p.text-muted You must be authorized in Metamask/Mist
      form(@submit="register")
        fg-input(type="text" label="Comission, %" v-model="comission")
        button.btn.btn-info.btn-fill(type="submit" :disabled="!ready") Register
      
</template>

<script>
  import contract from '@/contract'
  export default {
    data () {
      return {
        comission: null
      }
    },
    computed: {
      ready () {
        return !!this.comission
      }
    },
    methods: {
      register () {
        if (!this.ready) return
        contract.registerService(this.comission).then(res => {
          console.log(res)
        }).catch(e => {
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
