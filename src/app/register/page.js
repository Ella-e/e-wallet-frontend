"use client"
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Register = () => {
    const router = useRouter();
    const onFinish = (values) => {
        axios({
          method:'post',
          url:"http://localhost:8081/user/register",
          data: {
              name: values.name,
              email: values.email,
              password: values.password
          }
      }).catch((e)=>{
        console.log(e)
          message.error('Register failed!');
      }).then((response) => {
        console.log(response)
        window.alert("An identification email has been sent to your email address. Please check your email and click the link to activate your account.")
        router.push('/login')
      })
      };
    
      const [form] = Form.useForm();
      const validatePassword = (_, value) => {
        if (value && value.length >= 6) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Password must be at least 6 characters long'));
      };
    
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
                                        message: 'Please enter the name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your password!',
                                    },
                                    {
                                        validator: validatePassword,
                                      },
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
    
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
        </div>
        
    
      )
}

export default Register