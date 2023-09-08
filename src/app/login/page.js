"use client"
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'

const Login = () => {
  const onFinish = (values) => {
    axios({
      method:'post',
      url:"http://localhost:8081/user/login",
      data: {
          name: values.name,
          password: values.password
      }
  }).catch((e)=>{
    console.log(e)
      message.error('Login failed!');
  }).then((response) => {
    console.log(response)
  })
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Form
          name="form"
          onFinish={onFinish}
          form={form}
      >
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter account name!',
                                },
                            ]}
                        >
                            <Input placeholder="Account Name" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Your Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
    </div>

  )
}

export default Login