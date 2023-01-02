//import Pool from "pg";

const {Pool}=require('pg')

const pool=new Pool({
    host :'containers-us-west-150.railway.app',
    user:'postgres',
    port:'7354',
    password:'BLWgF2VUbU5vYHHGs9k8',
    database:'railway'
})

module.exports=pool