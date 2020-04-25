// Get Current Weather
$(".searchBtn").on('click', function getWeather () {
    var cityName = $('#cityInput').val().toUpperCase();
    // Get Today's Date
    var today = $('#today').text(moment().format('MMMM Do, YYYY'));
    // API for Current Weather
    var apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=475f5f6bb734d8c713688458591cd41b';
    // API for 5 Day Forecast
    var apiFore = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=475f5f6bb734d8c713688458591cd41b';
    $.getJSON(apiCall, weatherCallback);
    function weatherCallback(weatherData) {
        // if city input is misspelled or dne
        // if(apiCall == null {
        //     alert("City does not exist!");
        //     return;
        // } 

        
        // Get weather info
        var city = weatherData.name;
        var condition = weatherData.weather[0].icon;
        $("#city").text("The weather in " + city);
        var iconurl = "https://openweathermap.org/img/w/" + condition + ".png";
        $("#icon").attr('src', iconurl);
        var humidity = weatherData.main.humidity;
        $(".humid").text("Humidity: " + humidity + "%");
        var speed = weatherData.wind.speed;
        $(".speed").text("Wind Speed: " + speed + " MPH");
        var tempK = weatherData.main.temp;
        var tempF = Math.round((tempK - 273.15)*(9/5)+32);
        $(".temp").text("Temperature: " + tempF + "\xB0 F");

        //get Lat and Long to get UV Index
        var lat = weatherData.coord.lat;
        var long = weatherData.coord.lon;
        //get UV Index
        var apiuv = 'https://api.openweathermap.org/data/2.5/uvi?appid=475f5f6bb734d8c713688458591cd41b' + '&lat=' + lat + '&lon=' + long;
        $.getJSON(apiuv, getUV);
        function getUV(Data) {
            var uvIndex = Data.value;
            $(".uv").text("UV Index: " + uvIndex);
            // color the uv index based of severity of the value
            var uv_color = function() {
                if(uvIndex >= 0 && uvIndex <= 2) {
                    $('.uv').css({"background-color":"#00cc00", "color":"white"})
                } else if (uvIndex > 2 && uvIndex <= 5) {
                    $('.uv').css({"background-color":"#ffff00", "color":"white"})
                } else if (uvIndex > 5 && uvIndex <= 7) {
                    $('.uv').css({"background-color":"#ff6600", "color":"white"})
                } else if (uvIndex > 7) {
                    $('.uv').css({"background-color":"red", "color":"white"})
                }
            }; 
            uv_color();
        }
        // local storage of current weather
        var curWeather = JSON.parse(localStorage.getItem("current")) || {};
        curWeather = city + condition + humidity + speed + tempF;
        localStorage.setItem("current", JSON.stringify(curWeather))
    }

    // 5 Day Forecast
    var getForecast = function() {
        fetch(apiFore).then(function(weatherFore) {
            if(weatherFore.ok) {
                weatherFore.json().then(function(data) {
                    var currentDate = moment().format('YYYY-MM-DD');
                    let trimmedData = data.list.filter((item) => {
                        return item.dt_txt.slice(0, 10) !== currentDate
                    }); console.log(trimmedData);
                    
                    var day1 = trimmedData[0];
                    var day2 = trimmedData[8];
                    var day3 = trimmedData[16];
                    var day4 = trimmedData[24];
                    var day5 = trimmedData[32];
                    console.log(day1, day2, day3, day4, day5);
                    //Day 1 Forecast
                    $("#day1").text(moment(day1.dt_txt).format('MM.DD.YY'));
                    $("#icon1").attr('src', "https://openweathermap.org/img/w/" + day1.weather[0].icon + ".png");
                    $(".temp1").text("Temp: " + Math.round(((day1.main.temp_max-273.15)*(9/5)+32)) + "\xB0 F");
                    $(".humid1").text("Humidity: " + day1.main.humidity + "%");
                    //Day 2
                    $("#day2").text(moment(day2.dt_txt).format('MM.DD.YY'));
                    $("#icon2").attr('src', "https://openweathermap.org/img/w/" + day2.weather[0].icon + ".png");
                    $(".temp2").text("Temp: " + Math.round(((day2.main.temp_max-273.15)*(9/5)+32)) + "\xB0 F");
                    $(".humid2").text("Humidity: " + day2.main.humidity + "%");
                    //Day 3
                    $("#day3").text(moment(day3.dt_txt).format('MM.DD.YY'));
                    $("#icon3").attr('src', "https://openweathermap.org/img/w/" + day3.weather[0].icon + ".png");
                    $(".temp3").text("Temp: " + Math.round(((day3.main.temp_max-273.15)*(9/5)+32)) + "\xB0 F");
                    $(".humid3").text("Humidity: " + day3.main.humidity + "%");
                    //Day 4
                    $("#day4").text(moment(day4.dt_txt).format('MM.DD.YY'));
                    $("#icon4").attr('src', "https://openweathermap.org/img/w/" + day4.weather[0].icon + ".png");
                    $(".temp4").text("Temp: " + Math.round(((day4.main.temp_max-273.15)*(9/5)+32)) + "\xB0 F");
                    $(".humid4").text("Humidity: " + day4.main.humidity + "%");
                    //Day 5
                    $("#day5").text(moment(day5.dt_txt).format('MM.DD.YY'));
                    $("#icon5").attr('src', "https://openweathermap.org/img/w/" + day5.weather[0].icon + ".png");
                    $(".temp5").text("Temp: " + Math.round(((day5.main.temp_max-273.15)*(9/5)+32)) + "\xB0 F");
                    $(".humid5").text("Humidity: " + day5.main.humidity + "%");
                });
            }
        });
    };
    getForecast();
    var cityHistory = function() {
       var cityH = document.createElement("button");
       cityH.textContent = cityName;
       var history = document.getElementById("city-history");
       history.appendChild(cityH);
    }
    cityHistory();
});

// fix the date forecasting

// alert for misspelled city entries
// alert for non-existing city entry

// city history buttons
