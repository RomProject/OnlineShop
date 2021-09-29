const sql = require('mysql')


const con = sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"project4"
})

con.connect(err=>{
    if(err){
        console.log(err);

    }else{
        console.log("connected to my sql");

    }

})


const myData = (q) =>{
    return new Promise((resolve,reject)=>{
        con.query(q,(err,results)=>{

            if(err){
                reject(err)

            }else{

                resolve(results)
            }

        })




    })



}

module.exports = {myData}