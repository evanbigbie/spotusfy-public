<template>
  <div class="session">
    <div>
      <table class="table">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">
              <h4><small>{{ items.length }} {{ column }}s  </small></h4>
              <EditUsername v-if="showModal" />
              <b-button v-b-modal.username-modal @click="doShowModal">
                Edit Username
              </b-button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(column, indexColumn) in columns" :key="indexColumn">
              <h5> <small>{{ item[column] }}</small></h5>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EditUsername from './EditUsername'
export default {
  components: {
    EditUsername
  },
  data () {
    return {

      optQuality: [
        { value: 1, text: 'Original' },
        { value: 2, text: 'Kw-1' },
        { value: 3, text: 'Kw-2' }
      ],
      items: [
        {
          User: 'dummy name'
        }
      ],
      userInList: 0,
      columns: ['User'],
      slcQuality: null,
      user: 'tphillips24',
      showModal: false
    }
  },
  mounted () {
    if (localStorage.getItem('username')) {
    } else {
      this.doShowModal()
    }
  },
  methods: {
    removeElement (index) {
      this.items.splice(index, 1)
    },
    doShowModal () {
      this.showModal = true
    }
  }
}
</script>

<style>
</style>
