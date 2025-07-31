import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";

const Admin = ({userName}) => {
    const [notices,setNotices]=useState([])

    useEffect(()=>{
        const fetchNotices=async()=>{
            try{
                const response=await axios.get('http://localhost:3500/notice')
                if(Array.isArray(response.data)){
                    console.log("Notices fetched successfully:", response.data);
                    setNotices(response.data)
                }
                else{
                    console.error("Error fetching notices:", response.data.message);
                }
            }
            catch(err){
                console.error("Error fetching notices:", err);
            }
        }
        fetchNotices()
    },[])

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
            <div class='home'>
                    <h1>Welcome {userName}!</h1>
                    <div className='btns'>
                        <div class='one'>
                            <p><Link to="/add"><button class="btn btn-primary">Add a Student</button></Link></p>
                            <p><Link to='/search'><button class="btn btn-primary">Search a Student</button></Link></p>
                            <p><Link to="/show"><button class="btn btn-primary">Show All students</button></Link></p>
                        </div>
                        <div class='two'>
                            <p><Link to="/update"><button class="btn btn-primary">Update a Student</button></Link></p>
                            <p><Link to="/delete"><button class="btn btn-primary">Delete a Student</button></Link></p>
                        </div>
                    </div>
            </div>
            <div className='notice-show'>
                <div id='h1'>
                    <h1>Notice Board</h1>
                </div>
                <div className='msges'>
                    {notices.length>0 ? notices.map((notice,index)=>{
                        return(
                            <div className='msg' key={index}>
                                <p>{notice.info}</p>
                                <p id='time'>{moment(notice.Time).format('DD MMMM YYYY, hh:mm A')}</p>
                                <div id='btns-notice'>
                                    <button className='btn btn-danger' onClick={async()=>{
                                        try{
                                            await axios.delete(`http://localhost:3500/notice/${notice.id}`)
                                            setNotices(notices.filter((n)=>n.id!==notice.id))
                                        }
                                        catch(err){
                                            console.error("Error deleting notice:", err);
                                        }
                                        }}>Delete
                                    </button>
                                    <Link to={`/editNotice/${notice.info}/${notice.id}`}>
                                        <button className='btn btn-secondary'>Edit</button>
                                    </Link>
                                </div>
                                
                            </div>
                        )
                    }) : <p id='no'>No Notices Yet!</p>}
                </div>
                <p id='addanotice'><a href="/notice"><button >Add a Notice</button></a></p>
            </div>
        </div>
    )
}

export default Admin