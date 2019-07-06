import React from 'react';
import {Button, CircularProgress} from '@material-ui/core'
import SourceSelectCheckboxList from './SourceSelectCheckboxList';


export default class SourceSelectPage extends React.Component {
  constructor(props){
    super(props)

    let _sourceOptions = {
      "Liked Songs": {
        title: "Liked Songs",
        isPlaylist: false,
        type: "liked",
        checked: false
      },
      "Top 50 Tracks - 1 Month": {
        title: "Top 50 Tracks - 1 Month",
        isPlaylist: false,
        type: "top",
        timeSpan: "short_term",
        checked: false,
        disabled: true
      },
      "Top 50 Tracks - 6 Months": {
        title: "Top 50 Tracks - 6 Months",
        isPlaylist: false,
        type: "top",
        timeSpan: "medium_term",
        checked: false,
        disabled: true
      },
      "Top 50 Tracks - All Time": {
        title: "Top 50 Tracks - All Time",
        isPlaylist: false,
        type: "top",
        timeSpan: "long_term",
        checked: false,
        disabled: true
      }
    }

    this.state = {
      sourceOptions: _sourceOptions,
      errors: {source: false},
      loading: true
    }
    this.spotify = props.spotify

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount(){
    //Fetch user playlists and format them into objects
    this.spotify.getUserPlaylists()
      .then(function(data) {
        let _playlists = {}
        data.items.forEach(playlist => {
          _playlists[playlist.name] = {
            title: playlist.name,
            isPlaylist: true,
            id: playlist.id,
            checked: false
          }
        })
        // Add playlists to options and disable loading indicator
        this.setState(previousState => {
          return {
            sourceOptions: {...previousState.sourceOptions, ..._playlists},
            loading: false
          }
        })
      }.bind(this))
      // If the token is expired, redirect to homepage
      .catch(function(err) {
        window.location.href = window.location.href.split('#')[0]
      });
  }

  handleCheckboxChange = name => event => {
    const value = event.target.checked;

    this.setState(previousState => {
      return {
        sourceOptions: {...previousState.sourceOptions, [name]: {...previousState.sourceOptions[name], checked: value}}
      }
    }, () => {
      this.validate(false);
    });

  }

  //Check to see if all fields are filled out properly and display error messages if not
  //Accepts a boolean. If true, will add and remove errors. If false, will only remove errors.
  validate(pushNewErrors){
    let _errors = this.state.errors

    let hasOneCheck = false;
    Object.keys(this.state.sourceOptions).forEach((key) => {
      if (this.state.sourceOptions[key].checked) {
        hasOneCheck = true
      }
    });

    if (!hasOneCheck) {
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
      let _trackSources = []
      Object.keys(this.state.sourceOptions).forEach((key) => {
        if (this.state.sourceOptions[key].checked)
          _trackSources.push(this.state.sourceOptions[key])
      });

      this.props.changePage(
        {trackSources: _trackSources},
        3
      );
    }
  }

  render() {
    return (
      <div style={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
        {this.state.loading ?
          <div style={{height: "100%"}}><CircularProgress/></div>
          :
          <SourceSelectCheckboxList
            title = {'Source Select'}
            options = {this.state.sourceOptions}
            handleChange = {this.handleCheckboxChange}
            error = {this.state.errors.source}
            errorText = {"Please select a source playlist"}
          />
        }

        <span>
          <Button
            variant = {'outlined'}
            color = {'primary'}
            onClick = {() => {this.props.changePage({}, 1)}}>
            Back
          </Button>
          <Button
            variant = {'contained'}
            color = {'primary'}
            onClick = {this.handleFormSubmit}>
            Next
          </Button>
        </span>
      </div>
    )
  }
}