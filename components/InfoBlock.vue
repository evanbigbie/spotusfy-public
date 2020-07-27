<template>
  <div class="page">
    <h1 class="title">
      spotusfy.com
    </h1>
    <div role="tablist" class="info-block">
      <b-card id="card" no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-if="!isActive" variant="basic" class="white-cover">
            Cover
          </b-button>
          <b-button
            id="toggle-button"
            v-b-toggle.accordion-1
            href="#"
            onclick="this.blur()"
            @click="isActive= !isActive"
          >
            <span class="when-opened">&#215;</span> <span class="when-closed">Site Info</span>
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <h5 class="description">
            Spotusfy is a simple app you can use to share music control of an existing Spotify account with your friends! Sessions are created and joined which allow members to search for and add desired songs directly from Spotify into a shared playlist. You can:
          </h5>
          <h6 class="lil-headings">
            Start a New Session:
          </h6>
          <h6 class="lil-text">
            Click the 'Create Session' tab and log in with your existing Spotify account information (first you'll need to <span class="green">Connect with Spotify</span>)
          </h6>
          <h6 class="lil-headings">
            Join an Existing Session:
          </h6>
          <h6 class="lil-text">
            Have a friend tell you the name they gave their existing session and join it without needing an invite using the 'Join Session' button
          </h6>
          <h6 class="lil-headings">
            Invite Friends to Join:
          </h6>
          <h6 class="lil-text2">
            Once you are in a session you can invite friends to join by their usernames via the 'Invite People' tab
          </h6>
        </b-collapse>
      </b-card>
    </div>
    <!-- <b-button v-if="isActive" variant="primary" class="connect-button">
      Connect with Spotify
    </b-button> -->
    <!-- Button to cover the momentarily centered [x] when page refreshes: -->
  </div>
</template>

<script>

export default {
  name: 'InfoBlock',
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato:700&display=swap');

  h1 {
    margin: 0px;
  }.page {
    margin: 0px;
  }
  .title {
    font-family: 'Lato', sans-serif;
    font-weight: 840;
    font-size: 58px;
  }
  .collapsed > .when-opened,
  :not(.collapsed) > .when-closed {
    display: none;
  }
  .when-opened {
    margin-right: 23px;
    font-size: 19px;
    font-weight: 400;
    color: black;
    background-color: rgb(252, 251, 251);
    border-radius: 25px;
    border-color: black;
    padding-left: 6px;
    padding-right: 6px;
  }
  .when-closed {
    padding-top: 20px;
    font-size: 20px;
    color: black;
  }
  #toggle-button {
    background-color: transparent;
    border-color: transparent;
    color: black;
    margin-right: 6px;
    margin-bottom: 4px;
  }
  .white-cover {
    position: fixed;
    width: 100px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    color: white;
    z-index: 9998;
  }
  .card-header .btn[aria-expanded=true] {
    float: right;
  }
  .card-header .btn[aria-expanded=false] {
    margin: 0px;
  }
  .card .card-header {
    height: 55px;
    background-color: transparent;
    border-color: transparent;
    margin: 0px;
  }
  .card {
    background-color: transparent;
    border-color: transparent;
    position: relative;
    margin: 0px;
  }
  #accordion-1 {
    position: relative;
  }
  .info-block {
    margin-top: 30px;
    margin-left: 150px;
    margin-right: 150px;
  }
  .description {
    font-size: 21px;
    font-weight: 200;
    line-height: 125%;
    text-align: justify;
    margin-top: 0px;
    margin-left: 75px;
    margin-right: 75px;
    margin-bottom: 28px;
  }
  .lil-headings {
    font-size: 20px;
    font-weight: 500;
    margin: 15px;
  }
  .lil-text {
    font-size: 19px;
    font-weight: 50;
    line-height: 140%;
    text-align: justify;
    margin-left: 80px;
    margin-right: 80px;
    margin-top: 15px;
    margin-bottom: 25px;
  }
  .lil-text2 {
    font-size: 19px;
    font-weight: 50;
    line-height: 140%;
    text-align: justify;
    margin-left: 80px;
    margin-right: 80px;
    margin-top: 15px;
    margin-bottom: 65px;
  }
  /* .green {
    color: rgb(29, 185, 84);
  } */
  /* .connect-button {
    position: absolute;
    z-index: -1;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    font-size: 21px;
  } */
</style>
