import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

/* 
* @Author Gurjot Sandher
* Revision Date: 11/18/2021
* Summary: Room component for the RoomPage to dynamic add list of Rooms to list
*/

const Rooms = (props) => {
    const room = props.room;
    // console.log("Rooms.js shows data as ", room);
    // console.log('room', room);
    let profile = localStorage.getItem('profile');
    //console.log(profile);
    let email  = JSON.parse(profile).result.email;


    return(
        <div class="card darken-1" >
        <div class="card-content white-text" onClick={() => props.handleClick(room.Boxes, room.RoomID)}>
          <span class="card-title" key={room.RoomID}>{room.RoomName}</span>
          <p>Height: {room.Height}, Width: {room.Width}, Depth: {room.Depth}</p>
        </div>
        <div class="card-action">
          <a onClick={() => props.deleteRoom(room.RoomID, email)}>Delete Room</a>
          <a onClick={() => props.openSandbox(room.RoomID)}>Open Sandbox</a>
        </div>
      </div>


        
        // <div onClick={() => props.handleClick(room.Boxes, room.RoomID)}>
        //     <h3 key={room.RoomID}>{room.RoomName}</h3>
        //     <p>Height: {room.Height}, Width: {room.Width}, Depth: {room.Depth}</p>
        // </div>
    )
}

export default Rooms;