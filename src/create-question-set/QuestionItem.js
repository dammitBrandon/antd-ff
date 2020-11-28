import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Field, Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import {Layout, Button, Empty, Form as AForm, Row, Col, Select, Space, Divider, Form, Rate } from 'antd';

import { MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';
import { AnswerItem } from './AnswerItem';

const { Option } = Select;

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



export const QuestionItem = ({name, index, push, remove}) => (
  <Fields names={[`${name}.possibleAnswers`, `${name}.questionFormat`]}>
    {fieldsState => {
      const possibleAnswers = fieldsState[`${name}.possibleAnswers`];
      const questionFormat = fieldsState[`${name}.questionFormat`];
      let answerLimit = (questionFormat.input.value === 'true-false') ? 2 : 5;
  
      return (
        <>
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
              Answers({possibleAnswers.input.value.length})
            </Col>
          </Row>
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
            {possibleAnswers.input.value.length < answerLimit &&
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
            {possibleAnswers.input.value.length === answerLimit &&
            <Col span={6}>
              <Button type="primary" onClick={(e) => {
                console.log('add new answer to this question');
                e.preventDefault();
                e.stopPropagation();
                // Collapse Answers Section
              }}>
                <PlusOutlined /> Done
              </Button>
            </Col>
            }
            <Col span={3} offset={15}>
              <Button danger onClick={() => {remove(index)}}>Delete Question</Button>
            </Col>
          </Row>
          <pre>{JSON.stringify(fieldsState, undefined, 2)}</pre>
        </>
      )
    }}
  </Fields>
);
