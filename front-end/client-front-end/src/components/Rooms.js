import React from 'react';
/* Author: Gurjot Sandher
* Revision Date: 11/18/2021
* Summary: Room component for the RoomPage to dynamic add list of Rooms to list
*/

const Rooms = (props) => {
    const room = props.room
    return(
        <div>
            <h2>{room.name}</h2>
            <p>Height: {room.height}, Width: {room.width}, Depth:{room.depth}</p>
        </div>
    )
}

export default Rooms;