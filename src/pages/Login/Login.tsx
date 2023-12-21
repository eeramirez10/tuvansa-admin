import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card,Flex, Form, Input, Layout } from 'antd'
import { useAuth } from 'src/hooks/useAuth'
import imageTuvansa from 'src/img/tuvansa.jpeg'
// import { Navigate } from 'react-router-dom'

export const Login: React.FC = () => {
  // const isAuthenticated = false

  const { startLogin } = useAuth()

  const onFinish = (values: { username: string, password: string }): void => {
    const { username, password } = values

    startLogin({ username, password })
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>

        <Flex style={{ width: '100%', minHeight: '100vh' }} justify='center' align='center'>

          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={imageTuvansa}
              />
            }
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Por favor ingresa tu usuario!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor ingresa tu password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> 

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item> */}

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                {/* Or <a href="">register now!</a> */}
              </Form.Item>
            </Form>

          </Card>

        </Flex>

      </Layout>
    </>
  )
}
