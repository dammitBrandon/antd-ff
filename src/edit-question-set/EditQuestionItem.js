import React, {useState} from 'react';
import styled from 'styled-components';
import {
  Layout,
  Button,
  Empty,
  Form as AForm,
  Row,
  Col,
  Select,
  Space,
  Divider,
  Form,
  Rate,
  Typography,
} from 'antd';
import {Field as FField, Form as FForm} from 'react-final-form';
import {FieldArray as FFieldArray} from 'react-final-form-arrays';
import {
  InputControl,
  RatingControl,
  SimpleSelectControl,
  FieldsControl,
} from '../lib/Fields';
import {
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
  FireOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {EditAnswerItem} from './EditAnswerItem';

const {Title} = Typography;

// ICONS FOR DIFFICULTY
const customIcons = {
  1: <FireOutlined />,
  2: <FireOutlined />,
  3: <FireOutlined />,
  4: <FireOutlined />,
  5: <FireOutlined />,
};

const questionTypeOptions = [
  {
    label: 'Multiple Choice',
    value: 'multiple-choice',
  },
  {
    label: 'True or False',
    value: 'true-false',
  },
];

const StyledButton = styled(Button)`
  background: #8053d7;
  border: none;
  border-radius: 20px;
  font-weight: bolder;
  color: #fff;

  &:hover {
    background-color: #fad602;
    border: none;
  }
`;

export const EditQuestionItem = ({name, index, push, remove}) => {
  const [answersVisible, setVisible] = useState(false);

  const toggleAnswers = () => {
    setVisible(!answersVisible);
  };

  const answersCountLinkText = (possibleAnswers) => {
    let buttonTxt = '';
    if (answersVisible === false) {
      buttonTxt = possibleAnswers === 0 ? 'No' : 'Show';
    }
    return buttonTxt;
  };

  return (
    <FieldsControl
      names={[`${name}.possibleAnswers`, `${name}.questionFormat`]}
    >
      {(fieldsState) => {
        const possibleAnswers =
          fieldsState[`${name}.possibleAnswers`].input.value;
        const questionFormat =
          fieldsState[`${name}.questionFormat`].input.value;
        let answerLimit = questionFormat === 'true-false' ? 2 : 5;

        return (
          <>
            <Row
              gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}
              style={{width: '75vw'}}
            >
              {/*<Row gutter={[16, 16]} style={{width: '100%', position: 'relative'}}>*/}
              <Col xl={6}>
                <Title level={5} style={{fontWeight: 'bolder'}}>
                  Question {index + 1}
                </Title>
                <FField
                  name={`${name}.questionStatement`}
                  component={InputControl}
                  type="text"
                  placeholder="What is a Molecule?"
                  // validate={validations.required}
                />
              </Col>
              <Col xl={4}>
                <Title level={5} style={{fontWeight: 'bolder'}}>
                  Format
                </Title>
                <FField
                  name={`${name}.questionFormat`}
                  initialValue={'multiple-choice'}
                  component={SimpleSelectControl}
                  options={questionTypeOptions}
                />
              </Col>
              <Col xl={4}>
                <Title level={5} style={{fontWeight: 'bolder'}}>
                  Difficulty
                </Title>
                <FField
                  name={`${name}.questionDifficulty`}
                  initialValue={3}
                  component={RatingControl}
                  customIcons={customIcons}
                />
              </Col>
              <Col xl={2} offset={2}>
                <Button type="link" onClick={toggleAnswers}>
                  {answersCountLinkText(possibleAnswers.length)} Answers(
                  {possibleAnswers.length})
                </Button>
              </Col>
            </Row>
            {answersVisible && (
              <>
                <Divider dashed />
                <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}>
                  <Col xl={24}>
                    <FFieldArray name={`${name}.possibleAnswers`}>
                      {({fields, meta}) =>
                        fields.map((name, index) => (
                          <div key={name}>
                            <EditAnswerItem
                              name={name}
                              index={index}
                              remove={fields.remove}
                            />
                          </div>
                        ))
                      }
                    </FFieldArray>
                  </Col>
                </Row>
                <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, 16]}>
                  {possibleAnswers.length < answerLimit && (
                    <Col span={6}>
                      <StyledButton
                        shape="round"
                        type="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          push(`${name}.possibleAnswers`, null);
                        }}
                      >
                        <PlusOutlined /> Answer
                      </StyledButton>
                    </Col>
                  )}
                  {possibleAnswers.length === answerLimit && (
                    <Col xl={6}>
                      <StyledButton
                        shape="round"
                        type="primary"
                        onClick={toggleAnswers}
                      >
                        Done
                      </StyledButton>
                    </Col>
                  )}
                  <Col xl={3} offset={14}>
                    <Button
                      danger
                      type="text"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Delete Question
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </>
        );
      }}
    </FieldsControl>
  );
};
