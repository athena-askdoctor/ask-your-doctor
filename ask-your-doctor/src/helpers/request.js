import axios from 'axios';

// Make a request for a user with a given ID

// GET https://covid19-api.weedmark.systems/api/v1/stats?country=Canada
export function getCovidInfo(country){
  let returnData = null;
  const options = {
    method: 'GET',
    url: `http://192.168.31.12:3000/covid19?country=China` ,
    params: {language: 'en-gb', format: 'json'},
    headers: {
      'Access-Control-Allow-Methods' : '*',
      "Access-Control-Allow-Origin": "*"
    }
  };
  axios.request(options).then(function (response) {
    console.log('get covid info',response.data);
    returnData = response.data;
  }).catch(function (error) {
    console.error(error);
  });
  return returnData;
}
export function getRequesthaha(url){
  var data = {}
  axios.get(url)
    .then(function (response) {
      // handle success
      console.log('response', response);
      data = response;
    })
    .catch(function (error) {
      // handle error
      console.log('error', error);
    })
    .then(function () {
      console.log('finished?')
      // always executed
    });
  return data;
}
export function symptomCheckRequest(){
  const options = {
    method: 'GET',
    url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms',
    params: {language: 'en-gb', format: 'json'},
    headers: {
      'x-rapidapi-key': '5944c48f60mshf0bfc39ae9d2734p159626jsn2b70d0f8b145',
      'x-rapidapi-host': 'priaid-symptom-checker-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log('symptom checker',response.data);
  }).catch(function (error) {
    console.error(error);
  });
}
