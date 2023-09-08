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
    if (response.status == 200) {
      message.success('Login successfully!');
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard?='+response.data.email)
    }
    else{
      message.error('Login failed!');
    }
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
                    <Button href="/register">Register</Button>
    </div>
    

  )
}

export default Login