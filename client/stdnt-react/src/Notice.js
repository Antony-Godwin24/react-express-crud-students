import React, { useState } from 'react';

const Notice = () => {
  const [info, setInfo] = useState('');
  const [noticeList, setNoticeList] = useState([]);

  const handleNotice = (e) => {
    e.preventDefault();
    if (info.trim() !== '') {
      setNoticeList([...noticeList, info]);
      alert('Notice added successfully!');
      setInfo('');
    }
  };

  const deleteNotice = (indexToDelete) => {
    const updatedList = noticeList.filter((_, index) => index !== indexToDelete);
    setNoticeList(updatedList);
  };

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
        </div>
      </div>

      <div className='forms-div'>
        <h1 className='head-box'>Add a Notice</h1>
        <form onSubmit={handleNotice}>
          <input
            type="text"
            placeholder="Add a Notice"
            style={{
              width: '800px',
              height: '100px',
              textAlign: 'center',
              marginBottom: '10px'
            }}
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            required
          />
          <br />
          <button type='submit'>Add</button>
        </form>
      </div>

      <div className='notice-div'>
        <h1 className='head-box'>Notice Board</h1>
        {noticeList.length === 0 ? (
          <p>No notices available.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {noticeList.map((notice, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <span>{notice}</span>
                <button
                  style={{
                    marginLeft: '20px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => deleteNotice(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notice;
