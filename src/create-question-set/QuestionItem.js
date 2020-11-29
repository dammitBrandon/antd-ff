import React, { useState } from 'react';
import arrayMutators from 'final-form-arrays';
import { Field, Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import {Layout, Button, Row, Col, Select, Space, Divider, Collapse } from 'antd';

import { FileDoneOutlined, MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';
import { AnswerItem } from './AnswerItem';

const { Option } = Select;
const { Panel } = Collapse;

function callback(key) {
  console.log('key: ', key);
}

const Fields = ({
                  names,
                  subscription,
                  fieldsState = {},
                  children,
                  originalRender
                }) => {
  if (!names.length) {
    return (originalRender || children)(fieldsState)
  }
  const [name, ...rest] = names
  return (
    <FField name={name} subscription={subscription}>
      {fieldState => (
        <Fields
          names={rest}
          subscription={subscription}
          originalRender={originalRender || children}
          fieldsState={{ ...fieldsState, [name]: fieldState }}
        />
      )}
    </FField>
  )
};

// ICONS FOR DIFFICULTY
const customIcons = {
  1: <FireOutlined />,
  2: <FireOutlined />,
  3: <FireOutlined />,
  4: <FireOutlined />,
  5: <FireOutlined />,
};

const questionTypeOptions = [
  {
    label: 'Multiple Choice',
    value: 'multiple-choice'
  },
  {
    label: 'True or False',
    value: 'true-false'
  }
];

// let answerLimit = 5;
// if questionFormat.input.value === 'true-false' then
//  possibleAnswerLimit == 2
// else questionFormat.input.value === 'multiple-choice'
//  possibleAnswerLimit == 5


// if (answersVisible === false) && (possibleAnswers.length === 0) then
//  <Button type="link" onClick={toggleAnswers}>
//    No Answers({possibleAnswers.input.value.length})
//  </Button>
// else if (answersVisible === false) && (possibleAnswers.length < 0) then
//  <Button type="link" onClick={toggleAnswers}>
//    Show Answers({possibleAnswers.input.value.length})
//  </Button>
// else if (answersVisible === true) then
//  <Button type="link" onClick={toggleAnswers}>
//    Answers({possibleAnswers.input.value.length})
//  </Button>

// let buttonTxt = '';
// if (answersVisible === false) {
//  buttonTxt = (possibleAnswers.length === 0) ? 'No' : 'Show';
// }


export const QuestionItem = ({name, index, push, remove}) => {
  const [answersVisible, setVisible] = useState(true);
  
  const toggleAnswers = () => {
    setVisible(!answersVisible);
  }
  
  const answersCountLinkText = (possibleAnswers) => {
    let buttonTxt = '';
    if (answersVisible === false) {
      buttonTxt = (possibleAnswers === 0) ? 'No' : 'Show';
    }
    return buttonTxt;
  }
  
  
  return (
    <Fields names={[`${name}.possibleAnswers`, `${name}.questionFormat`]}>
      {fieldsState => {
        const possibleAnswers = fieldsState[`${name}.possibleAnswers`].input.value;
        const questionFormat = fieldsState[`${name}.questionFormat`].input.value;
        let answerLimit = (questionFormat === 'true-false') ? 2 : 5;
      
        return (
          <Layout>
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
              <Col span={10}>
                <FField
                  name={`${name}.questionStatement`}
                  component={InputControl}
                  type="text"
                  placeholder="What is a Molecule?"
                  // validate={validations.required}
                />
              </Col>
              <Col span={4}>
                <FField
                  name={`${name}.questionFormat`}
                  initialValue={'multiple-choice'}
                  component={SimpleSelectControl}
                  options={questionTypeOptions}
                />
              </Col>
              <Col span={6}>
                <FField
                  name={`${name}.questionRating`}
                  component={RatingControl}
                  customIcons={customIcons}
                  initialValue={3}
                />
              </Col>
              <Col span={4}>
                <Button type="link" onClick={toggleAnswers}>
                  {answersCountLinkText(possibleAnswers.length)} Answers({possibleAnswers.length})
                </Button>
              </Col>
            </Row>
            {answersVisible && <>
              <Divider dashed />
              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                <Col span={24}>
                  <FFieldArray name={`${name}.possibleAnswers`} >
                    {({ fields, meta }) =>
                      fields.map((name, index) => (
                        <div key={name}>
                          <AnswerItem name={name} index={index} remove={fields.remove} />
                        </div>
                      ))
                    }
                  </FFieldArray>
                </Col>
              </Row>
              <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                {possibleAnswers.length < answerLimit &&
                <Col span={6}>
                  <Button type="primary" onClick={(e) => {
                    console.log('add new answer to this question');
                    e.preventDefault();
                    e.stopPropagation();
                    push(`${name}.possibleAnswers`, null);
                  }}>
                    <PlusOutlined /> Add Answer
                  </Button>
                </Col>
                }
                {possibleAnswers.length === answerLimit &&
                <Col span={6}>
                  <Button type="primary" onClick={toggleAnswers}>
                    <PlusOutlined /> Done
                  </Button>
                </Col>
                }
                <Col span={3} offset={15}>
                  <Button danger onClick={() => {remove(index)}}>Delete Question</Button>
                </Col>
              </Row>
            </>}
          </Layout>
        )
      }}
    </Fields>
  )
};
