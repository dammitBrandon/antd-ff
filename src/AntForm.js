import React, { useState, useEffect } from 'react';
import { Button, Form, Form as AForm, Input } from 'antd';
import { Field as FField, Form as FForm } from 'react-final-form';
import styled from 'styled-components';
import emailValidator from 'email-validator';
import { FORM_ERROR } from 'final-form';

export const required = value => {
  return value || typeof value === 'number' ? undefined : 'Required';
};

export const email = value => {
  return value && !emailValidator.validate(value) ? 'Invalid email address' : undefined;
};

export const edu = value => {
  return value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/.test(value)
    ? 'You must be actively enrolled in a College or University.'
    : undefined;
};

export const yahoo = value => {
  return value && /.+@yahoo\.com/.test(value)
    ? 'Really? You still use Yahoo for your email?'
    : undefined;
};

export const composeValidators = (...validators) => (value, allValues, fieldState) => {
  return validators.reduce(
    (error, validator) => error || validator(value, allValues, fieldState),
    undefined
  );
};

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2))
  return { [FORM_ERROR]: 'Login Failed', email: 'Unknown email' }
}

export const AntForm = () => {
  const [form] = AForm.useForm();
  console.info('AntForm, form: ', form);

  return (
    <CenteredContainer>
      <FForm
        name="ant-final-form"
        onSubmit={onSubmit}
        render={(props) => {
          return (
            <AForm onFinish={props.handleSubmit}>
              {props.submitError && <div className="error">{props.submitError}</div>}
              <FField name="email" type="text" placeholder="test@email.edu" label="email" validate={composeValidators(required, email)}>
                {({input, placeholder, label, meta})=> (
                  <>
                    <Form.Item label={label}
                               hasFeedback
                               validateStatus={((meta.error && meta.submitFailed) || (meta.submitError && meta.submitFailed)) ? 'error' :
                                 (meta.valid && meta.submitSucceeded) ? 'success' :
                                   (meta.validating) ? 'warning' : ''
                               }
                               help={(meta.error || meta.submitError) && meta.touched && (
                                 <span style={{color: '#ff4d4f'}}>{meta.error || meta.submitError}</span>
                               )}
                    >
                      <Input {...input} placeholder={placeholder} label={label} />
                    </Form.Item>
                    <pre>{JSON.stringify(meta, 0, 2)}</pre>
                  </>
                )}
              </FField>
              
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <pre>{JSON.stringify(props.submitError, 0, 2)}</pre>
              errors: <pre>{JSON.stringify(props.errors, 0, 2)}</pre>
              error: <pre>{JSON.stringify(props.error, 0, 2)}</pre>
            </AForm>
          )
        }}
      />
    </CenteredContainer>
  );
}
