'use strict';

var app = angular.module('app', []);

app.controller('listItems', function ($scope, $http) {
	$http({
		method: 'GET',
		url: '/api'
	}).then(function successCallback(response) {
    $scope.posts = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
});

app.controller('addItems', function ($scope, $http) {
	
	$scope.newItem = function () {
		var newEntry = {
			author: $scope.author,
			date: '',
			heading: $scope.heading,
			text: $scope.text,
			tags: $scope.tags,
			category: $scope.category
		};

		$http({
			method: 'POST',
			url: '/api',
			data: newEntry
		}).then(function successCallback(response) {
	    console.log('Success adding to DB!')
	    alert('Success!');
	  }, function errorCallback(response) {
	    console.log(response);
	  });
	  document.getElementById("addForm").reset();
	}

});

app.controller('delItems', function ($scope, $http) {
	
	$scope.delItem = function () {
		if (window.confirm('Are you sure about deleting this post? (ID: '+$scope.post._id+')')) {
			$http({
				method: 'delete',
				url: '/api',
				params: { _id: $scope.post._id }
			}).then(function successCallback(response) {
		    console.log('Success deleting from DB!')
		  }, function errorCallback(response) {
		    console.log(response);
		  });
		}
	}

});

app.controller('editItems', function ($scope, $http) {
	$scope.saveItem = function () {
		var updateEntry = {
			author: $scope.post.author,
			date: $scope.post.date,
			dateUpdated: $scope.post.dateUpdated,
			heading: $scope.post.heading,
			text: $scope.post.text,
			tags: $scope.post.tags.toString().split(','),
			category: $scope.post.category
		};
		$http({
			method: 'put',
			url: '/api',
			params: { _id: $scope.post._id },
			data: updateEntry
		}).then(function successCallback(response) {
	    console.log('Success updating DB!')
	  }, function errorCallback(response) {
	    console.log(response);
	  });
	}

});