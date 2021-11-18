//import "bootstrap/dist/css/bootstrap.css";
// import {
//   Container,
//   Button,
//   Col,
//   Row,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   ModalFooter,
//   ModalTitle,
// } from "react-bootstrap";
import "./sandbox.css";
import React from "react";
import { Link } from "react-router-dom";
import reactDOM from 'react-dom';

const Sandbox = () => {
  

  function displayBox(i) {
    // let list = document.getElementById("itemslist");
    
    // let boxItems = boxes['id'][i][items];
    // for (var item of boxItems) {
    //     let newItem = document.createElement('h4');
    //     newItem.innerHTML = item.name;

    //     let newItemQuan = document.createElement('p');
    //     newItemQuan.innerHTML = item.quantity;
        
    //     list.appendChild(newItem);
    //     list.appendChild(newItemQuan);
    // }
    // let item = boxes[i]['items'][32]
    // let newItem = document.createElement('h4');
    // newItem.innerHTML = item.name;

    // let newItemQuan = document.createElement('p');
    // newItemQuan.innerHTML = item.quantity;
        
    // list.appendChild(newItem);
    // list.appendChild(newItemQuan);
    
  }

  return (
    <div>
      <div>
        <h1 class="heading">Room 1</h1>
        <div class="w-row">
          <div class="column-2 w-col w-col-9">
            <button id="box1" class="box w-button" onclick={displayBox(1)}>
              Test Box 1
            </button>
            <button id="box2" class="box w-button" onclick={displayBox(2)}>
              Test Box 2
            </button>
            <button id="box3" class="box w-button" onclick={displayBox(3)}>
              Test Box 3
            </button>
          </div>
          <div class="w-col w-col-3">
            <h1>Box List Item</h1>
            <div id="itemsList" role="list"></div>
          </div>
        </div>
      </div>
      <Link to="/Homepage">
      <button class="primary-button w-button">
        My Rooms
      </button>
      </Link>
    </div>
  );
};

export default Sandbox;