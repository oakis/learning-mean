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
			tags: $scope.tags.split(','),
			category: $scope.category
		};

		$http({
			method: 'POST',
			url: '/api',
			data: newEntry
		}).then(function successCallback(response) {
	    console.log('Success adding to DB!')
	  }, function errorCallback(response) {
	    console.log(response);
	  });

	  document.getElementById("addForm").reset();

	  alert('Success!');
	}

});

app.controller('delItems', function ($scope, $http) {
	
	$scope.delItem = function (id) {
		if (window.confirm('Are you sure about deleting this post? (ID: '+id+')')) {
			$http({
				method: 'DELETE',
				url: '/api',
				data: id
			}).then(function successCallback(response) {
		    console.log('Success deleting from DB!')
		  }, function errorCallback(response) {
		    console.log(response);
		  });
		}
	}

});