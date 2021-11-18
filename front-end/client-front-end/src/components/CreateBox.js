import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeX = this.onChangeX.bind(this);
    this.onChangeY = this.onChangeY.bind(this);
    this.onChangeZ = this.onChangeZ.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      X: "",
      Y: "",
      Z: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeX(e) {
    this.setState({
      X: e.target.value,
    });
  }
 
  onChangeY(e) {
    this.setState({
      Y: e.target.value,
    });
  }
 
  onChangeZ(e) {
    this.setState({
      Z: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newBox = {
      X: this.state.X,
      Y: this.state.Y,
      Z: this.state.Z,
    };
 
    axios
      .post("http://localhost:8888/619499d8e15fd0d9eb530012/rooms/1/addBox", newBox)
      .then((res) => console.log("From res.data:" + res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      X: "",
      Y: "",
      Z: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Box</h3>
        <form onSubmit={this.onSubmit}>
          <div classx="form-group">
            <label>X: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.X}
              onChange={this.onChangeX}
            />
          </div>
          <div className="form-group">
            <label>Y:  </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Y}
              onChange={this.onChangeY}
            />
          </div>
          <div className="form-group">
            <label>Z: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Z}
              onChange={this.onChangeZ}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Box"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}