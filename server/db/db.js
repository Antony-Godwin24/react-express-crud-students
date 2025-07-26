const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'*******',
    database:'students'
})

module.exports=pool.promise()
