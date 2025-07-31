import axios from 'axios'
import React from 'react'

const Register = () => {
  return (
    <>
        <div className='Nav'>
                <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                <div className='links'>
                    <p><a href="/notice">Notice Board</a></p>
                    <p><a href="/register">Register</a></p>
                    <p><a href="/profile">My Profile</a></p>
                    <p><a href="/logout">Logout</a></p>
                </div>
        </div>
        <div className='forms-div'>
            <h1 className='head-box'>Register</h1>
            <h2>What do you need to do?</h2>
            <div>
                <p>Already a Exisitng User? <a href="/login">Login</a></p>
                <p>New User? <a href="/signup">Signup</a></p>
                {/* <button onClick={async()=>{
                  try{
                    await axios.delete('http://localhost:3500/deleteAccount')
                    alert('Account deleted successfully!')
                  }
                  catch(err){
                    console.error('Error deleting account:', err)
                    alert('Failed to delete account. Please try again.')
                  }
                }}>Delete Account</button> */}
            </div>
        </div>
    </>
  )
}

export default Register