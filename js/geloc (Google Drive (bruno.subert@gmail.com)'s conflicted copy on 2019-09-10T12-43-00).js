//Some Global variables

var longitude, latitude, timeHour, timeFull;
const appKey = "f9378734cc32dc1ad98dd9a96acb0c6e";
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let pressure = document.getElementById("pressure-div");
let search = document.getElementById("search-button");
let input = document.getElementById("search-text");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");

//Function to update weather information

function updateWeather (json) {

  longitude = json.coord.lon;
  latitude = json.coord.lat;

  //Update Weather parameters and location

  $(".weather-condition").html(json.weather[0].description);
  var temp = [(json.main.temp - 273.15).toFixed(0) + "°C", (1.8 * (json.main.temp - 273.15) + 32).toFixed(0) + "F"];
  $(".temp").html(temp[0]);
  $(".city-name").html(json.name);
  icon.src = "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png";


//Check for Geoloaction support 

if (navigator.geolocation) {

  //Return the user's longitude and latitude on page load using HTML5 geolocation API

  window.onload = function () {
  var currentPosition;
  function getCurrentLocation (position) {
    currentPosition = position;
    latitude = currentPosition.coords.latitude;
    longitude = currentPosition.coords.longitude;

    //AJAX request

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=188b68e6b443a5380ce7ee0f0bb49cfc", function (data) {
      var rawJson = JSON.stringify(data);
      var json = JSON.parse(rawJson);
      updateWeather(json); //Update Weather parameters
    });
  }

  navigator.geolocation.getCurrentPosition(getCurrentLocation);
  
  };

  //Find a Forcast
  
  $("form").on("submit", function(event) {
    event.preventDefault();
    var city = $(".find-forcast").val(); //Get value from form input
    document.getElementById("my-form").reset();
    
    //AJAX Request

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=188b68e6b443a5380ce7ee0f0bb49cfc", function (data) {
      var rawJson = JSON.stringify(data);
      var json = JSON.parse(rawJson);
      updateWeather(json); //Update Weather parameters
    });
  });
}

//If Geolocation is not supported by the browser, alert the user

else { 
  alert("Geolocation is not supported by your browser, download the latest Chrome or Firefox to use this app");
}