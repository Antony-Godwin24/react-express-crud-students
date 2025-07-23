import React from 'react'

const Nav = () => {
  return (
    <div className='Nav'>
            <h1><a href="/">Students Record</a></h1>
            <div className='links'>
                <p><a href="/add">Add</a></p>
                <p><a href="/search">Search</a></p>
                <p><a href="/update">Update</a></p>
                <p><a href="/delete">Delete</a></p>
                <p><a href="/show">Show</a></p>
                <p><a href="/search">Search</a></p>
            </div>
    </div>
  )
}

export default Nav