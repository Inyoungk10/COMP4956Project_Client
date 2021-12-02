/**
 * Adding boxes to a room
 * @Author Francis Sapanta, Jacob Tan
*/

/**
 * @Author Francis Sapanta
 * Clean Styling for page
 * 12/1/2021
*/
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import * as api from '../api/index.js';
import { useLocation } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';


const AddBox = () => {

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
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
        const box = {
            Width: width,
            Height: height,
            Depth: depth,
            BoxName: boxName,
            RoomID: location.state.RoomID,
            Email: JSON.parse(profile).result.email
        }
        
        console.log(box);

        const data = await api.addBox(box);
        console.log(data);
        history.push('/rooms');
    }

    const cancel = () => {
        history.push('/rooms');
    }

    return(
        <div class="container">
            <h3>Add Box:</h3>
            <div class="row">
            <form class ="col s12"onSubmit={handleSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                    <input id="icon_prefix" type="text"value={boxName} onChange={(e) => setBoxName(e.target.value)} required></input>
                    <label for="icon_prefix" >Box Name</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <input id="icon_prefix" type="text"value={width} onChange={(e) => setWidth(e.target.value)} required></input>
                    <label for="icon_prefix" >Width</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <input id="icon_prefix" type="text"value={height} onChange={(e) => setHeight(e.target.value)} required></input>
                    <label for="icon_prefix" >Height</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <input id="icon_prefix" type="text"value={depth} onChange={(e) => setDepth(e.target.value)} required></input>
                    <label for="icon_prefix" >Depth</label>
                    </div>
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
