import React from 'react';  

/* Import Components */
import Input from './Input';  
import Select from './Select';
import MyButton from './Button'

export default class PhysiologicalFormAuto extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      weight: '',
      age: '',
      gender: '',
      
      genderOptions: ['Male', 'Female', 'Other'],
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
    // Form submission logic
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
        <Select
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
