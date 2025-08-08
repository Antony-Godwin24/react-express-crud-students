import React, { useState } from 'react';
import axios from "axios";
import {toast} from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import Nav from './Nav.js';

const formatted = moment().format('YYYY-MM-DD HH:mm'); 


const Notice = () => {
  const [info, setInfo] = useState('');
  const Navigate=useNavigate();

  const handleNotice=async(e)=>{
    e.preventDefault();
    const rows=await axios.post("http://localhost:3500/notice",{info,formatted})
    if(rows.data.message.includes('successfully')){
      toast.success('Notice added successfully!')
      setInfo('')
      Navigate('/admin'); 
    }
    else{
      toast.error(rows.data.message || 'Failed to add notice. Please try again.')
      setInfo('')
    }
  }

  return (
    <>
      <Nav />
      <div className='forms-div'>
        <h1 className='head-box'>Add a Notice</h1>
        <form onSubmit={handleNotice}>
          <input
            type="text"
            placeholder="Add a Notice"
            style={{
              width: '600px',
              height: '80px',
              textAlign: 'center',
              marginBottom: '10px'
            }}
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            required
          />
          <br />
          <button type='submit' style={{marginBottom:'20px'}}>Add</button>
        </form>
      </div>
    </>
  );
};

export default Notice;
