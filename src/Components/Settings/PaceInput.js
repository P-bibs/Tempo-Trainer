import React from 'react'
import {InputBase, Paper} from '@material-ui/core'
import './PaceInput.css'


export default class PaceInput extends React.Component {
  render() {
    return (
      <Paper className={"root"}>
      <InputBase
        name={this.props.name0}
        value={this.props.value0}
        onChange={this.props.handleChange}
  
        className={"input myStyle"}
        classes={{
          input: "align-right"
        }}
        placeholder="min"
        inputProps={{ "aria-label": "min" }}
      />
      <span>:</span>
      <InputBase
        name={this.props.name1}
        value={this.props.value1}
        onChange={this.props.handleChange}
  
        className={"input"}
        placeholder="sec"
        inputProps={{ "aria-label": "sec" }}
      />
      </Paper>
    );
  }
  
  render1() {
    return (
      <Paper className={"root"}>
      <InputBase
        className={"input myStyle"}
        classes={{
          input: "align-right"
        }}
        placeholder="min"
        inputProps={{ "aria-label": "min" }}
      />
      <span>:</span>
      <InputBase
        className={"input"}
        placeholder="sec"
        inputProps={{ "aria-label": "sec" }}
      />
      </Paper>
    );
  }
}