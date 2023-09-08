"use client"
import React, { use, useEffect, useState } from 'react'
import "./page.css"
import TopupPopup from './TopupPopup'

const Dashboard = () => {
    const [account, setAccount] = useState(JSON.stringify({
        aid:'1',
        uid:'1',
        balance:280,
        accoundPwd:"123"
    }))
    const [balanceHolder, setBalanceHolder] = useState(0.00)
    useEffect(()=>{
        setAccount(JSON.stringify({
            aid:'1',
            uid:'1',
            balance:280,
            accoundPwd:"123"
        }))
        setBalanceHolder(JSON.parse(account)?.balance)
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
            <div className='Buttons'>
                <button className='b1' onClick={()=>setOnTopup(true)}>Top-up</button>
                {true&&<TopupPopup/>}
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