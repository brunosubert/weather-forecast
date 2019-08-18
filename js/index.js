const appKey = "f9378734cc32dc1ad98dd9a96acb0c6e";

let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let pressure = document.getElementById("pressure-div");
let search = document.getElementById("search-button");
let input = document.getElementById("search-text");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");

search.addEventListener("click", findWeatherDetails);
input.addEventListener("keyup", enterPressed);

function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (input.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid="+appKey;
   httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
  humidity.innerHTML = jsonObject.main.humidity + "%";
  pressure.innerHTML = jsonObject.main.pressure + "hPa";
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