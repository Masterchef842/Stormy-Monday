searchBtn=document.querySelector('#searchBtn');
cityInput=document.querySelector('#cityInput');

function getCityWeather(event){
    event.preventDefault();
    console.log("test");
    city=cityInput.value;
    let latitude, longitude=getCoordinates(city);
   // weatherData=getAPI(city,latitude,longitude)
}
function getCoordinates(city){
    let url="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid={30938dd6fcd531961e9f7d4e28342bde}"
    fetch(url)
    .then(function(response){
        if(!response.ok)
            console.log(response.status)
        else
            console.log(response.json());
    })
}




searchBtn.addEventListener("click", getCityWeather);
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city