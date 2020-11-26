import React from 'react';
import { Input, Row, Col, Form } from 'antd';
import { Field as FField, Form as FForm } from 'react-final-form';

export const NestedEmailForm = (props) => {
  console.log('NestedTestForm, props: ', props);
  return (
    <>
      <Row>
        <Col lg={16}>
          <FField name="email" type="text" placeholder="email@test.com" label="Email">
            {({input, placeholder, label, meta})=> (
              <>
                <Form.Item label={label}
                           hasFeedback
                           validateStatus={(meta.submitError && meta.submitFailed && !meta.dirtySinceLastSubmit) ? 'error' :
                             (meta.valid && meta.submitSucceeded) ? 'success' :
                               (meta.validating) ? 'warning' : ''
                           }
                           help={(meta.error || meta.submitError) && !meta.dirtySinceLastSubmit && (
                             <span className="error">{meta.error || meta.submitError}</span>
                           )}
                >
                  <Input {...input} placeholder={placeholder} label={label} />
                </Form.Item>
                <pre>{JSON.stringify(meta, 0, 2)}</pre>
              </>
            )}
          </FField>
        </Col>
      </Row>
    </>
  )
};
