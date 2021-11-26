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

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// get request for user info
// return UserID object + room id + box ids+ + name

// This section will help you get the respective user document
recordRoutes.route("/rooms/:uid").get(function (req, res) {
  let db_connect = dbo.getDb("roomalityDb");
  let myquery = { UserID: ObjectId(req.params.uid) };
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
    RoomName: req.body.RoomName
  };

  console.log(newRoom);
  console.log(req.body);
  // add to db
  db_connect.collection("ScannedObjectsCollection").updateOne(
    { UserID: ObjectId(req.body.UserID) },
    {  $addToSet: { Rooms : newRoom } }
    ).then(() => {
      response.status(201);
      response.send();
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
  };
  // add to db

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { UserID: ObjectId(req.body.UserID),
      "Rooms.RoomID": req.body.RoomID },
    {  $addToSet: { "Rooms.$.Boxes": newBox } }
    ).then(() => {
      response.status(201);
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

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { UserID: ObjectId(req.body.UserID),
      "Rooms.RoomID": req.body.RoomID },
    {  $addToSet: { "Rooms.$[room].Boxes.$[box].Items": newItem } },
    { arrayFilters: [{ 'room.RoomID' : req.body.RoomID }, { 'box.BoxID' : req.body.BoxID}]}
    ).then(() => {
      response.status(201).send("Success")
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

// This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//     if (err){
//       res.status(404).send("Error");
//       throw err;
//     } else {
//       let message = "New Box Added:\n" + boxID ;
//       res.status(200).send("Success"));
//     }
//     console.log("1 document deleted");
//     response.status(obj);
//   });
// });

module.exports = recordRoutes;