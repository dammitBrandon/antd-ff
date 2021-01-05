import React from 'react';
import { Col, List, Row, Spin, Rate, Typography } from 'antd';
import { FireOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const {Title} = Typography;
const { Item } = List;

export const StyledContainer = styled.div`
  display: block;
  margin-bottom: 20px;
  padding: 30px;
  width: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.31);
`;

const customIcons = {
  1: <FireOutlined />,
  2: <FireOutlined />,
  3: <FireOutlined />,
  4: <FireOutlined />,
  5: <FireOutlined />,
};

export const QuestionSetList = ({ questionSets, isLoading }) => {
  console.log('QuestionSetList, questionSets: ', questionSets);
  return (
    <List
      loading={isLoading}
      dataSource={questionSets}
      renderItem={qSet => (
        <StyledContainer style={{borderLeft: '20px solid #D7753E', padding: 5}}>
          <Row gutter={[16,16]} align='middle' justify='center'>
            <Col xl={16}>
              <Item>
                <Link to={`/edit-question-set/${qSet.id}`}>
                  {qSet.title}
                </Link>
              </Item>
            </Col>
            <Col xl={4}>
              <Title level={5} style={{fontWeight: 'bolder'}}>
                Difficulty
              </Title>
              <Rate
                value={qSet.questionSetDifficulty}
                character={({index}) => {
                  return customIcons[index + 1];
                }}
              />
            </Col>
            <Col xl={2}>
              <Link to={`/teacher/edit-question-set/${qSet.id}`}>
                <RightOutlined />
              </Link>
            </Col>
          </Row>
        </StyledContainer>
      )}
    />
  );
};
