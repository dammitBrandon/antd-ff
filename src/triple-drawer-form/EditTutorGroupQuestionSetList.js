import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button, Drawer, List as AList } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import arrayMutators from 'final-form-arrays';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';

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

export const OrangeStrokeContainer = styled.div`
  border: 1px solid #D7753E;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 15px;
`;

export const StyledContainer = styled.div`
  display: block;
  margin-bottom: 20px;
  padding: 30px;
  width: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.31);
`;

const {Title} = Typography;

export const EditTutorGroupQuestionSetList = ({ questionSets=[], myQuestionSets=[] }) => {
  // console.log('EditTutorGroupStudentList, props: ', props);
  // console.log('EditTutorGroupStudentList, questionSets: ', questionSets);
  // console.log('EditTutorGroupStudentList, myQuestionSets: ', myQuestionSets);
  
  
  const [visible, setVisible] = useState(false);
  
  const showDrawer = () => {
    // console.log('EditTutorGroupQuestionSetList#showDrawer clicked');
    setVisible(true);
  };
  
  const onClose = () => {
    // console.log('EditTutorGroupQuestionSetList#onClose clicked')
    setVisible(false);
  };
  
  return (
    <>
      <Title level={5} style={{fontWeight: 'bolder'}}>
        Question Sets
      </Title>
      {questionSets.length} / 3 Question Sets added
      <div style={{width: '100%'}}>
        
          <FFieldArray name="questionSets">
            {({fields, meta}) => {
              return (
                <>
                  <OrangeStrokeContainer style={{marginBottom: 20}}>
                    <AList
                      itemLayout="horizontal"
                      dataSource={fields.value}
                      renderItem={(qSet, index) => {
                        return (
                          <StyledContainer style={{padding: 5, borderLeft: '20px solid #5BBCBD'}}>
                            <AList.Item key={`${qSet.title}-${qSet.id}`} style={{width: '100%'}}>
                              <AList.Item.Meta
                                title={
                                  <Link to="#" >
                                    {qSet.title}
                                  </Link>
                                }
                              />
                              <Link to="#" >
                                <RightOutlined styles={{float: 'right'}} />
                              </Link>
                            </AList.Item>
                          </StyledContainer>
                        )
                      }}/>
                  </OrangeStrokeContainer>
                  <EditTutorGroupQuestionSetListDrawer
                    questionSets={fields.value}
                    myQuestionSets={myQuestionSets}
                    onClose={onClose}
                    visible={visible}
                    remove={fields.remove}
                    push={fields.push}
                  />
                </>
              )}}
          </FFieldArray>
      </div>
      <StyledButton onClick={showDrawer}>
        +/- QUESTION SETS
      </StyledButton>
    </>
  );
};
