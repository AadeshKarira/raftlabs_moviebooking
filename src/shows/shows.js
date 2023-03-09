const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const logger = require('../../config/logger');
const shows = require("../../models/shows");
const auth = require('../../middlewares/auth').isValidToken;

/* add show*/ 
router.post('/', auth, async(req, res, next) => {
    try 
    {
        let create = await shows.insertOne(req.body);
        if(create._id){
            res.status(200).send({status: true, statusCode: 200, message: "show added successfully..."});
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

router.delete('/:id', auth, async(req, res, next) => {
    try
    {
        let del = await shows.deleteOne({_id: ObjectId(req.params.id)});
        if(del.deletedCount){
            res.status(200).send({status: true, statusCode: 200, message: "show deleted successfully..."});
        }
        else{
            res.status(400).send({status: false, statusCode: 400, err: del});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});

module.exports = router;