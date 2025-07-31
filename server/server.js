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
            const [exists]=await db.execute('select * from users where uname=?',[name])
            if(exists.length>0){
                const [rows]=await db.execute('insert into stdnts values (?,?,?,?,?)',[roll,name,dept,city,pin])
                console.log('added!')
                res.json({'message':'student wad added successfully!'})
            }
            else{
                console.log('user must register first before adding!')
                res.json({'message':'student must have registered before adding to the list!'})
            }
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
            return res.status(400).json({'message':'User already exists with Same Credentials!'})
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

app.post('/notice',async(req,res)=>{
    const {info,formatted}=req.body;
    try{
        const [rows]=await db.execute('insert into notice (info,Time) values (?,?)',[info,formatted])
        console.log('Notice added successfully!')
        res.json({'message':'Notice added successfully!'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':'Error adding notice'})
    }
})

app.get('/notice',async(req,res)=>{
    try{
        const [rows]=await db.execute('select * from notice')
        console.log('Notices fetched successfully!')
        res.json(rows)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':'Error fetching notices'})
    }
})

app.put('/notice/:id',async(req,res)=>{
    const {id}=req.params;
    const {cont,formatted}=req.body;
    try{
        const [rows]=await db.execute('update notice set info=? , Time=? where id=?',[cont,formatted,id]);
        console.log('Notice updated successfully!')
        res.json({'message':'Notice updated successfully!'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':'Error updating notice'})
    }
})

app.delete('/notice/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const [rows]=await db.execute('delete from notice where id=?',[id])
        console.log('Notice deleted successfully!')
        res.json({'message':'Notice deleted successfully!'})
    }catch(err){
        console.log(err)
        res.status(500).json({'message':'Error deleting notice'})
    }
})

app.get('/students/:userName',async(req,res)=>{
    const {userName}=req.params;
    try{
        const [rows]=await db.execute('select * from stdnts where name=?',[userName])
        if(rows.length>0){
            console.log('User details fetched successfully!')
            res.json(rows)
        }
        else{
            console.log('User not found!')
            res.status(404).json({'message':'User not found!'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({'message':'Error fetching user details'})
    }
})

app.delete('/students/deleteAccount/:userName',async(req,res)=>{
    try{
        const {userName}=req.params
        const [rows]=await db.execute('delete from users where uname=?',[userName])
        const [rows2]=await db.execute('delete from stdnts where name=?',[userName])
        console.log('Account deleted successfully!')
        res.json({'message':'Account deleted successfully!'})
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':'Error deleting account'})
    }
})

app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))
