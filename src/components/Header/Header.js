import React,{ Component } from 'react';
import { Link } from 'react-router-dom'
export default class Header extends Component {

  showInput = () => {
    this.props.onClick();
    };
  

    render() {
        return (
          <header className='app__header'>
          <button onClick = { this.showInput } className='app__add'>
            <i className='fa fa-plus-circle' /> New city
          </button>
          <div>
            <Link to='/about'>About</Link>
            <Link to='/terms'>Terms</Link>
          </div>
        </header>
        );
    }
}