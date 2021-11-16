import React from 'react';
import '../css/RoomPage.css';
//import the rooms here and use map to iterate over the list object containing <Room/> component
// do the above for the boxes as well
const RoomPage = () => {
    return(
        <div class="room_page">
            {/* /Use reduce to send Add Room state to create another room or push/concat to
            a new list object / send this information to the mongoDB database*/}

            <button class='add_room'>Add Room </button>

            <div class="rooms_container">
                <h3>Rooms</h3>
                    <div class="rooms">

                    </div>
                {/* Room Component */}
            </div>
            <div class ="boxes_container">
                <h3>Boxes</h3>
                    <div class="boxes">

                    </div>
                {/* Box Component */}                
            </div>

        </div>
    )
}

export default RoomPage;