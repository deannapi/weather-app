// Get Current Weather
$(".searchBtn").on('click', function getWeather () {
    var cityName = $('#cityInput').val().toUpperCase();
    var apiCall = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=475f5f6bb734d8c713688458591cd41b';
    $.getJSON(apiCall, weatherCallback);
    function weatherCallback(weatherData) {
        // Get Today's Date
        $('#today').text(moment().format('MMMM Do, YYYY'));
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
            var uc_color = function() {
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
            uc_color();
        }
        // add these to the weather div
        console.log(city, condition, humidity, speed, tempF);
        // local storage of current weather
        // localStorage.setItem("current", JSON.stringify())
    }
});





// At same time show 5 day forecast for City Input
$(".searchBtn").on('click', function forecast() {
    var cityName = $("#cityInput").val();
    var apiCall = 'api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=475f5f6bb734d8c713688458591cd41b';

});
