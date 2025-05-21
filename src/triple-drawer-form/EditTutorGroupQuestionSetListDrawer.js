import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button, Drawer, List as AList } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
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

export const EditTutorGroupQuestionSetListDrawer = ({questionSets=[], myQuestionSets=[], onClose, visible, remove, push}) => {
  let myAvailableQuestionSets = myQuestionSets.filter(qSet => !questionSets.includes(qSet));
  return (
    <Drawer
      title="Basic Drawer Question Sets"
      placement="right"
      width="600"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <Title level={5} style={{fontWeight: 'bolder'}}>
        Current Question Sets
      </Title>
      {questionSets.length} / 3 Question Sets added
      <div>
        <AList
          itemLayout="horizontal"
          dataSource={questionSets}
          renderItem={(qSet, index) => (
            <StyledContainer style={{borderLeft: '20px solid #D7753E', padding: 5}}>
              <AList.Item
                key={`${qSet.title}-${qSet.id}`}
                style={{width: '100%'}}
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
                  title={
                    <Link to="#" >
                      {qSet.title}
                    </Link>
                  }
                />
              </AList.Item>
            </StyledContainer>
          )}
        />
      </div>
    
      <Title level={5} style={{fontWeight: 'bolder'}}>
        All My Question Sets
      </Title>
      {myAvailableQuestionSets.length} Question Sets total
      <div>
        <AList
          itemLayout="horizontal"
          dataSource={myAvailableQuestionSets}
          renderItem={(qSet, index) => (
            <StyledContainer style={{borderLeft: '20px solid #D7753E', padding: 5}}>
              <AList.Item
                key={`${qSet.title}-${qSet.id}`}
                style={{width: '100%'}}
                actions={[
                  <Button
                    icon={<PlusOutlined />}
                    type="link"
                    disabled={questionSets.length > 2}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // console.log('clicked add button, pushing event: ', e);
                      // console.log('clicked add button, pushing index: ', index);
                      
                      push(qSet);
                    }}
                  />,
                ]}
              >
                <AList.Item.Meta
                  title={
                    <Link to="#" >
                      {qSet.title}
                    </Link>
                  }
                />
              </AList.Item>
            </StyledContainer>
          )}
        />
      </div>
    </Drawer>
  )
}
