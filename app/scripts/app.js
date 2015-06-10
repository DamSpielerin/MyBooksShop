'use strict';

/* App Module */

var booksShopApp = angular.module('booksShopApp', [
  'ngRoute',
  'bookshopControllers',
  'bookshopServices',
  'bookshopFilters'
]);

booksShopApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/admin', {
        templateUrl: 'views/admin.html'
      }).when('/admin_books', {
        templateUrl: 'views/admin_book_list.html',
        controller: 'AdminBookCtrl'
      }).when('/admin_genres', {
        templateUrl: 'views/admin_genres_list.html',
        controller: 'AdminGenreCtrl'
      }).when('/admin_genre_add', {
        templateUrl: 'views/admin_add_genre.html',
        controller: 'AdminGenreCtrl'
      }).when('/admin_book_add', {
        templateUrl: 'views/admin_add_book.html',
        controller: 'AdminBookCtrl'
      }).when('/admin_books/:genreId', {
        templateUrl: 'views/admin_book_list.html',
        controller: 'AdminBookCtrl'
      }).when('/books', {
        templateUrl: 'views/book_list.html',
        controller: 'BookListCtrl'
      }).
      when('/books/:bookId', {
        templateUrl: 'views/book_detail.html',
        controller: 'BookDetailCtrl'
      }).
      otherwise({
        redirectTo: '/books'
      });
  }]);
