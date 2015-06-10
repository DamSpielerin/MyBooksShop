'use strict';

/* Controllers */

var bookshopControllers = angular.module('bookshopControllers', []);

bookshopControllers.controller('BookListCtrl', ['$scope', '$http', 'BooksData', 'GenresData', 'LocalStorage',
  function ($scope, $http, BooksData, GenresData, LocalStorage) {
//    $scope.selectedBooks = [];
    $scope.books = [];
    $scope.genres = [];
    $scope.genreBool = [];
    getBooks();
    getGenres();


    $scope.orderProp = 'price';
    $scope.checkAll = function (bool) {
        for (var i = 0; i < $scope.genreBool.length; i++) {
          if (bool) {
            $scope.genreBool[i] = true;
          } else {
            $scope.genreBool[i] = false;
          }
      }
    }

    $scope.changeAllBooks = function(bool){
      if(!bool)$scope.allBooks=false;
    }

    function getBooks() {
      var booksArr = LocalStorage.getData('booksArr');
      if (angular.isString(booksArr)) {
        $scope.books = angular.fromJson(booksArr);
      } else {
        BooksData.getBooks()
          .success(function (books) {
            $scope.books = books;
          })
          .error(function (error) {
            $scope.status = 'Unable to load books data: ' + error.message;
          });
      }
    }

    function getGenres() {
      var genresArr = LocalStorage.getData('genresArr');
      if (angular.isString(genresArr)) {
        $scope.genres = angular.fromJson(genresArr);
      } else {
        GenresData.getGenres()
          .success(function (genres) {
            $scope.genres = genres;
          })
          .error(function (error) {
            $scope.status = 'Unable to load genres data: ' + error.message;
          });
      }
    }
  }]);

bookshopControllers.controller('BookDetailCtrl', ['$scope', '$routeParams', 'Book',
  function ($scope, $routeParams, Book) {
    $scope.book = Book.get({bookId: $routeParams.bookId}, function (book) {
      $scope.imageUrl = "images/" + $routeParams.bookId + ".jpeg";
    })
  }]);

bookshopControllers.controller('AdminGenreCtrl', ['$scope', 'GenresData', 'LocalStorage',
  function ($scope, GenresData, LocalStorage) {
    $scope.genres = [];
    $scope.status = "";
    getGenres();
    // LocalStorage.removeData('genresArr');
    //   LocalStorage.removeData('booksArr');
    $scope.addGenre = function () {
      var genre = {
        id: $scope.genres.length + 1,
        name: $scope.genreName
      };
      GenresData.addGenre(genre, $scope.genres);
    };

    function getGenres() {
      var genresArr = LocalStorage.getData('genresArr');
      if (angular.isString(genresArr)) {
        $scope.genres = angular.fromJson(genresArr);
      } else {
        GenresData.getGenres()
          .success(function (genres) {
            $scope.genres = genres;
          })
          .error(function (error) {
            $scope.status = 'Unable to load genres data: ' + error.message;
          });
      }
    }
  }]);

bookshopControllers.controller('AdminBookCtrl', ['$scope', '$routeParams', 'BooksData', 'GenresData', 'LocalStorage',
  function ($scope, $routeParams, BooksData, GenresData, LocalStorage) {
    $scope.books = [];
    $scope.genres = [];
    $scope.genreBool = [];
    $scope.genreId = $routeParams.genreId;
    getGenres();
    getBooks();
    $scope.addBook = function () {
      BooksData.addBook($scope.book, $scope.books)
    };

    function getGenres() {
      var genresArr = LocalStorage.getData('genresArr');
      if (angular.isString(genresArr)) {
        $scope.genres = angular.fromJson(genresArr);
      } else {
        GenresData.getGenres()
          .success(function (genres) {
            $scope.genres = genres;
          })
          .error(function (error) {
            $scope.status = 'Unable to load genres data: ' + error.message;
          });
      }
    }

    function getBooks() {
      var booksArr = LocalStorage.getData('booksArr');
      if (angular.isString(booksArr)) {
        $scope.books = angular.fromJson(booksArr);
      } else {
        BooksData.getBooks()
          .success(function (books) {
            $scope.books = books;
          })
          .error(function (error) {
            $scope.status = 'Unable to load books data: ' + error.message;
          });
      }
    }
  }]);