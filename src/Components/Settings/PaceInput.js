import React from 'react'
import './PaceInput.css'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'

export default class PaceInput extends React.Component {
  render() {
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