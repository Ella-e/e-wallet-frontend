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
          name: "",
          password: values.password,
          email:values.email
      }
  }).catch((e)=>{
    console.log(e)
      message.error('Login failed!');
  }).then((response) => {
    if (response.status == 200) {
      message.success('Login successfully!');
      localStorage.setItem('token', response.data.token);
      axios({
        method:'get',
        url:"http://localhost:8081/account/findAccountByUid?uid="+response.data.id,
        headers: {
          'token': response.data.token
        }
    }).catch((e)=>{
        message.error('Fetch account failed!');
    }).then((response) => {
      if (response.code == "0") {
        localStorage.setItem('data', response.data[0]);
        router.push('/dashboard?aid='+response.data[0].aid)
      }
      else{
        router.push('/account?uid='+response.data.uid)
      }
      })
    }
    else{
      message.error(response.message)
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
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email!',
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
                            ]}
                        >
                            <Input.Password placeholder="Name" />
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