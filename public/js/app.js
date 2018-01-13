// console.log("Winston is the best dog and maybe Dexter.")

const app = angular.module('dindin', []);
app.controller('MainController', ['$http', function($http){

  // this.message='Liz is throwing away her salad';

$http({
  method: 'GET',
  url: 'http://localhost:3000/movies'
}).then(response=> {
  console.log('response: ', response);
  this.movies = response.data;
}).catch(reject => {
  console.log('reject: ', reject);
});
this.processForm = () => {
  console.log('Form Data: ', this.formdata);
  $http({
    method:'POST',
    url: 'http://localhost:3000/movies',
    data: this.formdata
  }).then(response => {
    console.log('response: ', response);
    this.movies.unshift(response.data);
  }).catch(reject => {
    console.log('reject: ', reject);
  });
};




}])
