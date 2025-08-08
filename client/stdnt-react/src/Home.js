import React from 'react'
import {Link} from 'react-router-dom';
import Nav from './Nav.js';
const Home = () => {
  return (
    <>
      <Nav />
      <div class='home'>
          <h1>Welcome Again!</h1>
          <div className='btns'>
          <div class='one'>
            <p><Link to="/signup"><button class="btn btn-primary">SignUp</button></Link></p>
            <p><Link to="/login"><button class="btn btn-primary">Login</button></Link></p>
          </div>
          </div>
      </div>
    </>
  )
}

export default Home















