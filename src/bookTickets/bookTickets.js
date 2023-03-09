const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const logger = require('../../config/logger');
const bookTickets = require("../../models/bookTickets");
const movies = require("../../models/movies");
const theaters = require("../../models/theaters");
const auth = require('../../middlewares/auth').isValidToken;


/* book ticket*/ 
router.post('/', auth, async(req, res, next) => {
    try 
    {
        let create = await bookTickets.insertOne(req.body);
        if(create._id){
            res.status(200).send({status: true, statusCode: 200, message: "ticket booked successfully..."});
        }
        else{
            res.status(400).send({status: false, statusCode: 400, err: create});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});


/* book ticket*/ 
router.get('/movies', auth, async(req, res, next) => {
    try 
    {
        var regex = new RegExp([req.query.name].join(""), "i");
        let get = await movies.with_theaters({name:regex});
        
        res.status(200).send({status: true, statusCode: 200, data: get});
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});

/* book ticket*/ 
router.get('/theaters', auth, async(req, res, next) => {
    try 
    {
        var regex = new RegExp([req.query.location].join(""), "i");
        console.log(regex);
        let get = await theaters.with_movies({location:regex});
        
        res.status(200).send({status: true, statusCode: 200, data: get});
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});

/* book ticket*/ 
router.patch('/', auth, async(req, res, next) => {
    try 
    {
        let create = await bookTickets.updateOne({_id: ObjectId(req.body._id)}, {$set: req.body});
        res.status(200).send({status: true, statusCode: 200, message: "updated successfully..."});
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});
module.exports = router;