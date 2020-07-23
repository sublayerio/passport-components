import React, { Component } from 'react'
import { render } from 'react-dom'
export default class Demo extends Component {
  render() {
    return <div>
      <h1>passport-components Demo</h1>
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
