import React from 'react';
import {TextField, InputAdornment, Button, Switch, FormControlLabel} from '@material-ui/core'
import './FormStyles.css'
import RadioButtonsGroup from '../Reusable/RadioButtonsGroup'

export default class PhysiologicalFormAuto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feet: '',
      inches: '',
      meters: '',
      errors: {feet: false, inches: false, meters: false, gender: false},
      useMetric: false,
      gender: '',

      genderOptions: ['Male', 'Female'],
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {if (target.type !== 'checkbox') {this.validate(false)}});
  }

  validate(pushNewErrors){
    let _errors = this.state.errors

    if (this.state.useMetric){
      if (this.state.meters === ""){
        if (pushNewErrors) {
          _errors.meters = true
        }
      }
      else{
        _errors.meters = false
      }
    }
    else {
      _errors.meters = false
    }
    if (this.state.useMetric === false) {
      if (this.state.feet === ""){
        if (pushNewErrors) {
          _errors.feet = true
        }
      }
      else{
        _errors.feet = false
      }
      if (this.state.inches === ""){
        if (pushNewErrors) {
          _errors.inches = true
        }
      }
      else{
        _errors.inches = false
      }
    }
    else {
      _errors.feet = false
      _errors.inches = false
    }
    if (this.state.gender === "") {
      if (pushNewErrors) {
        _errors.gender = true
      }
    }
    else {
        _errors.gender = false
    }

    this.setState({
      errors: _errors
    });

    let _hasError = false
    Object.keys(_errors).forEach(function(key) {
        if (_errors[key] === true) {
          _hasError = true
        }
    });

    return !_hasError
  }

  handleFormSubmit() {
    if (this.validate(true)) {
      let _height
      if (this.state.useMetric){
        _height = Number(this.state.meters) * .3048
      }
      else {
        _height = Number(this.state.feet) + (Number(this.state.inches) / 12)
      }
      this.props.changePage({height: _height, gender: this.state.gender}, 2);
    }

  }

  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <div style={{display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
          <TextField
            variant = {"filled"}
            style = {{
              margin: "10px",
              flexBasis: "100px",
              display: this.state.useMetric ? "none" : ""
            }}
            type = {'number'}
            title = {'Height'}
            name = {'feet'}
            value = {this.state.feet}
            label = {'Height'}
            onChange = {this.handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{"ft"}</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true
            }}
            disabled = {this.state.useMetric}
            error = {this.state.errors.feet}
          />
          <TextField
            variant = {"filled"}
            style = {{
              margin: "10px",
              flexBasis: "100px",
              display: this.state.useMetric ? "none" : ""
            }}
            type = {'number'}
            title = {'Height'}
            name = {'inches'}
            value = {this.state.inches}
            label = {''}
            onChange = {this.handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{"in"}</InputAdornment>,
            }}
            disabled = {this.state.useMetric}
            error = {this.state.errors.inches}
          />
          <TextField
            variant = {"filled"}
            style = {{
              margin: "10px",
              flexBasis: "220px",
              display: this.state.useMetric ? "" : "none"
            }}
            type = {'number'}
            title = {'Height'}
            name = {'meters'}
            value = {this.state.meters}
            label = {'Height'}
            onChange = {this.handleInputChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{"m"}</InputAdornment>,
            }}
            InputLabelProps={{
              shrink: true
            }}
            disabled = {!this.state.useMetric}
            error = {this.state.errors.meters}
          />
          <FormControlLabel
            style = {{
              margin: "10px",
              textAlign: "center",
            }}
            control = {
              <Switch
                checked={this.state.useMetric}
                onChange={this.handleInputChange}
                name="useMetric"
              />
            }
            label="Use Metric"
          />

        </div>
        <RadioButtonsGroup
          title = {'Gender'}
          name = {'gender'}
          options = {this.state.genderOptions}
          value = {this.state.gender}
          placeholder = {'Select Gender'}
          handleChange = {this.handleInputChange}
          error = {this.state.errors.gender}
          errorText = {"Please select a gender"}
        />
        <Button
          variant = {'contained'}
          onClick = {this.handleFormSubmit}>
          Next
        </Button>
      </form>
    );
  }
}
