import React from 'react';
import {Radio, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core';


export default class RadioButtonsGroup extends React.Component {
  constructor(props){
    super(props);
    this.options = this.props.options.map(option => {
      return <FormControlLabel style = {this.props.buttonStyle} key = {option} value={option} control = {<Radio />} label = {option} />
    });
  }
  render() {
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
        {this.options}
        </RadioGroup>
      </FormControl>
      </div>
    );
  }
}