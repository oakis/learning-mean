'use strict';

var app = angular.module('app', ['ngSanitize']);

function checkEmpty (data) {
	if (!Array.isArray(data))
		data = data.split(',');
	return data;
}

app.controller('listItems', function ($scope, $http) {

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
			url: '/api?tag='+tag
		}).then(function (response) {
	    $scope.posts = response.data;
	  }, function (response) {
	    console.log(response);
	  });
  }
  // List by CATEGORY
  $scope.listByCat = function (cat) {
  	$http({
			method: 'GET',
			url: '/api?cat='+cat
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
			url: '/api?sortBy='+id
		}).then(function (response) {
	    $scope.posts = response.data;
	  }, function (response) {
	    console.log(response);
	  });
  }
  // Search function
  $scope.postSearch = function (id) {
  	$http({
			method: 'GET',
			url: '/api?search='+id
		}).then(function (response) {
	    $scope.posts = response.data;
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
	    $scope.posts.push(response.data);
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
		    for (var post of $scope.posts) {
		    	if (post._id === response.config.params._id) {
		    		$scope.posts.splice($scope.posts.indexOf({_id: post._id}),1)
		    	}
		    }
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