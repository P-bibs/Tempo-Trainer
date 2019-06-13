import React from 'react'
import Button from '@material-ui/core/Button'

export default class MyButton extends React.Component {
  render() {
    return (
      <Button
        variant = {"contained"}
        onClick = {this.props.action}>
        {this.props.title}
      </Button>
    )
  }
}
