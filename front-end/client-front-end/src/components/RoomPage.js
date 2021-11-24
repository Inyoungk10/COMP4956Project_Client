import React from 'react';
import '../css/RoomPage.css';
import Room from './Rooms';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

//import the rooms here and use map to iterate over the list object containing <Room/> component
// do the above for the boxes as well
/* Author: Gurjot Sandher
* Revision Date: 11/18/2021
* Summary: RoomPage for list of rooms and corresponding boxes
*/

    const RoomPage = () => {
        const [roomList, setRoomList] = useState([]);

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
              console.log("res.data.Rooms: ",  res.data.Rooms);
              console.log("res.data: ",  res.data);
              roomList = res.data.Rooms;
              setRoomList( [roomList] );
            })    
            console.log("UseEffect")
        }, [])

        return(
            <div className="room_page">
                {/* /Use reduce to send Add Room state to create another room or push/concat to
                a new list object / send this information to the mongoDB database*/}

                <button className='add_room'>Add Room </button>
                <div className="rooms_container">
                    <h3>Rooms</h3>
                        <div className="rooms">
                            {roomList.map((room)=>{
                                return(
                                    <div>
                                        <Room room={room}/>
                                    </div>
                                )
                             })} 
                        </div>
                </div>
                <div className ="boxes_container">
                    <h3>Boxes</h3>
                        <div className="boxes">

                        </div>
                    {/* Box Component */}                
                </div>

            </div>
        )
    }

export default RoomPage;