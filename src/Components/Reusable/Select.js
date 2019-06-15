import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

export default class MySelect extends React.Component {
  constructor(props){
    super(props);
    this.items = this.props.options.map(option => {
      return <MenuItem
        key = {option}
        value = {option}
        label = {option}>
        {option}
      </MenuItem>
    });
  }


  render() {
    return (
      <FormControl className={""}>
        <InputLabel htmlFor={this.props.name}>{this.props.title}</InputLabel>
        <Select
          name = {this.props.name}
          id = {this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
          inputProps={{
            name: this.name,
            id: this.name,
          }}
        >
          {this.items}
        </Select>
      </FormControl>
    )
  }
}