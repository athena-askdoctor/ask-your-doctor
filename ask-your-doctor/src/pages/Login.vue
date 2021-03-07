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
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              action="../" method="post" @submit="onSubmit"
            >
              <q-input
                filled
                name="username"
                v-model="username"
                label="Username"
                lazy-rules
              />
              <q-input
                type="password"
                filled
                name="password"
                v-model="password"
                label="Password"
                lazy-rules
              />

              <div>
                <q-btn label="Login" type="submit" color="primary" />
                <q-btn label="Register" to="/Register" type="button" color="primary"/>
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
                username: 'test2',
                password: '0123456789'
            }
        },
      methods: {
        verifyPassword(){
          console.log('Login Success')
        },
        registerAccount(){
          console.log('Register Success')
        },
        onSubmit(evt){
          const that = this;
          evt.preventDefault();
          axios.post('http://127.0.0.1/login.php', {
            username: this.username,
            password: this.password
          })
          .then(function (response) {
            if (typeof response.data["userid"] != "undefined") {
                
                that.$router.replace({path:'/', component: () => import('pages/Dashboard.vue') }
                );
                // props:{
                //   userid: response.data["userid"],
                //   name: response.data["name"],
                //   username: response.data["username"],
                //   avatar: response.data["avatar"],
                //   isDoctor: response.data["isDoctor"],
                //   emergencycontact1: response.data["emergencycontact1"],
                //   emergencycontact2: response.data["emergencycontact2"],
                //   location: response.data["location"]
                
            } else {
              alert("Incorrect Username or password!");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
      
    }
</script>
<style>

  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>
