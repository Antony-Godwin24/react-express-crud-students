import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-toastify'
import Trash from './Trash.svg'
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
    const [search,setSearch]=useState('')
    const [result,setResult]=useState([])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const res=await axios.get(`http://localhost:3500/students/search?search=${search}`)
            if(res.data.length>0){
                setResult(res.data)
                toast.success("Match Found!")
            }
            else{
                toast.error("No match found!")
            }
        }
        catch(err){
            console.error(err)
            toast.error('search failed!')
        }
        setSearch('')
    }
    return (
        <>
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
            <div className='forms-div'>
                <h1 className='head-box'>Search a Student</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='search' value={search} placeholder='Search by Name' onChange={(e)=>setSearch(e.target.value)} />
                    <button type='submit'>Search</button>
                </form>
                
                <p>Show All Students? <a href="/show">Click Here</a></p>
                <p><a href="/"><button>Back to Home</button></a></p>
            </div>
            <div>
                    {result.length>0 &&
                    <table class="table table-striped" id="table">
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
                            {result.map((s)=>(
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
                }
                </div>
            </>
    )
}

export default Search