export default {
  namespaced: true,
  state: {
    keycloak: null,
    userid: null,
    name: null,
    username: null,
    avatar: null,
    isDoctor: null,
    emergencycontact1: null,
    emergencycontact2: null,
    location: null,
    isLoggedIn: false
  },
  mutations: {
    setKeycloak(state, keycloak) {
      state.keycloak = keycloak
    },
    setState(state, props) {
      state.userid= props.userid,
      state.name= props.name,
      state.username= props.username,
      state.avatar= props.avatar,
      state.isDoctor= props.isDoctor,
      state.emergencycontact1= props.emergencycontact1,
      state.emergencycontact2= props.emergencycontact2,
      state.location= props.location,
      state.isLoggedIn= props.isLoggedIn
    }
  },
  actions: {
    setKeycloak({commit, dispatch}, keycloak) {
      console.log('>>>>>');
      commit("setKeycloak", keycloak)
    },
    setState({commit, dispatch}, props) {
      console.log("<<<<<<");
      commit("setState", props);
    }
  }
}
