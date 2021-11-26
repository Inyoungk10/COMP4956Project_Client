import React from 'react';
import '../css/RoomPage.css';
import Room from './Rooms';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import * as api from '../api/index.js';
import { useHistory } from 'react-router';

//import the rooms here and use map to iterate over the list object containing <Room/> component
// do the above for the boxes as well
/* Author: Gurjot Sandher, Cameron Wark
* Revision Date: 11/18/2021
* Summary: RoomPage for list of rooms and corresponding boxes
*
*
* Author: Francis Sapanta
* Revision Date: 11/25/2021
* Summary: RoomPage shows all the boxes AND items on click, no longer need the boxes page.
*/


    const RoomPage = () => {
        const [roomList, setRoomList] = useState([]);
        const [boxList, setBoxList] = useState([]);
        const history = useHistory();

        const URL = 'http://localhost:3030/rooms';

        let uid = '619499d8e15fd0d9eb530012';

        useEffect(() => {
            axios.get(`http://localhost:3030/rooms/${uid}`, {
                method: 'get',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res => {
              let roomList = res.data;
            //   console.log("res.data.Rooms: ",  res.data.Rooms);
            //   console.log("res.data: ",  res.data);
              roomList = res.data.Rooms;
              setRoomList( roomList );
            })    
            // console.log("UseEffect")
        }, [])

        let showBoxes = (obj) => {
            setBoxList( [] );
            // console.log("showBoxes()");
            //obj contains box information
            console.log("showboxes() obj is " , obj);
            setBoxList( obj );
        }

        const addRoomRedirect = () => {
            history.push('/addRoom');
        }

        const addBoxRedirect = () => {
            history.push('/addBox');
        }

        return(
            <div className="room_page">
                {/* /Use reduce to send Add Room state to create another room or push/concat to
                a new list object / send this information to the mongoDB database*/}

                {/* <button className='add_room' >Add Room </button> */}

                <div>
                    <button id="addRoomButton" onClick={addBoxRedirect}>Create New Room</button>
                </div>
                <div className="rooms_container">
                    <h1>Rooms</h1>
                        <div className="rooms">
                            {roomList?.map((room)=>{
                                return(
                                    <div>
                                        <Room handleClick={showBoxes} room={room}/>
                                    </div>
                                )
                             })} 
                        </div>
                </div>
                <div className ="boxes_container">
                    <h1>Boxes</h1>
                        <div className="boxes">
                        {boxList?.map((box)=>{
                                return(
                                    
                                    <div>
                                        <h2>{box.BoxName}</h2>  
                                        <button id="" onClick={addRoomRedirect}>Add New Box</button>                                
                                            <ul style={{margin: '30px'}}>
                                                <p>Height: {box.Height}, Width: {box.Width}, Depth: {box.Depth}</p>
                                                <h3>Items</h3>
                                                    <ol> 
                                                    {box.Items?.map((Item) =>
                                                    <li>{Item.ItemName}</li>
                                                        )}
                                                    </ol>
                                                
                                            </ul>
                                     
                                    </div>
                                //     <div>
                                //   <ul>
                                //     {Room.Boxes.map((Box) => 
                                //   <li style={{margin: '30px'}} >
                                //       {Box.BoxName}
                                //         <ul>
                                //         {Box.Items.map((Item) =>
                                //         <li>{Item.ItemName}</li>
                                //         )}
                                //         </ul>
                                //   </li>
                                //   )}
                                //   </ul>
                                //   </div>
                                )
                             })} 
                        </div>
                    {/* Box Component */}                
                </div>

            </div>
        )
    }

export default RoomPage;