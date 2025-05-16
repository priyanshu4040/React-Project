import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    //we need to call super() in the constructor to access this keyword.
    super(props);
    //In class components, state is always defined as this.state = { ... }.
    //state represents the variables
    this.state = {
      // count and name represents state variable
      count: 0,
      name: "Priyanshu's Counter"
    };
  }

  increment = () => {

    //setState it is a default method in component to change the state
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  };

  changeName = () => {
    this.setState({ name: "Alka's Counter" })
  };

  //Yaha class component mein render method ka use karna hi padta hai otherwise errors will be shown!!!
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <p>Current value of the counter : {this.state.count}</p>
        <button onClick={this.changeName}>Change Counter Name</button>
      </div>
    );
  }
}

export default Counter;
