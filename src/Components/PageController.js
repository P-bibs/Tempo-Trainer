import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import RedirectPage from './Redirect/RedirectPage'
import FormPage from './PhysioForm/PhysioFormPage'
import SourceSelectPage from './SourceSelect/SourceSelectPage.js'
import SettingsPage from './Settings/SettingsPage.js'
import ResultPage from './Result/ResultPage';

export default class PageController extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: 0
      //'globalState' defined later
    }
    
    this.changePage = this.changePage.bind(this);

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
        changePage={this.changePage}
        spotify = {this.spotify}
      />;
    }
  }

  changePage(data, pageNumber) {
    if (pageNumber >= this.state.currentPage) {
      let _props = {
        globalState: {...this.state.globalState, ...data},
        changePage: this.changePage,
        spotify: this.spotify
      }

      let _pages = [
        <RedirectPage {..._props}/>,
        <FormPage {..._props}/>,
        <SourceSelectPage {..._props}/>,
        <SettingsPage {..._props}/>,
        <ResultPage {..._props}/>,
      ]

      this.pages[pageNumber] = _pages[pageNumber]
    }

    this.setState(previousState => {
      return {
        currentPage: pageNumber,
        globalState: {...previousState.globalState, ...data}
      }
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
