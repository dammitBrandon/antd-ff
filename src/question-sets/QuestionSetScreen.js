import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import styled from 'styled-components';

import { dispatch } from '../store';
import {QuestionSetList} from './QuestionSetList';
import { handleQuestionSetsDashboardRequest } from '../modules/questionSets/redux';

const {Content} = Layout;

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

class QuestionSetScreen extends Component {
  
  componentDidMount() {
    // TODO: Need to make request to get all teachers question sets to be displayed on question set dashboard
    dispatch(handleQuestionSetsDashboardRequest());
  }
  
  render() {
    const { questionSets, isLoading } = this.props;
    
    return (
      <Layout className="layout" style={{height: '100%', width: '100%'}}>
        <CenteredContainer>
          <QuestionSetList  isLoading={isLoading} questionSets={questionSets} />
        </CenteredContainer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questionSets: state.questionSets.data,
    isLoading: state.questionSets.isLoading
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSetScreen);
