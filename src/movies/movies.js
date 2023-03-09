const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const logger = require('../../config/logger');
const movies = require("../../models/movies");
const auth = require('../../middlewares/auth').isValidToken;

/* add movie*/ 
router.post('/', auth, async(req, res, next) => {
    try 
    {
        let create = await movies.insertOne(req.body);
        if(create._id){
            res.status(200).send({status: true, statusCode: 200, message: "movie added successfully..."});
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

module.exports = router;