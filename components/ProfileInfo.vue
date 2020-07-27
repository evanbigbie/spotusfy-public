<template>
  <div>
    <b-modal
      id="profile-modal"
      ref="modal"
      title="Edit Profile Information"
      ok-variant="success"
      ok-title="Submit"
      @show="resetEditModal"
      @hidden="resetEditModal"
      @ok="handleEditOk"
    >
      <form ref="form" @submit.stop.prevent="handleEditSubmit">
        <b-form-group :state="editState" :invalid-feedback="error">
          <b-form-input
            id="emailInput"
            v-model="newEmail"
            :state="editState"
            placeholder="New Email Address"
            type="email"
          />
          <b-form-input
            id="nameInput"
            v-model="newName"
            :state="editState"
            placeholder="New Display Name"
            type="text"
          />
          <br>
          <form v-if="isInitial || isSaving" enctype="multipart/form-data" novalidate>
            <h5>Upload Profile Picture</h5>
            <div class="dropbox">
              <input
                :disabled="isSaving"
                :name="uploadName"
                accept="image/jpeg, image/png"
                class="input-file"
                type="file"
                @change="filesChange($event.target.name)"
              >
            </div>
          </form>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Profile from './Profile'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILURE = 3

export default {
  name: 'ProfileInfo',

  data () {
    return {
      newEmail: '',
      newName: '',
      editState: null,
      error: null,
      uploadedFile: [],
      uploadError: null,
      currentStatus: null,
      uploadName: 'photo'
    }
  },

  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    }
  },

  methods: {
    handleClick () {
      alert('hey something is working now')
    },

    validateEmail () {
      this.error = null
      if (this.newEmail.length > 0 && !this.newEmail.includes('@')) {
        this.error = 'Please enter a valid email address'
      }
      if (this.error) {
        this.editState = false
        return false
      }
      return true
    },

    validateName () {
      this.error = null
      if (this.newName.length > 0 && this.newName.length < 3) {
        this.error = 'The display name should be at least 3 characters'
      }
      if (this.error) {
        this.editState = false
        return false
      }
      return true
    },

    resetEditModal () {
      this.newEmail = ''
      this.newName = ''
      this.editState = null
      this.currentStatus = STATUS_INITIAL
      this.uploadedFile = []
      this.uploadError = null
    },

    save (formData) {
      this.currentStatus = STATUS_SAVING

      function upload (formData) {}

      upload(formData)
      try {
        this.uploadedFile = [].concat(formData)
        this.currentStatus = STATUS_SUCCESS
      } catch (e) {
        this.uploadError = e.response
        this.currentStatus = STATUS_FAILURE
      }
    },

    filesChange (fieldName) {
      const formData = new FormData()
      formData.append(fieldName, Profile.props.name.toString())
      this.save()
    },

    handleEditOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleEditSubmit()
    },

    handleEditSubmit () {
      if (!this.validateEmail() || !this.validateName()) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('edit-modal-prevent-closing')
      })
      this.updateProfile()
    },

    updateProfile () {
      if (this.newEmail) {
        Profile.props.email = this.email
      }
      if (this.newName) {
        Profile.props.name = this.newName
      }
    }
  }
}
</script>
