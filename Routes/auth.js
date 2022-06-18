const express = require('express');
const UserDB = require('../Models/User');
var bcrypt = require('bcryptjs');
const router = express.Router();


// Register
// User to create a profile and connect to the databse 


// Post method to create a new user
router.post("/register",  async (req, res ) => {

    try {

       
      const  salt = await bcrypt.genSalt(10  );
      const hasssedPassword =  await  bcrypt.hash(req.body.password,  salt);

        const newUser  =  new UserDB ({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            tele : req.body.tele

    });

      
     
        await newUser.save();
        res.status(201).json(newUser);
        console.log('User Created ')

    } catch (error) {

        res.status(500).json()
        console.log(error)
    }
})



// Login with database details 


router.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json('Wrong Credentials')
        

        const password = await bcrypt.compare(req.body.password, user.password)
        !password && res.status(400).json('Wrong Credentials')
        
        res.status(200).json(user)

       
    } catch (error) {
        
        res.status(500).json( )
        console.log(error)

    }
})

module.exports = router;