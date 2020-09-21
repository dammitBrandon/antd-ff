import React, {useState} from 'react';
import { Layout, Menu, Drawer, Typography, Row, Col } from 'antd';
const { Content, Sider, Header } = Layout;
const { Link } = Typography;

export const TeacherDashboardScreen = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  
  return (
    <Layout className="layout" style={{ height: '100vh'}}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Header>
          Header
        </Header>
        <Menu theme={'dark'} mode={'inline'}>
          <Menu.Item key={1}>
            Dashboard
          </Menu.Item>
          <Menu.Item key={2}>
            Students
          </Menu.Item>
          <Menu.Item key={3}>
            Question Sets
          </Menu.Item>
          <Menu.Item key={4}>
            Classes
          </Menu.Item>
          <Menu.Item key={5}>
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout className="site-layout" style={{marginLeft: 200}}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Link style={{right: 0}} onClick={showDrawer}>
            show recent activity
          </Link>
          <div style={{ padding: 24, textAlign: 'center', background: '#fff' }}>
            <Row gutter={[16, 16]}>
              <Col span={16} style={{background: 'red'}}>Col-8</Col>
              <Col span={6} offset={1} style={{background: 'yellow'}}>Col-6</Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={10} style={{background: 'pink'}}>Col-8</Col>
              <Col span={10} offset={2} style={{backgroundColor: 'orange'}}>Col-8</Col>
            </Row>
          </div>
        </Content>
      </Layout>
  
      <Drawer
        title="Recent Activity"
        placement="right"
        onClose={onClose}
        visible={visible}
        closable
        bodyStyle={{ paddingBottom: 80 }}
        maskStyle={{ background: 'none' }}
        width="300"
        >
        Drawer
      </Drawer>
    </Layout>
  )
};
