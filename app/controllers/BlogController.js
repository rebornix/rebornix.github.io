app.controller('BlogController', function($scope, $http, $log, $window, blogEntryService) {
		$scope.blogList = [];
		$http({method: 'GET', url: 'https://api.github.com/repos/rebornix/rebornix.github.io/contents/_posts'}).
			success(function(data, status, headers, config) {
					var alldata = data.reverse();
					$scope.blogList = [];
					alldata.forEach(function(entry) {
						var suffix = "md";
						if (entry["name"].indexOf(suffix, entry["name"].length - suffix.length) !== -1){
							$scope.blogList.push(entry);
						}
					});
				}).
		    	error(function(data, status, headers, config) {
					$log.log("error!");
			});
		$scope.currentBlog= $scope.blogList[0];

		$scope.selectBlog = function(blog) {
			blogEntryService.setBlogEntry(blog);
			params = blog["name"].split('-');
			$window.location.href = "#/" + params[0] + "/" + params[1] + "/" + params[2] + "/" + params[3].replace(".md", "");
		}
});