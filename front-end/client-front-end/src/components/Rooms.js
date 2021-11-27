import React from 'react';
/* Author: Gurjot Sandher
* Revision Date: 11/18/2021
* Summary: Room component for the RoomPage to dynamic add list of Rooms to list
*/

const Rooms = (props) => {
    const room = props.room;
    // console.log("Rooms.js shows data as ", room);
    // console.log('room', room);


    return(
        <div onClick={() => props.handleClick(room.Boxes, room.RoomID)}>
            <h3 key={room.RoomID}>{room.RoomName}</h3>
            <p>Height: {room.Height}, Width: {room.Width}, Depth: {room.Depth}</p>
        </div>
    )
}

export default Rooms;