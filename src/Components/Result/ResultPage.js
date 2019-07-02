import React from 'react';
import { Button } from '@material-ui/core'

export default class ResultPage extends React.Component {
  render() {
    return (
      <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
        <h1>
          Success! Playlist Created
        </h1>
        <h2>
          <a href={this.props.globalState.resultURL} target="_blank" rel="noopener noreferrer">
            See it here
          </a>
        </h2>
        <h3>Wanna do it again?</h3>
        <h4>Pick a step to start from:</h4>
        <span>
          <Button
            variant = {'contained'}
            color = {'primary'}
            onClick = {() => {this.props.changePage({}, 1)}}>
            Physio Form
          </Button>
          <Button
            variant = {'contained'}
            color = {'primary'}
            onClick = {() => {this.props.changePage({}, 2)}}>
            Source Select
          </Button>
          <Button
            variant = {'contained'}
            color = {'primary'}
            onClick = {() => {this.props.changePage({}, 3)}}>
            Settings
          </Button>
        </span>
      </div>
    )
  }
}