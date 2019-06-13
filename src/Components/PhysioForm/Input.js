import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export default class Input extends React.Component {
  render() {
    return (
      <div>
        <TextField
          variant='outlined'
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.handleChange}
          label={this.props.label} 
          InputProps={{
            endAdornment: <InputAdornment position="end">{this.props.endAdornment}</InputAdornment>,
          }}
        />
      </div>
    )
  }
}
