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

        const addRoomCancel = (e) => {
            e.preventDefault();
            const form = document.getElementById('addRoomForm');
            const button = document.getElementById('addRoomButton');
            form.style.display = 'none';
            button.style.display = 'visible';
        }

        const addRoomButtonClick = () => {
            const form = document.getElementById('addRoomForm');
            const button = document.getElementById('addRoomButton');
            form.style.display = 'inline';
            button.style.display = 'none';
        }

        const addRoom = async (e) => {
            e.preventDefault();
            const height = document.getElementById('heightField').value;
            const width = document.getElementById('widthField').value;
            const depth = document.getElementById('depthField').value;
            const name = document.getElementById('roomNameField').value;

            const roomObj = {
                Height: height,
                Width: width,
                Depth: depth,
                RoomName: name
            }

            console.log(roomObj);

            const { data } = await api.addRoom(roomObj);
            console.log(data);
        }

        const addRoomRedirect = () => {
            history.push('/addRoom');
        }

        return(
            <div className="room_page">
                {/* /Use reduce to send Add Room state to create another room or push/concat to
                a new list object / send this information to the mongoDB database*/}

                {/* <button className='add_room' >Add Room </button> */}

                <div>
                    <button id="addRoomButton" onClick={addRoomRedirect}>Create New Room</button>
                    <div id="addRoomForm" style={{display: 'none'}}>
                        <form>
                        <input id="roomNameField" placeholder="Room Name" required={true} />
                        <input id="heightField" placeholder="Height" required={true} />
                        <input id="widthField" placeholder="Width" required={true} />
                        <input id="depthField" placeholder="Depth" required={true} />
                        <button onSubmit={(e) => addRoom(e)}>Submit</button>
                        {/* <button onSubmit={this.addRoom()}>Submit</button> */}
                        {/* <button onClick={(e) => addRoomCancel(e)}>Cancel</button> */}
                        </form>
                    </div>
                </div>
                <div className="rooms_container">
                    <h3>Rooms</h3>
                        <div className="rooms">
                            {roomList.map((room)=>{
                                return(
                                    <div>
                                        <Room handleClick={showBoxes} room={room}/>
                                    </div>
                                )
                             })} 
                        </div>
                </div>
                <div className ="boxes_container">
                    <h3>Boxes</h3>
                        <div className="boxes">
                        {boxList.map((box)=>{
                                return(
                                    <div>
                                        <p>{box.BoxName}</p>
                                        <p>Height: {box.Height}, Width: {box.Width}, Depth: {box.Depth}</p>
                                    </div>
                                )
                             })} 
                        </div>
                    {/* Box Component */}                
                </div>

            </div>
        )
    }

export default RoomPage;