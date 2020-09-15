import React, {useState} from 'react';
import { Button, Layout, Menu, Drawer, Typography } from 'antd';
const { Content, Sider, Header, Footer } = Layout;
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
            Main Content Layout
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
