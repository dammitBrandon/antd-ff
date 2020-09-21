import React from 'react';
import { Button, Form, Input } from 'antd';
import { Field as FField, Form as FForm } from 'react-final-form';
import './App.css';
import 'antd/dist/antd.css';
import setFieldData from 'final-form-set-field-data'
import { FORM_ERROR } from 'final-form'
import styled from 'styled-components';

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async (values, form) => {
  console.log('onSubmit, values:', values);
  console.log('onSubmit, form:', form);
  await sleep(300)
  if (values.username !== 'erikras') {
    console.log('unknown username');
    return { [FORM_ERROR]: 'Login Failed', username: 'Unknown username' }
  }
  if (values.password !== 'test') {
    console.log('wrong password');
    return { [FORM_ERROR]: 'Login Failed' }
  }
  window.alert('LOGIN SUCCESS!')
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

// const required = value => (value ? undefined : 'Required')
//
// const validateMessages = {
//   required: '${label} is required!!!',
//   types: {
//     email: '${label} is not validate email!',
//     number: '${label} is not a validate number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

export const FinalForm = () => {
  return (
    <CenteredContainer>
      <FForm
        {...formItemLayout}
        debug={(state, fieldStates) => {
          console.log('debugging, state: ', state);
          console.log('debugging, fieldStates: ', fieldStates);
        
        }}
        onSubmit={onSubmit}
        mutators={{
          setFieldData
        }}
        render={({submitError, handleSubmit, values}) => {
          return (
            <Form
              onFinish={handleSubmit}
              // validateMessages={validateMessages}
              onFinishFailed={(err) => {
                console.error('Form failed, err: ', err);
              }}
            >
              {submitError && <div className="error">{submitError}</div>}
              <FField name="username" type="text" placeholder="username" label="username" >
                {({input, placeholder, label, meta})=> (
                  <>
                    <Form.Item label={label}
                               hasFeedback
                               validateStatus={(meta.submitError && meta.submitFailed) ? 'error' :
                                 (meta.valid && meta.submitSucceeded) ? 'success' :
                                   (meta.validating) ? 'warning' : ''
                               }
                    >
                      <Input {...input} placeholder={placeholder} label={label} />
                    </Form.Item>
                    <pre>{JSON.stringify(meta, 0, 2)}</pre>
                  </>
                )}
              </FField>
            
              <FField name="password" type="text" placeholder="password" label="password">
                {({input, placeholder, label, meta})=> (
                  <>
                    <Form.Item label={label}
                               hasFeedback
                               validateStatus={(meta.submitError && meta.submitFailed) ? 'error' :
                                 (meta.valid && meta.submitSucceeded) ? 'success' :
                                   (meta.validating) ? 'warning' : ''
                               }
                    >
                      <Input.Password {...input} placeholder={placeholder} label={label} />
                    </Form.Item>
                    <pre>{JSON.stringify(meta, 0, 2)}</pre>
                  </>
                )}
              </FField>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </Form>
          )}}
      />
    </CenteredContainer>
  )
}
