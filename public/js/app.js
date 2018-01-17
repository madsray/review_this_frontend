const app = angular.module('dindin', []);
app.controller('MainController', ['$http', function($http){

  this.movies = [];
  this.imgs = [];
  this.oneMovie = {};
  this.showPage = false;
  this.formdata = {};
  this.reviews = [];
  this.movieID = 0;

  // Show Movies Function
  this.getAllMovies = () => {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/movies'
    }).then(response=> {
      // console.log('response: ', response);
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
      // console.log(this.oneMovie);
      this.showPage = true;
    }).catch(err => console.log(err));
  }

  // Create Movie
  this.addMovie = () => {

    console.log('Form Data: ', this.newMovie);
    $http({
      method:'POST',
      url: 'http://localhost:3000/movies',
      data: {
        title: this.newMovie.title,
        plot: this.newMovie.plot,
        genre: this.newMovie.genre,
        year: this.newMovie.year,
        img_url: this.newMovie.img_url
      }
    }).then(response => {
      console.log('response: ', response.data);
      this.newMovie = response.data;
      this.movies.push(this.newMovie);
      // this.movies.unshift(response.data);
      this.getAllMovies();
      this.newMovie = {};
    }).catch(reject => {
      console.log('reject: ', reject);
    });
  };
  // Create Reviews
  this.addReview = () => {

    console.log(this.oneMovie.id);
    $http({
      url: 'http://localhost:3000/movies/' + this.oneMovie.id + '/reviews',
      method: 'POST',
      data: {
        title: this.formdata.title,
        content: this.formdata.content,
        rating: this.formdata.rating,
        movie_id: this.oneMovie.id
      }
    }).then(response => {
      console.log('response: ', response.data);
      console.log(this.formdata);
      this.newreview = response.data
      this.oneMovie.reviews.push(this.newreview);
      console.log(this.oneMovie);
    }).catch(err => {
      // need to fix this error message
      console.error(err.message);
    });

    this.showOne(this.oneMovie);
  };

}]);
