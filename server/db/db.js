const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Antony*08',
    database:'students'
})

module.exports=pool.promise()
