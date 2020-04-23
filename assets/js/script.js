// const apikey = "475f5f6bb734d8c713688458591cd41b";
// const url = 'https://api.openweathermap.org/data/2.5/';

// // Get City Input
// $('.searchBtn').on('click', function() {
//     var location = $('#cityInput').val();
//     var cityHistory = $('.city-history');
//     // For each city input, create new button in city history
//     var oldCity = $('<button/>', {
//         text: location,
//         id: 'btn_'+ location,
//     });
//     $('.city-history').append(oldCity);
//     console.log(location);
// });



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
        $("#humid").text("Humidity: " + humidity + "%");
        var speed = weatherData.wind.speed;
        $("#speed").text("Wind Speed: " + speed + "MPH");
        var temp = weatherData.main.temp;
        $("#temp").text("Temperature: " + temp + "\xB0 F");
        var uvIndex = 2.5;
        $("#uv").text("UV Index: " + uvIndex);
        // add these to the weather div
        console.log(city, condition, humidity, speed, temp);
    }
});


// At same time show 5 day forecast for City Input
$(".searchBtn").on('click', function forecast() {
    var cityName = $("#cityInput").val();
    var apiCall = 'api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=475f5f6bb734d8c713688458591cd41b';

});
