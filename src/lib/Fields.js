import React from 'react';
import styled from 'styled-components';
import { Input, Rate, Form as AForm, Select } from 'antd';
import ReactCodeInput from 'react-code-input';
import { useField } from 'react-final-form';

const { Option } = Select;

export const StyledInput = styled(Input)`
  border-radius: 8px;
  padding: 10px;
`;

export const RatingControl = ({name, input, value, customIcons, meta, ...rest}) => {
  return (
  <Rate
    defaultValue={3}
    character={({ index }) => {
      return customIcons[index + 1];
    }}
  />
  )
}

export const InputControl = ({ name, input, disabled = false, meta: { error, submitError, touched, pristine, dirtySinceLastSubmit, submitting, ...meta }, ...rest }) => {
  return (
    <AForm.Item
      name={name}
      hasFeedback
      validateStatus={(error || submitError) && touched ? 'error' : ''}
      help={(error || submitError) && touched &&
      (<span className='error'>{error || submitError}</span>)}
    >
      <StyledInput {...input} {...rest} disabled={disabled || submitting} />
      {/* <pre>{JSON.stringify(meta, 0, 2)}</pre> */}
    </AForm.Item>
  );
};

export const EmailInputControl = ({ name, input, disabled = false, meta: { error, submitError, touched, pristine, dirtySinceLastSubmit, submitting, ...meta }, ...rest }) => {
  return (
    <AForm.Item
      name={name}
      hasFeedback
      validateStatus={(error || submitError) && touched ? 'error' : ''}
      help={(error || submitError) && touched &&
      (<span className='error'>{error || submitError}</span>)}
    >
      <Input {...input} {...rest} disabled={disabled || submitting} type='email' />
      {/* <pre>{JSON.stringify(meta, 0, 2)}</pre> */}
    </AForm.Item>
  );
};

export const PasswordControl = ({ name, input, meta: { error, submitError, touched, pristine, dirtySinceLastSubmit, submitting, ...meta }, ...rest }) => {
  return (
    <AForm.Item
      name={name}
      hasFeedback
      validateStatus={(error || submitError) && touched ? 'error' : ''}
      help={(error || submitError) && touched &&
      (<span className='error'>{error || submitError}</span>)}
    >
      <Input.Password {...input} {...rest} disabled={submitting} />
      {/* <pre>{JSON.stringify(meta, 0, 2)}</pre> */}
    </AForm.Item>
  );
};

export const SimpleSelectControl = ({ input, name, onChange, meta: { error, submitError, touched, pristine, dirtySinceLastSubmit, submitting, ...meta }, ...rest}) => {
  
  return (
    <AForm.Item
      name={name}
      validateStatus={error && dirtySinceLastSubmit ? 'error' : ''}
      help={error && touched && (
        <span className='error'>{error}</span>
      )}
    >
      <Select
        labelInValue
        defaultValue={{ value: 'lucy' }}
        style={{ width: 120 }}
        onChange={onChange}
      >
        <Option value="multiple-choice">Multiple Choice</Option>
        <Option value="lucy">True or False</Option>
  
      </Select>
    </AForm.Item>
  );
}

export const SelectControl = ({ input, name, value, options, mode, placeholder, size, tagRender, onChange, dirtySinceLastSubmit }) => {
  const {
    meta: { error, touched }
  } = useField(name, {
    subscription: { touched: true, error: true },
    type: 'select',
    value // important for RFF to manage list of strings
  });
  return (
    <AForm.Item
      name={name}
      validateStatus={error && dirtySinceLastSubmit ? 'error' : ''}
      help={error && touched && (
        <span className='error'>{error}</span>
      )}
    >
      <Select {...input} mode={mode} placeholder={placeholder} tagRender={tagRender}>
        {options
          .filter(o => !input.value.includes(o))
          .map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
      </Select>
    </AForm.Item>
  );
};

export const CheckboxInputControl = ({ name, input, disabled = false, meta: { error, submitError, touched, pristine, dirtySinceLastSubmit, submitting, ...meta }, ...rest }) => (
  <AForm.Item
    hasFeedback
    validateStatus={(error || submitError) && touched ? 'error' : ''}
    help={(error || submitError) && touched &&
    (<span className='error'>{error || submitError}</span>)}
  >
    <Input {...input} {...rest} type='checkbox' disabled={submitting} /> {' '}
    {(rest && rest.icon)}
    {/* <pre>{JSON.stringify(meta, 0, 2)}</pre> */}
  </AForm.Item>
);

export const CodeInputControl = ({ input, meta: { valid, error, submitError, touched, pristine, dirtySinceLastSubmit, ...meta }, label }) => (
  <>
    <AForm.Item
      label={label}
      hasFeedback
      validateStatus={(error || submitError) && touched ? 'error' : ''}
      help={(error || submitError) && touched &&
                (<span className='error'>{error || submitError}</span>)}
    >
      <ReactCodeInput {...input} type='number' fields={6} isValid={!error || !dirtySinceLastSubmit} />
      {/*<pre>{JSON.stringify(meta, 0, 2)}</pre>*/}
    </AForm.Item>
  </>
);

export const conditionalRequired = (value, allValues, when, is) => {
  return value || typeof value === 'number' ? undefined : 'Required';
};

export const parsePhone = (value) => !value ? value : value.replace(/[^\d]/g, '');

export const formatPhone = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
  }

  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

export const capitalize = value => {
  if (typeof value !== 'string') return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const phoneNumber = value => {
  return value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;
};
