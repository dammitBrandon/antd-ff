import React, { useState } from 'react';
import { Empty, Button, Form, Form as AForm, Input, Layout, Menu, Drawer, Typography, Row, Col } from 'antd';
import styled from 'styled-components';

import { FORM_ERROR } from 'final-form';
import {CreateQuestionSetForm} from './CreateQuestionSetForm';

const {Content, Sider, Header} = Layout;

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

export const CreateQuestionSetScreen = () => {
  
  return (
    <Layout className="layout" style={{height: '100%', width: '100%'}}>
      <CenteredContainer>
        <CreateQuestionSetForm />
      </CenteredContainer>
    </Layout>
  );
};

//  We need to have an empty list with a call to action button 'create my first question!'
//  When the button is clicked a new question statement component will be added to the list
//  The Question Statement Component consists of:
//    - Question Statement -- Input Component
//    - Question Statement -- Add Image button
//    - Question Statement -- Question Format
//      - Multiple Choice (2 - 5) possible answers
//      - True / False (only 2 answers)
//    - Question Statement -- Difficulty Level
//      - Rating from 1 - 5
//    - Question Statement -- Add Hint button
//  The Hint Component consists of a dropdown input selector with:
//    - "all"
//    - "visual"
//    - "auditory"
//    - "reading"
//    - "hands-on"
//  Hints can be http(s) links, or uploaded files png, jpeg, pdf, doc(x)
//  We will start with just ability to add hyper links, then add the additional support for other hint types
