/**
 * @Author Cameron Wark
 * Add room to specific user\
 * 
 * 
 * TODO input validation
*/

/**
 * @Author Francis Sapanta
 * Clean Styling for page
 * 12/1/2021
*/

/**
 * @Author Francis Sapanta, Inyoung Kang
 * Fixed input validation
 * 12/1/2021
*/
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import * as api from '../api/index.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../css/Add.css';

const AddRoom = () => {

    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
    const [roomName, setRoomName] = useState('');

    const history = useHistory();
    const textFieldVariant = 'standard';

    let profile = localStorage.getItem('profile');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const room = {
            Width: width,
            Height: height,
            Depth: depth,
            RoomName: roomName,
            Email: JSON.parse(profile).result.email
        }
        console.log(room);

        const data = await api.addRoom(room);
        console.log(data);
        history.push('/rooms');
    }

    const cancel = () => {
        history.push('/rooms');
    }

    return(
        <div class="container">
            <h3>Add Room:</h3>
            <div class="row">
            <form class ="col s12"onSubmit={handleSubmit}>
                <div class="row">
                    <div class="input-field col s12">
                    <input id="dimension" type="text"value={roomName} onChange={(e) => setRoomName(e.target.value)} required></input>
                    <label for="dimension" >Room Name</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <input class="validate" min="0" max="60" id="dimension" type="number"value={width} onChange={(e) => setWidth(e.target.value)} required></input>
                    <label for="dimension" >Width</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <input class="validate" min="0" max="60" id="dimension" type="number"value={height} onChange={(e) => setHeight(e.target.value)} required></input>
                    <label for="dimension" >Height</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <input class="validate" min="0" max="60" id="dimension" type="number"value={depth} onChange={(e) => setDepth(e.target.value)} required></input>
                    <label for="dimension" >Depth</label>
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

export default AddRoom;
