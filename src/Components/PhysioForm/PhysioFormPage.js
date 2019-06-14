import React from 'react'
import PhysiologicalFormAuto from './PhysiologicalFormAuto.js'

export default class FormPage extends React.Component {
  render() {
    return (
      <div>
        <PhysiologicalFormAuto 
          changePage = {this.props.changePage}
        />
      </div>
    )
  }
}