import React, { useState, useEffect } from 'react';
import axios from "axios";
import Nav from './Nav.js';
import { useNavigate} from 'react-router-dom';

const Profile = ({ userName, setUserName }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [validate,setValidate]=useState(false)
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
          setValidate(true)
        }
        else {
          setValidate(false)
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchDetails();
  }, [userName, navigate]);

  return (
    <div>
      <Nav />
      {!userName.toLowerCase().includes('admin')? (
        validate ? (
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
            <button className='btn btn-danger' id='' onClick={async () => {
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
        ) : (
          <div className="profile-card" style={{margin:"auto"}}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
                className="profile-img"
              />
              <h2>Add yourself as a Student!</h2>
            </div>
        )
      ):(
        <div className="profile-card" style={{margin:"auto"}}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
                className="profile-img"
              />
              <h2>Hello {userName}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
