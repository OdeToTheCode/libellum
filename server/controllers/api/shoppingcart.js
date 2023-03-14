const router = require("express").Router();

const {shoppingcart, Book} = require("../../models")

const mongoose = require("mongoose");
const connection = require("../../config/connection");

router.get("/", (req,res) => {
  
})

async function getACart (err,res){
  try{
    const cart = await shoppingcart.findOne({user_id: req.params._id}).populate(`books`);

    if(!cart){
      res.status(400).json({message:"could not pull cart with specified id"})
    }

  }catch(err){
    res.status(500).json(err)
  }
}



async function addABook (req,res){
  try{
    const cart = await shoppingcart.FindOne({user_id: req.params.id})

    const update = await shoppingcart.FindOneAndInsertMany(
      {cart},
      {books: req.body.book}
    )

    if(!cart){
      res.status(400).json({message: "could not find cart to add book with specified id"});
    }



  }catch(err){
    res.status(500).json(err)
  }
}

async function RMBook (req,res) {
  try{
    const cart = await shoppingcart.FindOne({user_id: req.params._id})

    const book = await shoppingcart.FindByIdAndUpdate(
      {user_id: req.params._id},
      {$pull: {books: {ID: req.params.ID}}}
      )
    

    if(!cart){
      res.status(400).json({message:'could not find cart to delete book from'})
    }
    if(!book){
      res.status(400).json({message:"could not find book to delete"});
    }


  }catch(err){
    res.status(500).json(err)
  }
}


module.exports = {getACart, addABook, RMBook};
//ISBN