import React, { Component } from 'react';

class Country extends Component {
  render() {
    return (
      <h3>{ this.props.match.params.cityName }</h3>
    );
  }
}

export default Country;
