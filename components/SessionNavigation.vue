<template>
  <div id="session-navigation">
    <b-button pill variant="success" style="color: white" @click="makeID">
      Create Session
    </b-button>
    <b-button v-b-modal.join-modal pill variant="success" style="color: white">
      Join Session
    </b-button>
  </div>
</template>

<script>

import * as sessionController from './SessionButtons/sessionController'

export default {

  methods: {
    async makeID () {
      await sessionController.setHost()
      await sessionController.makeId(this.$router)
    }
  }
}
</script>

<style scoped lang="scss">
#session-navigation {
  display: inline-flex;
  div {
    margin: 0 3% 0 3%;
  }
}
</style>
