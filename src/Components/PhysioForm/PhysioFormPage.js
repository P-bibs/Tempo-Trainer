import React from 'react'
import PhysiologicalFormAuto from './PhysiologicalFormAuto.js'

export default class FormPage extends React.Component {
  render() {
    return (
      <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
        <h1>Basic Info</h1>
        <h2>Give us some starting info so we can calculate your cadence</h2>
        <PhysiologicalFormAuto
          changePage = {this.props.changePage}
        />
      </div>
    )
  }
}