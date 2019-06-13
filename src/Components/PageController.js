import React from 'react'
import RedirectPage from './Redirect/RedirectPage'
import FormPage from './Form/FormPage'

export default class PageController extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      currentPage: 0
    }

    this.pages = [<RedirectPage/>, <FormPage />, ]
  }
  
  componentDidMount(){
    if (window.location.href.includes('access_token')){
      this.setState({
        currentPage: 1
      })
    }
  }
  
  render(){
    return this.pages[this.state.currentPage];
  }
}
