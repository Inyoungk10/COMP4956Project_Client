/* 
* @Author: Gurjot Sandher, Cameron Wark
* Revision Date: 11/18/2021
* Summary: RoomPage divs for list of rooms and corresponding boxes; no functionalities yet
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
* @Author Francis Sapanta, Jacob Tan
* Revision Date: 11/30/2021
* Summary: Implemented all functionalities for box page; rewrite over previous implementation
* Clean up code and add in comments
*
*
* @Author Inyoung Kang
* Revision Date: 12/01/2021
* Summary: Added scrolling to rooms and boxes columnssaaaaaaaaaaaaaa
*
*/

import React from 'react';
import '../css/RoomPage.css';
import M from 'materialize-css';
import Room from './Rooms';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import 'materialize-css/dist/css/materialize.min.css';



    const RoomPage = () => {
        const [disable, setDisable] = useState(true);
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

        }, [])

        ////////////////////////////////////
        /// Retrieve Room and Box info
        ////////////////////////////////////

        const getRooms = async () =>{
            axios.get(`http://localhost:3030/rooms/${email}`, {
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
            });
            setDisable(false); 
            
        }

        console.log("box list"+ JSON.stringify(boxInfo.boxList));
        ////////////////////////////////////
        /// Page Redirects
        ////////////////////////////////////
        const addRoomRedirect = () => {
            history.push('/addRoom');
        }

        const addBoxRedirect = roomid => {
            console.log(roomid);
           history.push({
                pathname:'/addBox',
                state: {RoomID: roomid}
            });        
        }
        const sandBoxRedirect = roomid => {
            console.log(roomid);
           history.push({
                pathname:'/sandbox',
                state: {RoomID: roomid}
            });        
        }

        const addItem = (roomid, boxid, boxname) => {
            console.log("roomID : " + roomid);
            console.log("boxID : " + boxid);
            history.push({
                pathname:'/addItem',
                state: {RoomID: roomid,
                        BoxID: boxid,
                        BoxName: boxname}
            });
        }

        ////////////////////////////////////
        /// Delete Functions
        ////////////////////////////////////
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

        const deleteItem = (roomid, boxid, itemid) => {
            axios.delete('http://localhost:3030/delete/deleteItem', {
                data : {
                    RoomID: roomid,
                    Email: email,
                    BoxID: boxid,
                    ItemID: itemid
                }
            })
            window.location.reload(false);
        }

        ////////////////////////////////////
        /// Page Returns
        ////////////////////////////////////

        return(
            <div class="main_page">
                <div class="container container_div">
                    {/* /Use reduce to send Add Room state to create another room or push/concat to
                    a new list object / send this information to the mongoDB database*/}

                    {/* <button className='add_room' >Add Room </button> */}
                    <div class="row">


                        <div class="col s6">
                        
                            <h1>Rooms</h1>
                            <a id="addRoomButton" onClick={addRoomRedirect}>ADD NEW ROOM</a>
                                <div className="rooms" id="scrollDiv">
                                    {roomList?.map((room)=>{
                                        return(
                                            <div>
                                                <Room handleClick={showBoxes} deleteRoom={() => deleteRoom(room.RoomID, email)} 
                                                openSandbox={() => sandBoxRedirect(room.RoomID)} room={room}/>
                                                {/* <a class="waves-effect waves-light btn-small">Button</a> */}
                                                {/* <button name="deleteRoomBtn" onClick={() => deleteRoom(room.RoomID, email)}>Delete Room</button>
                                                <button name="enterSandboxBtn" onClick={() => sandBoxRedirect(room.RoomID)}>Open Sandbox</button> */}
                                            </div>     
                                        )
                                    })} 
                                </div>
                        </div>
                        <div class="col s6">
                            <h1>Boxes</h1>
                                <div className="boxes" >
                                    <a key = "room.RoomID" id="addBoxButton" onClick={() =>addBoxRedirect(boxInfo.roomID)} disabled={disable}>ADD NEW BOX</a>
                                    <div id="scrollDiv">
                                    {boxInfo.boxList?.map((box)=>{
                                        return(
                                            <div class="color">
                                                <div style={{height: '50px', width: '100%', backgroundColor: 'rgb(' + box.Red + ',' +  box.Green + ',' +  box.Blue + ')'}}></div>
                                                <ul id="boxcollection" class="collection with-header" style={{backgroundColor: '#62717b'}}>
                                                    <li class="collection-header"><h5>{box.BoxName}</h5>
                                                    <a name="deleteBoxBtn" onClick={() => deleteBox( boxInfo.roomID, box.BoxID)}>DELETE BOX</a></li>                                         
                                                    <li class="collection-item"><p>Height: {box.Height}, Width: {box.Width}, Depth: {box.Depth}</p></li>  
                                                    <li class="collection-item"><h5>Items</h5>
                                                    <a name="addItemBtn" onClick={() => addItem( boxInfo.roomID, box.BoxID, box.BoxName)}>ADD ITEM</a></li>    
                                                            {box.Items?.map((Item) =>
                                                                <li class="collection-item">
                                                                    {Item.ItemName + `\t`}
                                                                    <a onClick={() => deleteItem( boxInfo.roomID, box.BoxID, Item.ItemID)}>DELETE</a>
                                                                </li>
                                                            )}
                                                                                            
                                                </ul>                
                                            </div>
                                        )
                                    })} 
                                    </div>
                                </div>
                            {/* Box Component */}                
                        </div>
                    </div>

                </div>
            </div>
        )
    }

export default RoomPage;