let searchBtn=document.querySelector('#searchBtn');
let cityInput=document.querySelector('#cityInput');
let weatherDiv=document.querySelector('#weather')
let currentDay=dayjs().format("ddd, MMM D")
let currentDayWeather=document.querySelector('#weatherData');
let daysLater=document.querySelectorAll(".daysLater")
let pastSearchesDiv=document.querySelector("#pastSearches")
let pastSearches

function getCityWeather(event){
    event.preventDefault();
    city=cityInput.value;
    getCoordinates(city);
    renderSearch();
    
}
function getCoordinates(city){
    let url="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=30938dd6fcd531961e9f7d4e28342bde"
    let latitude, longitude;
    fetch(url)
    .then(function(response){
        if(!response.ok)
            console.log(response.status)
        else
            response.json().then(function (data){
                latitude=data[0].lat;
                longitude=data[0].lon;
                getWeather(latitude,longitude)
                
            })
            
    })

}
function getWeather(latitude, longitude){
    let url="http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid=30938dd6fcd531961e9f7d4e28342bde&units=imperial"
    fetch(url)
    .then(function(response){
        if(!response.ok)
            console.log(response.status)
        else
            response.json().then(function(data){
                console.log(data);
                renderPage(data);

            })
    })


}
function renderPage(data){

    //main weather div
    currentDayWeather.children[0].textContent=data.city.name+","+ data.city.country;
    currentDayWeather.children[1].textContent= currentDay;
    currentDayWeather.children[2].children[0].textContent="temp: "+data.list[0].main.temp+"°F";
    currentDayWeather.children[2].children[1].textContent="wind: "+data.list[0].wind.speed+"mph";
    currentDayWeather.children[2].children[2].textContent="humidty: "+ data.list[0].main.humidity+"%";
    weatherDiv.setAttribute("class","col");
    let hourIndex=7
    for(let i=0;i<daysLater.length;i++){
        daysLater[i].parentElement.children[0].textContent=dayjs().add(i+1,"day").format('dddd')
        daysLater[i].parentElement.children[1].textContent=dayjs().add(i+1,"day").format('MMM, D')
        daysLater[i].children[0].textContent=data.list[hourIndex].main.temp+"°F";
        daysLater[i].children[1].textContent=data.list[hourIndex].wind.speed+"mph";
        daysLater[i].children[2].textContent=data.list[hourIndex].main.humidity+"%";
        hourIndex+=8


    }
}
function renderSearch(){
    if (localStorage.getItem("searches")==null) {
        pastSearches.push(cityInput.value)
        localStorage.setItem("searches", JSON.stringify(pastSearches));
      } else {
        pastSearches = JSON.parse(localStorage.getItem("searches"));
        pastSearches.push(cityInput.value);
        localStorage.setItem("searches", JSON.stringify(pastSearches));
      }
      


    for(let i=0;i<pastSearches.length;i++){
        let newSearch=document.createElement("li")
        newSearch.innerHTML=pastSearches[i]
        pastSearchesDiv.appendChild(newSearch);
    }

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