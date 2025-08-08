import React from 'react'
import {Link} from 'react-router-dom';
const Nav = () => {
  const user=localStorage.getItem('userName')
  const HomeLink=user?(user.toLowerCase().includes('admin')?'/admin':'stdnts'):'/login'
  return (
    <div className='Nav'>
            <h1><a href={HomeLink}>Students Record</a></h1>
            <div className='links'>
              <p><a href={HomeLink}>Home</a></p>
              <p><Link to="/register">Register</Link></p>
              <p><Link to="/profile">My Profile</Link></p>
              {user? user.toLowerCase().includes('admin')? <p><Link to='/showAllUsers'>Show All Users</Link></p> : <div style={{display:'none'}}>Null</div> : <div style={{display:'none'}}>Null</div>}
              <p><Link to="/logout">Logout</Link></p>
            </div>
    </div>
  )
}

export default Nav