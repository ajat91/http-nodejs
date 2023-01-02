import bodyParser from 'body-parser';
import express from 'express';
import pkg from 'pg';
const {Pool} = pkg;
const pool = new Pool()
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

pool.connect(err=>{
    try {
        console.log("Database Berhasil Terhubung")
    } catch (error) {
        console.log(err.message)
    }
})

app.get('/books',(req,res)=>{
    pool.query('select * from catalog',(err,result) =>{
        if(!err){
            res.send(result.rows)
        }
    })
})

app.post('/books',(req,res)=>{
  const {name,description,authors}=req.body
  pool.query((`insert into catalog (name,description,authors) values('${name}','${description}','${authors}')`),(err,result)=>{
    
    if(!err){
      res.send('Insert Success')
    }else{
      res.send(err.message)
    }
  })
})


app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port`)
});