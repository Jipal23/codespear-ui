import React from 'react';
import NavigationBar from "./components/NavigationBar.js"
import RouteSwitch from './components/Routes.js';
import 'bootswatch/dist/united/bootstrap.min.css';
import './App.css'

// Your main App component
function App() {
  return (
      <div className="App">
        <NavigationBar />
        <RouteSwitch />
      </div>
  );
}

export default App;