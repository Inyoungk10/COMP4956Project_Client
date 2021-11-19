import React, { Component } from 'react';
import axios from 'axios';
import Unity, { UnityContext } from 'react-unity-webgl'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const unityContext = new UnityContext({
    loaderUrl: "\\build\\roomity\\Build.loader.js",
    dataUrl: "\\build\\roomity\\Build.data",
    frameworkUrl: "\\build\\roomity\\Build.framework.js",
    codeUrl: "\\roomity.build\\Build.wasm",
  });

  

export default class SandboxTwo extends Component {
    state = {
        persons: []
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
                    <div id="boxInfo" style={{'background-color': 'Beige'}}>
                        <ul>
                            { this.state.persons.map(person => <li>{person.name}</li>)}
                        </ul>   
                    </div>
                    
                </Grid>
            </Grid>
        )};
}