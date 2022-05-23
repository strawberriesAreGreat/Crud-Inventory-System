import React from 'react';
import './Navbar.css';
import logo from './logo.png';

class Navbar extends React.Component {
  render() {
    return(
      <nav className='navbar'>
        <div className='container1'>
         <a href='/home'>
              <img src={logo} alt='Logo' width='0.1em'/>
          </a>
        </div>
        <div className='title'> 
          <h2>Strawberry-mart</h2>
        </div>
        <div className='container2'>
          <a href='/home'>
              <img src={logo} alt='Logo' width='0.1em'/>
          </a>
        </div>
      </nav>
    )
  }
}

export default Navbar


