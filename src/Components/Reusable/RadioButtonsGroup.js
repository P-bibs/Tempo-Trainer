import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'


export default class RadioButtonsGroup extends React.Component {
  constructor(props){
    super(props);
    this.options = this.props.options.map(option => {
      return <FormControlLabel key = {option} value={option} control = {<Radio />} label = {option} />
    });
  }
  render() {
    return (
      <div className={""}>
      <FormControl component="fieldset" className={""}>
        <FormLabel component="legend">{this.props.title}</FormLabel>
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