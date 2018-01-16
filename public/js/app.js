// console.log("Winston is the best dog and maybe Dexter.")


const app = angular.module('dindin', []);
app.controller('MainController', ['$http', function($http){

  // this.message='Liz is throwing away her salad';
  this.movies = [];
  this.imgs = [];
  this.oneMovie = {};
  this.showPage = false
  this.formdata = {};

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
        this.showPage = true;
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
  // Create Reviews
  // this.addReview = () => {
  //     this.formdata.movieID = this.movieid;
  //     $http({ url: '/reviews', method: 'POST', data: this.formdata })
  //         .then(response => {
  //             console.log(response.data);
  //             this.formdata.push(response.data)
  //         }, err => {
  //             console.log(err.data.err);
  //             this.error = err.statusText;
  //         })
  //         .catch(err => console.log(err.message));
  //     $http({
  //         method: 'GET',
  //         url: '/movies/' + this.movieId
  //     }).then(response => {
  //         this.movieReviews = response.data;
  //         this.formdata = {};
  //     }).catch(err => console.log(err));
  // }

  this.addReview = (movie_ID) => {
    this.formdata.movie_ID = this.movieid;
    $http({
      url: '/reviews',
      method: 'POST',
      data: this.formdata
    }).then(response => {
      console.log("line 88", response.data);
    }).catch(err => {
      console.log(err);
    });
    $http({
      method: 'GET',
      url: '/movies/' + this.movieId
    }).then(response => {
      console.log(this.formdata);
      this.movieReviews = response.data;
      console.log(this.movieReviews);
      this.formdata= {}
    }).catch(err => console.log(err));
  }


}]);
