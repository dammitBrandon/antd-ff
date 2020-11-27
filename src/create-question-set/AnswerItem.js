import React from 'react';
import { Col, Row } from 'antd';

export const AnswerItem = ({name, index, remove}) => (
  <div>
    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
      <Col span={8}>
        Answer Item #{index + 1}
      </Col>
    </Row>
  </div>
);
