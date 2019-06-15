import React from 'react';  

/* Import Components */
import Input from '../Reusable/Input';  
import MyButton from '../Reusable/Button'
import RadioButtonsGroup from '../Reusable/RadioButtonsGroup'

export default class PhysiologicalFormAuto extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      weight: '',
      gender: '',
      
      genderOptions: ['Male', 'Female'],
      numberOfGuests: 0,
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
    this.props.changePage(this.state, 1);
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <Input 
          type = {'number'}
          title = {'Weight'}
          name = {'weight'}
          value = {this.state.weight}
          label = {'Enter Weight'}
          handleChange = {this.handleInputChange}
          endAdornment = {'lbs'}
        />
        <Input 
          type = {'number'}
          title = {'Height'}
          name = {'height'}
          value = {this.state.height}
          label = {'Enter Height'}
          handleChange = {this.handleInputChange}
          endAdornment = {'in'}
        />
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
