import React from 'react'
import PaceInput from './PaceInput.js';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

export default class SettingsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paceMinutes: "",
      paceSeconds: "",
      playlistTitle: "",
      compatibleTracks: 0,
      tolerance: 10,

      responseRecieved: false
    }
    this.spotify = this.props.spotify;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.strideLength = Number(this.props.globalState.height) * (this.props.globalState.gender === "male" ? 1.17 : 1.14)
    console.log(this.strideLength)
  }

  calculateTargetTempo(strideLength, targetPace) {
    return (1/strideLength) * 5280 / targetPace
  }

  componentDidMount(){
    console.log(this.props.globalState.sourceURIs)
    this.spotify.getPlaylist(this.props.globalState.sourceURIs[0])
      .then(function(data){
        let tracks = data.tracks.items.map(item => {
          return item.track.id
        })
        return this.spotify.getAudioFeaturesForTracks(tracks)
      }.bind(this))
      .then(function(data){
        console.log(data)

        let _possibleTracks = data.audio_features.map(item => {
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
    //this.props.changePage(this.state);
    this.spotify.getMe()
      .then(function(data){
        let _userId = data.id
        return this.spotify.createPlaylist(_userId, {name: this.state.playlistTitle, public: false})
      }.bind(this))
      .then(function(data){
        let _tracks = this.state.compatibleTracks.map(item => {return "spotify:track:" + item[0]})
        return this.spotify.addTracksToPlaylist(data.id, _tracks)
      }.bind(this))
      .then(function(data){
        console.log(data)
      })
  }

  render() {
    
    if (this.state.responseRecieved === false) {
      return <CircularProgress />
    }
    else{
      return (
        <div>
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
            <PaceInput
              name0 = {"paceMinutes"}
              value0 = {this.state.paceMinutes}
              name1 = {"paceSeconds"}
              value1 = {this.state.paceSeconds}
              handleChange = {this.handleInputChange}
            />
          </div>
          <div>
            Number of songs that match tempo:
          </div>
          <div>
            {this.state.compatibleTracks.length}/{this.state.possibleTracks.length}
          </div>
          <Button 
            variant = {'contained'}
            onClick = {() => this.props.changePage({}, -1)}>
            Back
          </Button>
          <Button 
            variant = {'contained'}
            onClick = {this.handleFormSubmit}>
            Done
          </Button>
        </div>
      )
    }
  }
}