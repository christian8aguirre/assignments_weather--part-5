import React,{ Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './Header/Header'
import Aside from './Aside/Aside'
import Home from './Home/Home'
import About from './About/About'
import Terms from './Terms/Terms'
import Country from './Country/Country'
import request from 'superagent'

export default class Router extends Component {
constructor() {
  super();

  this.state = {
    cities: [{
      id: 1,
      name: 'France'
    },{
      id: 2,
      name: 'Mexico'
    }],
    show: false,
    timezone: 'Timezone',
    summary: 'Add a new city.',
    weekly: [],
    hourly: []
  };
}

showInput = () =>{
  this.setState({
    show: true
  })
}

addCity = (e) => {
  // I. If ENTER was pressed
  const ENTER_KEY = 13;

  if (e.keyCode === ENTER_KEY) {
    // II. Save new city in `cities`.
    this.setState({
      cities: [
        // III. Get past data.
        ...this.state.cities,
        {
          id: this.state.cities.length + 1,
          name: e.target.value
        }
      ],
      show: false
    });

    // IV. Clean the input.
    e.target.value = '';
  }
}

getCoords = (ENDPOINT) => {
  return request.get(ENDPOINT);
}

fetchWeather = (response) => {
  const coords = response.body.results[0].geometry.location;

  const ENDPOINT = `https://api.darksky.net/forecast/8c6c8467512243aac21331fe2e8d328e/${ coords.lat }, ${ coords.lng }`;

  request
    .get(ENDPOINT)
    .then(response => {
      this.setState({
        weekly: response.body.daily.data,
        hourly: response.body.hourly.data,
        timezone: response.body.timezone,
        summary: response.body.currently.summary
      });
    });
}

fetchLocation = (e) => {
  const COUNTRY = e.target.textContent;
  console.log(COUNTRY);
  const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=${ COUNTRY }`;

  this
    .getCoords(ENDPOINT)
    .then(this.fetchWeather)
    .catch(error => {

      this.setState({
        timezone: 'Timezone',
        summary: 'Something went wrong. Try again.',
        weekly: [],
        hourly: []
      });
    });
}

    render() {
        return (
            <BrowserRouter>
              <div className='app'>
                <Header show = {this.state.show} onClick = {this.showInput}/>
                <div className = 'grid'>
                  <Aside cities = {this.state.cities} show = {this.state.show} onKeyUp = {this.addCity} onClick = {this.fetchLocation}/>
                  <section className='app__view'>
                    <div>
                      <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route exact path='/about' component={ About } />
                        <Route exact path='/terms' component={ Terms } />
                        <Route path = '/country/:city' render={ ( ) => {
                          return (
                            <Country 
                              {...this.state} 
                            />
                          )
                        }  } />
                      </Switch>
                    </div>
                  </section>
                </div>
              </div>
            </BrowserRouter>
        );
    }
}