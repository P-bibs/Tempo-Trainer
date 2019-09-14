import React from 'react';
import {Button, CircularProgress} from '@material-ui/core'
import {isMobileOnly} from 'react-device-detect'
import SourceSelectCheckboxList from './SourceSelectCheckboxList';


export default class SourceSelectPage extends React.Component {
  constructor(props){
    super(props)

    let _specialSources = {
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
      specialSources: _specialSources,
      errors: {source: false},
      loading: true
    }
    this.spotify = props.spotify

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
  }

  componentDidMount(){
    //Fetch user playlists and format them into objects
    this.getUserPlaylists()
  }

  async getUserPlaylists() {
    let me = await this.spotify.getMe()
    let userID = me.id


    let _publicPlaylists = {}
    let _privatePlaylists = {}
    let _followedPlaylists = {}

    //Get first 50 saved tracks
    let data
    try {
      data = await this.spotify.getUserPlaylists({limit: 50})
    } catch (err) {
      // If the token is expired, redirect to homepage
      window.location.href = window.location.href.split('#')[0]
    }

    //Once you know how many tracks the user has saved, fetch them in sets of 50
    let totalPlaylists = data.total;
    for (let i = 50; i < totalPlaylists+50; i+=50) {
      data.items.forEach((playlist) => {
        let playlistDict = {
          title: playlist.name,
          isPlaylist: true,
          id: playlist.id,
          checked: false
        }
        if (playlist.owner.id === userID) {
          if (playlist.public) {
            _publicPlaylists[playlist.name] = (playlistDict)
          }
          else {
            _privatePlaylists[playlist.name] = (playlistDict)
          }
        }
        else {
          _followedPlaylists[playlist.name] = (playlistDict)
        }
      });
      data = await this.spotify.getUserPlaylists({limit: 50, offset:i})
    }

    this.setState({
      publicPlaylists: _publicPlaylists,
      privatePlaylists: _privatePlaylists,
      followedPlaylists: _followedPlaylists,
      loading: false
    })
  }

  handleCheckboxChange = stateName => playlistName => event => {
    const value = event.target.checked;

    this.setState(previousState => {
      return {
        [stateName]: {...previousState[stateName], [playlistName]: {...previousState[stateName][playlistName], checked: value}}
      }
    }, () => {
      this.validate(false);
    });

  }

  //Check to see if all fields are filled out properly and display error messages if not
  //Accepts a boolean. If true, will add and remove errors. If false, will only remove errors.
  validate(pushNewErrors){
    let _errors = this.state.errors

    //Loop through each set of sources and see if at least one source is selected
    let hasOneCheck = false;
    let sourceTypes = ["specialSources", "publicPlaylists", "privatePlaylists", "followedPlaylists"]
    for (let i = 0; i < sourceTypes.length; i++) {
      let sourceType = sourceTypes[i]
      Object.keys(this.state[sourceType]).forEach((key) => {  // eslint-disable-line
        if (this.state[sourceType][key].checked) {
          hasOneCheck = true;
        }
      });
      if (hasOneCheck) break;
    }

    //Add or remove errors depending on whether or not above code
    //found at least one checked box
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
      //Loop through each set of playlists and grab ids for any boxes that are checked
      let _trackSources = []
      let sourceTypes = ["specialSources", "publicPlaylists", "privatePlaylists", "followedPlaylists"]
      for (let i = 0; i < sourceTypes.length; i++) {
        let sourceType = sourceTypes[i]
        Object.keys(this.state[sourceType]).forEach((key) => {
          if (this.state[sourceType][key].checked)
            _trackSources.push(this.state[sourceType][key])
        });
      }


      this.props.changePage(
        {trackSources: _trackSources},
        3
      );
    }
  }

  render() {
    if (!isMobileOnly) {
      return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
          <h1 style={{margin: "25px"}}>Source Select</h1>
          <p style={{margin: "25px"}}>Pick which existing playlists you'd like to pull songs from to make your new playlist</p>
          {this.state.loading ?
            <div style={{height: "auto"}}><CircularProgress/></div>
            :
            <div style={{margin: "25px", height: "60vh", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
              <SourceSelectCheckboxList
                title = {'Special Sources'}
                options = {this.state.specialSources}
                handleChange = {this.handleCheckboxChange('specialSources')}
                error = {this.state.errors.source}
                errorText = {"Please select a source playlist"}
              />
              {Object.keys(this.state.publicPlaylists).length !== 0 ?
                <SourceSelectCheckboxList
                  title = {'Public'}
                  options = {this.state.publicPlaylists}
                  handleChange = {this.handleCheckboxChange('publicPlaylists')}
                  error = {this.state.errors.source}
                  errorText = {"Please select a source playlist"}
                />
                :
                <div/>
              }
              {Object.keys(this.state.privatePlaylists).length !== 0 ?
                <SourceSelectCheckboxList
                  title = {'Private'}
                  options = {this.state.privatePlaylists}
                  handleChange = {this.handleCheckboxChange('privatePlaylists')}
                  error = {this.state.errors.source}
                  errorText = {"Please select a source playlist"}
                />
                :
                <div/>
              }
              {Object.keys(this.state.followedPlaylists).length !== 0 ?
                <SourceSelectCheckboxList
                  title = {'Followed'}
                  options = {this.state.followedPlaylists}
                  handleChange = {this.handleCheckboxChange('followedPlaylists')}
                  error = {this.state.errors.source}
                  errorText = {"Please select a source playlist"}
                />
                :
                <div/>
              }
            </div>
          }

          <span style={{margin: "25px"}}>
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
    else {
      return (
        <div style={{height: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
          <h1 style={{margin: "25px"}}>Source Select</h1>
          <p style={{margin: "25px"}}>Pick which existing playlists you'd like to pull songs from to make your new playlist</p>
          <p>MOBILE DEVICE</p>
          {this.state.loading ?
            <div style={{height: "auto"}}><CircularProgress/></div>
            :
            <div style={{margin: "25px", height: "auto", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
              <SourceSelectCheckboxList
                title = {'Special Sources'}
                options = {this.state.specialSources}
                handleChange = {this.handleCheckboxChange('specialSources')}
                error = {this.state.errors.source}
                errorText = {"Please select a source playlist"}
              />
              {Object.keys(this.state.publicPlaylists).length !== 0 ?
                <SourceSelectCheckboxList
                  title = {'Public'}
                  options = {this.state.publicPlaylists}
                  handleChange = {this.handleCheckboxChange('publicPlaylists')}
                  error = {this.state.errors.source}
                  errorText = {"Please select a source playlist"}
                />
                :
                <div/>
              }
              {Object.keys(this.state.privatePlaylists).length !== 0 ?
                <SourceSelectCheckboxList
                  title = {'Private'}
                  options = {this.state.privatePlaylists}
                  handleChange = {this.handleCheckboxChange('privatePlaylists')}
                  error = {this.state.errors.source}
                  errorText = {"Please select a source playlist"}
                />
                :
                <div/>
              }
              {Object.keys(this.state.followedPlaylists).length !== 0 ?
                <SourceSelectCheckboxList
                  title = {'Followed'}
                  options = {this.state.followedPlaylists}
                  handleChange = {this.handleCheckboxChange('followedPlaylists')}
                  error = {this.state.errors.source}
                  errorText = {"Please select a source playlist"}
                />
                :
                <div/>
              }
            </div>
          }

          <span style={{margin: "25px"}}>
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
}