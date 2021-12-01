/**
 * @Author Inyoung Kang
 * Revision Date: 2021
 * Summary: Sandbox uses unity webGL to display webgl build and displays box information
 * ToDo: display information, add mouse clicks
 */
import React, { Component } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Unity, { UnityContext } from 'react-unity-webgl'

const unityContext = new UnityContext({
    loaderUrl: "\\build\\roomity\\Build.loader.js",
    dataUrl: "\\build\\roomity\\Build.data",
    frameworkUrl: "\\build\\roomity\\Build.framework.js",
    codeUrl: "\\build\\roomity\\Build.wasm",
});

const URL = 'http://localhost:3030/rooms';

const Sandbox = () => {
    const [disable, setDisable] = useState(true);
    const [roomList, setRoomList] = useState([]);
    const [boxInfo, setBoxList] = useState({
        boxList : [],
        roomID : ""

    });
    const history = useHistory();
    //console.log(roomList);
    console.log("boxes", boxInfo);

    const URL = 'http://localhost:3030/rooms';

    let profile = localStorage.getItem('profile');
    //console.log(profile);
    let email  = JSON.parse(profile).result.email;

    console.log(email);

    useEffect(() => {
        getRooms();
// console.log("UseEffect")
    }, []);

    const getRooms = async () =>{
        axios.get(`http://localhost:3030/rooms/${email}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          let roomList = res.data;
        //   console.log("res.data.Rooms: ",  res.data.Rooms);
        //   console.log("res.data: ",  res.data);
          roomList = res.data.Rooms;
          setRoomList( roomList );
        })

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
                    <Button variant="contained" onClick={() => { this.getRooms() }}>View Info</Button>
                    {/* <div id="boxInfo" style={{'background-color': 'Beige'}}>
                        <ul>
                          
                            { this.state.Room.map(Room => 
                            <div>
                                <li>
                                  {Room._id}
                                </li>
                                <li>
                                  {Room}
                                </li>
                            </div>
                            )}
                        </ul>   
                    </div> */}
                    
                </Grid>
            </Grid>
    );
}
export default Sandbox;