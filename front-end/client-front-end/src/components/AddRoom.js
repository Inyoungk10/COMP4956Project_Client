/**
 * Author: Cameron Wark
*/
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import * as api from '../api/index.js';

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
        <div>
            <h3>Add Room:</h3>
            <form onSubmit={handleSubmit}>
                <TextField label='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)} variant={textFieldVariant} required />
                <br />
                <TextField label='Width' value={width} onChange={(e) => setWidth(e.target.value)} variant={textFieldVariant} required />
                <br />
                <TextField label='Height' value={height} onChange={(e) => setHeight(e.target.value)} variant={textFieldVariant} required />
                <br />
                <TextField label='Depth' value={depth} onChange={(e) => setDepth(e.target.value)} variant={textFieldVariant} required />       
                <br />
                <Button type='submit'>Submit</Button>
                <Button onClick={cancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default AddRoom;
