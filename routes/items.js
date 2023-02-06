const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const {v4 : uuidv4} = require('uuid');
const ShoppingItem = require('../models/ShoppingItem');

 
//get all items
router.get('/', async (req, res) => {
    try {
        const items = await ShoppingItem.find();
        res.send(items).status(200);
    } catch(err) {
        res.send({message:err}).status(400);
    }  
});

//get item by id
router.get('/:itemId', async (req, res) => {
   try {
        const getItem = await ShoppingItem.findById(req.params.itemId);
        res.json(getItem).status(200);
   } catch(err) {
        res.json({ message: err }).status(404);
   } 
});


//create a new shopping item
router.post('/', async (req, res) => {
    const item = new ShoppingItem({
        // Id: uuidv4(),
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        Quantity: req.body.Quantity
    });
    try {
        const savedItem = await item.save();
        res.json(savedItem).status(201);
    } catch(err) {
        res.json({ message: err });
        res.status(400);
    }
});


//delete item
router.delete('/:itemId', async (req, res) => {
    try {
        const removeItem = await ShoppingItem.deleteOne({ _id: req.params.itemId });
        res.json(removeItem).status(204);
    } catch(err) {
        res.json({ message: err }).status(404);
    }
});


//upate shopping item
router.put('/:itemId', async (req, res) => {
    // var ObjectID = require('mongodb').ObjectId
    // if(!ObjectID.isValid(req.params.itemIditemId))
    // {
    //    return res.status(404);
    // }
        try {
            const updateITem = await ShoppingItem.findOneAndUpdate(
                {_id: req.params.itemId},
                {$set: {Name: req.body.Name, Description: req.body.Description, Price: req.body.Price, Quantity: req.body.Quantity}}
            );
            res.json(updateITem).status(204);
        }catch(err) {
            // var ObjectID = require('mongodb').ObjectId;
            // if(!ObjectID.isValid(itemId));
                res.status(404).send({message: err})
        }
});

module.exports = router;