import React from 'react'
import RedirectButton from './RedirectButton'
import logo from './logo.png'

export default class RedirectPage extends React.Component {
  render() {
    return (
      <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <header style={{width: "100%", background: "#1d1b1b", color: "#ec4d37", margin: "0px", padding: "0px"}}>
          <h1 style={{margin: "0", paddingTop: "100px"}}>Tempo Trainer</h1>
          <h2 style={{paddingBottom: "50px"}}>Make personalized playlists that help you run at a target pace</h2>
        </header>
        <h3>Its simple, here's how:</h3>
        <ul type="none" style={{padding: "0", textAlign: "center"}}>
          <li>Authenticate with Spotify</li>
          <li>Enter some basic info to calculate your stride length</li>
          <li>Pick which of your playlists to pull songs from</li>
          <li>Enter a target pace</li>
        </ul>
        <h3>You'll have a personalized playlist plopped into your library! Run to the beat of the music to stay on pace.</h3>
        <img src={logo}/>
        <RedirectButton text="Click to get started" />
      </div>
    )
  }
}