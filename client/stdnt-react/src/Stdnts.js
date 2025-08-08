import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import Nav from './Nav.js';

const Stdnts = ({userName}) => {
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
            <Nav />
            <div class='home'>
                      <h1>Welcome {userName}!</h1>
                      <div className='btns'>
                          <div class='one'>
                              <p><Link to={`/update-me/${userName}`}><button class="btn btn-primary">Update My Details</button></Link></p>
                              <p><Link to='/search'><button class="btn btn-primary">Search a Student</button></Link></p>
                              <p><Link to="/show"><button class="btn btn-primary">Show All students</button></Link></p>
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
                            </div>
                        )
                    }) : <p id='no'>No Notices Yet!</p>}
                </div>
            </div>
        </div>
  )
}

export default Stdnts