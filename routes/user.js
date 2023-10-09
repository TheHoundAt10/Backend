const express = require ('express')
const router = express.Router()
const User = require ('../models/user')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup', async (req, res) =>
{
    try{
    const hash = await bcrypt.hash(req.body.password, 10)    
    const user = new User (
        {
            firstname: req.body.firstname,
            surname: req.body.surname,
            username: req.body.username,
            email: req.body.email,
            password: hash,
            cityofresidence: req.body.cityofresidence
        }
    )
    await user.save();    

    res.status(201).json({
        message: 'User successfully added',
        user:user
    })
    }
    catch (error) 
    {
        console.error(error)
        res.status(500).json({
            message: 'User unable to join'
        })
    }
})



router.post('/login', async (req, res) => {
    try {
      const username = req.body.username
      const password = req.body.password

      const user = await User.findOne({username})
  
      if (!user) {
        return res.status(401).json({
          message: 'User not found',
        })
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password)
  
      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Wrong password',
        })
      }
  
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      )
      
      res.status(200).json({
        message: 'Authentication successful',
        user: user,
        token:token
      })
      } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Internal server error',
      })
    }
  })


module.exports = router