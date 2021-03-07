<template>
  <div class="q-pa-md">
    <q-btn label="Reset" push color="white" text-color="primary" @click="reset" class="q-mb-md" />

    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Age Selection"
        icon="settings"
        :done="done1"
      >
        Please enter your age:
        <q-input standout="bg-teal text-white" v-model="userAge" label="year-old" />

        <q-stepper-navigation>
          <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Weight Selection"
        icon="create_new_folder"
        :done="done2"
      >
      What is your weight?
        <q-input standout="bg-teal text-white" v-model="userWeight" label="kilogram" />
        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Height Selection"
        icon="add_comment"
        :done="done3"
      >
        How about your height?
        <q-input standout="bg-teal text-white" v-model="userHeight" label="centimeter" />
        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true; requestBMI()" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
    <div style="height: 10px" />
    <div v-if="showResult">
      <q-card class="my-card">
        <q-parallax
          src="https://images.unsplash.com/photo-1602327645986-74290d7fc28c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          :height="150"
        />

        <q-card-section>
          <div class="text-h6">Your BMI Score: {{bmiScore}}</div>
          <div class="text-subtitle2">by your virtual advisor</div>
        </q-card-section>
      </q-card>
      <div style="height: 10px" />
      <q-card class="my-card">
        <q-parallax
          src="https://images.unsplash.com/photo-1507598641400-ec3536ba81bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          :height="150"
        />

        <q-card-section>
          <div class="text-h6">Your Health Status: {{healthiness}}</div>
          <div class="text-subtitle2">by your virtual advisor</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      userAge: null,
      userWeight: null,
      userHeight: null,
      showResult: false,
      bmiScore: 1,
      healthiness: null
    }
  },
  mounted(){

  },
  methods: {
    requestBMI(){
      var self = this;
      if(this.userAge === null || this.userWeight === null || this.userHeight === null){
        alert('You need to enter every field!')
      }
      else{
        const options = {
          method: 'GET',
          url: 'https://fitness-calculator.p.rapidapi.com/bmi',
          params: {age: Number(this.userAge), weight: Number(this.userWeight), height: Number(this.userHeight)},
          headers: {
            'x-rapidapi-key': '5944c48f60mshf0bfc39ae9d2734p159626jsn2b70d0f8b145',
            'x-rapidapi-host': 'fitness-calculator.p.rapidapi.com'
          }
        };
        console.log('lalala')
        axios.request(options).then(function (response) {
          console.log('BMI CALCULATOR', response.data);
          self.showResult = true;
          self.bmiScore = Number(response.data.bmi).toFixed(2)
          self.healthiness = response.data.health;
        }).catch(function (error) {
          console.error(error);
        });
      }
    },
    reset () {
      this.done1 = false
      this.done2 = false
      this.done3 = false
      this.step = 1
    },
    verifyPassword(){
      console.log('Login Success')
    },
    registerAccount(){
      console.log('Register Success')
    },
  }
}
</script>
<style>

</style>

