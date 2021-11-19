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

// This section will help you get the respective user document
recordRoutes.route("/rooms/").get(function (req, res) {
  let db_connect = dbo.getDb("roomalityDb");
  let myquery = { UserID: ObjectId(req.body.UserID) };
  console.log(myquery);
  db_connect  
      .collection("ScannedObjectsCollection")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you return all boxes by user
// recordRoutes.route("/rooms").get(function (req, res) {
//   let db_connect = dbo.getDb("roomalityDb");
//   let myquery = { RoomID: req.body.RoomID, UserID: ObjectId(req.body.UserID) };

//   db_connect
//       .collection("ScannedObjectsCollection")
//       .findOne(myquery.Boxes, function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
// });

// This section will help you create a new room.
// recordRoutes.route("/rooms/add").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     console.log(req.body);
//     //id_num += 1;
//     //console.log(id_num);
//     let myobj = {
//       Height: req.body.Height,
//       Width: req.body.Width,
//       Depth: req.body.Depth,
//       UserID: req.body.UserID,
//       Name: req.body.Name
//   };
  
//   // add to db
//   // when adding room to collection add room idto user db
//     db_connect.collection("ScannedObjectsCollection").insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       response.json(res);
//     });
// });

// This section will help you create a new room.
recordRoutes.route("/rooms/addRoom").post(function (req, response) {
  let db_connect = dbo.getDb("roomalityDb");
  //let userDB_connect = dbo.getDb("myFirstDatabase");
  
  // var box_id_num = userDB_connect.collection("users").Count.Where( { _id: ObjectId( req.body.UserID )});
  //console.log(req.body);
  //console.log(req.params);
  var newRoom = {
    Width: req.body.Width,
    Height: req.body.Height,
    Depth: req.body.Depth,
    Name: req.body.Name,
    Boxes: Array[null]
  };
  // add to db
    

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { UserID: ObjectId(req.body.UserID) },
    {  $addToSet: { "Room": newRoom } }
    );

// when adding room to collection add room idto user db
  // userDB_connect.collection("users").updateOne(
  //     { UserID: ObjectId(req.params.UserID),
  //       RoomID: req.params.RoomID },
  //     {  $addToSet: { "Room.Boxes": newBox } }
  //     );
});

// This section will help you create a new bpx.
recordRoutes.route("/rooms/addBox").post(function (req, response) {
  let db_connect = dbo.getDb("roomalityDb");
  //let userDB_connect = dbo.getDb("myFirstDatabase");
  
  // var box_id_num = userDB_connect.collection("users").Count.Where( { _id: ObjectId( req.body.UserID )});
  //console.log(req.body);
  //console.log(req.params);
  var newBox = {
    Width: req.body.Width,
    Height: req.body.Height,
    Depth: req.body.Depth,
    BoxName: req.body.BoxName,
  };
  // add to db

  db_connect.collection("ScannedObjectsCollection").updateOne(
    { UserID: ObjectId(req.body.UserID) },
    {  $addToSet: { "Room.$[e].Boxes": newBox } }
    //{ arrayFilters: [ { "e": { Name = req.body.Name}}]}
    );

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