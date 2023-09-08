"use client"
import { Stack, TextField } from '@mui/material';
import React, { useState } from 'react'


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleRegister = (e) => {
        console.log(e)
    }
    return (
        <div>
            <form onSubmit={handleRegister}>
            <Stack>
                <Stack>
                <TextField
                    label="Username"
                    name="username"
                    type="username"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    placeholder="Username"
                />
                </Stack>
                <Stack>
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    placeholder="Password"
                />
                </Stack>
            </Stack>
            </form>
        </div>
    )
}

export default Register