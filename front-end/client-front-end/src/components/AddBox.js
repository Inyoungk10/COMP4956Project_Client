/**
 * Adding boxes to a room
 * @Author Francis Sapanta, Jacob Tan
*/
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import * as api from '../api/index.js';
import { useLocation } from "react-router-dom";


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
        <div>
            <h3>Add Box:</h3>
            <form onSubmit={handleSubmit}>
                <TextField label='Box Name' value={boxName} onChange={(e) => setBoxName(e.target.value)} variant={textFieldVariant} required />
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

export default AddBox;
