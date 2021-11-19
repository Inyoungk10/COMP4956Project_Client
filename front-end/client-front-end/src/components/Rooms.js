import React from 'react';
/* Author: Gurjot Sandher
* Revision Date: 11/18/2021
* Summary: Room component for the RoomPage to dynamic add list of Rooms to list
*/

const Rooms = (props) => {
    const room = props.room;
    // const id = room.id;
    console.log('room', room);

    return(
        <div>
            <p key={room.id}>{room.name}</p>
            <p>Height: {room.height}, Width: {room.width}, Depth: {room.depth}</p>
        </div>
    )
}

export default Rooms;