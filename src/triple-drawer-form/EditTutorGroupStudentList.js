import React, {useState} from 'react';
import styled from 'styled-components';
import { Tooltip, Avatar, Typography, Button, Drawer } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';

import { EditTutorGroupStudentsListDrawer } from './EditTutorGroupStudentsListDrawer';
import { EditTutorGroupQuestionSetListDrawer } from './EditTutorGroupQuestionSetListDrawer';

// style={{ background: '#5BBCBD', height: 40, borderRadius: 6, width: 'auto', marginBottom: 20}}
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

const { Title } = Typography;

export const EditTutorGroupStudentList = ({tutorGroupStudents=[], currentClassStudents=[], currentClass={title: ''}}) => {
  // console.log('EditTutorGroupStudentList, props: ', props);
  console.log('EditTutorGroupStudentList, tutorGroupStudents: ', tutorGroupStudents);
  console.log('EditTutorGroupStudentList, currentClassStudents: ', currentClassStudents);
  // console.log('EditTutorGroupStudentList, currentClass: ', currentClass);
  
  const [visible, setVisible] = useState(false);
  
  const showDrawer = () => {
    console.log('EditTutorGroupStudentList#showDrawer clicked');
    setVisible(true);
  };
  
  const onClose = () => {
    console.log('EditTutorGroupStudentList#onClose clicked');
    setVisible(false);
  };
  
  return (
    <>
      <Title level={5} style={{fontWeight: 'bolder'}}>
        Students
      </Title>
      { tutorGroupStudents.length } / 25 Students added
      <div style={{width: '100%'}}>
        <FFieldArray name="tutorGroupStudents">
          {({fields, meta}) => (
            <>
              <Avatar.Group style={{marginBottom: 20}}>
                {fields.value.slice(0,3).map(student => (
                  <Tooltip key={student.id} title={`${student.firstName} ${student.lastName}`}>
                    <Avatar
                      style={{background: 'dodgerblue'}}
                      icon={<UserOutlined />}
                    >
                    </Avatar>
                  </Tooltip>
                ))}
                { fields.value.slice(3).length > 0 &&
                <Avatar style={{background: 'purple'}}>+{fields.value.slice(3).length}</Avatar>
                }
              </Avatar.Group>
              <EditTutorGroupStudentsListDrawer
                tutorGroupStudents={fields.value}
                currentClassStudents={currentClassStudents}
                onClose={onClose}
                visible={visible}
                remove={fields.remove}
                push={fields.push}
              />
            </>
          )}
        </FFieldArray>
      </div>
      <StyledButton onClick={showDrawer}>
        +/- STUDENTS
      </StyledButton>
    </>
  );
};
