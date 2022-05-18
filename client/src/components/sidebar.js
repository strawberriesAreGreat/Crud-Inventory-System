//credit https://appdividend.com/2022/03/13/react-sidebar/
import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/Toronto">
        West Toronto
      </a>

      <a className="menu-item" href="/Montreal">
        Montreal - Plateau 
      </a>

      <a className="menu-item" href="/Chicago">
        Central Chicago
      </a>

      <a className="menu-item" href="/Oak_Hill">
        Oak Hill
      </a>

      <a className="menu-item" href="/Columbus">
        Columbus
      </a>
    </Menu>
  );
};