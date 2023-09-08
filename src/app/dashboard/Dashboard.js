"use client"
import React, { use, useEffect, useState } from 'react'
import "./page.css"
import TopupPopup from './TopupPopup'
import axios from 'axios'
import { Divider } from '@mui/material'
import { Form, Input, Button, Modal, message } from 'antd';

const baseURL = "http://localhost:8081/account"

const Dashboard = () => {
    
    const [account, setAccount] = useState(null)
    const [balanceHolder, setBalanceHolder] = useState(0.00)
    useEffect(()=>{
        // retrieve the account from database
        axios({
            method:'post',
            url:baseURL + "/findAccountByAid?aid=" + 1
        }).catch((e)=>{

        }).then((response)=>{
            console.log(response.data.data)
            setAccount(response.data.data)
            setBalanceHolder(response.data.data.balance)
        })
        // setAccount(JSON.stringify({
        //     aid:'1',
        //     uid:'1',
        //     balance:280,
        //     accoundPwd:"123"
        // }))
    },[])

    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [showTransferForm, setShowTransferForm] = useState(false)
    const [showTopUpForm,setShowTopUpForm]=useState(false)

    const validateAmount = (rule, value, callback) => {
        const amount = parseFloat(value);
        if (isNaN(amount) || amount <= 0) {
            callback('Amount must be greater than 0');
        } else {
            callback();
        }
    };

    const onTopUpFinish = (values) => {
        axios({
            method:'post',
            url:baseURL+"/topup?aid=1&accountPassword="+values.password+"&amount="+values.amount
        }).catch((e)=>{
            message.error('Top up failed!');
        }).then((response) => {
            if (response.data.code == 0) {
                message.success('Top up successfully!');
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
            url:baseURL+"/transactionToOne?aid=1&receiverAid="+values.receiverId+"&accountPassword="+values.password+"&amount="+values.amount
        }).catch((e)=>{
            message.error('Transfer failed!');
        }).then((response) => {
            if (response.data.code == 0) {
                message.success('Transfer successfully!');
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
            {/* <p className='p1'>Recent Transactions</p> */}
            {/* <div className='Top-up'>
                <h3> SGD 50.00</h3>
                <h5>Top-up</h5>
                <h4> My Account</h4>
                <h5> 27 AUG 2023</h5>
            </div> */}
            {/* <div className='Transfer'>
                <h3> SGD 25.50</h3>
                <h5>Transfer to</h5>
                <h4> Yu Jiali (81****23)</h4>
                <h5> 01 SEP 2023</h5>
            </div> */}
            {/* <p className='p1'>Quick Payment</p> */}
            {/* <div className='Payment'>
                <div className='Payment-photo'>
                    <input type="image" src={""} width="72" height="72" alt="OPPs!"/>
                    </div>
                        <div className='Payment-name'>
                            <h3> Alipay</h3>
                        </div>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard