<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
              <q-avatar size="103px" class="absolute-center shadow-10">
                <img src="profile.svg">
              </q-avatar>
          </q-card-section>
          <q-card-section>
              <q-file
                v-model="file"
                label="Pick one file"
                class="text-center"
                use-chips
                accept=".jpg, image/*"
                style="width: 200px"
              />
              <q-btn flat class="text-primary" @click="saveUsersProfile(file)">
                Save
              </q-btn>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Register
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit="registerAccount"
            >
              <q-input
                filled
                v-model="username"
                label="Username"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                v-model="password"
                label="Password"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                v-model="secondPassword"
                label="Verify Password"
                lazy-rules
              />

              <div>
                <q-btn label="Register" @click="registerAccount" type="button" color="primary"/>
                <q-btn label="Login" to="/Login" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
    import Router from '../router';
export default {
  data() {
    return {
      username: 'Tommy',
      password: '12345',
      secondPassword: '12345'
    }
  },
  methods: {
    verifyPassword(){
      
    },
    registerAccount(){
      const that = this;
      axios.post( `http://127.0.0.1/signup.php`, {
        username: this.username,
        password: this.password,
        name: "testing", //this.name,
        isDoctor: "0",//this.isDoctor,
        location: "United States"//this.location
      })
      .then((response) => {
          if (response.data == "success") {
            that.$router.push({path:'/Login'});
          } else {
            alert(response.data);
          }
      }, (error) => {
        console.log(error);
      });
      console.log('Register Success')
    },
  }
}
</script>
<style>

.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
