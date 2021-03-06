const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'Derrick Lewis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Derrick Lewis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page', 
        message: 'Do you need help? We can help!',
        name: 'Derrick Lewis'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(address, (error, { latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found - Article', 
        message: 'Help article not found.',
        name: 'Derrick Lewis'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found', 
        message: 'Page not found.',
        name: 'Derrick Lewis'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})