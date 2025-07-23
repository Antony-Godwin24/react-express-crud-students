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

app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))
