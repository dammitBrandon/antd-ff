import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import { Button, Empty, Form, Row, Col, Space, Divider } from 'antd';

import { MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';

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
    background: transparent linear-gradient(101deg, #e41e84 0%, #ff6633 100%) 0% 0% no-repeat
      padding-box;
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
    mutators={{
      ...arrayMutators
    }}
    style={{ textAlign: 'center' }}
    onSubmit={onSubmit}
    render={({
               submitError,
               handleSubmit,
               submitting,
               hasValidationErrors,
               hasSubmitErrors,
               dirtySinceLastSubmit
             }) => (
      <div style={{}}>
        <div style={{backgroundColor: '#FFF'}}>
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
            <Col span={8}>
              <FField
                name="question.questionStatement"
                component={InputControl}
                type="text"
                placeholder="What is a Molecule?"
                // validate={validations.required}
              />
              <Button type="link" onClick={() => {console.log('add new answer to this question');}}>
                <PlusOutlined /> Add Answer
              </Button>
            </Col>
            <Col span={4}>
              <FField
                name="question.Format"
                component={SimpleSelectControl}
                type="text"
                placeholder="School Name*"
              />
            </Col>
            <Col span={6}>
              <FField
                name="question.difficultyLevel"
                component={RatingControl}
                customIcons={customIcons}
              />
            </Col>
            <Col span={6}>
              No Answers
              <br/>
              <Button type="link" danger onClick={() => {console.log('delete this question');}}>
                <MinusOutlined /> Delete Question
              </Button>
            </Col>
          </Row>
        </div>
        <FFieldArray name='educations'>
          {({fields, meta}) => {
            return (
              <StyledSpace direction="vertical">
                {fields.map((name, index) => {
                  return (
                    <div key={name}>
                      <StyledDivider/>
                      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                        <Col flex="none">
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              fields.remove(index);
                            }}
                          />
                        </Col>
                        <Col span={24}>
                          <FField
                            name={`${name}.school`}
                            component={InputControl}
                            type="text"
                            placeholder="School Name"
                          />
                        </Col>
                      </Row>
                      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                        <Col span={8}>
                          <FField
                            name={`${name}.degree`}
                            component={InputControl}
                            type="text"
                            placeholder="Degree Type"
                          />
                        </Col>
                        <Col span={16}>
                          <FField
                            name={`${name}.major`}
                            component={InputControl}
                            type="text"
                            placeholder="Declared Major"
                          />
                        </Col>
                      </Row>
                      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                        <Col span={8}>
                          <FField
                            name={`${name}.city`}
                            component={InputControl}
                            type="text"
                            placeholder="City"
                          />
                        </Col>
                        <Col span={4}>
                          <FField
                            name={`${name}.state`}
                            component={InputControl}
                            type="text"
                            placeholder="State"
                          />
                        </Col>
                        <Col span={6}>
                        
                        </Col>
                        <Col span={6}>
                        
                        </Col>
                      </Row>
                      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                        <Col span={24}>
                          <FField
                            name={`${name}.links`}
                            component={InputControl}
                            type="text"
                            placeholder="Links"
                          />
                        </Col>
                      </Row>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                        
                        </Col>
                      </Row>
                    </div>
                  )
                })}
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                  <Col span={24}>
                    <Form.Item>
                      <Button
                        style={{width: '100%'}}
                        type="dashed"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          fields.push();
                        }}
                      >
                        <PlusOutlined/> Add Question
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </StyledSpace>
            )
          }}
        </FFieldArray>
      </div>
    )}
  />
);
