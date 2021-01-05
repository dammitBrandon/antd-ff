import React, { Component } from 'react';
import { Empty, Button, Form, Form as AForm, Input, Layout, Menu, Drawer, Typography, Row, Col } from 'antd';
import styled from 'styled-components';

import {EditQuestionSetForm} from './EditQuestionSetForm';

import { FORM_ERROR } from 'final-form';

const {Content, Sider, Header} = Layout;

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

class CreateQuestionSetScreen extends Component {
  
  render () {
    const {isLoading, questionSet} = this.props;

    return (
      <Layout className="layout" style={{height: '100%', width: '100%'}}>
        <CenteredContainer>
          <EditQuestionSetForm isLoading={isLoading} questionSet={questionSet}/>
        </CenteredContainer>
      </Layout>
    );
}
};
