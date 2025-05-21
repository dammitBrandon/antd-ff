import React, { Component } from 'react';
import { Empty, Button, Form, Form as AForm, Input, Layout, Menu, Drawer, Typography, Row, Col } from 'antd';
import styled from 'styled-components';
import {connect} from 'react-redux';

import { dispatch } from '../store';
import {EditQuestionSetForm} from './EditQuestionSetForm';

import { FORM_ERROR } from 'final-form';
import { handleQuestionSetRequest } from '../modules/questionSets/redux';

const { Content, Sider, Header } = Layout;

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

class EditQuestionSetScreen extends Component {
  
  componentDidMount() {
    console.log('#componentDidMount');
    const questionSetId = this.props.match.params.questionSetId;
    console.log('questionSetId: ', questionSetId);
    dispatch(handleQuestionSetRequest(questionSetId));
  }
  
  render () {
    const {isLoading, questionSet} = this.props;
    console.log('EditQuestionSetScreen, questionSet: ', questionSet);
    return (
      <Layout className="layout" style={{height: '100%', width: '100%'}}>
        <CenteredContainer>
          <EditQuestionSetForm isLoading={isLoading} questionSet={questionSet}/>
        </CenteredContainer>
      </Layout>
    );
  };
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state.questionSets.questionSet);
  return {
    questionSet: {
      "id": "5ff4bbd6d25de6ec14d28e80",
      "title": "cillum ex labore",
      "creator": {
        "_id": "5ff4bbd62d385b84a85295f0",
        "name": "Amelia Knox"
      },
      "questionSetDifficulty": 5,
      "questions": [
        {
          "id": "5ff4bbd6a32637089a13f372",
          "questionFormat": "multiple-choice",
          "questionStatement": "do non esse esse anim ut ad ipsum",
          "questionDifficulty": 2,
          "possibleAnswers": [
            {
              "id": "5ff4bbd6ae9f7d251e5b86b0",
              "answerStatement": "proident et",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6c33b30a6dd5fa763",
              "answerStatement": "quis quis",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd65866d06fb0caeab3",
              "answerStatement": "nulla sint",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd60919e9321596c357",
              "answerStatement": "nisi sit",
              "isCorrect": false
            }
          ]
        },
        {
          "id": "5ff4bbd6111738ac238b9035",
          "questionFormat": "multiple-choice",
          "questionStatement": "non cupidatat ex dolor ex ipsum ex esse",
          "questionDifficulty": 4,
          "possibleAnswers": [
            {
              "id": "5ff4bbd6107d4428d3d47df1",
              "answerStatement": "Lorem amet",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd603b6efb1c086b1e6",
              "answerStatement": "cupidatat enim",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6190eba86a050da55",
              "answerStatement": "amet velit",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd65743478e41160211",
              "answerStatement": "irure aliqua",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd6fab1083fa4fc2180",
              "answerStatement": "fugiat sit",
              "isCorrect": true
            }
          ]
        },
        {
          "id": "5ff4bbd65b2f05cd65353bdf",
          "questionFormat": "multiple-choice",
          "questionStatement": "pariatur laborum id ipsum velit sit culpa ex",
          "questionDifficulty": 2,
          "possibleAnswers": [
            {
              "id": "5ff4bbd69a0626c5be1547bc",
              "answerStatement": "ullamco nostrud",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd609019832fa3ea6b7",
              "answerStatement": "in duis",
              "isCorrect": false
            }
          ]
        },
        {
          "id": "5ff4bbd6fce7a1a1718a80ac",
          "questionFormat": "true-false",
          "questionStatement": "ea cillum sit est elit laborum velit consectetur",
          "questionDifficulty": 5,
          "possibleAnswers": [
            {
              "id": "5ff4bbd680d0ad0fc63374bc",
              "answerStatement": "aliquip officia",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd6ba4039f90b1c2787",
              "answerStatement": "non sint",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd60123bcb95fc4706f",
              "answerStatement": "velit nisi",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd63ad76181cc78facb",
              "answerStatement": "ullamco sunt",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6c527e62d21860673",
              "answerStatement": "laborum exercitation",
              "isCorrect": false
            }
          ]
        },
        {
          "id": "5ff4bbd64ddee11fef399967",
          "questionFormat": "multiple-choice",
          "questionStatement": "cillum amet aute tempor ipsum commodo fugiat laborum",
          "questionDifficulty": 5,
          "possibleAnswers": [
            {
              "id": "5ff4bbd6195119c3f518b6a5",
              "answerStatement": "enim duis",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd6557aa52dba9ab1e5",
              "answerStatement": "anim consectetur",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6d644304d65b97cd2",
              "answerStatement": "aliqua cupidatat",
              "isCorrect": true
            },
            {
              "id": "5ff4bbd6babb5b8b48dd685a",
              "answerStatement": "tempor incididunt",
              "isCorrect": true
            }
          ]
        },
        {
          "id": "5ff4bbd616985ddbd8ad72bd",
          "questionFormat": "multiple-choice",
          "questionStatement": "eu anim sint deserunt ipsum consequat aliquip aliqua",
          "questionDifficulty": 1,
          "possibleAnswers": [
            {
              "id": "5ff4bbd6117ad9c6cc26616c",
              "answerStatement": "est nisi",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6d8d5e47e727531be",
              "answerStatement": "ea cillum",
              "isCorrect": true
            }
          ]
        },
        {
          "id": "5ff4bbd6aa0b31edf5cfa591",
          "questionFormat": "true-false",
          "questionStatement": "eu consequat ad pariatur aute tempor excepteur ullamco",
          "questionDifficulty": 1,
          "possibleAnswers": [
            {
              "id": "5ff4bbd69bb31c144ad27ba5",
              "answerStatement": "aute do",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6762bfc11687fad93",
              "answerStatement": "nulla minim",
              "isCorrect": true
            }
          ]
        },
        {
          "id": "5ff4bbd61e893fbc5f00183d",
          "questionFormat": "multiple-choice",
          "questionStatement": "dolor eu sit exercitation nulla ad enim eiusmod",
          "questionDifficulty": 5,
          "possibleAnswers": [
            {
              "id": "5ff4bbd6327cf284d1438ff7",
              "answerStatement": "enim consectetur",
              "isCorrect": false
            },
            {
              "id": "5ff4bbd6404bb8af95419f5c",
              "answerStatement": "aute nulla",
              "isCorrect": true
            }
          ]
        }
      ]
    },
    isLoading: state.questionSets.isLoading
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestionSetScreen);
