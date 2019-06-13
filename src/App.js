import React from 'react';
import './App.css';
import PhysiologicalFormAuto from './Components/Form/PhysiologicalFormAuto.js'
import RedirectButton from './Components/Redirect/RedirectButton.js'
import SearchDisplay from './Components/Misc/SearchDisplay.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RedirectButton />
        <SearchDisplay />
        <PhysiologicalFormAuto />
      </header>
    </div>
  );
}

export default App;
