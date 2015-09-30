angular.module('weatherly', [])
	
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
		    // controller logic

	}])

	.controller('WeatherCtrl', ['$scope', '$http', function ($scope, $http) {
			var unixTime = function convertTimestamp(timestamp) {
			  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
					yyyy = d.getFullYear(),
					mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
					dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
					hh = d.getHours(),
					h = hh,
					min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
					ampm = 'AM',
					time;
					
				if (hh > 12) {
					h = hh - 12;
					ampm = 'PM';
				} else if (hh === 12) {
					h = 12;
					ampm = 'PM';
				} else if (hh == 0) {
					h = 12;
				}
				var gsDayNames = new Array(
				  'Sunday',
				  'Monday',
				  'Tuesday',
				  'Wednesday',
				  'Thursday',
				  'Friday',
				  'Saturday'
				);
				var dayName = gsDayNames[d.getDay()];
				console.log(dayName)
				// ie: 2013-02-18, 8:35 AM	
				time = yyyy + '-' + mm + '-' + dayName + ', ' + h + ':' + min + ' ' + ampm;
				return dayName;
			};
	
			$scope.searchCity = function () {
				$scope.cities = [];
				console.log($scope.city);
				var cityName = $scope.cityName;
				var searchUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&mode=json&units=imperial';
				console.log(searchUrl);

				$http.get(searchUrl)
					.then (function(response) {
						console.log(response);
						$scope.city=response.data;
						var cityObj = $scope.city
						console.log(response.data);
						var cityId = response.data.city.id;
						console.log(cityId);
						$scope.cities.push(response.data.city.name);
						console.log($scope.cities.length)
						var datetime = $scope.city.list[0].dt;
						console.log(datetime)
						console.log(unixTime(datetime));
						var temp = Math.ceil(cityObj.list[0].main.temp);
						$scope.todayTemp = temp;
						console.log(temp);
						for (i = 0; i < 5; i++) { 
									var temps = cityObj.list[i].main.temp;
							    console.log(temps);
						};
						$scope.day=unixTime(datetime)
						var forecastId = cityObj.list[0].weather[0].id;
						console.log(forecastId);

						var weatherImg = function getImage () {
							if (forecastId >= 200 && forecastId <= 299) {
						  	return "img/thunderstorm.png";						  	
						  } else if (forecastId >= 300 && forecastId <= 399) {
						  	return "img/drizzle.png";						  	
						  } else if (forecastId >= 500 && forecastId <= 599) {
						  	return "img/rain.png";
						  } else if (forecastId >= 600 && forecastId <= 699) {
						  	return "img/snow.png";						  	
						  } else if (forecastId >= 700 && forecastId <= 799) {
						  	return "img/atmosphere.png";						  	
						  } else if (forecastId >= 800 && forecastId <= 899) {
						  	return "img/clouds.png";						  	
						  }
						};
						$scope.image = weatherImg();
						console.log($scope.image)
				});
			}

	}]);



