import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const EditRoom = () => {
    const profile = localStorage.getItem('profile');
    const typeObj = useParams();
    const history = useHistory();
    const textFieldVariant = 'standard';

    const email  = JSON.parse(profile).result.email;
    const RoomID = typeObj.roomID;
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            roomID: RoomID, // getting from url parameter
            email: email,
            Width: width,
            Height: height,
            Depth: depth,
        }
        const res = await axios.post('http://localhost:3030/editRoom', obj);

        history.push('/rooms');
    }

    const cancel = () => {
        history.push('/rooms');
    }

    return(
        <div>
            <h2>Edit Room</h2>
            <form onSubmit={handleSubmit}>
                <TextField label='Width' variant={textFieldVariant} value={width} onChange={(e) => setWidth(e.target.value)} required/>
                <br/>
                <TextField label='Height' variant={textFieldVariant} value={height} onChange={(e) => setHeight(e.target.value)} required/>
                <br/>
                <TextField label='Depth' variant={textFieldVariant} value={depth} onChange={(e) => setDepth(e.target.value)} required/>
                <br/>
                <Button variant='contained' type='submit'>Submit</Button>
                <Button variant='contained' onClick={cancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default EditRoom;