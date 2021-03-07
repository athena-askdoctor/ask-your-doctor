import * as Keycloak from "keycloak-js";

let initOptions = {
  url: 'http://localhost:8080/auth',
  // url: process.env.KEYCLOAK_HOST + ":" + process.env.KEYCLOAK_PORT + "/auth",
  // realm: process.env.KEYCLOAK_REALM,
  realm: 'master',
  clientId: 'ask-doctor',
  // clientId: process.env.KEYCLOAK_CLIENT_ID,
  onLoad: 'login-required'
  // onLoad: process.env.KEYCLOAK_ON_LOAD
};
let keycloak = Keycloak(initOptions);

export default async ({ store }) => {
  return new Promise(async (resolve, reject) => {
    let auth = await keycloak.init({
      onLoad: initOptions.onLoad,
      checkLoginIframe: false
    })
    console.log('keuycloak', keycloak)
    keycloak.login();
    // store.dispatch("user/setKeycloak", keycloak)
    resolve()
  })
}
