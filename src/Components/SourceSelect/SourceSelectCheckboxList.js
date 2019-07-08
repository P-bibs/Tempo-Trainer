import React from 'react'
import { FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup } from '@material-ui/core'

export default class SourceSelectCheckboxList extends React.Component {

  render() {
    let _options = Object.keys(this.props.options).map(key => {
      let item = this.props.options[key]
      return <FormControlLabel
        style = {this.props.error ? {color: "red"} : {}}
        key = {item.title}
        control = {<Checkbox checked = {item.checked} onChange = {this.props.handleChange(item.title)} value = {item.title}/>} 
        label = {item.title}
        disabled = {item.disabled}
      />
    })

    return (
      <div style={{padding: "10px", margin: "10px", border: "1px solid black"}}>
        <FormControl component = "fieldset" style={{height: "100%", overflow: "auto", flexWrap: "nowrap"}}>
          <FormLabel component = "legend">{this.props.title}</FormLabel>
          <FormGroup>
            {_options}
          </FormGroup>
        </FormControl>
        {this.props.error ? <p style={{color: "red", fontSize: "16px"}}>{this.props.errorText}</p> : <div/>}
      </div>
    )
  }
}