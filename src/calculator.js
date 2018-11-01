import React, { Component } from 'react';
import './App.css';
import * as math from 'mathjs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


function EntryPoint() {
    return (
      <Router>
          <div>
              <Link to="/">Home</Link>
              <Link to="/calculator">Calculator</Link>
              <Link to="/yervant">Yervant</Link>
          </div>

          <div>
              <Route path="/" component={Home}/>
              <Route path="/calculator" component={Calculator}/>
              <Route path="/yervant" component={Yervant}/>
          </div>



      </Router>
    );
}

function Home () {
    return (
        <div>
            <p>Welcome to the home page!</p>
        </div>
    );
}

function Yervant () {
    return (
        <div>
            <h1>Hello Bro!</h1>
        </div>
    );
}

class Square extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.event(this.props.value);
  }

  render() {
    return (
        <React.Fragment>
          <input type="button" value={this.props.value} onClick={this.handleClick}/>
        </React.Fragment>
    );

  }

}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.addValue = this.addValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeCalculation = this.makeCalculation.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  addValue(value) {
    this.setState({value: this.state.value + value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyPress(event) {
    if(event.keyCode === 13) {    //Executes if the key that was pressed is the enter key
      this.makeCalculation();
    }
  }

  makeCalculation() {
    try {
        this.setState({value: math.eval(this.state.value)});
    }
    catch(err) {
        console.log(err.message);
        alert(err.message);
    }
  }

  handleClear() {
      this.setState({value: ""});
  }

  render() {
    return (
      <div className="App">
        <br />
        <h3>
            Calculator App
        </h3>
        <h4>
            Use the Command Line or GUI to input expression for evaluation
        </h4>

        <input type="text" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyPress}/>
        <br />
        <Square value="1" event={this.addValue}/>
        <Square value="2" event={this.addValue}/>
        <Square value="3" event={this.addValue}/>
        <Square value="+" event={this.addValue}/>
        <br />
        <Square value="4" event={this.addValue}/>
        <Square value="5" event={this.addValue}/>
        <Square value="6" event={this.addValue}/>
        <Square value="-" event={this.addValue}/>
        <br />
        <Square value="7" event={this.addValue}/>
        <Square value="8" event={this.addValue}/>
        <Square value="9" event={this.addValue}/>
        <Square value="*" event={this.addValue}/>
        <br />
        <Square value="." event={this.addValue}/>
        <Square value="0" event={this.addValue}/>
        <Square value="=" event={this.makeCalculation}/>
        <Square value="/" event={this.addValue}/>
        <br />
        <Square value="C" event={this.handleClear}/>
        <hr />
        <p>
            <b>Syntax</b>
            <br />
            - Conversions using syntax: value unit to unit
                e.g. 12.7 cm to inch
            <br />
            - Trigonometric conversions using syntax: sin/cos/tan(value deg)
                e.g. cos(45 deg)
            <br />
            - Boolean conditions using syntax: value operator value e.g. 14 > 3
        </p>
      </div>
    );
  }
}

export default EntryPoint;
