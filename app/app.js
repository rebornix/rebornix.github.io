var app = angular.module('SinglePageBlogApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);
app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "BlogController",
        templateUrl: "app/views/home.html"
    });
	$routeProvider.when("/:year/:month/:day/:name", {
        controller: "EntryController",
        templateUrl: "app/views/entry.html"
    });
    $routeProvider.otherwise({ redirectTo: "/home" });
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

