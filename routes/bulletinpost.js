const express = require('express')
const Bulletinpost = require ('../models/bulletinpost')
const router = express.Router()
const auth = require('../middleware/checkauth')

router.post('/', auth, async (req, res) =>
{
    try{
    const bulletinpost = new Bulletinpost (
        {
            department: req.body.department,
            complaint: req.body.complaint
        }
    )
    await bulletinpost.save();
    res.status(201).json({
        message: 'Successful post',
        bulletinpost:bulletinpost
    })
    } 
    catch (error) 
    {
        console.error(error)
        res.status(500).json({
            message: 'Problem posting'
        })
    }
})

router.get('/', auth, async (req, res) =>
{
    try{
    const bulletinpost = await Bulletinpost.find({})
        res.status(200).json({
            message: 'Posts have been fetched',
            bulletinpost
        })
    }
    catch (error) 
    {
        console.error(error)
        res.status(500).json({
            message: 'Unable to fetch'
        })
    }
})

router.delete("/:id", auth, async (req, res)=>{
    await Bulletinpost.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.status(200).json({
            message: "Post deleted"
        })
    })
})

module.exports = router;