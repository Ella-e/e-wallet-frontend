"use client"
import React, { use, useEffect, useState } from 'react'
import "./page.css"
import TopupPopup from './TopupPopup'
import axios from 'axios'
import { Divider, FormControl, InputAdornment, InputLabel } from '@mui/material'
import { Form, Input, Button, Modal, message } from 'antd';
import { useRouter,useSearchParams } from 'next/navigation'
import { headers } from '../../../next.config'

const baseURL = "http://localhost:8081/account"

const Dashboard = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [account, setAccount] = useState(null)
    const [balanceHolder, setBalanceHolder] = useState(0.00)
    const [tradeNo, setTradeNo] = useState("")
    const [subject, setSubject] = useState("")
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        return () => {
            localStorage.removeItem('token');
        }
    },[])

    useEffect(()=>{
        // retrieve the account from database
        axios({
            method:'post',
            url:baseURL + "/findAccountByAid?aid=" + searchParams.get("aid"),
            headers: {
                'token': localStorage.getItem('token')
            }
        }).catch((e)=>{
        }).then((response)=>{
            console.log(response?.data?.data)
            setAccount(response?.data?.data)
            setBalanceHolder(response?.data?.data?.balance)
        })
    },[balanceHolder])

    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [showTransferForm, setShowTransferForm] = useState(false)
    const [showTopUpForm,setShowTopUpForm]=useState(false)
    const [showAlipayForm, setShowAlipayForm] = useState(false)

    const validateAmount = (rule, value, callback) => {
        const amount = parseFloat(value);
        if (isNaN(amount) || amount <= 0) {
            callback('Amount must be greater than 0');
        } else {
            callback();
        }
    };

    // const handleAlipay = (e)=>{
    //     e.preventDefault()
    //     // const w = window.open('')
    //     window.location.href = "http://localhost:8081/api/alipay/createWebTrade?tradeNo="+tradeNo+"&subject="+subject+"&totalAmount="+totalAmount
    // }

    const onTopUpFinish = (values) => {
        axios({
            method:'post',
            url:baseURL+"/topup?aid=1&accountPassword="+values.password+"&amount="+values.amount,
            headers: {
                'token': localStorage.getItem('token')
            }
        }).catch((e)=>{
            message.error('Top up failed!');
        }).then((response) => {
            if (response.data.code == 0) {
                message.success('Top up successfully!');
                setBalanceHolder(response.data.data.balance)
                setShowTopUpForm(false);
                form1.resetFields();
                return;
            }
            else{
                console.log(response)
                message.error(response.data.msg);
            }
        })
    }

    const onFinish = (values) => {
        axios({
            method:'post',
            url:baseURL+"/transactionToOne?aid=1&receiverAid="+values.receiverId+"&accountPassword="+values.password+"&amount="+values.amount,
            headers: {
                'token': localStorage.getItem('token')
            }
        }).catch((e)=>{
            message.error('Transfer failed!');
        }).then((response) => {
            if (response.data.code == 0) {
                message.success('Transfer successfully!');
                setBalanceHolder(response.data.data.balance)
                setShowTransferForm(false);
                form.resetFields();
                return;
            }
            else{
                console.log(response)
                message.error(response.data.msg);
            }
        }) 
    };

    const onAlipayFinish = (value) => {
        
        console.log(value)
        // const w = window.open('')
        window.location.href = "http://localhost:8081/api/alipay/createWebTrade?tradeNo="+value.tradeNo+"&subject="+value.subject+"&totalAmount="+value.totalAmount
        setShowTransferForm(false);
    }

    
    return (
        <div>
            <div id ="functional-area">
                <p className='p1'>My Balance</p>
                <div className='Balance-Account'>
                <table className='t1'>
                    <tbody>
                    <tr >
                        <td className='td1'>SGD</td>
                        <td className='td2'>{balanceHolder}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <Divider />
            <div className='Topup'>
            <Button className='b2' onClick={() => setShowTopUpForm(true)}>TOP UP</Button>
                <Modal
                title="Top Up"
                open={showTopUpForm}
                onCancel={() => {setShowTopUpForm(false);form1.resetFields();}}
                footer={null}
                >
                    <Form
                        name="topUpForm"
                        onFinish={onTopUpFinish}
                        form={form1}
                    >
                        <Form.Item
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter transfer amount!',
                                },
                                {
                                    validator: validateAmount, 
                                },
                            ]}
                        >
                            <Input placeholder="Top Up Amount" />
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
                                Top Up
                            </Button>
                        </Form.Item>
                    </Form>
                    </Modal>
            </div>
            <Divider />
            <div className='Topup'>
                <p>Transfer</p>
                <Button className='b2' onClick={() => setShowTransferForm(true)}>TRANSFER</Button>
                <Modal
                title="Transfer"
                open={showTransferForm}
                onCancel={() => {setShowTransferForm(false);form.resetFields();}}
                footer={null}
            >
                    <Form
                        name="transferForm"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name="receiverId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter receiver name!',
                                },
                            ]}
                        >
                            <Input placeholder="Receiver Account Name" />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter transfer amount!',
                                },
                                {
                                    validator: validateAmount, 
                                },
                            ]}
                        >
                            <Input placeholder="Transfer Amount" />
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
                                Transfer
                            </Button>
                        </Form.Item>
                    </Form>
                    </Modal>

            </div>
            <div>
                <Button className='b2' onClick={() => setShowAlipayForm(true)}>Alipay</Button>
                <Modal
                title="Alipay"
                open={showAlipayForm}
                onCancel={() => {setShowAlipayForm(false);form2.resetFields();}}
                footer={null}
                >
                    <Form
                        name="alipayForm"
                        onFinish={onAlipayFinish}
                        form={form2}
                    >
                        <Form.Item
                            name="tradeNo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the trade number provided by the sellor!',
                                },
                                {
                                    validator: validateAmount, 
                                },
                            ]}
                        >
                            <Input placeholder="trade number" />
                        </Form.Item>

                        <Form.Item
                            name="subject"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the object you buy!',
                                },
                            ]}
                        >
                            <Input placeholder="Things you buy" />
                        </Form.Item>

                        <Form.Item
                            name="totalAmount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the price of the object!',
                                },
                            ]}
                        >
                            <Input placeholder="price" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Alipay
                            </Button>
                        </Form.Item>
                    </Form>
                    </Modal>
            </div>
            </div>
        </div>
    )
}

export default Dashboard