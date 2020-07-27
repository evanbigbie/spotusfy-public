
export const state = () => ({
  user_id: 'default',
  display_name: 'displayname',
  ishidden: false,
  jsonResponse: []
})

export const mutations = {
  SET_USERID: (state, user) => {
    state.user_id = user
  },
  SET_DISPLAY: (state, displayname) => {
    state.display_name = displayname
  },
  SET_HIDDEN: (state, hidden) => {
    state.ishidden = hidden
  },
  SET_RESPONSE: (state, response) => {
    state.jsonResponse = response
  }
}
export const getters = {
  GET_USER: (state) => {
    return state.user_id
  },
  GET_DISPLAY: (state) => {
    return state.display_name
  },
  GET_HIDDEN: (state) => {
    return state.ishidden
  },
  GET_RESPONSE: (state) => {
    return state.jsonResponse
  }
}
