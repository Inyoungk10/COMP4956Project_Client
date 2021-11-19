/**
 * Author: Inyoung Kang
 * Revision Date: 11/18/2021
 * Summary: CreateBox page using axios to connect to backend server and add boxes
*/
import React, { Component } from "react";

import axios from 'axios';
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeX = this.onChangeX.bind(this);
    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onChangeLength = this.onChangeLength.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      Height: "",
      Width: "",
      Length: "",
      Name: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeHeight(e) {
    this.setState({
      Height: e.target.value,
    });
  }
 
  onChangeWidth(e) {
    this.setState({
      Width: e.target.value,
    });
  }
 
  onChangeLength(e) {
    this.setState({
      Length: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      Name: e.target.value,
    });
  }
 
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newBox = {
      Height: this.state.Height,
      Width: this.state.Width,
      Length: this.state.Length,
      Name: this.state.Name,
    };
 
    axios
      .post("http://localhost:8888/619499d8e15fd0d9eb530012/rooms/1/addBox", newBox)
      .then((res) => console.log("From res.data:" + res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      Height: "",
      Width: "",
      Length: "",
      Name: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Box</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <TextField id="standard-basic" label="Name" variant="standard" value={this.state.Name}
              onChange={this.onChangeName} />
          </div>
          <div className="form-group">
            <label>Height: </label>
            <TextField id="standard-basic" label="Height" variant="standard" value={this.state.Height}
              onChange={this.onChangeHeight} />
          </div>
          <div className="form-group">
            <label>Width:  </label>
            <TextField id="standard-basic" label="Width" variant="standard" value={this.state.Width}
              onChange={this.onChangeWidth} />
          </div>
          <div className="form-group">
            <label>Length: </label>
            <TextField id="standard-basic" label="Length" variant="standard" value={this.state.Length}
              onChange={this.onChangeLength} />
          </div>
          <div className="form-group">
          <Button variant="contained" type="submit">submit</Button>
          </div>
        </form>
      </div>
    );
  }
}