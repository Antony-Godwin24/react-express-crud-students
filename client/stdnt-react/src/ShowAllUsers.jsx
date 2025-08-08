import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav.js';

const ShowAllUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3500/getUsers');
        const users = res.data;

        const adminUsers = users.filter(u => u.uname.toLowerCase().includes('admin'));
        const studentUsers = users.filter(u => !u.uname.toLowerCase().includes('admin'));

        setAdmins(adminUsers);
        setStudents(studentUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Nav />
      <div className='ShowAllUsers'>
        <section className="user-table-container">
          <h2>Admins</h2>
          {admins.length === 0 ? (
            <p>No admins found.</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{admin.uname}</td>
                    <td>{admin.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="user-table-container">
          <h2>Students</h2>
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{student.uname}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </>
  );
};

export default ShowAllUsers;
