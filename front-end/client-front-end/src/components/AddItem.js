/**
 * Author: Francis Sapanta
*/
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import * as api from '../api/index.js';
import { useLocation } from "react-router-dom";


const AddItem = () => {

    const [itemName, setItemName] = useState('');
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
        const item = {
            BoxName: location.state.BoxID,
            RoomID: location.state.RoomID,
            Email: JSON.parse(profile).result.email,
            ItemName: itemName
        }
        
        console.log(item);

        const data = await api.addItem(item);
        console.log(data);
    }

    const cancel = () => {
        history.push('/rooms');
    }

    return(
        <div>
            <h3>Add Item to: {location.state.BoxID}</h3>
            <form onSubmit={handleSubmit}>
                <TextField label='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} variant={textFieldVariant} required />
                <Button type='submit'>Submit</Button>
                <Button onClick={cancel}>Cancel</Button>
            </form>
        </div>
    )
}

export default AddItem;
