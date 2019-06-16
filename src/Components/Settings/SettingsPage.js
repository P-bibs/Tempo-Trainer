import React from 'react'
import PaceInput from './PaceInput.js';
import MyButton from '../Reusable/Button.js'
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SettingsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paceMinutes: "",
      paceSeconds: "",
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
      }).length

      this.setState({
        compatibleTracks: _compatibleTracks
      });
    });

    
  }

  handleFormSubmit() {
    this.props.changePage(this.state);
  }

  render() {
    
    if (this.state.responseRecieved === false) {
      return <CircularProgress />
    }
    else{
      return (
        <div>
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
            {this.state.compatibleTracks}/{this.state.possibleTracks.length}
          </div>
          <MyButton 
            title={'Back'}
            action = {() => this.props.changePage({}, -1)}
          />
          <MyButton 
            title={'Done'}
            action = {this.handleFormSubmit}
          />
        </div>
      )
    }
  }
}