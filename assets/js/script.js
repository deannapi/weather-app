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
        }
        // add these to the weather div
        console.log(city, condition, humidity, speed, tempF);
    }
});


// At same time show 5 day forecast for City Input
$(".searchBtn").on('click', function forecast() {
    var cityName = $("#cityInput").val();
    var apiCall = 'api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=475f5f6bb734d8c713688458591cd41b';

});
