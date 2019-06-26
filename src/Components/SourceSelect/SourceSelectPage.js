import React from 'react';
import {Button, CircularProgress} from '@material-ui/core'
import RadioButtonsGroup from '../Reusable/RadioButtonsGroup'


export default class SourceSelectPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      source: "",
      sourceOptions: [],
      errors: {source: false},
      loading: true
    }
    this.spotify = props.spotify

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount(){
    this.spotify.getUserPlaylists()
      .then(function(data) {
        //Construct Table to translate playlist names into Spotify URIs
        this.playlistIds = {}
        data.items.forEach(item => {this.playlistIds[item.name] = item.id})

        let names = []
        data.items.forEach(element => {
          names.push(element.name)
        });

        this.setState({
          sourceOptions: names,
          loading: false
        })
      }.bind(this))
      .catch(function(err) {
        window.location.href = window.location.href.split('#')[0]
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(previousState => {
      return {
        [name]: value,
      }
    }, () => this.validate(false));

  }

  validate(pushNewErrors){
    let _errors = this.state.errors

    if (this.state.source === "") {
      if (pushNewErrors) {
        _errors.source = true
      }
    }
    else {
      _errors.source = false
    }

    this.setState({
      errors: _errors
    });

    let _hasError = false
    Object.keys(_errors).forEach(function(key) {
        if (_errors[key] === true) {
          _hasError = true
        }
    });

    return !_hasError
  }

  handleFormSubmit() {
    if (this.validate(true)) {
      this.props.changePage(
        {sourceURIs: [this.playlistIds[this.state.source]]},
        1
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <div><CircularProgress/></div>
          :
          <RadioButtonsGroup
            title = {'Source Select'}
            name = {'source'}
            options = {["Saved Songs", ...this.state.sourceOptions]}
            value = {this.state.source}
            handleChange = {this.handleInputChange}
            error = {this.state.errors.source}
            errorText = {"Please select a source playlist"}
          />
        }

        <Button
          variant = {'contained'}
          onClick = {() => {this.props.changePage({}, -1)}}>
          Back
        </Button>
        <Button
          variant = {'contained'}
          onClick = {this.handleFormSubmit}>
          Next
        </Button>
      </div>
    )
  }
}