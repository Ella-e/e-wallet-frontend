import React, { useState } from 'react'
import axios from 'axios'

const baseURL = "http://localhost:8081/account/topup"

const TopupPopup = () => {
    const [msg, setMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const handleTopUp = ()=> {
        console.log('enter topup')
        axios({
            method:'post',
            url:"http://localhost:8081/account/topup?aid=1&accountPassword=111&amount=20"
        }).catch((e)=>{

        }).then((response) => {
            console.log('top up end')
            console.log(response)
            console.log(response.data)
        })
    }
    return (
        <div>
            <button onClick={handleTopUp}>top up</button>
            {/* <form onSubmit={handleTopUp}>
                <h1>Amount of money to Topup</h1>
                <input/>
                <h1>Account password</h1>
                <input/>
                <button type='submit'>Top-up</button>
            </form>
             */}
            
        </div>
    )
}

export default TopupPopup