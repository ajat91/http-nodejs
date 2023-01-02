import bodyParser from 'body-parser';
import express from 'express';
import pkg from 'pg';
import cors from "cors";
const {Pool} = pkg;
const pool = new Pool()
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

pool.connect(err=>{
    try {
        console.log("Database Berhasil Terhubung")
    } catch (error) {
        console.log(err.message)
    }
})

app.get('/users',(req,res)=>{
    pool.query('select * from users',(err,result) =>{
        if(!err){
            res.send(result.rows)
        }
    })
})

app.get('/user/:id',(req,res)=>{
  pool.query(`select * from users where id = '${req.params.id}'`,(err,result) =>{
      if(!err){
          res.send(result.rows)
      }
  })
})

app.post('/user',(req,res)=>{
  const {name,email,gender}=req.body
  pool.query((`insert into users (name,email,gender) values('${name}','${email}','${gender}')`),(err,result)=>{
    if(!err){
      res.send({
        data :req.body,
        message: 'Insert Success'
      })
    }else{
      res.send(err.message)
    }
  })
})

app.put('/user/:id',(req,res)=>{
  const {name,email,gender}=req.body
  pool.query((`update users set name = '${name}',email = '${email}',gender='${gender}' where id = '${req.params.id}'`),(err,result)=>{
      if(!err){
          res.send({
            data :req.body,
            message: 'Update Success'
          })
      }else{
        res.send(err.message)
      }
  })
})

app.delete('/user/:id',(req,res)=>{
  pool.query((`delete from users where id = '${req.params.id}'`),(err,result)=>{
      if(!err){
          res.send({
            message:"Delete Success"
          })
      }else{
        res.send(err.message)
      }
  })
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port`)
});