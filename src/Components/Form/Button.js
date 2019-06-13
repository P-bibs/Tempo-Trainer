import React from 'react'

export default class Button extends React.Component {
  render() {
    return (
      <button 
        style= {this.props.style} 
        onClick= {this.props.action}>  
        {this.props.title} 
      </button>
    )
  }
}
