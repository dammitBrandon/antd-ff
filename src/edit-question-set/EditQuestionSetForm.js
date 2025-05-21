import React, { useState } from 'react';
import arrayMutators from 'final-form-arrays';
import MakeAsyncFunction from 'react-redux-promise-listener';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { EditableTitleControl, InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import { Button, Empty, Form as AForm, Row, Col, Space, Divider, Form, Typography } from 'antd';
import { HighlightOutlined, MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';

import { promiseListener } from '../store';

import { EditQuestionItem } from './EditQuestionItem';
import {
  EDIT_QUESTION_SET_FAILURE,
  EDIT_QUESTION_SET_REQUEST,
  EDIT_QUESTION_SET_SUCCESS
} from '../modules/questionSets/redux';

const {Title} = Typography;
// ICONS FOR DIFFICULTY
const customIcons = {
  1: <FireOutlined/>,
  2: <FireOutlined/>,
  3: <FireOutlined/>,
  4: <FireOutlined/>,
  5: <FireOutlined/>,
};


const initValues = {
  'questionFormat': 'multiple-choice',
  'questionRating': 5,
  'questionStatement': 'test 1',
  'possibleAnswers': [
    {
      'possibleAnswer': 'answer 1 = incorrect'
    },
    {
      'possibleAnswer': 'answer 2 = incorrect'
    },
    {
      'possibleAnswer': 'answer 3 = correct',
      'isCorrect': true
    }
  ]
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const StyledSpace = styled(Space)`
  &.ant-space {
    display: flex;
  }
`;

export const StyledDivider = styled(Divider)`
  &.ant-divider {
    background: transparent linear-gradient(101deg, #e41e84 0%, #ff6633 100%) 0% 0% no-repeat padding-box;
  }
`;

const onSubmit = async values => {
  await sleep(300);
  console.log('onSubmit, values: ', values);
  window.alert(JSON.stringify(values, 0, 2));
  // return { [FORM_ERROR]: 'Login Failed', verificationCode: 'Unknown Code' }
}

export const EditQuestionSetForm = ({isLoading, questionSet}) => {
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  console.log('EditQuestionSetForm#questionSet: ', questionSet);
  return (
    <MakeAsyncFunction
      listener={promiseListener}
      start={EDIT_QUESTION_SET_REQUEST}
      resolve={EDIT_QUESTION_SET_SUCCESS}
      reject={EDIT_QUESTION_SET_FAILURE}
    >
      {(onSubmit) => (
        <FForm
          name="create-question-set-form"
          initialValues={questionSet}
          mutators={{
            ...arrayMutators
          }}
          style={{textAlign: 'center'}}
          onSubmit={onSubmit}
          render={({
                     submitError,
                     handleSubmit,
                     form: {
                       mutators: {push, pop}
                     },
                     submitting,
                     hasValidationErrors,
                     hasSubmitErrors,
                     dirtySinceLastSubmit,
                     values
                   }) => (
            <AForm onFinish={handleSubmit}>
              <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}>
                <Col span={12}>
                  <FField
                    name="title"
                    component={EditableTitleControl}
                    tooltip="What is a Molecule?"
                    level={3}
                    // validate={validations.required}
                  />
                  {values.questions.length}/15 questions added
                </Col>
              </Row>
        
        
              <Space direction="vertical">
          
          
                <FFieldArray name="questions">
                  {({fields, meta}) =>
                    fields.map((name, index) => (
                      <div key={name} style={{width: '70vw'}}>
                        <EditQuestionItem name={name} index={index} push={push} remove={fields.remove}/>
                      </div>
                    ))
                  }
                </FFieldArray>
          
          
                {values.questions.length > 0 &&
                <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}>
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        style={{width: '100%'}}
                        ghost
                        type="dashed"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          push('questions', null);
                        }}
                      >
                        <PlusOutlined/> Add Question
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>}
              </Space>
              <div>
                {values.questions.length === 0 &&
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{height: 60}}
                  description={<span>Customize <a href="#API">Description</a></span>}
                >
                  <Form.Item>
                    <Button type="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              push('questions', null);
                            }}
                    >
                      Create my first question!
                    </Button>
                  </Form.Item>
                </Empty>}
              </div>
              {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
            </AForm>
          )}
        />
      )}
    </MakeAsyncFunction>
  );
}
