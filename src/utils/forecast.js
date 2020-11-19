const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=weekly&units=metric&appid=664cea4f65edb1964993886313209e4c`
    request({url, json: true}, (error, {body}) => {
        if (error){ 
            callback('Unable to connect to weather service!', undefined);
        } else if (body.message){
            callback('Wrong latitude or longitude!', undefined);
        } else {
            callback(undefined, `It is currently ${body.current.temp} degrees out but it feels like ${body.current.feels_like}; also There's ${body.current.humidity}% humidity.`);
        };
}
    )
};

module.exports = forecast;