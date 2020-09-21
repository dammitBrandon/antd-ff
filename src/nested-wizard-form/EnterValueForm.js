import React from 'react';
import { Button, Form, Input } from 'antd';
import { Field as FField, Form as FForm } from 'react-final-form';
import styled from 'styled-components';
import MakeAsyncFunction from 'react-redux-promise-listener'
import { promiseListener } from '../store';
import { SET_SMS_FAILURE, SET_SMS_REQUEST, SET_SMS_SUCCESS } from '../modules/setSMS/setSMSRedux';

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

export const EnterValueForm = () => {
  
  return (
    <CenteredContainer>
      <MakeAsyncFunction
        listener={promiseListener}
        start={SET_SMS_REQUEST}
        resolve={SET_SMS_SUCCESS}
        reject={SET_SMS_FAILURE}
      >
        {onSubmit => (
          <FForm
            debug={(state, fieldStates) => {
              console.log('debugging, state: ', state);
              console.log('debugging, fieldStates: ', fieldStates);
            }}
            validate={values => {
              const errors = {}
              if (!values.username) {
                errors.username = 'Required'
              }
              
              return errors;
            }}
            onSubmit={onSubmit}
            render={({handleSubmit, submitError, values, ...rest}) => {
              
              return (
                <Form
                  onFinish={handleSubmit}
                >
                  {submitError && <div className="error">{submitError}</div>}
                  <FField name="phonenumber" type="text" placeholder="Phone Number" label="phonenumber" >
                    {({input, placeholder, label, meta})=> (
                      <>
                        <Form.Item label={label}
                                   hasFeedback
                                   validateStatus={(meta.submitError || meta.error) && meta.submitFailed ? 'error' :
                                     (meta.valid && meta.submitSucceeded) ? 'success' :
                                       (meta.validating) ? 'warning' : ''
                                   }
                                   help={(meta.error || meta.submitError) && meta.submitFailed && (
                                     <span className="error">{meta.error || meta.submitError}</span>
                                   )}
                        
                        >
                          <Input {...input} placeholder={placeholder} label={label} />
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
                  <pre>Values: {JSON.stringify(values, 0, 2)}</pre>
                  <pre>rest: {JSON.stringify(rest, 0, 2)}</pre>
                  <pre>SubmitErrors: {JSON.stringify(submitError, 0, 2)}</pre>
                </Form>
              )
            }}
          />
        )}
      </MakeAsyncFunction>
    </CenteredContainer>
  );
}
