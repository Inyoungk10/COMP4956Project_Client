import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {Container, Button, Col, Row, 
   } from 'react-bootstrap';
import './style/Boxes.css';
import ReactDOM from 'react-dom'


const Boxes = () => {
    const boxlist = [
        {
          id: '1',
          name: 'KitchenBox',
          x: '10', //height
          y: '20', //width
          z: '10', //length
          items: [
              'knife',
              'plates',
              'cups'
          ]
        },
        {
          id: '2',
          name: 'SportsBox',
          x: '15', //height
          y: '20', //width
          z: '10', //length
          items: [
            'basketball',
            'gloves',
            'weights'
          ]
        },
      ];

    function addBox() {

        const addBoxDiv = (
            <div>
                    <form>
                    <label>Box Name:
                    <input type="text" placeholder="BoxName"/>
                    </label>
                    <label>Enter Box Dimensions:
                    <input type="text" placeholder="x"/>
                    <input type="text"  placeholder="y"/>
                    <input type="text"  placeholder="z"/>
                    </label>
                    <Button type="submit" value="submit" >Add Box</Button>
                    </form>
            </div>
    
            
             );
             ReactDOM.render(addBoxDiv, document.getElementById('divAddBox'))
        //alert('Box Added!');
    }

    function addItem() {

        alert('Item Added!');
    }

    function boxSelected(key) {
        

        //alert('Box selected!');
         let box = boxlist.find(o => o.id === key);
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

        
         );
         ReactDOM.render(divItemList, document.getElementById('divItems'))
         

        //return box.items
        
    }

    return(

        /*comments*/
  

        <div>
        
            <h1>Boxes</h1>
        

        <Row> {/*firstRow*/} 
        <Col>
        <Button onClick={addBox} >Add Box</Button>
        <div id = "divAddBox"></div>
        </Col>
 
        </Row>

        <Row> {/*secondRow*/} 
        <Col>
        <div style={{backgroundColor: 'lightblue'}} id = "divBox">
            Boxes Div
            <ul>
                {boxlist.map((item) => (
                <li key={item.id}  onClick={() => boxSelected(item.id)}  style={{margin: '30px'}}>{item.name}; Height:{item.x} Width:{item.y} Length:{item.z} </li>
                ))}
            </ul>
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

export default Boxes;