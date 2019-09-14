import React from 'react'
import {TextField, CircularProgress, Button} from '@material-ui/core';
import PaceInput from './PaceInput.js';

export default class SettingsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paceMinutes: "",
      paceSeconds: "",
      playlistTitle: "",
      compatibleTracks: 0,
      tolerance: 10,
      loading: false,

      responseRecieved: false
    }
    this.spotify = this.props.spotify;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.sourcesToTracks = this.sourcesToTracks.bind(this);

    this.strideLength = Number(this.props.globalState.height) * (this.props.globalState.gender === "male" ? 1.17 : 1.14)
    console.log(this.strideLength)
  }

  calculateTargetTempo(strideLength, targetPace) {
    return (1/strideLength) * 5280 / targetPace
  }

  componentDidMount(){
    //Turn input source objects into a track id list and then retrieve all audio features
    this.sourcesToTracks()
      .then(function(data) {
        //Split audio feature requests into sets of 100 and then run
        let batchPromises = []
        for (let i = 0; i < data.length; i+=100) {
          let listSlice = data.slice(i, Math.min(i+100, data.length))
          batchPromises.push(this.spotify.getAudioFeaturesForTracks(listSlice))
        }
        return Promise.all(batchPromises)
      }.bind(this))
      .then(function(dataList){
        //Create a list of track ids and their tempos
        let data = []
        dataList.forEach(batch => {
          data.push(...batch.audio_features)
        })

        let _possibleTracks = data.map(item => {
          if(item){
            return [item.id, item.tempo]
          }
          else{
            return [0, 0]
          }
        })

        this.setState({
          responseRecieved: true,
          possibleTracks: _possibleTracks
        })


      }.bind(this));
  }

  //Take a list of many types of sources (liked songs, top songs, playlists) and
  //return a list of track ids
  async sourcesToTracks() {
    let _tracks = [];

    for (let i in this.props.globalState.trackSources) {
      let source = this.props.globalState.trackSources[i];

      if (source.isPlaylist) {
        let _data = await this.spotify.getPlaylistTracks(source.id)
        _data.items.forEach((item) => {
          _tracks.push(item.track.id)
        });
      }

      else if (source.type === "liked") {
        //Get first 50 saved tracks
        let _data = await this.spotify.getMySavedTracks({limit: 50})

        _data.items.forEach((item) => {
          _tracks.push(item.track.id)
        });

        //Once you know how many tracks the user has saved, fetch them in sets of 50
        let savedTracksLen = _data.total;
        for (let i = 50; i < savedTracksLen; i+=50) {
          let _data = await this.spotify.getMySavedTracks({limit: 50, offset:i})
          _data.items.forEach((item) => {
            _tracks.push(item.track.id)
          });
        }
      }
      //TODO: make sure this works when API is patched
      else if (source.type === "top") {
        let _data = await this.spotify.getMyTopTracks({time_range: source.timeSpan})
        _data.items.forEach((track) => {
          _tracks.push(track.id)
        });
      }
    }

    return _tracks
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    }, function(){
      let _targetTempo = this.calculateTargetTempo(this.strideLength, Number(this.state.paceMinutes) + (Number(this.state.paceSeconds) / 60))
      console.log("Target Tempo: " + _targetTempo)
      let _compatibleTracks = this.state.possibleTracks.filter(item => {
        return (item[1] > Number(_targetTempo) - this.state.tolerance && item[1] < Number(_targetTempo) + this.state.tolerance)
      })

      this.setState({
        compatibleTracks: _compatibleTracks
      });
    });


  }

  handleFormSubmit() {
    let _resultURL

    this.setState({
      loading: true
    })

    this.spotify.getMe()
      .then(function(data){
        let _userId = data.id
        return this.spotify.createPlaylist(_userId, {name: this.state.playlistTitle, public: false})
      }.bind(this))
      .then(function(data){
        let _tracks = this.state.compatibleTracks.map(item => {return "spotify:track:" + item[0]})
        _resultURL = data.external_urls.spotify
        return this.spotify.addTracksToPlaylist(data.id, _tracks)
      }.bind(this))
      .then(function(data){
        this.props.changePage({resultURL: _resultURL}, 4)
      }.bind(this))
  }

  render() {

    if (this.state.responseRecieved === false) {
      return <CircularProgress />
    }
    else{
      return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
          <h1>Settings</h1>
          <TextField
            variant = {"filled"}
            style = {{
              margin: "10px",
            }}
            type = {'text'}
            name = {'playlistTitle'}
            value = {this.state.playlistTitle}
            label = {'Playlist Title'}
            onChange = {this.handleInputChange}
          />
          <div>
            <p style={{marginBottom: "10px"}}>Target Pace:</p>
            <PaceInput
              name0 = {"paceMinutes"}
              value0 = {this.state.paceMinutes}
              name1 = {"paceSeconds"}
              value1 = {this.state.paceSeconds}
              handleChange = {this.handleInputChange}
            />
          </div>
          <div style={{marginTop: "25px"}}>
            Number of songs that match pace:
          </div>
          <div style={{marginBottom: "25px"}}>
            {this.state.compatibleTracks.length}/{this.state.possibleTracks.length}
          </div>
          {this.state.loading ?
            <div>
              <CircularProgress/>
            </div>
            :
            <div>
              <Button
                variant = {'outlined'}
                color = {'primary'}
                onClick = {() => this.props.changePage({}, 2)}>
                Back
              </Button>
              <Button
                variant = {'contained'}
                color = {'primary'}
                onClick = {this.handleFormSubmit}>
                Done
              </Button>
            </div>
          }
        </div>
      )
    }
  }
}