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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Unity, { UnityContext } from 'react-unity-webgl';
import '../css/RoomPage.css';

const unityContext = new UnityContext({
    loaderUrl: "\\build\\roomity\\colorbuild.loader.js",
    dataUrl: "\\build\\roomity\\colorbuild.data",
    frameworkUrl: "\\build\\roomity\\colorbuild.framework.js",
    codeUrl: "\\build\\roomity\\colorbuild.wasm",
});

const Sandbox = () => {

    const location = useLocation();

    console.log("room id " + location.state.RoomID);

    const [roomList, setRoomList] = useState([]);
    const [boxList, setBoxList] = useState([]);

    let RoomInfo;

    let BoxInfo;

    let passedBoxInfo = [];

    //console.log(roomList);
    console.log("rooms ", roomList);  

    let profile = localStorage.getItem('profile');
    //console.log(profile);
    let email  = JSON.parse(profile).result.email;

    useEffect(() => {
        getRooms();
        // console.log("UseEffect")
    }, []);

    function generateBoxes() {
      var testData = {
        room:{
            x:20,
            y:20,
            z:20
        },
        boxes:[
            {
                id:"jhasldf",
                x:4,
                y:4,
                z:4,
                r: 255,
                g: 0,
                b: 0
            },
            {
                id:"f23fdas1f",
                x:4,
                y:4,
                z:4,
                r: 0,
                g: 0,
                b: 255
            },
            {
              id:"sdaf23ffaa",
              x:6,
              y:7,
              z:9,
              r: 70,
              g: 25,
              b: 120
            },
            {
              id:"sdafadsfaa",
              x:6,
              y:6,
              z:6,
              r: 170,
              g: 170,
              b: 9
            },
            {
              id:"fd234rfvsdfs",
              x:2,
              y:2,
              z:2,
              r: 0,
              g: 255,
              b: 160
            },
            {
              id:"fd234safwfaa",
              x:4,
              y:6,
              z:2,
              r: 160,
              g: 255,
              b: 160
          }
        ]
    };

      var testRoom = {
        x: 10,
        y: 10,
        z: 10,
      }

      let  stringdata = "" + JSON.stringify(testData);

      console.log('box data passed' + JSON.stringify(testData));
      console.log('room data passed' + JSON.stringify(testRoom));

      unityContext.send("Spawner", "generateWebBoxes", stringdata);
      console.log('boxes generated');
    }

    // function handleOnUnityCanvas(HTMLCanvasElement) {
    //   const context = canvas.getContext("webgl");
    //   const contextAttributes = context?.getContextAttributes();
    //   console.log(contextAttributes);
    //   canvas.setAttribute("role", "unityCanvas");
    // }

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
          console.log("set room list data!");
          setRoomList( roomList );
        }).then(() => {
          roomList.forEach(function(room) {
            console.log("for each room id" + room.RoomID);
            if (room.RoomID == location.state.RoomID) {
              console.log("set box data!");
              RoomInfo = room;
              BoxInfo = room.Boxes;

              console.log("Grabbed Room Info!");
              console.log("box info!" + BoxInfo);
              console.log(RoomInfo);

              room.Boxes.forEach(function (eachbox) {
                let newbox = {
                  id: eachbox.BoxID,
                  x: eachbox.Depth,
                  y: eachbox.Height,
                  z: eachbox.Width,
                  r: eachbox.Red,
                  g: eachbox.Green,
                  b: eachbox.Blue
                };
                passedBoxInfo.push(newbox);
              });

              setBoxList(passedBoxInfo);

              console.log(boxList);
              //generateBoxes();
              // call unity function to pass array here
            }
          });
        });
    }


    return(
        <Grid container spacing={2} columns={10}>
                <Grid item xs={5}>
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
                <Grid item xs={5}>
                    <Button variant="contained" onClick={generateBoxes}>Box Gen</Button>
                    {/* <div className="boxes">
                      {BoxInfo.map((box)=>{
                          return(
                              <div class="color">
                                  <div style={{height: '50px', width: '100%', backgroundColor: 'rgb(' + box.Red + ',' +  box.Green + ',' +  box.Blue + ')'}}></div>
                                  <ul id="boxcollection" class="collection with-header" style={{backgroundColor: '#62717b'}}>
                                      <li class="collection-header"><h3>{box.BoxName}</h3></li>                                         
                                      <li class="collection-item"><h4>Height: {box.Height}, Width: {box.Width}, Depth: {box.Depth}</h4></li>  
                                      <li class="collection-item"><h5>Items</h5></li>    
                                        {box.Items?.map((Item) =>
                                            <li class="collection-item">
                                                {Item.ItemName + `\t`}
                                            </li>
                                        )}                                
                                  </ul>                
                              </div>
                            )
                      })} 
                    </div> */}
                </Grid>
            </Grid>
    );
}
export default Sandbox;