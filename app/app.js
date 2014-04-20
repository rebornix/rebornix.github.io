var app = angular.module('SinglePageBlogApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);
app.config(function ($routeProvider) {

    $routeProvider.when("/explore", {
        controller: "BlogController",
        templateUrl: "app/views/home.html"
    });
	$routeProvider.when("/entry", {
        controller: "EntryController",
        templateUrl: "app/views/entry.html"
    });
    $routeProvider.otherwise({ redirectTo: "/explore" });
});

app.service('blogEntryService', function() {
  var blogEntry;
  return{
  setBlogEntry : function(newObj) {
      blogEntry = newObj;
	},
  getBlogEntry : function(){
      return blogEntry;
	}
  };
});

