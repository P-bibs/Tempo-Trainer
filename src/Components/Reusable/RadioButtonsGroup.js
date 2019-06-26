import React from 'react';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core';


export default class RadioButtonsGroup extends React.Component {
  render() {
    let _options = this.props.options.map(option => {
      return <FormControlLabel style = {this.props.error ? {color: "red"} : {}} key = {option} value={option} control = {<Radio/>} label = {option} />
    });

    return (
      <div className={""}>
      <FormControl component="fieldset" className={""}>
        <FormLabel
          style = {this.props.labelStyle}
          component="legend">{this.props.title}
        </FormLabel>
        <RadioGroup
          aria-label={this.props.name}
          name={this.props.name}
          className={""}
          value={this.props.value}
          onChange={this.props.handleChange}
        >
        {_options}
        </RadioGroup>
      </FormControl>
      {this.props.error ? <p style={{color: "red", fontSize: "16px"}}>{this.props.errorText}</p> : <p></p>}
      </div>
    );
  }
}