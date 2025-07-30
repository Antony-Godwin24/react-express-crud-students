import React from 'react'
import { Link } from 'react-router-dom';

const Stdnts = ({userName,setUserName}) => {
  return (
    <div>
            <div className='Nav'>
                    <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                    <div className='links'>
                        <p><a href="/stdnts">Home</a></p>
                        <p><a href="/notice">Notice Board</a></p>
                        <p><a href="/register">Register</a></p>
                    </div>
            </div>
            <div class='home'>
                      <h1>Welcome Again!</h1>
                      <div className='btns'>
                          <div class='one'>
                              <p><Link to={`/update-me/${userName}`}><button class="btn btn-primary">Update My Details</button></Link></p>
                              <p><Link to='/search'><button class="btn btn-primary">Search a Student</button></Link></p>
                              <p><Link to="/show"><button class="btn btn-primary">Show All students</button></Link></p>
                          </div>
                      </div>
            </div>
        </div>
  )
}

export default Stdnts