const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();

//define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const patialPaths = path.join(__dirname, '../templates/partials');

//setup handlebars  engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(patialPaths);
//setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'NerdGenius'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'NerdGenius'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'To get your city\'s weather, you need to type your address or city\'s name in the search field in weather tab. prefreably folloewd by the country name for example: Tehran Iran ',
        name: 'NerdGenius'
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return  res.send({error});
          } 
          forecast(latitude, longitude, (ferror, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            });
          });
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
         return  res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'NerdGenius'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'NerdGenius'
    });
});
app.listen(2001, () => {
    console.log('Server is up on port 2001');
});