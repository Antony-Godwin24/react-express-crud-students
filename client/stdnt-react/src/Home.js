import React from 'react'
import {Link} from 'react-router-dom';
const Home = () => {
  return (
    <div class='home'>
        <h1>What do you like to do?</h1>
        <div class='btns'>
            <div class='one'>
                <p><Link to="/add"><button class="btn btn-primary">Add a Student</button></Link></p>
                <p><Link to='/search'><button class="btn btn-primary">Search a Student</button></Link></p>
                <p><Link to="/show"><button class="btn btn-primary">Show All students</button></Link></p>
            </div>
            <div class='two'>
                <p><Link to="/update"><button class="btn btn-primary">Update a Student</button></Link></p>
                <p><Link to="/delete"><button class="btn btn-primary">Delete a Student</button></Link></p>
            </div>
        </div>
    </div>
  )
}

export default Home















