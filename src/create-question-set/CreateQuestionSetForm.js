import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import { Button, Empty, Form as AForm, Row, Col, Space, Divider, Form } from 'antd';

import { MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';

import { QuestionItem } from './QuestionItem';
import { AnswerItem } from './AnswerItem';

// ICONS FOR DIFFICULTY
const customIcons = {
  1: <FireOutlined />,
  2: <FireOutlined />,
  3: <FireOutlined />,
  4: <FireOutlined />,
  5: <FireOutlined />,
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

export const CreateQuestionSetForm = ({ isLoading }) => (
  <FForm
    name="create-question-set-form"
    initialValues={{questions: [null]}}
    mutators={{
      ...arrayMutators
    }}
    style={{ textAlign: 'center' }}
    onSubmit={onSubmit}
    render={({
               submitError,
               handleSubmit,
               form: {
                 mutators: { push, pop }
               },
               submitting,
               hasValidationErrors,
               hasSubmitErrors,
               dirtySinceLastSubmit,
               values
             }) => (
      <AForm onFinish={handleSubmit}>
        <Space direction="vertical">
          <FFieldArray name="questions">
            {({ fields, meta }) =>
              fields.map((name, index) => (
                <div key={name}>
                  <QuestionItem name={name} index={index} push={push} remove={fields.remove} />
                </div>
              ))
            }
          </FFieldArray>
          {values.questions.length > 0 &&
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
            <Col span={24}>
              <Form.Item>
                <Button
                  style={{width: '100%'}}
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
        <pre>{JSON.stringify(values, 0, 2)}</pre>
      </AForm>
    )}
  />
);
