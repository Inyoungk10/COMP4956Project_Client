const express = require("express");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
recordRoutes.use(express.json());
recordRoutes.use(express.urlencoded({ extended: true }));

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

/**
 * This module contains all the express routes which execute different HTTP requests such as GET, POST, PUT etc
 * All database CRUD functionality will be found here
 * @Author Jacob Tan, Brennen Chiu, Francis Sapanta, Inyoung Kang, Cameron Wark
 */

// This section will help you get the respective user document
recordRoutes.route("/rooms/:email").get(function (req, res) {
  let db_connect = dbo.getDb("roomalityDb");
  let myquery = { email: req.params.email };
  console.log(myquery);
  db_connect  
      .collection("ScannedObjectsCollection")
      .findOne(myquery, function (err, result) {
        if (err) {
          res.status(404).end("error" + err);
        }
        console.log(result);
        res.status(200).send(result);
        
      });
});

// This section will help you create a new room.
recordRoutes.route("/rooms/addRoom").post(function (req, response) {
  let db_connect = dbo.getDb("roomalityDb");

  // Generate unique id
  let roomID = uuidv4();
  var newRoom = {
    RoomID: roomID,
    Width: req.body.Width,
    Height: req.body.Height,
    Depth: req.body.Depth,
    RoomName: req.body.RoomName,
    Boxes: []
  };

  console.log(newRoom);
  // add to db
  db_connect.collection("ScannedObjectsCollection").updateOne(
    { email: req.body.Email },
    {  $addToSet: { Rooms : newRoom } }
    ).then(() => {
      response.status(201).send('Room added: ' + roomID);
    });

});

// This section will help you create a new box.
recordRoutes.route("/rooms/addBox").post(function (req, response) {
  let db_connect = dbo.getDb("roomalityDb");
  let boxID = uuidv4();

  var newBox = {
    BoxID: boxID,
    Width: req.body.Width,
    Height: req.body.Height,
    Depth: req.body.Depth,
    BoxName: req.body.BoxName,
    Red: req.body.Red,
    Green: req.body.Green,
    Blue: req.body.Blue
  };
  // add to db

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { email: req.body.Email,
      "Rooms.RoomID": req.body.RoomID },
    {  $addToSet: { "Rooms.$.Boxes": newBox } }
    ).then(() => {
      response.status(201).send("Box added: " + boxID);
    });
});

// This section will help you create a new item in a box.
recordRoutes.route("/box/addItem").post(function (req, response) {
  let db_connect = dbo.getDb("roomalityDb");
  let itemID = uuidv4();

  var newItem = {
    ItemID: itemID,
    ItemName: req.body.ItemName,
  };
  // add to db
  console.log(req.body);

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { email: req.body.Email },
    {  $addToSet: { "Rooms.$[room].Boxes.$[box].Items": newItem } },
    { arrayFilters: [{ 'room.RoomID' : req.body.RoomID }, { 'box.BoxID' : req.body.BoxID}]}
    
    ).then(() => {
      response.status(201).send("Added item");
    });
});


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.body.id )};
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("ScannedObjectsCollection")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// endpoint to edit a room
recordRoutes.route('/editRoom').post((req, res) => {
  let db_connect = dbo.getDb();
  
  const { Width, Height, Depth } = req.body;
  const query = { [`Rooms.$.Width`]: Width, [`Rooms.$.Height`]: Height, [`Rooms.$.Depth`]: Depth };
  db_connect.collection('ScannedObjectsCollection').updateOne({email: req.body.email, "Rooms.RoomID": req.body.roomID}, {$set: query});
  res.send('done');

  // const query = { [`Rooms.${index}.Width`]: Width, [`Rooms.${index}.Height`]: Height, [`Rooms.${index}.Depth`]: Depth };
  // db_connect.collection('ScannedObjectsCollection').updateOne({email: req.body.email}, {$set: query});
  // const query = { [`Rooms.$[element].Width`]: '8' };
  // db_connect.collection('ScannedObjectsCollection').updateOne({email: req.body.email},
  //    {$set: query},
  //    {arrayFilters: [{element: "b31baf6d-37da-45e0-9956-9c1193263f22"}], upsert: true});
});


//This section will help you delete a room
recordRoutes.route("/delete/deleteRoom").delete((req, response) => {
  let db_connect = dbo.getDb();
  //let obj = JSON.parse(req.body);
  console.log("reqbody: ",req.body);
  //console.log("response: ",response);
  //console.log(req);
  let myquery = { email:  req.body.Email };
  db_connect
    .collection("ScannedObjectsCollection")
    .updateOne(
      myquery,
      { $pull: { 'Rooms': { RoomID: req.body.RoomID } } },
      function (err, res) {
      if (err){
        response.status(404).send("Error");
        throw err;
      } else {
        let message = "Room removed:\n" + req.body.RoomID ;
        response.status(200).send(message);
      }
    //console.log("1 room deleted");
    response.status(res);
  });
});

//This section will help you delete a box
recordRoutes.route("/delete/deleteBox").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { 
                  email:  req.body.Email,
                  'Rooms.RoomID': req.body.RoomID
                };
  db_connect
    .collection("ScannedObjectsCollection")
    .updateOne(
      myquery,
      { $pull: { 'Rooms.$.Boxes': { BoxID: req.body.BoxID } } },
      function (err, obj) {
        console.log(response);
      if (err){
        response.status(404).send("Error");
        throw err;
      } else {
        let message = "Box removed:\n" + req.body.BoxID ;
        response.status(200).send(message);
      }
    console.log("1 box deleted");
    response.status(obj);
  });
});

//This section will help you delete an item
recordRoutes.route("/delete/deleteItem").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { email:  req.body.Email };
  db_connect
    .collection("ScannedObjectsCollection")
    .updateOne(
      myquery,
      { $pull: { 'Rooms.$[room].Boxes.$[box].Items': { ItemID: req.body.ItemID } } },
      { arrayFilters: [{ 'room.RoomID' : req.body.RoomID }, { 'box.BoxID' : req.body.BoxID}]},
      function (err, obj) {
      if (err){
        response.status(404).send("Error");
        throw err;
      } else {
        let message = "Item removed:\n" + req.body.ItemID ;
        response.status(200).send(message);
      }
    console.log("1 item deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;