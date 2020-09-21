import React from 'react';
import { Button, Form as AForm, Select } from 'antd';
import { Field as FField, Form as FForm} from 'react-final-form';
import styled from 'styled-components';

// const OPTIONS = [
//   'Algebra 1',
//   'Geometry',
//   'Chemistry',
//   'Biology'
// ];

// const OPTIONS_OBJ = {
//   'Algebra 1': 'gold',
//   'Geometry': 'yellow',
//   'Chemistry': 'lime',
//   'Biology': 'cyan'
// };

export const SelectControl = ({input, placeholder, label, meta: {error, touched}, disabled, name, tagRender, mode, options}) => {
  
  return (
    <AForm.Item
      label={name}
      validateStatus={error && touched ? 'error' : ''}
      help={error && touched && (
        <span className="error">{error}</span>
      )}
    >
      <Select {...input} mode={mode} placeholder={placeholder} tagRender={tagRender} >
        {options
          .filter(o => !input.value.includes(o))
          .map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
      </Select>
    </AForm.Item>
  )
}

// const tagRender = (props) => {
//   const {label, value, closable, onClose, color} = props;
//   console.log('tagRender, props: ', props);
//   return (
//     <Tag color={OPTIONS_OBJ[value]} closable={closable} onClose={onClose} style={{marginRight: 3}}>
//       {label}
//     </Tag>
//   )
// }

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
}

export const AntSelectFForm = () => {

  return (
    <CenteredContainer>
      <FForm
        name="ant-select-fform"
        onSubmit={onSubmit}
        render={({submitError, handleSubmit, form}) => {
          return (
            <AForm onFinish={handleSubmit}>
              {submitError && <div className="error">{submitError}</div>}
              
              <FField
                name="courses"
                render={(props) => {
                  return (
                    <div>
                      test
                    </div>
                  )
                }}
              />
              <Button
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </AForm>
          )
        }}
      />
    </CenteredContainer>
  )
}
