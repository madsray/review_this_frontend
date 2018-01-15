// console.log("Winston is the best dog and maybe Dexter.")


const app = angular.module('dindin', []);
app.controller('MainController', ['$http', function($http){

  // this.message='Liz is throwing away her salad';
  this.movies = [];
  this.imgs = [];
  // this.showmovie = {};
  this.oneMovie = {};

  // Show Movies Function
  this.getAllMovies = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/movies'
    }).then(response=> {
      console.log('response: ', response);
      console.log("===============================");
      console.log(response.data[0].img_url);
      console.log("===============================");
      this.movies = response.data;
    }).catch(reject => {
      console.log('reject: ', reject);
    });
  };

  // Initiall show all movies call
  this.getAllMovies();

  this.showOne = (movie) => {
    this.movieId = movie.id

    $http({
        method: 'GET',
        url: 'http://localhost:3000/movies/' + this.movieId
    }).then(response => {
        this.oneMovie = response.data;
        console.log(this.oneMovie);
    }).catch(err => console.log(err));
  }

  // Create Movie
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




}]);
