import React from 'react'
import RedirectPage from './Redirect/RedirectPage'
import FormPage from './PhysioForm/PhysioFormPage'
import SourceSelectPage from './SourceSelect/SourceSelectPage.js'
import SettingsPage from './Settings/SettingsPage.js'

export default class PageController extends React.Component {
  constructor(props){
    super(props);
  
    this.state = {
      currentPage: 0
    }

    this.submitPhysioForm = this.submitPhysioForm.bind(this)
    this.submitSourceSelect = this.submitSourceSelect.bind(this)

    this.pages = [
      <RedirectPage/>,
      <FormPage
        advancePage = {this.submitPhysioForm}
      />,
    ]
  }

  submitPhysioForm(state){
    this.pages[2] = <SourceSelectPage advancePage={this.submitSourceSelect}/>
    this.setState({
      currentPage: 2
    })

  }

  submitSourceSelect(state){
    this.pages[3] = <SettingsPage/>
    this.setState({
      currentPage: 3
    })
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
