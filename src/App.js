import React, { Component } from 'react'
import { deserialize } from 'react-serialize'
import logo from './logo.svg'
import './App.css'
import gridData from './data-extra-spans.json'
import GridModel from './model/Grid'
import GridCellModel from './model/GridCell'
import Grid from './Grid'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: new GridModel({
        ...gridData.data,
        cells: gridData.data.cells.map(cellData => {        
          return new GridCellModel({
            ...cellData.data,
            bodyContent: deserialize(cellData.data.bodyContent)
          })
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <Grid content={this.state.content} />
        </div>
      </div>
    );
  }
}

export default App;
