import React from 'react';
import arrayMutators from 'final-form-arrays';
import { Field as FField, Form as FForm } from 'react-final-form';
import { FieldArray as FFieldArray } from 'react-final-form-arrays';
import styled from 'styled-components';
import { InputControl, RatingControl, SimpleSelectControl } from '../lib/Fields';
import { Button, Empty, Form as AForm, Row, Col, Space, Divider, Form } from 'antd';

import { MinusCircleOutlined, PlusOutlined, MinusOutlined, FireOutlined, RightOutlined } from '@ant-design/icons';

// ICONS FOR DIFFICULTY
const customIcons = {
  1: <FireOutlined />,
  2: <FireOutlined />,
  3: <FireOutlined />,
  4: <FireOutlined />,
  5: <FireOutlined />,
};

export const QuestionItem = () => (
  <div>
    QuestionItem
  </div>
);
