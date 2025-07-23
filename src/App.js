import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import NavigationBar from "./components/NavigationBar.js"
import RouteSwitch from './components/Routes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// Define your theme object
const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#ff4500',
    background: '#f0f2f5',
    text: '#333',
    text2: '#777',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
};

// Create a styled component that uses the theme
const StyledButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.medium};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

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