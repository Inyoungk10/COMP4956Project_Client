/**
 * Adding boxes to a room
 * @Author Francis Sapanta, Jacob Tan
*/

/**
 * @Author Francis Sapanta
 * Clean Styling for page
 * 12/1/2021
*/

/**
 * @Author Francis Sapanta, Inyoung Kang, Brennen Chiu
 * Add colours and input validation for colours
 * 12/1/2021
*/

/**
 * @Author Francis Sapanta, Inyoung Kang, Jacob Tan 
 * Fix Input validation
 * 12/1/2021
*/
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import * as api from '../api/index.js';
import { useLocation } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import '../css/Add.css';


const AddBox = () => {

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');

    const [red, setRed] = useState('');
    const [green, setGreen] = useState('');
    const [blue, setBlue] = useState('');

    const [boxName, setBoxName] = useState('');
    const location = useLocation();

    const history = useHistory();
    const textFieldVariant = 'standard';
   
    let profile = localStorage.getItem('profile');
    console.log(profile);
    // useEffect(() => {
    //     console.log(" use effect props: " + location.state.RoomID);
      
    // });

    console.log("props: " + location.state.RoomID);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((red >= 0 && red <= 255)
        && (green >= 0 && green <= 255)
        && (blue >= 0 && blue <= 255)) {
            let box = {
                Width: width,
                Height: height,
                Depth: depth,
                BoxName: boxName,
                Red: red,
                Green: green,
                Blue: blue,
                RoomID: location.state.RoomID,
                Email: JSON.parse(profile).result.email
            }
            console.log(box);
    
            const data = await api.addBox(box);
            console.log(data);
            history.push('/rooms');
        }
    }

    const cancel = () => {
        history.push('/rooms');
    }

    const checkColour = () => {
        let red = document.getElementById('rColour').value;
        let green = document.getElementById('gColour').value;
        let blue = document.getElementById('bColour').value;

        let testDiv = document.getElementById('testColourDiv');

        if ((red >= 0 && red <= 255)
        && (green >= 0 && green <= 255)
        && (blue >= 0 && blue <= 255)) {
            testDiv.style.backgroundColor = 'rgb(' + red + ',' +  green + ',' +  blue + ')';
        }
    }

    return(
        <div class="container">
            <h3 style={{color: 'whitesmoke'}}>Add Box:</h3>
            <div class="row">
            <form class ="col s12"onSubmit={handleSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                    <input id="dimension" type="text" value={boxName} onChange={(e) => setBoxName(e.target.value)} required></input>
                    <label for="dimension" >Box Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input class="validate" id="dimension" type="number"value={width} min="0" max="10" onChange={(e) => setWidth(e.target.value)} required></input>
                    <label for="dimension" >Width</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input class="validate" id="dimension" type="number"value={height} min="0" max="10" onChange={(e) => setHeight(e.target.value)} required></input>
                    <label for="dimension" >Height</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input class="validate" id="icon_prefix" type="number"value={depth} min="0" max="10" onChange={(e) => setDepth(e.target.value)} required></input>
                    <label for="icon_prefix" >Depth</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s4">
                        <input class="validate" id="rColour" type="number" min="0" max="255" value={red} onChange={(e) => setRed(e.target.value)} required></input>
                        <label for="rColour" >Red</label>
                    </div>
                    <div class="input-field col s4">
                        <input class="validate" id="gColour" type="number" min="0" max="255" value={green} onChange={(e) => setGreen(e.target.value)} required></input>
                        <label for="gColour" >Green</label>
                    </div>
                    <div class="input-field col s4">
                        <input class="validate" id="bColour" type="number" min="0" max="255" value={blue} onChange={(e) => setBlue(e.target.value)} required></input>
                        <label for="bColour" >Blue</label>
                    </div>
                    <div id="testColourDiv" style={{width: "100%", height: "50px"}}></div>
                    <button class="btn waves-effect waves-light" onClick={checkColour}>Check Colour
                    <i class="material-icons right">format_paint</i>
                    </button>
                    
                </div>
            
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
                </button>
                <button class="btn waves-effect waves-light deep-orange darken-2" onClick={cancel} name="action">Cancel
                <i class="material-icons right">cancel</i>
                </button>
                

            
            </form>

            </div>
        </div>
    )
}

export default AddBox;
