/**
 * @Author Inyoung Kang
 * Revision Date: 2021-11-29
 * Summary: Sandbox uses unity webGL to display webgl build and displays box information
 * ToDo: display information, add mouse clicks base axios request to get room data
 * 
 * @Author Inyoung Kang
 * Revision Date: 2021-11-30
 * Summary: Populating data from get request in promises to pass to unity build request
 * ToDo: set delay on unity build button clicks to wait for data to populate
 * 
 * @Author Inyoung Kang
 * Revision Date: 2021-11-30
 * Summary: Final build of sandbox, displaying all boxes placed on map and items
 */

import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Grid from '@mui/material/Grid';
import Unity, { UnityContext } from 'react-unity-webgl';
import '../css/SandboxPage.css';

const unityContext = new UnityContext({
    loaderUrl: "\\build\\roomityV6\\truebuild.loader.js",
    dataUrl: "\\build\\roomityV6\\truebuild.data",
    frameworkUrl: "\\build\\roomityV6\\truebuild.framework.js",
    codeUrl: "\\build\\roomityV6\\truebuild.wasm",
});

const Sandbox = () => {

    const location = useLocation();

    console.log("room id " + location.state.RoomID);

    const [RoomList, setRoomList] = useState([]);
    const [boxInfo, setBoxList] = useState({
      boxList : [],
  });

    let RoomInfo = {
      room: {
        x: "",
        y: "",
        z: "",
      },
      boxes: []
    };

    //console.log(roomList);
    //console.log("rooms ", roomInfo);  

    let profile = localStorage.getItem('profile');
    //console.log(profile);
    let email  = JSON.parse(profile).result.email;

    useEffect(() => {
        getRooms();
        // console.log("UseEffect")
    }, []);

    function generateBoxes(data) {
      unityContext.send("Spawner", "generateWebBoxes", data);
      console.log('boxes generated');
    }

    /** 
     * 
     * REPLACE THIS FUNCTION WITH GET ROOM BY ID
     * POPULATE ROOM LIST WITH DATA
     * GET BOXES FROM ROOM
     * 
    */
    const getRooms = async () =>{
        axios.get(`http://localhost:3030/rooms/${email}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {

          let roomList = res.data;
          
          roomList = res.data.Rooms;
          //console.log("set room list data!");
          setRoomList( roomList );
       //console.log(roomList);

          return roomList

        }).then((roomList) => {
          roomList.forEach(function(room) {
            console.log("for each room id" + room.RoomID);
            if (room.RoomID == location.state.RoomID) {
              //console.log("match room id");
              //console.log(room);

              //console.log(room.Boxes);

              room.Boxes.forEach(function(boxData) {
                let newBox = {
                  id:boxData.BoxID,
                  x: boxData.Height,
                  y: boxData.Width,
                  z: boxData.Depth,
                  r: boxData.Red,
                  g: boxData.Green,
                  b: boxData.Blue,
                  name: boxData.BoxName,
                  items: boxData.Items
                }
                RoomInfo.boxes.push(newBox);
              });
              RoomInfo.room.x = room.Height;
              RoomInfo.room.y = room.Width;
              RoomInfo.room.z = room.Depth;

              //console.log("set box data!");
              // RoomInfo = room;
              // BoxInfo = room.Boxes;

              // console.log("Grabbed Room Info!");
              // console.log("box info!" + BoxInfo);
              // console.log(RoomInfo);

              setBoxList( {boxList: RoomInfo.boxes});
              console.log("room info boxes" + JSON.stringify(RoomInfo.boxes));

              //console.log("room info boxes" + JSON.stringify(RoomInfo));

              console.log(room.Boxes);

              // setBoxList(passedBoxInfo);

              // console.log(boxList);
              setTimeout(function() { generateBoxes(JSON.stringify(RoomInfo)); }, 5000);
              
              // call unity function to pass array here
            }
        });
        });
    }

    return(
        <Grid container spacing={1} columns={10}>
                <Grid id="gridItem" item xs={5}>
                    <h1>Sandbox</h1>
                    <div style={{display: 'table-row'}}>
                        <div style={{width: '600px', display: 'table-cell'}}> 
                        <Unity
                        unityContext={unityContext}
                        matchWebGLToCanvasSize={false}
                        style={{ width: "900px", height: "640px" }}
                        /></div>
                    </div>
                </Grid>
                <Grid id="gridItem" item xs={3}>
                    <h1>Items List</h1>
                    <div className="boxes" id="growth" style= {{height: "640px"}}>
                    {boxInfo.boxList?.map((box)=>{
                          return(
                              <div class="color">
                                  <div style={{height: '50px', width: '100%', backgroundColor: 'rgb(' + box.r + ',' +  box.g + ',' +  box.b + ')'}}></div>
                                  <ul id="boxcollection" class="collection with-header" style={{backgroundColor: '#62717b'}}>
                                      <li class="collection-header"><h3>{box.name}</h3></li>                                         
                                      <li class="collection-item"><h4>Height: {box.x}, Width: {box.y}, Depth: {box.z}</h4></li>  
                                      <li class="collection-item"><h5>Items</h5></li>    
                                        {box.items?.map((Item) =>
                                            <li class="collection-item">
                                                {Item.ItemName + `\t`}
                                            </li>
                                        )}                                
                                  </ul>                
                              </div>
                            )
                        })}
                    </div>
                </Grid>
            </Grid>
    );
}
export default Sandbox;