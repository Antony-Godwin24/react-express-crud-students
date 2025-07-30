import React from 'react'

const Register = () => {
  return (
    <>
        <div className='Nav'>
                <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                <div className='links'>
                    <p><a href="/notice">Notice Board</a></p>
                    <p><a href="/register">Register</a></p>
                </div>
        </div>
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