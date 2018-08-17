import React, { Component } from 'react';

class Country extends Component {

  renderIcon = iconName => {
    const icons = {
      'clear-day': 'https://www.amcharts.com/wp-content/themes/amcharts2/css/img/icons/weather/animated/day.svg',
      'partly-cloudy-day': 'https://www.amcharts.com/wp-content/themes/amcharts2/css/img/icons/weather/animated/cloudy-day-1.svg',
      'partly-cloudy-night': 'https://www.amcharts.com/wp-content/themes/amcharts2/css/img/icons/weather/animated/cloudy-night-1.svg',
      'rain': 'https://www.amcharts.com/wp-content/themes/amcharts2/css/img/icons/weather/animated/rainy-1.svg',
      'cloudy': 'https://www.amcharts.com/wp-content/themes/amcharts2/css/img/icons/weather/animated/cloudy.svg',
      'fog': 'https://raw.githubusercontent.com/rickellis/SVG-Weather-Icons/7824dc80e8b35f651186a63c98c861e470deeed6/DarkSky/fog.svg'
    };
    return <img src={ icons[iconName] } alt = {iconName}/>
  }

    dateToString = date => {
      return new Date(date * 1000).toLocaleString();
    }

  render() {
    return (
      <section className='app__view'>
        <div>
          {/* <h1>{this.props.match.params.city}</h1> */}
          <h3>{ this.props.timezone }</h3>
          <p>{ this.props.summary }</p>
          <h5>Weekly</h5>
          <div className='week'>
             { this.props.weekly.map(day => { 
               return ( 
                 <div className='day'> 
                   <div className='day__icon'> 
                     { this.renderIcon(day.icon) } 
                   </div> 
                  <p className='day__temp'>{ this.dateToString(day.sunriseTime) }</p>
                  <p className='day__temp'>{ this.dateToString(day.sunsetTime) }</p>
                  <p className='day__wind'>{ day.windSpeed } m/s</p>
                  <p className='day__press'>{ day.pressure } hpa</p>
                </div> 
               ); 
             }) } 
          </div>
        <h5>Hourly</h5>
          <table className=''>
          <thead>
            <tr>
              <th>{ new Date().toLocaleString().split(',')[0] }</th>
            </tr>
          </thead>
             <tbody>
            { this.props.hourly.map((hour, index) => {
              return (
                  <tr>
                    <td>
                    <small>{ index + 1 }</small>
                    <strong> { new Date(hour.time * 1000).getHours() }:00</strong>,
                    { hour.temperature } ºF,
                    <em>{ hour.summary.toLowerCase() }</em>,
                    { hour.windSpeed } m/s,
                    { hour.pressure }
                    </td>
                  </tr>
                );
                }) }
              </tbody> 
            </table>
        </div>
      </section>
    );
     
  }
}

export default Country;
