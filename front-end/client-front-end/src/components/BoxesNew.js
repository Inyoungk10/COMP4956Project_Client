import React, { Component } from 'react';
import {Container, Button, Col, Row, 
   } from 'react-bootstrap';
import './style/Boxes.css';
import ReactDOM from 'react-dom'
import axios from 'axios';

let uid = '619499d8e15fd0d9eb530012';
let roomID = '11ce849d-f11f-44e6-9250-650373ca2763';


function boxSelected(key) {
        

  //alert('Box selected!');
   let box = this.state.Room.find(o => o.BoxID === key);
   console.log(box.name);
   console.log(box.items);

  const divItemList = (
  <div>
      {box.name}
      <ul>
       {box.items.map((item) => (
          <li style={{margin: '30px'}}>{item}</li>
          ))}
      </ul>
      <form>
          <label>
              Item Name:
              <input type="text" name="itemName"/>
          </label>
          <Button type="submit" value="submit" >Add Item</Button>
      </form>
      

  </div>
   );}
export default class BoxesNew extends Component {
 state = {
   Room: []
   
 }
 
 //get all boxes data from room
 getBoxes() {
  console.log(this.state.Room);
  console.log(this.state.Room.Boxes);
}
componentDidMount() {
  try { 
    axios.get(`http://localhost:3030/rooms/${uid}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
      const Room = res.data.Rooms;
      console.log("roomdata"+  res);
      this.setState({ Room });
    })
  } catch (error) {
    console.log(error)
  }

}


render(){
    return(
        <div>
            <h1>Boxes</h1>
    

        <Row> {/*firstRow*/} 
            <Col>
                <Button>Add Box</Button>
                    <div id = "divAddBox"></div>
            </Col>
 
        </Row>

        <Row> {/*secondRow*/} 
            <Col>
                <div style={{backgroundColor: 'lightblue'}} id = "divBox">
                    
                    
                {
                this.state.Room.map((Room) => 
                  <div>
                    <h3>{Room.RoomName}</h3>
                  <ul>
                    {Room.Boxes.map((Box) => 
                  <li style={{margin: '30px'}} >
                      {Box.BoxName}
                        <ul>
                        {Box.Items.map((Item) =>
                        <li>{Item.ItemName}</li>
                        )}
                        </ul>
                  </li>
                  )}
                  </ul>
                  </div>
                    )}
        </div>
                
        </Col>

        <Col>
        <div style={{backgroundColor: 'beige'}} id = "divItems">
            Items Div
            <ul>

            </ul>
        </div>
        </Col>
        </Row>


        </div>
        
        
    )
}


}