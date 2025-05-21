import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Typography, Button, Drawer, List as AList } from 'antd';
import { PlusOutlined, MinusOutlined, UserOutlined } from '@ant-design/icons';
import arrayMutators from 'final-form-arrays';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import { StyledContainer } from './EditTutorGroupQuestionSetList';

const {Title} = Typography;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background: #5BBCBD;
  padding: 5px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bolder;
  color: #fff;

  &:hover {
    background-color: #fad602;
    border: none;
  }
`;

export const EditTutorGroupStudentsListDrawer = ({tutorGroupStudents=[], currentClassStudents=[], onClose, visible, remove, push}) => {
  let tutorGroupCurrentClassDiffStudents = currentClassStudents.filter(student => !tutorGroupStudents.includes(student));
  return (
    <Drawer
      title="Basic Drawer Students"
      placement="right"
      width="600"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Title level={5} style={{fontWeight: 'bolder'}}>
        Current Tutor Group Enrollments
      </Title>
      {tutorGroupStudents.length} / 25 Students added
      <div>
        <AList
          itemLayout="horizontal"
          dataSource={tutorGroupStudents}
          renderItem={(student, index) => (
            <div>
              <AList.Item
                key={student.id}
                actions={[
                  <Button
                    icon={<MinusOutlined />}
                    type="link"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // console.log('clicked remove button, removing index: ', index);
                      remove(index);
                    }}
                  />,
                ]}
              >
                <AList.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={`${student.firstName} ${student.lastName}`}
                  description={student.learningStyles.join(', ')}
                />
              </AList.Item>
            </div>
          )}
        />
      </div>
      <Title level={5} style={{fontWeight: 'bolder'}}>
        Current Class Not in Group
      </Title>
      {tutorGroupCurrentClassDiffStudents.length} / 25 Students added
      <div>
        <AList
          itemLayout="horizontal"
          dataSource={tutorGroupCurrentClassDiffStudents}
          renderItem={(student, index) => (
            <AList.Item
              key={student.id}
              actions={[
                <Button
                  icon={<PlusOutlined />}
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log('clicked add button, pushing event: ', e);
                    // console.log('clicked add button, pushing index: ', index);
      
                    push(student);
                  }}
                />,
              ]}
            >
              <AList.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={`${student.firstName} ${student.lastName}`}
                description={student.learningStyles.join(', ')}
              />
            </AList.Item>
          )}
        />
      </div>
    </Drawer>
  );
};
