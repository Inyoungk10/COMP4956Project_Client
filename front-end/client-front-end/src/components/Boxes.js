import 'bootstrap/dist/css/bootstrap.css';
import {Container, Button, Col, Row, 
    Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle} from 'react-bootstrap';
import './style/Boxes.css';


const Boxes = () => {
    const boxlist = [
        {
          id: 1,
          name: 'KitchenBox',
        },
        {
          id: '1',
          name: 'SportsBox',
        },
      ];

    function addBox() {

        alert('Box Added!');
    }

    return(

        /*comments*/
  

        <div>
        
            <h1>Boxes</h1>
        

        <Row> {/*firstRow*/} 
        <Col>
        <Button onClick={addBox} >Add Box</Button>
        </Col>
 
        </Row>

        <Row> {/*secondRow*/} 
        <Col>
        <div style={{backgroundColor: 'lightblue'}} id = "divBox">
            Boxes Div
            <ul>
                {boxlist.map((item) => (
                <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
        </Col>

        <Col>
        <div style={{backgroundColor: 'beige'}} id = "divBox">
            Items Div
        </div>
        </Col>
        </Row>


        </div>
        
        
    )
}

export default Boxes;