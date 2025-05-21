import React from 'react';
import styled from 'styled-components';
import arrayMutators from 'final-form-arrays';
import MakeAsyncFunction from 'react-redux-promise-listener';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import {
  Row,
  Col,
  Form,
  Empty,
  Space,
  Select,
  Button,
  Divider,
  List as AList,
  Form as AForm,
  Typography,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
  FireOutlined,
  RightOutlined,
} from '@ant-design/icons';

import {
  EditableTitleControl,
  EmailInputControl, InputControl,
  PasswordControl,
} from '../lib/Fields';

import { EditTutorGroupStudentList } from './EditTutorGroupStudentList';
import { EditTutorGroupQuestionSetList } from './EditTutorGroupQuestionSetList';
import {
  EDIT_QUESTION_SET_FAILURE,
  EDIT_QUESTION_SET_REQUEST,
  EDIT_QUESTION_SET_SUCCESS
} from '../modules/questionSets/redux';
import { promiseListener } from '../store';

const {Title} = Typography;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background: #8053d7;
  padding: 5px 20px;
  border: none;
  border-radius: 20px;
  font-weight: bolder;
  color: #fff;

  &:hover {
    background-color: #fad602;
    border: none;
  }
`;

export const EditTutorGroupForm = ({isLoading, initialValues}) => {
  // console.log('initialValues: ', initialValues);
  
  let initialValue = {
    dispatchInterval: {
      day: "everyday",
      time: "immediate",
      interval: "1 question per day"
    },
    tutorGroupName: initialValues.tutorGroup.tutorGroup.title,
    tutorGroupStudents: initialValues.tutorGroup.tutorGroup.students,
    questionSets: initialValues.tutorGroup.tutorGroup.questionSets,
    currentClassStudents: initialValues._class._class.students
  };
  
  // console.log('initialValue: ', initialValue);
  
  return (
    <MakeAsyncFunction
      listener={promiseListener}
      start={EDIT_QUESTION_SET_REQUEST}
      resolve={EDIT_QUESTION_SET_SUCCESS}
      reject={EDIT_QUESTION_SET_FAILURE}
    >
      {(onSubmit) => (
        <FForm
          name="edit-tutor-group"
          initialValues={initialValue}
          mutators={{
            ...arrayMutators,
          }}
          onSubmit={onSubmit}
          render={({
                     submitError,
                     handleSubmit,
                     form: {
                       mutators: {push, pop}
                     },
                     submitting,
                     hasValidationErrors,
                     hasSubmitErrors,
                     dirtySinceLastSubmit,
                     values
                   }) => (
            <div>
              {isLoading && <div>Loading...</div>}
              {submitError && <div className="error">{submitError}</div>}
              <AForm onFinish={handleSubmit}>
                <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}>
                  <Col xl={18}>
                    <Space direction="vertical">
                      <div>
                        <Title level={5} style={{fontWeight: 'bolder'}}>
                          Group Name
                        </Title>
                        <FField
                          name="tutorGroupName"
                          component={InputControl}
                          type="text"
                          placeholder="New Tutor Group"
                          // validate={validations.required}
                        />
                      </div>
                      <EditTutorGroupStudentList
                        currentClass={initialValues._class._class}
                        tutorGroupStudents={values.tutorGroupStudents}
                        currentClassStudents={values.currentClassStudents}
                      />
                      <EditTutorGroupQuestionSetList
                        questionSets={values.questionSets}
                        myQuestionSets={initialValues.questionSets}
                      />
                      <div>
                        <Title level={5} style={{fontWeight: 'bolder'}}>
                          Dispatch Interval
                        </Title>
                        <FField name="dispatchInterval.day">
                          {(props) => (
                            <Select value={props.input.value} style={{ width: 120 }} onChange={props.input.onChange} disabled={true}>
                            </Select>
                            )}
                        </FField>
                        <FField name="dispatchInterval.time">
                          {(props) => (
                            <Select value={props.input.value} style={{ width: 120 }} onChange={props.input.onChange} disabled={true}>
                            </Select>
                          )}
                        </FField>
                        <FField name="dispatchInterval.interval">
                          {(props) => (
                            <Select value={props.input.value} style={{ width: 120 }} onChange={props.input.onChange} disabled={true}>
                            </Select>
                          )}
                        </FField>
                      </div>
                      <div>
                        <StyledButton style={{ background: '#8053d7', height: 40, borderRadius: 6, width: 'auto', marginBottom: 20}}>
                          SAVE GROUP
                        </StyledButton>
                      </div>
                    </Space>
                  </Col>
                </Row>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </AForm>
            </div>
          )}
        />
      )}
    </MakeAsyncFunction>
  );
};
