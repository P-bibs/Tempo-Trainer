import React from 'react'
import PaceInput from './PaceInput.js';
import MyButton from '../PhysioForm/Button.js'

export default class SettingsPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      paceMinutes: "",
      paceSeconds: "",
      compatibleTracks: 0
    }
    this.spotify = this.props.spotify;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount(){
    console.log(this.props.sourceURIs)
    this.spotify.getPlaylist(this.props.sourceURIs)
      .then(function(data){
        let tracks = data.tracks.items.map(item => {
          return item.track.id
        })
        return this.spotify.getAudioFeaturesForTracks(tracks)
      }.bind(this))
      .then(function(data){
        console.log(data)

        this.possibleTracks = data.audio_features.map(item => {
          return [item.id, item.tempo]
        })
        console.log(this.possibleTracks)

        

      }.bind(this));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    

    this.setState({
      [name]: value,
    }, function(){
      let _compatibleTracks = this.possibleTracks.filter(item => {
        return (item[1] > Number(this.state.paceMinutes) - 10 && item[1] < Number(this.state.paceMinutes) + 10)
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
    return (
      <div>
        <PaceInput
          name0 = {"paceMinutes"}
          value0 = {this.state.paceMinutes}
          name1 = {"paceSeconds"}
          value1 = {this.state.paceSeconds}
          handleChange = {this.handleInputChange}
        />
        <div>
          Number of songs that match tempo:
        </div>
        <div>
          {this.state.compatibleTracks}
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