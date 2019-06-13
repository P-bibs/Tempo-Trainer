import React from 'react'

export default class Select extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}> {this.props.title} </label>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          >
          <option value="" disabled>{this.props.placeholder}</option>
          {this.props.options.map(option => {
          return (
            <option
            key={option}
            value={option}
            label={option}>{option}
            </option>
          );
          })}
        </select>
      </div>
    )
  }
}