import React from 'react';
import '../css/RoomPage.css';
import Room from './Rooms';
//import the rooms here and use map to iterate over the list object containing <Room/> component
// do the above for the boxes as well
/* Author: Gurjot Sandher
* Revision Date: 11/18/2021
* Summary: RoomPage for list of rooms and corresponding boxes
*/

    const RoomPage = () => {
        const roomList = [
            {
                "name": "den",
                "height": 3,
                "width": 5,
                "depth": 8,
                "Boxes": 
                    [
                        {
                            "name":'KitchenBox',
                            "height": '10', //height
                            "width": '20', //width
                            "depth": '10', //length
                            "items": [
                                'knife',
                                'plates',
                                'cups'
                            ]
                        },
                        {
                            "name":'BedRoombox',
                            "height": '30', //height
                            "width": '25', //width
                            "depth": '19', //length
                            "items": [
                                'pillow',
                                'mattress',
                                'lamp'
                            ]
                        },                    {
                            "name":'BathroomBox',
                            "height": '22', //height
                            "width": '76', //width
                            "depth": '45', //length
                        "items": [
                            'shampoo',
                            'soap',
                            'comb'
                        ]
                    }
                ]
            }
            
        ]

        return(
            <div class="room_page">
                {/* /Use reduce to send Add Room state to create another room or push/concat to
                a new list object / send this information to the mongoDB database*/}

                <button class='add_room'>Add Room </button>

                <div class="rooms_container">
                    <h3>Rooms</h3>
                        <div class="rooms">
                            {roomList.map((room) => {
                                <p>Hello</p>
                            })}
                        {/* <Room room={roomList[0]}/> */}
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