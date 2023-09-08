import React, { useState } from 'react'
import axios from 'axios'
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const baseURL = "http://localhost:8081/account/topup"

const TopupPopup = () => {
    const [msg, setMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [pwd, setPwd] = useState("")
    const [amount, setAmount] = useState('')
    const [rspData, setRspData] = useState(null)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleTopUp = (e)=> {
        // e.preventDefault()
        // check the input value
        if(amount<=0) {
            window.confirm("Amount must be positive")
        } else {
            axios({
                method:'post',
                url:baseURL+"?aid=1&accountPassword="+pwd+"&amount="+amount
            }).catch((e)=>{
                console.log(e)
            }).then((response) => {
                console.log("response: ")
                console.log(response)
                console.log(response.data)
                console.log(response.data.code)
                console.log(response.data.data)
                if (response.data.code==0) {
                    window.confirm("topup success")
                    setRspData(response.data.data) // {tid,aid,rid,amount,time}
                } else{
                    setErrMsg(response.data.msg)
                    window.confirm(response.data.msg)
                }
                
            })
        }
    }
    return (
        <div>
            {/* <button onClick={handleTopUp}>top up</button> */}
            <p>Top-up</p> 
            {/* {errMsg} */}
            <form onSubmit={handleTopUp}>
            <FormControl fullWidth sx={{ m: 1, width:'25ch'}} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={amount}
                    type='number'
                    onChange={(e)=>{setAmount(e.target.value)}}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width:'25ch'}} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={pwd}
                    onChange={(e)=>{setPwd(e.target.value)}}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
            <Button type='submit'>Top-up</Button>
            </form>
            
            
        </div>
    )
}

export default TopupPopup