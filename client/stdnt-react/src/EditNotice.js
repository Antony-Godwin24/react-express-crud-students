import React, {useState,useEffect } from 'react';
import axios from "axios";
import {toast} from 'react-toastify'
import { useNavigate,useParams} from 'react-router-dom';
import moment from 'moment';

const formatted = moment().format('YYYY-MM-DD HH:mm'); 


const EditNotice = () => {
  const [cont, setCont] = useState('');
  const Navigate=useNavigate();
  const {info,id}=useParams();

  useEffect(()=>{
    if(info){
      setCont(info);
    }
  },[info])

  const handleEditNotice=async(e)=>{
    e.preventDefault();
    const rows=await axios.put(`http://localhost:3500/notice/${id}`,{cont,formatted})
    if(rows.data.message.includes('successfully')){
      toast.success('Notice updated successfully!')
      setCont('')
      Navigate('/admin');
    }
    else{
      toast.error(rows.data.message || 'Failed to add notice. Please try again.')
      setCont('')
    }
  }

  return (
    <>
      <div className='Nav'>
        <h1 style={{ marginTop: '20px' }}>
          <a href="/">Students Record</a>
        </h1>
        <div className='links'>
          <p><a href="/admin">Home</a></p>
          <p><a href="/notice">Notice Board</a></p>
          <p><a href="/register">Register</a></p>
          <p><a href="/profile">My Profile</a></p>
          <p><a href="/logout">Logout</a></p>
        </div>
      </div>

      <div className='forms-div'>
        <h1 className='head-box'>Edit a Notice</h1>
        <form onSubmit={handleEditNotice}>
          <input
            type="text"
            placeholder="Add a Notice"
            style={{
              width: '600px',
              height: '80px',
              textAlign: 'center',
              marginBottom: '10px'
            }}
            onChange={(e) => setCont(e.target.value)}
            value={cont}
            required
          />
          <br />
          <button type='submit' style={{marginBottom:'20px'}}>Update</button>
        </form>
      </div>
    </>
  );
};

export default EditNotice;
