import React, { useState, useEffect } from 'react';
import { Button, Form, Form as AForm, Input } from 'antd';
import { FormSpy, Field as FField, Form as FForm } from 'react-final-form';
import setFieldData from 'final-form-set-field-data'
import ReactCodeInput from 'react-code-input';
import styled from 'styled-components';
import emailValidator from 'email-validator';
import { FORM_ERROR } from 'final-form';

export const alphaNumeric = value => {
  return value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;
};

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

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

const AInput = ({input, placeholder, label, meta})=> (
  <>
    <Form.Item label={label}
               hasFeedback
               validateStatus={((meta.submitError || meta.error) && meta.submitFailed) ? 'error' :
                 (meta.valid && meta.submitSucceeded) ? 'success' :
                   (meta.data.warning) ? 'warning' : ''
               }
               help={(meta.data.warning || meta.error || meta.submitError) && meta.touched && (
                 <span>{meta.data.warning || meta.error || meta.submitError}</span>
               )}
    >
      <Input {...input} placeholder={placeholder} label={label} />
    </Form.Item>
    <pre>{JSON.stringify(meta, 0, 2)}</pre>
  </>
);

const CodeInput = ({input, meta, label}) => (
  <>
    <Form.Item label={label}
               hasFeedback
               validateStatus={((meta.submitError || meta.error) && meta.submitFailed) ? 'error' :
                 (meta.valid && meta.submitSucceeded) ? 'success' :
                   (meta.data.warning) ? 'warning' : ''
               }
               help={(meta.data.warning || meta.error || meta.submitError) && meta.touched && (
                 <span>{meta.data.warning || meta.error || meta.submitError}</span>
               )}
    >
      <ReactCodeInput {...input} type={'number'} fields={6} isValid={meta.valid} />
    </Form.Item>
  </>
)

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
  return { [FORM_ERROR]: 'Login Failed', verificationCode: 'Unknown Code' }
}

const WarningEngine = ({ mutators: { setFieldData } }) => (
  <FormSpy
    subscription={{ values: true }}
    onChange={({ values }) => {
      setFieldData('email', {
        warning: yahoo(values.email)
      })
    }}
  />
)

export const AntForm = () => {

  return (
    <CenteredContainer>
      <FForm
        name="ant-final-form"
        onSubmit={onSubmit}
        mutators={{ setFieldData }}
        render={(props) => {
          const {handleSubmit, form, submitError, submitErrors, error, errors} = props;
          return (
            <AForm onFinish={handleSubmit}>
              {submitError && <div className="error">{submitError}</div>}
              <FField
                name="firstName"
                type="text"
                placeholder="John"
                label="firstName"
                validate={composeValidators(required, minLength2, maxLength15)}
                component={AInput}
              />
              
              <FField
                name="email"
                type="text"
                placeholder="test@email.edu"
                label="email"
                validate={composeValidators(required, email)}
                component={AInput}
              />
              
              <FField
                name="verificationCode"
                type="number"
                label="verificationCode"
                component={CodeInput}
              />
              
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
              <br/>
              values: <pre>{JSON.stringify(props.values, 0, 2)}</pre>
              <WarningEngine mutators={form.mutators}/>
            </AForm>
          )
        }}
      />
    </CenteredContainer>
  );
}
