import React from 'react';  
import MyButton from '../PhysioForm/Button'
import RadioButtonsGroup from '../PhysioForm/RadioButtonsGroup'
import { thisExpression } from '@babel/types';


export default class SourceSelectPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      source: "",
      sourceOptions: [],
      displayObj: <div>Loading</div>
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
          displayObj: <RadioButtonsGroup
            title = {'Source Select'}
            name = {'source'}
            options = {["Saved Songs", ...names]}
            value = {this.state.source}
            handleChange = {this.handleInputChange}
          />
        })
      }.bind(this))
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(previousState => {
      return {
        [name]: value,
        displayObj: <RadioButtonsGroup
          title = {'Source Select'}
          name = {'source'}
          options = {previousState.sourceOptions}
          value = {value}
          handleChange = {this.handleInputChange}
        />
      }
    });
  }

  handleFormSubmit() {
    this.props.advancePage({playlistURI: this.playlistIds[this.state.source]});
  }
  
  render() {
    return (
      <div>
        {this.state.displayObj}
        <MyButton 
          title={'Next'}
          action = {this.handleFormSubmit}
        />
      </div>
    )
  }
}