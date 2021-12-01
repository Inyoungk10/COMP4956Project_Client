/**
 * @Author Inyoung Kang
 * Revision Date: 2021
 * Summary: Sandbox uses unity webGL to display webgl build and displays box information
 * ToDo: display information, add mouse clicks
 */
import React, { Component } from 'react';
import axios from 'axios';
import Unity, { UnityContext } from 'react-unity-webgl'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import qs from 'qs';

const unityContext = new UnityContext({
    loaderUrl: "\\build\\roomity\\Build.loader.js",
    dataUrl: "\\build\\roomity\\Build.data",
    frameworkUrl: "\\build\\roomity\\Build.framework.js",
    codeUrl: "\\build\\roomity\\Build.wasm",
  });

const URL = 'http://localhost:3030/rooms';

let uid = '619499d8e15fd0d9eb530012';

export default class Sandbox extends Component {
    state = {
        Room: []
      }

    // function to strip boxes from data recieved
    getBoxes() {
      console.log(this.state.Room);
    }
    componentDidMount() {
      try { 
        axios.get(`http://localhost:3030/rooms/${uid}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
          const Room = res.data.Rooms;
          console.log("roomdata"+  res);
          this.setState({ Room });
        })
      } catch (error) {
        console.log(error)
      }
    }

    useEffect() {
        unityContext.on("canvas", function (canvas) {
          canvas.width = 100;
          canvas.height = 50;
        });
      };

    render() {
        return (
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
                    <Button variant="contained" onClick={() => { this.getBoxes() }}>View Info</Button>
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
        )};
}