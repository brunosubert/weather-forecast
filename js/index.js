const appKey = "148637c95b86273420d2f663ede52528";
let temperature = document.getElementById("temp");
let tempMax = document.getElementById("temp-max");
let tempMin = document.getElementById("temp-min");
let humidity = document.getElementById("humidity-div");
let pressure = document.getElementById("pressure-div");
let search = document.getElementById("search-button");
let input = document.getElementById("search-text");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let description = document.getElementById("description");
let curDate = document.getElementById("current-date");


search.addEventListener("click", findWeatherDetails);
input.addEventListener("keyup", enterPressed);

function weather() {

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ latitude + "," + longitude + "&key=AIzaSyDD74MIayu2EbcfMan3SAeh8GFLd8qsfYg";

    $.getJSON(url, function(data) {
       var arr_address_comp = data.results[0].address_components;
       arr_address_comp.forEach(function(val) {
           if(val.types[0] === "locality" || val.types[0] === "colloquial_area"){
               cityName = val.long_name;      
           }
           if(val.types[0] === "country" ){
               countryCode = val.short_name;
               countryName = val.short_name;       
           }    
       });    
     $('#city-name').text(cityName + ", " + countryName); 
    });

    let searchLink = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + appKey + "/" + latitude + "," + longitude;
    console.log(searchLink);
    httpRequestAsync(searchLink, theResponse);
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

weather();

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (input.value === "") {

  
  }else {

    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + input.value + "&key=AIzaSyDD74MIayu2EbcfMan3SAeh8GFLd8qsfYg";
    console.log(url);

    $.getJSON(url, function(data) {
       var arr_address_comp = data.results[0].address_components;
       arr_address_comp.forEach(function(val) {
           if(val.types[0] === "locality" || val.types[0] === "colloquial_area"){
               cityName = val.long_name;      
           }
           if(val.types[0] === "country" ){
               countryCode = val.short_name;
               countryName = val.long_name;       
           }   
       });
       var latitude = data.results[0].geometry.location.lat;
       var longitude = data.results[0].geometry.location.lng;

     $('#city-name').text(cityName + ", " + countryCode); 
     console.log(cityName);
     let searchLink = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + appKey + "/" + latitude + "," + longitude;
     httpRequestAsync(searchLink, theResponse);
    });

  }
 }

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  description.innerHTML = jsonObject.currently.summary;
  icon.src = "img/wicons/" + jsonObject.currently.icon + ".png";
  temperature.innerHTML = parseInt((jsonObject.currently.temperature - 32) / (9/5)) + "°";
  tempMax.innerHTML = parseInt((jsonObject.daily.data[0].temperatureHigh - 32) / (9/5)) + "°";
  tempMin.innerHTML = parseInt((jsonObject.daily.data[0].temperatureLow - 32) / (9/5)) + "°";
  if (jsonObject.currently.icon === "clear-day") {
    document.body.style.background = "linear-gradient( 111.5deg, rgba(20,100,196,1) 0.4%, rgba(33,152,214,1) 100.2% )";
  }
  if (jsonObject.currently.icon === "clear-night") {
    document.body.style.background = "linear-gradient( 109.6deg, rgba(218,185,252,1) 11.2%, rgba(125,89,252,1) 91.1% )";
  }
  if (jsonObject.currently.icon === "rain") {
    document.body.style.background = "radial-gradient( circle farthest-corner at 1.3% 2.8%, rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% )";
  }
  if (jsonObject.currently.icon === "cloudy") {
    document.body.style.background = "linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)";
  }
  if (jsonObject.currently.icon === "partly-cloudy-day") {
    document.body.style.background = "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)";
  }
  if (jsonObject.currently.icon === "partly-cloudy-night") {
    document.body.style.background = "linear-gradient( 65.5deg, rgba(23,205,205,1) -15.1%, rgba(23,25,95,1) 71.5% )";
  }
  if (jsonObject.currently.icon === "fog") {
    document.body.style.background = "linear-gradient( 108.7deg, rgba(224,235,213,1) 8.1%, rgba(37,148,141,1) 91.2% )";
  }
}



function httpRequestAsync(url, callback)
{
  console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}
