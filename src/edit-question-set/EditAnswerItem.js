import React from 'react';
import {Col, Row, Checkbox, Input, Typography} from 'antd';
import {MinusCircleOutlined} from '@ant-design/icons';
import {Field as FField, Form as FForm} from 'react-final-form';
import {CheckboxInputControl, InputControl} from '../lib/Fields';

const {Title} = Typography;

export const EditAnswerItem = ({name, index, remove}) => (
  <div>
    <Row align="middle" gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}>
      <Col span={2}>
        <FField
          name={`${name}.isCorrect`}
          component={CheckboxInputControl}
          type="checkbox"
          initialValue={false}
        />
      </Col>
      <Col span={10}>
        <Title level={5} style={{fontWeight: 'bolder'}}>
          Answer {index + 1}
        </Title>
        <FField
          name={`${name}.answerStatement`}
          component={InputControl}
          type="text"
          placeholder={`Possible Answer #${index + 1}?`}
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
