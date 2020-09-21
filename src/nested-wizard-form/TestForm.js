import React from 'react';
import { Input, Row, Col, Form } from 'antd';
import { Field as FField, Form as FForm } from 'react-final-form';

export const NestedTestForm = (props) => {
  console.log('NestedTestForm, props: ', props);
  return (
    <>
      <Row>
        <Col lg={16}>
          <FField name="test" type="text" placeholder="password" label="password">
            {({input, placeholder, label, meta})=> (
              <>
                <Form.Item label={label}
                           hasFeedback
                           validateStatus={(meta.submitError && meta.submitFailed) ? 'error' :
                             (meta.valid && meta.submitSucceeded) ? 'success' :
                               (meta.validating) ? 'warning' : ''
                           }
                >
                  <Input {...input} placeholder={placeholder} label={label} />
                </Form.Item>
                {/*<pre>{JSON.stringify(meta, 0, 2)}</pre>*/}
              </>
            )}
          </FField>
        </Col>
      </Row>
    </>
  )
};
