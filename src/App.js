import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import NavigationBar from "./components/NavigationBar.js"
import RouteSwitch from './components/Routes.js';
import 'bootswatch/dist/united/bootstrap.min.css';
import './App.css'
import { theme } from './theme.js';

// Your main App component
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavigationBar />
        <RouteSwitch />
      </div>
    </ThemeProvider>
  );
}

export default App;