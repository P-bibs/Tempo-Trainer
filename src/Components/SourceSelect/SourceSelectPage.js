import React from 'react';  
import Button from '@material-ui/core/Button'
import RadioButtonsGroup from '../Reusable/RadioButtonsGroup'
import CircularProgress from '@material-ui/core/CircularProgress';


export default class SourceSelectPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      source: "",
      sourceOptions: [],
      displayObj: <div><CircularProgress /></div>
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
    this.props.changePage(
      {sourceURIs: [this.playlistIds[this.state.source]]},
      1
    );
  }
  
  render() {
    return (
      <div>
        {this.state.displayObj}
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