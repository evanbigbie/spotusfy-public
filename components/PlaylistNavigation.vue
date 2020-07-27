<template>
  <skip-button :session-id="sessionId" :session-token="sessionToken" />
</template>

<script>
import SkipButton from './PlaylistButtons/Skip'
export default {
  components: { SkipButton },
  props: {
    sessionId: {
      default: '',
      type: String
    },
    sessionToken: {
      default: '',
      type: String
    }
  }
}
</script>
