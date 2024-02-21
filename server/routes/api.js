const express = require('express');
const {MongoClient}=require("mongodb");
const URL="mongodb://localhost:27017";
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const db = "_________";

/*
mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});
*/
const client=new MongoClient(URL);
async function GetConnection()
{
   let result=await client.connect();
   let db=result.db("hub");
   return db.collection('public');
}
let ret;
ret=GetConnection();
console.log("mongo connected");
function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
async function sender(req,res)
{
   let data=await GetConnection();
   data=await data.find().toArray();
   console.log(data);
   res.send(data);
}
router.get('/events',sender);

// router.get('/events', (req,res) => {
//   let events = [
//     {
//       "_id": "1",
//       "name": "Angular: Web Development",
//       "description": "2 Days",
//       "Teacher": "Piyush Manohar Khairnar"
//     },
//     {
//       "_id": "2",
//       "name": "Python: Machine Learning",
//       "description": "2 Days",
//       "Teacher": "Piyush Manohar Khairnar"
//     },
//     {
//       "_id": "3",
//       "name": "Machine Learning",
//       "description": "2 Days",
//       "Teacher": "Piyush Manohar Khairnar"
//     },
//     {
//       "_id": "4",
//       "name": "GoLang",
//       "description": "2 Days",
//       "Teacher": "Piyush Manohar Khairnar"
//     },
//     {
//       "_id": "5",
//       "name": "IPhone Programming",
//       "description": "2 Days",
//       "Teacher": "Piyush Manohar Khairnar"
//     },
//     {
//       "_id": "6",
//       "name": "Android Programming",
//       "description": "2 Days",
//       "Teacher": "Piyush Manohar Khairnar"
//     }
//   ]
//   res.json(events)
// })

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "IOT",
      "description": "3 Days",
      "Teacher": "Tcs"
    },
    {
      "_id": "2",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Infosys"
    },
    {
      "_id": "3",
      "name": "LSP",
      "description": "3 Days",
      "Teacher": "Wipro"
    },
    {
      "_id": "4",
      "name": "Struts",
      "description": "3 Days",
      "Teacher": "Ansys"
    },
    {
      "_id": "5",
      "name": "Embedded Programming",
      "description": "3 Days",
      "Teacher": "Nvidia"
    },
    {
      "_id": "6",
      "name": "IOT ",
      "description": "3 Days",
      "Teacher": "cisco"
    }
  ]
  res.json(specialEvents)
})

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Omkar") && (userData.password == "Omkar")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

module.exports = router;