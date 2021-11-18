const express = require("express");

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

// This section will help you get a all rooms by user
recordRoutes.route("/:UserID/rooms/").get(function (req, res) {
  let db_connect = dbo.getDb("roomalityDb");
  let myquery = { UserID: ObjectId(req.params.UserID) };
  db_connect
      .collection("ScannedObjectsCollection")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get a single record by room and user id
recordRoutes.route("/:UserID/rooms/:RoomID").get(function (req, res) {
  let db_connect = dbo.getDb("roomalityDb");
  let myquery = { RoomID: req.params.RoomID, UserID: ObjectId(req.params.UserID) };

  db_connect
      .collection("ScannedObjectsCollection")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new room.
recordRoutes.route("/rooms/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    var id_num = db_connect.collection.Count.Where( { _id: ObjectId( req.body.id )});
    console.log(req.body);
    id_num += 1;
    console.log(id_num);
    let myobj = {
      RoomID: id_num,
      Room: req.body.Room,
      Boxes: req.body.Boxes,
      UserID: req.body.UserID
  };
  
  // add to db
  // when adding room to collection add room idto user db
    db_connect.collection("records").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// This section will help you create a new box.
recordRoutes.route("/:UserID/rooms/:RoomID/addBox").post(function (req, response) {
  let db_connect = dbo.getDb("roomalityDb");
  console.log(req.body);
  console.log(req.params);
  var newBox = {
    X: req.body.X,
    Y: req.body.Y,
    Z: req.body.Z
  };
  // add to db
    

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { UserID: ObjectId(req.params.UserID),
      RoomID: req.params.RoomID },
    {  $addToSet: { "Room.Boxes": newBox } }
    );

// when adding room to collection add room idto user db
    db_connect.collection("").updateOne(
      { UserID: ObjectId(req.params.UserID),
        RoomID: req.params.RoomID },
      {  $addToSet: { "Room.Boxes": newBox } }
      );
});

// This section will help you update a record by id.
recordRoutes.route("/:UserID/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
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
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;