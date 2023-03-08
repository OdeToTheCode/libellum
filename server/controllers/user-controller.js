const { User } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {
  
  async createUser({ body }, res) {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(body.password, salt)

    try {
      const userToInsert = {email: body.email, password: password }
      const user = await User.create(userToInsert);
      res.status(200).json({ _id: user._id, email: user.email });
    } catch(err){
      return res.status(400).json({ message: 'Unable to create user' })
    }
  },


  async updateUser({ body, params }, res) {
    let userToUpdate = { email: body.email }

    if( body.password?.length ){
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(body.password, salt)
      userToUpdate = {...userToUpdate, password: password }
    }

    const user = await User.updateOne(
      { _id: params.id },
      userToUpdate,
      { new: true }
    );

    if (!user) return res.status(400).json({ message: 'Unable to update user' });
    res.status(200).json({ _id: user._id, email: user.email });
  },


  async authUser({ body }, res) {

    // Find the user by the email address
    const user = await User.findOne({
      email: body.email
    });

    if (!user) return res.status(400).json({ message: 'Unable to authenticate user' });

    // We want to verify the password & kick them out if it fails
    const isValid = await bcrypt.compare(body.password, user.password)
    if( !isValid ) return res.status(400).json({ message: 'Unable to authenticate user' });

    const token = jwt.sign({
      email: user.email,
      id: user._id
    }, process.env.JWT_SECRET)

    res.header("auth-token", token).json({ error: null, data: { user, token }})
  },


  async verifyUser(req, res){
    const token = req.headers["auth-token"]

    if( !token ) return res.status(401).json({msg: "un-authorized"})

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if( !isVerified ) return res.status(401).json({msg: "un-authorized"})

    const user = await User.findById(isVerified.id)
    if( !user ) return res.status(401).json({msg: "un-authorized"})
    
    return res.status(200).json({ _id: user._id, email: user.email})
  }

};
