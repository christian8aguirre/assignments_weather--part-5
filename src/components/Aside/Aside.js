import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

export default class Aside extends Component {

  addCity = (e) =>{
    this.props.onKeyUp(e);
  }
  fetchLocation = (e) =>{
    this.props.onClick(e);
  }

    render() {
        return (
          <aside className='app__aside'>
            <h1 className='app__title'>All countries</h1>
            { this.props.cities.map(city => {
              return <Link
                        onClick = {this.fetchLocation}
                        key={ city.id }
                        className='app__country'
                        to={ `/country/${ city.name.toLowerCase() }` }
                      >
                        { city.name }
                      </Link>
            }) }
            { this.props.show && <input onKeyUp={ this.addCity } autoFocus type='text' placeholder='Location' className='app__input' /> }
          </aside>
        );
    }
}