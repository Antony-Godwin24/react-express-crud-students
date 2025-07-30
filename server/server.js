const express=require('express')
const app=express()
const path=require('path')
const db=require('./db/db')
const PORT=3500
const cors = require('cors');
app.use(cors());


app.use(express.json())

app.get('/students',async(req,res)=>{
    try{
        const [rows]=await db.execute('SELECT * FROM stdnts')
        console.log(rows)
        res.json(rows)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/students',async(req,res)=>{
    const {roll,name,dept,city,pin}=req.body
    try{
        const [test]=await db.execute('SELECT name from stdnts where roll=?',[roll])
        if(test.length>0){
            console.log(`student with roll=${roll} was added already!`)
            return res.json({'message':`student with roll=${roll} was added already!`})
        }
        else{
            const [rows]=await db.execute('insert into stdnts values (?,?,?,?,?)',[roll,name,dept,city,pin])
            console.log('added!')
            res.json({'message':'stdnt added!'})
        }
    }
    catch(err){
        console.log(err)
    }
})

app.put('/students/:roll',async(req,res)=>{
    const {roll}=req.params
    const {name,dept,city,pin}=req.body
    try{
        const [rows]=await db.execute('UPDATE stdnts set name=?, dept=?, city=?, pin=? where roll=?',[name,dept,city,pin,roll])
        console.log('stdnt updated!')
        res.json({'message':'stdnt updated!'})
    }
    catch(err){
        console.log(err)
    }
})

app.put('/students/updateMe/:userName',async(req,res)=>{
    const {userName}=req.params
    const {roll,name,city,pin}=req.body
    console.log("Username from params:", userName);
    try{
        const [exists]=await db.execute('select * from stdnts where name=? and roll=?',[userName,roll])
        if(exists.length>0){
            const [rows]=await db.execute('update stdnts set name=?,city=?,pin=? where roll=?',[name,city,pin,roll])
            console.log('student updated successfully!')
            res.json({'message':`stdnt with name=${userName} updated successfully!`})
        }
        else{
            console.log('UnAuthorized Credentials used for update!')
            return res.json({ message: 'Student not found!' });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({'message':'error encountered on updateMe'})
    }
})

app.delete('/students/deleteAll', async (req, res) => {
  try {
    const [result] = await db.execute('DELETE FROM stdnts');
    console.log('Delete result:', result);
    res.json({ message: 'All students deleted successfully' });
  } catch (err) {
    console.error('DELETE ALL ERROR:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/students/:roll', async (req, res) => {
  const { roll } = req.params;
  try {
    const [rows] = await db.execute('DELETE FROM stdnts WHERE roll=?', [roll]);
    console.log('stdnt deleted!');
    res.json({ message: 'stdnt deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting student' });
  }
});


app.get('/students/search',async(req,res)=>{
    const {search}=req.query
    try{
        const [rows]=await db.execute('SELECT * FROM stdnts WHERE name LIKE ?',[`%${search}%`])
        res.json(rows)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/signup',async(req,res)=>{
    const {user,email,pass,repass}=req.body
    try{
        if(pass!==repass){
            console.log('Passwords do not match!')
            return res.status(400).json({'message':'Passwords do not match!'})
        }
        const [exists]=await db.execute('select uname from users where uname=? or email=?',[user,email])
        if(exists.length>0){
            console.log('User already exists!')
            return res.status(400).json({'message':'User already exists with Same Constraints!'})
        }
        else{
            const [rows]=await db.execute('insert into users values (?,?,?)',[user,email,pass])
            console.log('User registered successfully!')
            res.json({'message':'User registered successfully!'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':'Error registering user'})
    }
})

app.post('/login',async(req,res)=>{
    const {user,email,pass}=req.body;
    try{
        const [exists]=await db.execute('SELECT uname from users where uname=? and email=? and pass=?',[user,email,pass])
        if(exists.length>0){
            if(user.toLowerCase().includes('admin')){
                console.log('Admin User logged in successfully!')
                return res.json({'message':'Admin User logged in successfully!'})
            }
            console.log('User logged in successfully!')
            res.json({'message':'User logged in successfully!'})
        }
        else{
            console.log('Invalid credentials!')
            res.json({'message':'Invalid credentials!'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':'Error logging in user'})
    }
})

app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))
