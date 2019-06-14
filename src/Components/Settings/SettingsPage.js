import React from 'react'
import PaceInput from './PaceInput.js';
import MyButton from '../PhysioForm/Button.js'

export default class SettingsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pace: ""
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
    this.props.changePage(this.state);
  }

  render() {
    return (
      <div>
        <PaceInput />
        <MyButton 
          title={'Back'}
          action = {() => this.props.changePage({}, -1)}
        />
        <MyButton 
          title={'Done'}
          action = {this.handleFormSubmit}
        />
      </div>
    )
  }
}