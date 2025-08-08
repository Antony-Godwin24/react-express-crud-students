import {Link} from 'react-router-dom';
import Nav from './Nav.js';

const Register = () => {
  return (
    <>
      <Nav />
        <div className='forms-div'>
            <h1 className='head-box'>Register</h1>
            <h2>What do you need to do?</h2>
            <div>
                <p>Already a Exisitng User? <a href="/login">Login</a></p>
                <p>New User? <a href="/signup">Signup</a></p>
            </div>
        </div>
    </>
  )
}

export default Register