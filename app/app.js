'use strict';

var app = angular.module('app', []);

function checkEmpty (data) {
	if (!Array.isArray(data))
		data = data.split(',');
	return data;
}

app.controller('listItems', function ($scope, $http) {
	$scope.posts = [];

	$http({
		method: 'GET',
		url: '/api'
	}).then(function (response) {
    $scope.posts = response.data;
  }, function (response) {
    console.log(response);
  });
  // List by TAG
  $scope.listByTag = function (tag) {
  	$http({
			method: 'GET',
			url: '/api/?tag='+tag
		}).then(function (response) {
	    $scope.posts = response.data;
	  }, function (response) {
	    console.log(response);
	  });
  }
  // Sort by anything
  $scope.sortBy = function (id) {
  	$http({
			method: 'GET',
			url: '/api/?sortBy='+id
		}).then(function (response) {
	    $scope.posts = response.data;
	    console.log(response.data);
	  }, function (response) {
	    console.log(response);
	  });
  }
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
		}).then(function (response) {
	    console.log('Success adding to DB!')
	    alert('Success!');
	    $scope.posts = response.data;
	  }, function (response) {
	    console.log(response);
	  });
	  document.getElementById("addForm").reset();
	}

});

app.controller('delItems', function ($scope, $http) {

	$scope.delItem = function (id) {
		console.log('delItem: '+id)
		if (window.confirm('Are you sure about deleting this post? (ID: '+id+')')) {
			$http({
				method: 'delete',
				url: '/api',
				params: { _id: id }
			}).then(function (response) {
		    console.log('Success deleting from DB!')
		    console.log(response.data)
		  }, function (response) {
		    console.log(response);
		  });
		}
	}

});

app.controller('updateItems', function ($scope, $http) {

	$scope.saveItem = function () {
		var updateEntry = {
			author: $scope.post.author,
			date: $scope.post.date,
			dateUpdated: '',
			heading: $scope.post.heading,
			text: $scope.post.text,
			tags: checkEmpty($scope.post.tags),
			category: $scope.post.category
		};
		$http({
			method: 'put',
			url: '/api',
			params: { _id: $scope.post._id },
			data: updateEntry
		}).then(function (response) {
	    console.log('Success updating DB!')
	  }, function (response) {
	    console.log(response);
	  });
	}

});