import React, { useState, useEffect } from 'react';
import { Button, Form as AForm, Input } from 'antd';

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

export const AntForm = () => {
  const [form] = AForm.useForm();
  console.info('form: ', form);
  const [checkNick, setCheckNick] = useState(false);

  return (
    <AForm form={form} name="ant-form">
      Form
    </AForm>
  );
}
