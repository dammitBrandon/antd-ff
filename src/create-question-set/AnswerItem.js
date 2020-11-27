import React from 'react';
import { Col, Row, Checkbox, Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Field as FField, Form as FForm } from 'react-final-form';
import { InputControl } from '../lib/Fields';

export const AnswerItem = ({name, index, remove}) => (
  <div>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
      <Col span={2}>
        <FField name={`${name}.isCorrect`}>
          {({input, ...rest}) => {
            return (
              <Input {...input} {...rest} type='checkbox' />
            )
          }}
        </FField>
      </Col>
      <Col span={10}>
        <FField
          name={`${name}.possibleAnswer`}
          component={InputControl}
          type="text"
          placeholder="What is it?"
          // validate={validations.required}
        />
      </Col>
      <Col flex="none">
        <MinusCircleOutlined
          className="dynamic-delete-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            remove(index);
          }}
        />
      </Col>
    </Row>
  </div>
);
