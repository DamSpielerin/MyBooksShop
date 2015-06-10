'use strict';

/* Services */

var bookshopServices = angular.module('bookshopServices', ['ngResource']);

bookshopServices.factory('Book', ['$resource',
  function ($resource) {

    return $resource('json/:bookId.json', {}, {
      query: {method: 'GET', params: {bookId: 'books'}, isArray: true}
    });
  }]);

bookshopServices.factory('BooksData', ['$http','LocalStorage',
  function ($http,LocalStorage) {
    var BooksData = {};
    /*{
     "id" : "978-0553573403",
     "cat" : ["book","paperback"],
     "name" : "A Game of Thrones",
     "author" : "George R.R. Martin",
     "series_t" : "A Song of Ice and Fire",
     "sequence_i" : 1,
     "genre" : { "id":3, "name": "Fantasy"},
     "inStock" : true,
     "price" : 7.99,
     "pages_i" : 445
     }*/

    BooksData.getBooks = function () {
      return $http.get('json/books.json');
    };

    BooksData.addBook = function (book,books) {
      book.cat = ["book","paperback"];
      book.genre = angular.fromJson(book.genre);
      books.push(book);
      return LocalStorage.setData('booksArr', angular.toJson(books));
    };
    return BooksData;
  }]);

bookshopServices.factory('GenresData', ['$http','LocalStorage',
  function ($http,LocalStorage) {
    var GenresData = {};

    GenresData.getGenres = function () {
      return $http.get('json/genres.json');
    };

    GenresData.addGenre = function (genre,genres) {
      genres.push(genre);
      return LocalStorage.setData('genresArr', angular.toJson(genres));
    }

    return GenresData;
  }]);

bookshopServices.factory("LocalStorage", function ($window, $rootScope) {
  angular.element($window).on('storage', function (event) {
    if (event.key === 'genreArr' || event.key === 'bookArr') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function (key, val) {
      $window.localStorage && $window.localStorage.setItem(key, val);
      return this;
    },
    getData: function (key) {
      return $window.localStorage && $window.localStorage.getItem(key);
    },
    removeData: function (key) {
      $window.localStorage && $window.localStorage.removeItem(key);
      return this;
    }
  };
});

