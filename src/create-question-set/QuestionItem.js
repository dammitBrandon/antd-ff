import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import {Layout, Button, Empty, Form as AForm, Row, Col, Select, Space, Divider, Form } from 'antd';

import { MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';

const { Option } = Select;

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
]
export const QuestionItem = ({name, index, remove}) => (
  <>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
      <Col span={8}>
        <FField
          name={`${name}.questionStatement`}
          component={InputControl}
          type="text"
          placeholder="What is a Molecule?"
          // validate={validations.required}
        />
      </Col>
      <Col span={6}>
        <FField
          name={`${name}.questionFormat`}
          initialValue={'multiple-choice'}
          component={SimpleSelectControl}
          options={questionTypeOptions}
        />
      </Col>
    </Row>
    <Divider dashed />
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
      <Col>
        <Button type="primary" onClick={() => {console.log('add new answer to this question');}}>
          <PlusOutlined /> Add Answer
        </Button>
      </Col>
      <Col>
        <Button danger onClick={() => {remove(index)}}>Delete Question</Button>
      </Col>
    </Row>
  </>
);
