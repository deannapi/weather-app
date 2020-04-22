fetch('https://openweathermap.org/api').then((response) => {
    return response.json();
})
    .then((data) => {
        console.log(data);
    });

var getCityData = function() {
    console.log("city function was called");
};

getCityData();