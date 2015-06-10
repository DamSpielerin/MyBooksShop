'use strict';

/* Filters */
var bookshopFilters = angular.module('bookshopFilters', []);
bookshopFilters.filter('genreFilter', function () {
  return function (items, genreId) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.genre.id==genreId | !genreId) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});

bookshopFilters.filter('genresFilter', function () {
  return function (items, genreIds) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (genreIds[item.genre.id]) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});