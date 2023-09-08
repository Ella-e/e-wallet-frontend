"use client"
import React, { use, useEffect, useState } from 'react'
import "./page.css"
import TopupPopup from './TopupPopup'
import axios from 'axios'
import { Divider } from '@mui/material'

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

    const [onTopup, setOnTopup] = useState(false)
    
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
                {/* <button className='b1' onClick={()=>setOnTopup(true)}>Top-up</button> */}
                {true&&<TopupPopup/>}
            </div>
            <Divider />
            <div className='Topup'>
                <p>Transfer</p>
                <button className='b2'>Transfer</button>
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