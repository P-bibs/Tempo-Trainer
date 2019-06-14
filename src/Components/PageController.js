import React from 'react'
import RedirectPage from './Redirect/RedirectPage'
import FormPage from './PhysioForm/PhysioFormPage'
import SourceSelectPage from './SourceSelect/SourceSelectPage.js'
import SettingsPage from './Settings/SettingsPage.js'
import SpotifyWebApi from 'spotify-web-api-js'

export default class PageController extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 0
    }
    
    this.changePage_PhysioForm = this.changePage_PhysioForm.bind(this)
    this.changePage_SourceSelect = this.changePage_SourceSelect.bind(this)
    this.changePage_Settings = this.changePage_Settings.bind(this)

    this.pages = [
      <RedirectPage/>
    ]

    let token = this.parseAccessToken()
    if (token===-1) {
      this.state = {...this.state, currentPage: 0}
    }
    else {
      this.spotify = new SpotifyWebApi();
      this.spotify.setAccessToken(token);
      this.state = {...this.state, currentPage: 1}
      this.pages[1] = <FormPage 
        changePage={this.changePage_PhysioForm}
        spotify = {this.spotify}
      />;
    }

    
  }

  changePage_PhysioForm(data, direction){
    if (direction === 1){
      this.pages[2] = <SourceSelectPage
        changePage={this.changePage_SourceSelect}
        spotify = {this.spotify}
      />
      this.setState({
        currentPage: 2,
      })
    }

  }

  changePage_SourceSelect(data, direction){
    if (direction === 1){
      this.pages[3] = <SettingsPage
        sourceURIs = {data.playlistURI}
        changePage={this.changePage_Settings}
        spotify = {this.spotify}
      />
      this.setState({
        currentPage: 3,
      })
    }
    else if (direction === -1) {
      this.setState({
        currentPage: 1
      })
    }
  }

  changePage_Settings(data, direction){
    if (direction === -1) {
      this.setState({
        currentPage: 2
      })
    }
  }

  parseAccessToken(){
    var url = window.location.href;
    if (url.includes("access_token=")) {
      var startIndex = url.indexOf("access_token=") + "access_token=".length
      var token = url.substring(startIndex, url.indexOf("&", startIndex))
      
      return token;
    }
    else {
      return -1;
    }
  }
  
  render(){
    return this.pages[this.state.currentPage];
  }
}
