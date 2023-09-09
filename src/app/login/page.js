"use client"
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()
  const onFinish = (values) => {
    const mydata = {
      name: "",
      email:values.email,
      password: values.password
  }
    axios({
      method:'post',
      url:"http://localhost:8081/user/login",
      data: mydata
  }).catch((e)=>{
    console.log(e)
      message.error('Login failed!');
  }).then((response) => {
    console.log("log in success")
    console.log(response)
    if (response.data.statusCode == 200) {
      message.success('Login successfully!');
      // console.log(response.data.data);
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('email', response.data.data.email);
      localStorage.setItem('uid', response.data.data.id);
      console.log(response.data.data.id)
      axios({
        method:'get',
        url:"http://localhost:8081/account/findAccountByUid?uid="+response.data.data.id,
        headers: {
          'token': response.data.data.token
        }
    }).catch((e)=>{
        message.error('Fetch account failed!');
    }).then((response) => {
      console.log(response.data)
      if (response.data.code == "0") {
        localStorage.setItem('data', JSON.stringify(response.data.data));
        router.push('/dashboard?aid='+response.data.data.aid)
      }
      else{
        router.push('/account?uid='+localStorage.getItem('uid'));
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
                            <Input.Password placeholder="Password" />
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