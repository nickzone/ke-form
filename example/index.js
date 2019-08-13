import React from 'react'
import { render } from 'react-dom';
import Base from './base';
import Common from './common';

render(
  <div>
    <Base/>
    <Common/>
  </div>
   ,document.querySelector('#app'));