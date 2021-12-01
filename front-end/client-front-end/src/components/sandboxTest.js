/**
 * @Author Inyoung Kang
 * Revision Date: 2021
 * Summary: Sandbox uses unity webGL to display webgl build from Scanning team
 * ToDo: add mouse clicks
 */

import React, { Component } from 'react';
import axios from 'axios';
import Unity, { UnityContext } from 'react-unity-webgl'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const unityContext = new UnityContext({
    loaderUrl: "\\build\\TestBuild\\TestBuild.loader.js",
    dataUrl: "\\build\\TestBuild\\TestBuild.data",
    frameworkUrl: "\\build\\TestBuild\\TestBuild.framework.js",
    codeUrl: "\\build\\TestBuild\\TestBuild.wasm",
  });

export default class SandboxTest extends Component {
    state = {
        persons: {}
      }

    // function to strip boxes from data recieved
    getBoxes() {
      console.log(this.state.persons);
    }

    componentDidMount() {
      // replace with user box
        axios.get(`https://jsonplaceholder.typicode.com/users`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
      }

    useEffect() {
        unityContext.on("canvas", function (canvas) {
          canvas.width = 200;
          canvas.height = 50;
        });
      };

    render() {
        return (
          <div style={{width: '600px', display: 'table-cell'}}> 
          <Unity
          unityContext={unityContext}
          matchWebGLToCanvasSize={false}
          style={{ width: "1080px", height: "920px" }}
          /></div>
        )};
}