import React, { useState } from 'react';
import { Button, Form as AForm, Input, Select, Tag } from 'antd';
import { FormSpy, Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import setFieldData from 'final-form-set-field-data'
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';

const GOALS = [
  'Increase engagement',
  'Performance tracking',
  'Identify learning styles',
  'Improve grades',
  'Other'
];

const OPTIONS_OBJ = {
  'Increase engagement': '#D7753E',
  'Performance tracking': '#5BBCBD',
  'Identify learning styles': '#FF8BA7',
  'Improve grades': '#8053D7'
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
  // return { [FORM_ERROR]: 'Login Failed', verificationCode: 'Unknown Code' }
}

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

const CheckboxInput = ({input, meta, children}) => {
  
  return (
    <>
      <AForm.Item label={input.name}>
        <Input type="checkbox" {...input} checked={input.checked} />
      </AForm.Item>
    </>
  );
}

const CheckboxArrayInput = ({fields, options}) => {
  const toggle = (event, option) => {
    console.log('toggle, event.target.checked: ', event.target.checked);
    console.log('toggle, option: ', option);
    if (event.target.checked) {
      fields.push(option);
    } else {
      fields.remove(option);
    }
  };
  
  return (
    <div>
      {options.map((option, index) => {
        console.log('CheckboxArrayInput, option: ', option, index);
        
        return (
          <div>
            <AForm.Item label={option.name}>
              <Input type="checkbox" value={option} onChange={event => toggle(event, option)} />
              {option}
            </AForm.Item>
          </div>
        )
      })}
    </div>
  )
};

export const TestForm = () => {
  
  return (
    <CenteredContainer>
      <FForm
        name='test-form'
        mutators={{
          ...arrayMutators
        }}
        onSubmit={onSubmit}
        render={({submitError, handleSubmit, values}) => {
          return (
            <AForm onFinish={handleSubmit}>
              {submitError && <div className="error">{submitError}</div>}
              <FFieldArray
                name="goals"
                component={CheckboxArrayInput}
                options={GOALS}
              />
              
              
              
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </AForm>
          );
        }}
      />
    </CenteredContainer>
  );
}
