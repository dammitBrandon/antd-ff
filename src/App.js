import React from 'react';
import './App.css';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

function App() {
  return (
    <CenteredContainer>
      App
      <br/>
      <ul>
        <li><Link to="/f-form">Final Form</Link></li>
        <li><Link to="/a-form">Ant Form</Link></li>
      </ul>
    </CenteredContainer>
  );
}

export default App;
