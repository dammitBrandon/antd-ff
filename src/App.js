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
        <li><Link to="/set-phone-number-fform">Ant Final Form Set Phone Number </Link></li>
        <li><Link to="/select-plan-fform">Ant Final Form Select Plan </Link></li>
        <li><Link to="/file-upload-fform">Ant Final Form File Upload </Link></li>
        <li><Link to="/f-form">Final Form</Link></li>
        <li><Link to="/a-form">Ant Form</Link></li>
        <li><Link to="/on-boarding/0">On Boarding Wizard Form</Link></li>
        <li><Link to="/">On Boarding Wizard Form</Link></li>
        
      </ul>
    </CenteredContainer>
  );
}

export default App;
