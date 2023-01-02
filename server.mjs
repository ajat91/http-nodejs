// import { createServer } from 'http';

// createServer((req, res) => {
//   res.write('Hello World!');
//   res.end();
// }).listen(process.env.PORT);


const bodyParser = require('body-parser');
const express = require('express');
const pool=require('./connection')
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const dotenv=require('dotenv')
dotenv.config()

pool.connect(err=>{
    try {
        console.log("Database Berhasil Terhubung")
    } catch (error) {
        console.log(err.message)
    }
})

app.get('/',(req,res)=>{
    pool.query('select * from food',(err,result) =>{
        if(!err){
            res.send(result.rows)
        }
    })
})


//const PORT=process.env.PORT || 4000;
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port`)
});