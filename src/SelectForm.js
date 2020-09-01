import React, { useState } from 'react';
import { Button, Form as AForm, Input, Select, Tag } from 'antd';
import { FormSpy, Field as FField, Form as FForm } from 'react-final-form';
import setFieldData from 'final-form-set-field-data'
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';

// const { Option } = Select;
// const options = [];
// for (let i=10; i < 36; i++) {
//   let item = i.toString(36) + i;
//   options.push(item);
// }

const OPTIONS = [
  'Algebra 1',
  'Geometry',
  'Chemistry',
  'Biology'
  ];

const OPTIONS_OBJ = {
  'Algebra 1': 'gold',
  'Geometry': 'yellow',
  'Chemistry': 'lime',
  'Biology': 'cyan'
};

const tagRender = (props) => {
  const {label, value, closable, onClose, color} = props;
  console.log('tagRender, props: ', props);
  return (
    <Tag color={OPTIONS_OBJ[value]} closable={closable} onClose={onClose} style={{marginRight: 3}}>
      {label}
    </Tag>
  )
}

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
  // window.alert(JSON.stringify(values, 0, 2))
  return { [FORM_ERROR]: 'Login Failed', verificationCode: 'Unknown Code' }
}

export const SelectForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log('selectedItems: ', selectedItems);
  
  const handleChange = (selectedItems) => {
    console.log('handleChange, selectedItems: ', selectedItems);
    setSelectedItems(selectedItems);
  };
  
  const filteredOptions = OPTIONS.filter(option => !selectedItems.includes(option));
  
  return (
    <CenteredContainer>
      <FForm
        name="select-form"
        onSubmit={onSubmit}
        render={({handleSubmit}) => {
          return (
            <AForm onFinish={handleSubmit}>
              <Select
                value={selectedItems}
                mode="tags"
                style={{ width: '100%' }}
                onChange={handleChange}
                tagRender={tagRender}
              >
                {filteredOptions.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </AForm>
          );
        }}
      />
    </CenteredContainer>
  );
}
