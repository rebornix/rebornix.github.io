app.controller('EntryController', function($scope, $http, $log, $window, $sce, $routeParams, blogEntryService) {
		$scope.blogEntry = blogEntryService.getBlogEntry();
		
		$scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
		
		$http({method: 'GET', url: $scope.blogEntry["url"]}).
			success(function(data, status, headers, config) {
					var converter = new Showdown.converter();
					var rawContent = Base64.decode(data["content"]);
					$scope.blogblob = converter.makeHtml(rawContent.replace(/^\-\-\-[\s\S]+\-\-\-[\n\r]+/g, ''));
				}).
		    	error(function(data, status, headers, config) {
					$log.log("error!");
			});
});