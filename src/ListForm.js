import React, { useState } from 'react';
import { Button, Form, Form as AForm, Input, Drawer, Typography, Col, Row } from 'antd';
import { Field as FField, Form as FForm } from 'react-final-form';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { composeValidators, email, required } from './AntForm';
import { PlusOutlined } from '@ant-design/icons';

const { Link } = Typography;

const CenteredContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 100px;
  display: block;
`;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength2 = minLength(2);

const AInput = ({input, placeholder, label, meta}) => (
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
    {/*<pre>{JSON.stringify(meta, 0, 2)}</pre>*/}
  </>
);

const ASearch = ({input, placeholder, label, meta}) => (
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
      <Input.Search {...input} placeholder={placeholder} />
    </Form.Item>
  </>
);

const DrawerForm = () => {

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={12} sm={20} xs={24}>
          <small style={{display: 'flex', justifyContent: 'left'}}>First Name</small>
          <FField
            name="firstName"
            component={AInput}
            type="text"
            placeholder="First Name*"
            validate={composeValidators(
              required,
              minLength(4),
              maxLength(25)
            )}
          />
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={12} sm={20} xs={24}>
          <small style={{display: 'flex', justifyContent: 'left'}}>Last Name</small>
          <FField
            name="lastName"
            component={AInput}
            validate={composeValidators(
              required,
              minLength(4),
              maxLength(25)
            )}
            parse={value => value && value.toLowerCase()}
            type="text"
            placeholder="Last Name*"
          />
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col lg={12} sm={20} xs={24}>
          <small style={{display: 'flex', justifyContent: 'left'}}>Email</small>
          <FField
            name="email"
            component={AInput}
            type="text"
            placeholder="Email*"
            validate={composeValidators(
              required,
              email
            )}
          />
        </Col>
      </Row>
    </>
  )
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2))
  return { [FORM_ERROR]: 'Login Failed', verificationCode: 'Unknown Code' }
}

export const ListForm = () => {
  // const [students, setStudents] = useState([]);
  const [visible, setVisible] = useState(false);
  
  const showDrawer = () => {
    setVisible(true);
  };
  
  const onClose = () => {
    setVisible(false);
  }
  
  const addStudent = () => {
    console.log('#addStudent');
    setVisible(false);
  }
  
  return (
    <CenteredContainer>
      <FForm
        name="list-form"
        onSubmit={onSubmit}
        render={({handleSubmit}) => {
          return (
            <AForm onFinish={handleSubmit}>
              <FField
                name="email"
                type="text"
                placeholder="Search for Student by Email Address"
                label="Find Student"
                component={ASearch}
              />
              <Link onClick={showDrawer}>
                <PlusOutlined /> Create Student
              </Link>
              <br/>
              
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Drawer
                title="Create Student"
                placement="right"
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                      Cancel
                    </Button>
                    <Button onClick={addStudent} type="primary">
                      Create Student
                    </Button>
                  </div>
                }
              >
                <div>
                  <DrawerForm />
                </div>
              </Drawer>
            </AForm>
          );
        }}
      />
    </CenteredContainer>
  );
}
