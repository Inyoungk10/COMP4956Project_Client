
import "./sandbox.css";
import React from "react";
import { Link } from "react-router-dom";
import reactDOM from 'react-dom';

const Sandbox = () => {
  

  function displayBox(i) {
    
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
