import React from 'react'
import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <>
      <div className='Nav'>
              <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
              <div className='links'>
                  <p><a href="/notice">Notice Board</a></p>
                  <p><a href="/register">Register</a></p>
              </div>
      </div>
      <div class='home'>
          <h1>Welcome Again!</h1>
          <div className='btns'>
          <div class='one'>
            <p><Link to="/signup"><button class="btn btn-primary">SignUp</button></Link></p>
            <p><Link to="/login"><button class="btn btn-primary">Login</button></Link></p>
          </div>


              {/* <div class='one'>
                  <p><Link to="/add"><button class="btn btn-primary">Add a Student</button></Link></p>
                  <p><Link to='/search'><button class="btn btn-primary">Search a Student</button></Link></p>
                  <p><Link to="/show"><button class="btn btn-primary">Show All students</button></Link></p>
              </div>
              <div class='two'>
                  <p><Link to="/update"><button class="btn btn-primary">Update a Student</button></Link></p>
                  <p><Link to="/delete"><button class="btn btn-primary">Delete a Student</button></Link></p>
              </div> */}
          </div>
      </div>
    </>
  )
}

export default Home















