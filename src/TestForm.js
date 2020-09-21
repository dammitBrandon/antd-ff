import React from 'react';
import { Button, Form as AForm, Tag } from 'antd';
import { Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import styled from 'styled-components';

const { CheckableTag } = Tag;

const GOALS = [
  'Increase engagement',
  'Performance tracking',
  'Identify learning styles',
  'Improve grades',
  'Other'
];

// const OPTIONS_OBJ = {
//   'Increase engagement': '#D7753E',
//   'Performance tracking': '#5BBCBD',
//   'Identify learning styles': '#FF8BA7',
//   'Improve grades': '#8053D7'
// };

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

// const CheckboxInput = ({input, meta, children}) => {
//
//   return (
//     <>
//       <AForm.Item label={input.name}>
//         <Input type="checkbox" {...input} checked={input.checked} />
//       </AForm.Item>
//     </>
//   );
// }

// const CheckboxArrayInput = ({fields, options}) => {
//   const toggle = (event, option) => {
//     console.log('toggle, event.target.checked: ', event.target.checked);
//     console.log('toggle, option: ', option);
//     if (event.target.checked) {
//       fields.push(option);
//     } else {
//       fields.remove(option);
//     }
//   };
//
//   return (
//     <div>
//       {options.map((option, index) => {
//
//         return (
//           <div key={index}>
//             <AForm.Item label={option.name}>
//               <Input type="checkbox" value={option} onChange={event => toggle(event, option)} />
//               {option}
//             </AForm.Item>
//           </div>
//         )
//       })}
//     </div>
//   )
// };
//
// const CheckTagInput = ({input: {isChecked, ...input}, meta, option, onChange}) => {
//   console.log('#CheckTagInput, input: ', input);
//
//
//
//   return (
//     <CheckableTag
//       key={input.name}
//       checked={isChecked}
//       onChange={onChange}
//       {...input}
//       value={option}
//     >
//      {option}
//     </CheckableTag>
//   )
// }

const CheckableTagArrayInput = ({fields, options}) => {
  
  const onCheckToggle = (option, checked) => {
    
    if (checked) {
      if (fields.value && !fields.value.indexOf(option) > -1) {
        fields.push(option);
      } else if (GOALS.includes(option)) {
        fields.push(option);
      }
    } else if (!checked && (fields.value && fields.value.indexOf(option) > -1)) {
      fields.remove(fields.value.indexOf(option));
    }
    
    
  };
  
  return (
    <div>
      {options.map((option, index) => {
        
        return (
          <CheckableTag
            key={option}
            checked={fields.value && fields.value.indexOf(option) > -1}
            onChange={clicked => onCheckToggle(option, clicked)}
          >
            {option}
          </CheckableTag>
        )
      })}
    </div>
  );
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
                name={"goalTags"}
                component={CheckableTagArrayInput}
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
