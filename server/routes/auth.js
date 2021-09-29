const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')



//Register process

const {myData} = require('../database/db')
const { usersOnly } = require('../middlewere/verify')



router.post('/register',async (req,res)=>{
    try {
        let{email,password,city,street,fname,lname, is_admin} = req.body

        if(!email || !password  ||!city || !street || !fname || !lname){
           return  res.status(500).send({error:"Missing Info"})
        }
        if(typeof is_admin === undefined || !is_admin) is_admin = 0;
        
        let users= await myData('SELECT * FROM users')
       let userAuth = users.find(user=>user.email == email)
       if(userAuth){
        return res.status(500).send({error:"Email already exist!"})
       }
        const valid_email =   /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(!email.match(valid_email)){
            return res.status(500).send({error:"Invalid email format"})

        }

  
            const hashedpass = await bcrypt.hash(password,10)
            const set_user = await myData(`INSERT INTO users(email,password,city,street,fname,lname, is_admin) 
            VALUES("${email}","${hashedpass}","${city}","${street}","${fname}","${lname}", "${is_admin}")`)
             users= await myData('SELECT * FROM users')
            userAuth = users.find(user=>user.email == email)

                
            const token = jwt.sign(
                {
                    id:userAuth.id,
                    email:userAuth.email,
                    is_admin:userAuth.is_admin


                },
                process.env.TOKEN_SECRET,

                {
                    expiresIn:'20m'

                }

            )
            delete userAuth["password"]
            return res.status(200).send({token,email, ...userAuth})
                
        
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: err})
    }


})



router.post('/login', async (req,res)=>{

    try {
       const {email,password} = req.body
       
       if(!email || !password){
        return res.status(500).send({error:"Missing Info!"})

       }
       const users= await myData('SELECT * FROM users')
       const userAuth = users.find(user=>user.email == email)
       if(!userAuth){
        return res.status(500).send({error:"Email or password is invalid!"})

       }
      if(! await bcrypt.compare(password,userAuth.password)){
          return res.status(500).send({error:"Email or password is invalid!"})


      }

      const token = jwt.sign(
        {
            id:userAuth.id,
            email:userAuth.email,
            is_admin:userAuth.is_admin


        },
        process.env.TOKEN_SECRET,

        {
            expiresIn:'20m'

        }

      )
      delete userAuth["password"]
      return res.status(200).send({token,email, ...userAuth})
         

    } catch (err) {

        console.log(err);
        return res.status(500).send({error: err})
    }


})

router.get('/context', usersOnly, async (req,res)=>{

    try {
        const userAuth = req.user;
      const token = jwt.sign(
        {
            id:userAuth.id,
            email:userAuth.email,
            is_admin:userAuth.is_admin


        },
        process.env.TOKEN_SECRET,

        {
            expiresIn:'20m'

        }

      )
      
      delete userAuth["password"]
      return res.status(200).send({token, ...userAuth})
         
        
    } catch (err) {

        console.log(err);
        return res.status(500).send({error: err})
    }


})

module.exports= router




