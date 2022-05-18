import React from 'react';
import './sidebar.css';
import './Navbar.css';
import logo from './logo.png';

import SideBar from './sidebar';

class Navbar extends React.Component {
  render() {
    return(
      <nav className='navbar'>
        <div className='sidebar'>
           <SideBar />
        </div>
        <div className='title'> 
          <h1>Inventory Tracking Web App </h1>
        </div>
        <div className='container'>
          <a href='/home'>
              <img src={logo} alt='Logo' width='0.1em'/>
          </a>
        </div>
      </nav>
    )
  }
}

export default Navbar


