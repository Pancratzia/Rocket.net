import React from 'react'
import RocketLogo from '../../assets/img/ROCKETNETLOGO.png';
import '../Panel_Lateral/Panel_Lateral.css';

function Panel_Lateral() {
  return (
    <div className='panel-lateral'>
      <img className='logo' src={RocketLogo} alt='Logo RocketNet'/>
    </div>
  )
}

export default Panel_Lateral