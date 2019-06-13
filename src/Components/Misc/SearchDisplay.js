import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';


export default class SearchDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.token = this.parseAccessToken()
    this.incrementNum = this.incrementNum.bind(this);
    this.state = {data: "", num: 1};
    this.searchArtist();
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

  searchArtist(){
    let spotify = new SpotifyWebApi();
    spotify.setAccessToken(this.token);
    console.log("Acess token: " + this.token)

    this.artistCallback = function (err, data){
      if (err) console.log(err);
      else{
        console.log(data)
        this.setState({data: data["items"][this.state.num.toString()]["name"]});
      }
    } 
    // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
    spotify.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', (err, data) => this.artistCallback(err, data));
  }

  incrementNum() {
    this.setState({num: this.state.num+1});
    this.searchArtist();
  }

  render() {
    return (
      <div>
        <button onClick={this.incrementNum}>
          Search For Artist
        </button>
        <div style={{color: "black", padding: "20px"}}>
          {this.state.data}
        </div>
      </div>
    )
  }
}