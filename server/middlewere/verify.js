const jwt = require('jsonwebtoken');
const { myData } = require('../database/db');


const usersOnly =async (req,res,next)=>{
    jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET,(err,payload)=>{

        if(err){
           return res.status(400).send(err)

        }
        myData('SELECT * FROM users').then((users) => {
            const userAuth = users.find(user=>user.email == payload.email)
                if(!userAuth){
                    return res.status(401).send({error:"invalid Token!"})
                }
        
        req.user = userAuth
        next()

        }).catch((err) => {
            console.log('err', err)
            return res.status(401).send({error:err})
        });
       
    


    })


}

module.exports = {usersOnly}