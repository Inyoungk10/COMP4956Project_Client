import React from 'react';
import '../css/RoomPage.css';
import Room from './Rooms';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import * as api from '../api/index.js';
import { useHistory } from 'react-router';
import { render } from 'react-dom';

//import the rooms here and use map to iterate over the list object containing <Room/> component
// do the above for the boxes as well
/* Author: Gurjot Sandher, Cameron Wark
* Revision Date: 11/18/2021
* Summary: RoomPage for list of rooms and corresponding boxes
*
*
* Author: Francis Sapanta
* Revision Date: 11/25/2021
* Summary: RoomPage shows all the boxes and items on click, no longer need the boxes page.
*
*
* Author: Francis Sapanta, Jacob Tan
* Revision Date: 11/26/2021
* Summary: Room and Box functionalities work with database
*
*
*/


    const RoomPage = () => {
        const [roomList, setRoomList] = useState([]);
        const [boxInfo, setBoxList] = useState({
            boxList : [],
            roomID : ""
   
        });
        const history = useHistory();
        //console.log(roomList);
        console.log("boxes", boxInfo);

        const URL = 'http://localhost:3030/rooms';

        let profile = localStorage.getItem('profile');
        //console.log(profile);
        let email  = JSON.parse(profile).result.email;

        let uid = '619499d8e15fd0d9eb530012';

        

        useEffect(() => {
            getRooms();

   // console.log("UseEffect")
        }, [])

        let showBoxes = (obj, roomID) => {
            setBoxList( [] );
            // console.log("showBoxes()");
            //obj contains box information
            console.log("showboxes() obj is " , obj);
            console.log("showboxes() room.id is passed from room.js: ", roomID);
            //setBoxList( obj, roomID );
            setBoxList({
                boxList: obj,
                roomID : roomID
            })
        }

        const addRoomRedirect = () => {
            history.push('/addRoom');
        }

        // function addBoxRedirect(key) {
        //     history.push('/addBox', {RoomID : key});
        // }

        const addBoxRedirect = key => {
            console.log(key);
           history.push({
                pathname:'/addBox',
                state: {RoomID: key}
            });

                
        }

        const addItem = (roomid, boxid) => {
            console.log("add item to" + roomid + "in" + boxid);
        }

        const getRooms = async () =>{
            axios.get(`http://localhost:8888/rooms/${email}`, {
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

        }

        const deleteRoom = async (roomid) => {
            console.log("delete room: ", roomid);
            let data = {RoomID: roomid,
                        Email: email};
            axios.delete('http://localhost:3030/delete/deleteRoom', {data})
            window.location.reload(false);
            }

        const deleteBox = async (roomid, boxid) => {
            axios.delete('http://localhost:3030/delete/deleteBox', {
                data : {
                    RoomID: roomid,
                    Email: email,
                    BoxID: boxid
                }
             })
             window.location.reload(false);
            }

        return(
            <div className="room_page">
                {/* /Use reduce to send Add Room state to create another room or push/concat to
                a new list object / send this information to the mongoDB database*/}

                {/* <button className='add_room' >Add Room </button> */}

                <div>
                    <button id="addRoomButton" onClick={addRoomRedirect}>Create New Room</button>
                </div>
                <div className="rooms_container">
                    <h1>Rooms</h1>
                        <div className="rooms">
                            {roomList?.map((room)=>{
                                return(
                                    <div>
                                        <Room handleClick={showBoxes} room={room}/>
                                        <button name="deleteRoomBtn" onClick={() => deleteRoom(room.RoomID, email)}>Delete Room</button>
                                    </div>
                                    
                                )
                             })} 
                        </div>
                </div>
                <div className ="boxes_container">
                    <h1>Boxes</h1>
                        <div className="boxes">

                             {/* {roomList?.map((room)=>{
                                return(
                                    <div>
                                     <button key = "room.RoomID" id="addBoxButton" onClick={() =>addBoxRedirect(room.RoomID)}>Add New Box to {room.RoomName}</button> 
                                    </div>

                                    
                                )
                             })}  */}
                             
                             <button key = "room.RoomID" id="addBoxButton" onClick={() =>addBoxRedirect(boxInfo.roomID)}>Add New Box</button> 
                        {boxInfo.boxList?.map((box)=>{
                                return(
                                    <div>
                                        <h2>{box.BoxName}</h2>
                                        <button name="deleteBoxBtn" onClick={() => deleteBox( boxInfo.roomID,box.BoxID)}>Delete Box</button>                                                                       
                                            <ul style={{margin: '30px'}}>
                                                <p>Height: {box.Height}, Width: {box.Width}, Depth: {box.Depth}</p>
                                                <h3>Items</h3>
                                                <button name="addItemBtn" onClick={() => addItem( boxInfo.roomID, box.BoxID)}>Add Item</button>
                                                    <ol> 
                                                    {box.Items?.map((Item) =>
                                                    <li>{Item.ItemName}
                                                    </li>
                                                    
                                                        )}
                                                    </ol>
                                                
                                            </ul>
                                     
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