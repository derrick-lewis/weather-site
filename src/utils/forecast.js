const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2909db5fa91d9574d3119c2f6c59e4ee/${latitude},${longitude}`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            const high = body.daily.data[0].temperatureHigh
            const low = body.daily.data[0].temperatureLow
            callback(undefined, `${summary} It is currently ${temp} degrees out. There is a ${precip}% chance of rain. The high is ${high} and the low is ${low}`)
        }
    })
}

module.exports = forecast

