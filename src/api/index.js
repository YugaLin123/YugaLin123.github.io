import axios from 'axios';

const CONFIG = {
  baseURL: '/',
  timeout: 10000,
}
const instance = axios.create(CONFIG)

axios.get('/user?ID=12345')
 .then(function (response) {
  // handle success
  console.log(response);
 })
 .catch(function (error) {
  // handle error
  console.log(error);
 })
 .finally(function () {
  // always executed
 });
