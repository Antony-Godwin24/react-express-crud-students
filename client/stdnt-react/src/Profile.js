import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Profile = ({ userName, setUserName }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) {
      alert('Please login to view your profile.');
      navigate('/login');
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3500/students/${userName}`);
        if (Array.isArray(res.data)) {
          setList(res.data);
        } else {
          console.error("Error fetching user details:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchDetails();
  }, [userName, navigate]);

  return (
    <div>
      <div className='Nav'>
        <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
        <div className='links'>
          <p><a href="/admin">Home</a></p>
          <p><a href="/notice">Notice Board</a></p>
          <p><a href="/register">Register</a></p>
          <p><a href="/profile">My Profile</a></p>
          <p><a href="/logout">Logout</a></p>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-img"
          />
          <h2>👤 {list[0]?.name || "User"}</h2>
          <p><strong>Roll No:</strong> {list[0]?.roll}</p>
          <p><strong>Department:</strong> {list[0]?.dept}</p>
          <p><strong>City:</strong> {list[0]?.city}</p>
          <p><strong>Pin Code:</strong> {list[0]?.pin}</p>
        </div>
      </div>
      <button className='btn btn-danger' onClick={async () => {
  const isConfirmed = window.confirm('Are you sure you want to delete your account? This will remove all your data permanently.');
  if (!isConfirmed) return;

  try {
    await axios.delete(`http://localhost:3500/students/deleteAccount/${userName}`);
    alert('Account deleted successfully!');
    setUserName('');
    localStorage.removeItem('userName');
    navigate('/login');
  } catch (err) {
    console.error("Error deleting account:", err);
    alert('Something went wrong while deleting your account.');
  }
}}>
  Delete My Account
</button>

    </div>
  );
};

export default Profile;
