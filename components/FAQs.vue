<template>
  <div class="container">
    <div class="faqs">
      <h1 class="bold">
        {{ msg }}
        <br>
      </h1>
      <h5 class="Q">
        Q: Do I need to be signed into my Spotify account to use the app?
      </h5>
      <h5 class="A">
        A: Only the person hosting the session needs to authenticate their account through Spotify.
        Guests only need to be signed into the Spotusfy app to join a session and at that point can
        search and play music through the host's Spotify account via the Spotusfy app's search bar.
      </h5>
      <h5 class="Q">
        Q: How do I create a new session?
      </h5>
      <h5 class="A">
        A: Click the 'Create Session' button and log in with your existing Spotify account information.
      </h5>
      <h5 class="Q">
        Q: How do I join an existing session?
      </h5>
      <h5 class="A">
        A: Have a friend tell you the name they gave their existing session and join it without needing an
        invite using the 'Join Session' button
      </h5>
      <h5 class="Q">
        Q: How do I invite people to join a session?
      </h5>
      <h5 class="A">
        A: Once you have created or joined a session you can invite friends to join by their usernames via the
        'Invite People' tab.
      </h5>
      <h5 class="Q">
        Q: How do I search for music in the app?
      </h5>
      <h5 class="A">
        A: Spotusfy leverages Spotify's API through the session host's account,
        so that hosts *and* guests can search Spotify's music library by
        simply searching within a Spotusfy app session the same way they normally would in Spotify.
      </h5>
      <h5 class="Q">
        Q: How do I add a song I want to play to the shared queue?
      </h5>
      <h5 class="A">
        A: Once you have searched for and located a song you want to play simply press the 'Add Song' button and it will be added to the
        end of the shared queue.
      </h5>
      <h5 class="Q">
        Q: Can I remove a song from the play queue?
      </h5>
      <h5 class="A">
        A: Yes, but users may only remove songs that they themselves have added. To do this simply
        click the 'Remove Song' button in your personal queue.
      </h5>
      <h5 class="Q">
        Q: Can I skip or restart songs that are playing?
      </h5>
      <h5 class="A">
        A: Only hosts have access to play/pause and previous/next controls. (See next question re: voting)
      </h5>
      <h5 class="Q">
        Q: What if I really don't want to hear a song that someone else has added to the queue?
      </h5>
      <h5 class="A">
        A: Spotusfy utilizes a voting system that allows a democratic means of overriding another user's
        song choices. Pressing a 'Downvote' button next to a song in the shared queue will record your vote
        to remove it. If half or more of session members downvote the same song, it is deleted from the
        queue.
      </h5>
      <h5 class="Q">
        Q: What features of Spotify are available to me when using the Spotusfy app?
      </h5>
      <h5 class="A">
        A: In addition to full music search capabilities, Spotusfy also keeps users abreast of current music
        trends by sharing Spoitfy sections such as New Releases and Discover.
      </h5>
      <h5 class="back">
        <a :href="'/home'">Back to Home</a>
      </h5>
      <br><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQs',
  props: {
    msg: {
      type: String,
      default: 'FAQs:'
    }
  }
}
</script>

<style scoped>
  .faqs {
    margin-top: 60px;
  }
  .bold {
    margin-top: 70px;
    margin-bottom: 40px;
    font-weight: 840;
  }
  .charcoal {
    color:dimgray
  }
  .Q {
    font-weight: 850;
    margin-top: 30px;
    text-align: float-left;
  }
  .A {
    margin: 20px;
    margin-left: 40px;
    margin-right: 40px;
    text-align: float-left;
    color:dimgray
  }
  .back {
    margin: 40px;
    font-weight: 840;
  }
</style>
