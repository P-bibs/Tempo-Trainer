import React from 'react';  
import './FormStyles.css'
/* Import Components */
//import Input from '../Reusable/Input';  
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MyButton from '../Reusable/Button'
import RadioButtonsGroup from '../Reusable/RadioButtonsGroup'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class PhysiologicalFormAuto extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      feet: '',
      inches: '',
      meters: '',
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
    });
  }

  handleFormSubmit() {
    let _height
    if (this.state.useMetric){
      _height = Number(this.state.meters) * .3048
    }
    else {
      _height = Number(this.state.feet) + (Number(this.state.inches) / 12)
    }
    this.props.changePage({height: _height, gender: this.state.gender}, 1);
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <div style={{display: "inline-flex", alignItems: "center", justifyContent: "space-evenly"}}>
          <TextField 
            variant = {"filled"}
            style = {{
              margin: "10px",
              width: "15%"
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
          />
          <TextField 
            variant = {"filled"}
            style = {{
              margin: "10px",
              width: "15%",
              float: "right"
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
          />
          <FormControlLabel
            style = {{
              textAlign: "center"
            }}
            control = {
              <Switch
                checked={this.state.useMetric}
                onChange={this.handleInputChange}
                name="useMetric"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Use Metric"
            
          />
          <TextField 
            variant = {"filled"}
            style = {{
              margin: "10px",
              width: "30%"
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
          />
        </div>
        <RadioButtonsGroup
          title = {'Gender'}
          name = {'gender'}
          options = {this.state.genderOptions}
          value = {this.state.gender}
          placeholder = {'Select Gender'}
          handleChange = {this.handleInputChange}
        />
        <MyButton 
          title={'Next'}
          action = {this.handleFormSubmit}
        />
      </form>
    );
  }
}
