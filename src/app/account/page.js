"use client"
import React from 'react'
import { Form, Input, Button, message } from 'antd';
import axios from 'axios'
import { useRouter , useSearchParams } from 'next/navigation'
import { headers } from '../../../next.config';

const Account = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const onFinish = (values) => {
        axios({
          method:'post',
          url:"http://localhost:8081/account/createAccount",
          data: {
              uid:searchParams.get("uid"),
              balance:0,
              accountPassword:values.password,
              currency:"SGD"
          },
          headers: {
            'token': localStorage.getItem('token')
            }
      }).catch((e)=>{
        message.error('Set password failed!');
      }).then((response) => {
        if(response.data.code==0){
            router.push('/dashboard?aid='+response.data.data.aid)
        }
        else{
            message.error(response.data.msg)
        }
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
                                    Set Transaction Password
                                </Button>
                            </Form.Item>
                        </Form>
        </div>
        
    
      )
}

export default Account