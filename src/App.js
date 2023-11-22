// App.js
import React from 'react';
import FirstPage from './Components/Component/FirstPage';
import Quotes from './Components/Component/Quote';
import './Components/Styles/Main.css';

function App(props) {

  return (
    <div className="Main">
      <div className="Mobile">
         <FirstPage/>
      </div>
      <Quotes />
    </div>
  );
}

export default App;