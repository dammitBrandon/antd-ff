import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form as AForm, Input as AInput, Upload as AUpload } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import setFieldData from 'final-form-set-field-data'

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
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export const AntFileUploadForm = () => {
  
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  
  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsBinaryString(file)
  }
  
  const onSubmit = async (values, form) => {
    console.log('onSubmit, values:', values);
    console.log('onSubmit, form:', form);
  };
  
  const onBeforeUpload = async (file) => {
    console.log('#onBeforeUpload, file: ', file);
  };
  
  const onChangeHandler = async (info) => {
    console.log('#onChangeHandler, info: ', info);
    if (info.file.status === 'uploading') {
      console.log('#onChangeHandler, uploading...');
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('#onChangeHandler, done!');
      getBase64(info.file.originFileObj, (fileBlob) => {
        setLoading(false);
        console.log('fileBlob: ', fileBlob);
      })
    }
  };
  
  const customRequestHandler = (info) => {
    console.log("#customRequestHandler, info: ", info);
    const { file, onSuccess, onError } = info;
    onSuccess();
  };
  
  return (
    <CenteredContainer>
      <FForm
        {...formItemLayout}
        debug={(state, fieldStates) => {
          console.log('FForm#debugging, state: ', state);
          console.log('FForm#debugging, fieldStates: ', fieldStates);
        }}
        onSubmit={onSubmit}
        mutators={{
          setFieldData
        }}
        render={({submitError, handleSubmit, values}) => {
          return (
            <AForm
              onFinish={handleSubmit}
              onFinishFailed={(err) => {
                console.error('Form failed, err: ', err);
              }}
            >
              <FField name="file-upload" type="text" placeholder="file upload" label="file-upload" >
                {({input, placeholder, label, meta}) => {
                  console.log('file-upload field, input: ', input);
                  return (
                    <>
                      <AForm.Item label={label}
                                  hasFeedback
                                  validateStatus={(meta.submitError && meta.submitFailed) ? 'error' :
                                    (meta.valid && meta.submitSucceeded) ? 'success' :
                                      (meta.validating) ? 'warning' : ''
                                  }
                      >
                        <AUpload
                          name='file-upload'
                          onChange={onChangeHandler}
                          beforeUpload={onBeforeUpload}
                          customRequest={customRequestHandler}
                        >
                          <Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}>{loading ? 'Loading..' : 'Click to Upload!'}</Button>
                        </AUpload>
                      </AForm.Item>
                      <pre>{JSON.stringify(meta, 0, 2)}</pre>
                    </>
                  );
                }}
              </FField>
              <AForm.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </AForm.Item>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </AForm>
          )
        }}
      
      />
    </CenteredContainer>
  );
}
