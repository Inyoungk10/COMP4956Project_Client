/**
 * @Author Francis Sapanta, Jacob Tan
 * Takes in Box and Room IDs and uses to add item to that user's specific box
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
            BoxID: location.state.BoxID,
            RoomID: location.state.RoomID,
            Email: JSON.parse(profile).result.email,
            ItemName: itemName
        }
        
        console.log(item);

        const data = await api.addItem(item);
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
                    <input id="icon_prefix" type="text"value={itemName} onChange={(e) => setItemName(e.target.value)} required></input>
                    <label for="icon_prefix" >Item Name</label>
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
        // <div>
        //     <h3>Add Item to: {location.state.BoxName}</h3>
        //     <form onSubmit={handleSubmit}>
        //         <TextField label='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} variant={textFieldVariant} required />
        //         <Button type='submit'>Submit</Button>
        //         <Button onClick={cancel}>Cancel</Button>
        //     </form>
        // </div>
    )
}

export default AddItem;
