import React from 'react'

const NoticeView = () => {
  return (
    <>
        <div className='Nav'>
            <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
            <div className='links'>
                <p><a href="/stdnts">Home</a></p>
                <p><a href="/notice">Notice Board</a></p>
                <p><a href="/register">Register</a></p>
            </div>
        </div>
    </>
  )
}

export default NoticeView