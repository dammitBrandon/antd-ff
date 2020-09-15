import React from 'react';
import { Layout, Menu } from 'antd';
const { Content, Sider, Header, Footer } = Layout;

export const TeacherDashboardScreen = () => {
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
          <div style={{ padding: 24, textAlign: 'center', background: '#fff' }}>
            Main Content Layout
          </div>
        </Content>
      </Layout>
    </Layout>
  )
};
