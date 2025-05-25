import React from 'react';
import styled from 'styled-components';
import { Button, Form, Form as AForm, Input } from 'antd';
import { FormSpy, Field as FField, Form as FForm, useForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { composeValidators, email, required } from './AntForm';
import PhoneInput, { getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
  // return { [FORM_ERROR]: 'Login Failed', verificationCode: 'Unknown Code' }
};

const PhoneNumberInputAdapter = ({ input, callingCode, countryCode, placeholder, label, meta, ...props }) => {
  const { change } = useForm();
  
  console.log('PhoneNumberInputAdapter, input: ', input);
  return (
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
        <PhoneInput
          {...input}
          {...props}
          placeholder={placeholder}
          labels={label}
          defaultCountry='US'
          initialValueFormat='international'
          countryCallingCodeEditable
          onCountryChange={(_countryCode) => {
            change(countryCode, _countryCode);
            change(callingCode, `+${getCountryCallingCode(_countryCode)}`);
          }}
          error={(meta.data.warning || meta.error || meta.submitError) && meta.touched && (
            <span>{meta.data.warning || meta.error || meta.submitError}</span>
          )}
        />
      </Form.Item>
      <pre>{JSON.stringify(meta, 0, 2)}</pre>
    </>
  );
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

export const SetPhoneNumberForm = () => {
  return (
    <CenteredContainer>
      SetPhoneNumberForm
      <FForm
        name="set-phonenumber-form"
        initialValues={{'callingCode': '+1', 'countryCode': 'US'}}
        onSubmit={onSubmit}
        render={(props) => {
          console.log('SetPhoneNumberForm, props: ', props);
          
          return (
            <AForm onFinish={props.handleSubmit}>
              <FField
                name="firstName"
                type="text"
                placeholder="name"
                label="firstName"
                validate={composeValidators(required)}
                component={AInput}
              />
              <FField
                name="phoneNumber"
                callingCode="callingCode"
                countryCode="countryCode"
                type="text"
                placeholder="(123) 555-5555"
                label="phoneNumber"
                validate={composeValidators(required)}
                component={PhoneNumberInputAdapter}
                limitMaxLength
                autoFocus
              />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <br/>
              values: <pre>{JSON.stringify(props.values, 0, 2)}</pre>
            </AForm>
          );
        }}
      />
    </CenteredContainer>
  );
};
