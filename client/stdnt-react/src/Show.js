import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom';
import Trash from './Trash.svg'


const Show = () => {
    const [stdnts,setStdnts]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    useEffect(()=>{
        const fetchStudents=async()=>{
            try{
                const response=await axios.get('http://localhost:3500/students')
                console.log(response.data)
                setStdnts(response.data || [])
                setLoading(false)
            }
            catch(err){
                setLoading(false)
                setError(err.message)
                console.log(err.message)
                toast.error(err.message)
                setStdnts([])
            }
        }
        fetchStudents()
    },[])

    if(loading){
        return <div>Loading Students...</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }

    return (
        <div>
                <div className='Nav'>
                    <h1 style={{ marginTop: '20px' }}><a href="/">Students Record</a></h1>
                    <div className='links'>
                        <p><a href="/admin">Home</a></p>
                        <p><a href="/notice">Notice Board</a></p>
                        <p><a href="/register">Register</a></p>
                    </div>
            </div>
            <h1>Student Lists</h1>
            <p><a href="/add">Add New Student</a></p>
            {stdnts.length>0? (<table class="table table-striped" id='table'>
                <thead>
                    <tr>
                        <th scope="col">Roll No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Dept</th>
                        <th scope="col">City</th>
                        <th scope="col">PIN</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {stdnts.map((s)=>(
                        <tr key={s.roll} scope="row">
                            <td>{s.roll}</td>
                            <td>{s.name}</td>
                            <td>{s.dept}</td>
                            <td>{s.city}</td>
                            <td>{s.pin}</td>
                            <td><Link to={`/update`} className="btn btn-sm btn-warning">Edit</Link></td>
                            <td><Link to={'/delete'}><img src={Trash} alt="Delete" /></Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ):(
                <div className="alert alert-info">No Students Available!</div>
            )}
            
            <p><Link to="/"><button class="btn btn-primary">Back to Home</button></Link></p>
        </div>
    )
}

export default Show