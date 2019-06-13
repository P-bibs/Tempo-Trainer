import React from 'react';  
import MyButton from '../PhysioForm/Button'
import RadioButtonsGroup from '../PhysioForm/RadioButtonsGroup'


export default class SourceSelectPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      source: ""
    }

    this.sourceOptions = ["Saved Songs"]

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(event)

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit() {
    this.props.advancePage(this.state);
    console.log(this.state)
  }
  
  render() {
    return (
      <div>
        <RadioButtonsGroup
          title = {'Source Select'}
          name = {'source'}
          options = {this.sourceOptions}
          value = {this.state.source}
          handleChange = {this.handleInputChange}
        />
        <MyButton 
          title={'Next'}
          action = {this.handleFormSubmit}
        />
      </div>
    )
  }
}