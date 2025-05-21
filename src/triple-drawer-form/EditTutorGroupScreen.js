import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Typography, Row, Col, Radio, Card, Avatar, List as AList, Tooltip } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { EditTutorGroupForm } from './EditTutorGroupForm';

import mockClass from '../mock-api/mock-class.json';
import mockQuestionSets from '../mock-api/mock-question-sets.json';
import mockStudents from '../mock-api/mock-students.json';
import mockTutorGroup from '../mock-api/mock-tutor-group.json';

const {Title} = Typography;
const {Content} = Layout;

 const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
  padding: 40px 20px;
`;

class EditTutorGroupScreen extends Component {
  
  render() {
    const { _class={ id: '' }, questionSets=[], students=[], tutorGroup={ title: '' }, isLoading } = this.props;
    
    // console.log('_class: ', _class);
    // console.log('students: ', students);
    // console.log('tutorGroup: ', tutorGroup);
    // console.log('questionSets: ', questionSets);
    
    return (
      <Layout style={{width: '100%', height: '100vh'}} hasSider={true}>
        <Layout className="site-layout" style={{marginLeft: 200, background: '#eee'}}>
          <StyledContent>
            <Title level={3} style={{fontWeight: 'bolder'}}>
              <Link to={`/`} style={{color: '#333'}}>
                <LeftOutlined/> Edit {tutorGroup.title}
              </Link>
            </Title>
            <EditTutorGroupForm isLoading={isLoading} initialValues={{_class, students, tutorGroup, questionSets}} />
          </StyledContent>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    _class: mockClass,
    students: mockStudents,
    tutorGroup: mockTutorGroup,
    questionSets: mockQuestionSets,
    isLoading: false
  };
};

export default withRouter(connect(mapStateToProps, {})(EditTutorGroupScreen));
