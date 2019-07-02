import React from 'react';
import {Button} from '@material-ui/core'

export default class RedirectButton extends React.Component {

  constructor(props){
    super(props);
    this.redirectToAuth = this.redirectToAuth.bind(this);
  }

  redirectToAuth() {
    var base = "https://accounts.spotify.com/authorize";
    var params = {
        client_id: '78b3189f1c0b49caa2fbb1482f477223',
        response_type: 'token',
        redirect_uri: window.location.href.split('#')[0],
        scope: "playlist-modify-private playlist-modify-public"
    };
    
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    
    console.log("Query: " + query);
    window.location.href = base + "?" + query
  }

  render() {
    return <Button 
      variant={'contained'}
      color={'primary'}
      onClick={this.redirectToAuth}
      size={'large'}>
      {this.props.text}
    </Button>
  }
}