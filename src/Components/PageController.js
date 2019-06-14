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
    
    this.submitPhysioForm = this.submitPhysioForm.bind(this)
    this.submitSourceSelect = this.submitSourceSelect.bind(this)

    this.pages = [
      <RedirectPage/>
    ]

    let token = this.parseAccessToken()
    if (token===-1) {
      this.state = {currentPage: 0}
    }
    else {
      this.spotify = new SpotifyWebApi();
      this.spotify.setAccessToken(token);
      this.state = {currentPage: 1}
      this.pages[1] = <FormPage advancePage = {this.submitPhysioForm} spotify = {this.spotify}/>;
    }

    
  }

  submitPhysioForm(state){
    this.pages[2] = <SourceSelectPage advancePage={this.submitSourceSelect} spotify = {this.spotify}/>
    this.setState({
      currentPage: 2
    })

  }

  submitSourceSelect(state){
    this.pages[3] = <SettingsPage spotify = {this.spotify}/>
    this.setState({
      currentPage: 3
    })
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
