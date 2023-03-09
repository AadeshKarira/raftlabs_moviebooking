const express = require('express');
const router = express.Router();
const { ObjectId } = require("mongodb");
const logger = require('../../config/logger');
const users = require("../../models/users");
const token = require("../../services/generate_token");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

/* add user*/ 
router.post('/', async(req, res, next) => {
    try 
    {
        if(req.body.name && req.body.phone && req.body.password)
        {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            let create = await users.insertOne(req.body);
            if(create._id){
                res.status(200).send({status: true, statusCode: 200, message: "user added successfully..."});
            }
            else{
                res.status(400).send({status: false, statusCode: 400, err: create});
            }
        }
        else{
            res.status(400).send({status: false, statusCode: 400, message: "name, phone and password required"});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});

//login
router.post('/login', async(req, res, next) => {
    try{
        if(req.body.phone && req.body.password)
        {
            const get = await users.findOne({phone: req.body.phone});
            if(get)
            {
                var result1 =true;
                let compare = await bcrypt.compare(req.body.password, get.password);
                if(!compare)
                {
                    return res.status(400).send({status: false, statusCode: 400, message: "password is incorrect"});
                }
                let data = {
                    _id: get._id,
                    name: get.name,
                    phone: get.phone
                }
                let token1 = await token.create_token(data);
                return res.status(200).send({status: true, statusCode: 200, message: "login successfully...", data: data, token: token1});
            }
        }
        else{
            return res.status(400).send({status: false, statusCode: 400, message: "phone and password required"});
        }
    }
    catch(err)
    {
        logger.logEvents("Error", err.stack);
        res.status(400).send({status: false, statusCode: 400, message: err.message}); 
    }
});


module.exports = router;