import React, { useState } from 'react'

import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';


const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [show, setShow] = useState(false)
    const Handlers = e => {
        console.log(e.target)
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const Show = () => {
        setShow(!show)
    }
    const Login = () => {
        console.log(user)

    }
    return (
        <div className='login'>
            {console.log(user)}
            <div>
                <label>Email:</label>
                <input type="text" name="email" value={user.email} placeholder="Enter Your Email" onChange={Handlers}></input>
            </div>
            <div>
                <label >password:</label>
                <input type={show ? "text" : "password"} name="password" value={user.password} placeholder="Enter Password" onChange={Handlers}></input>
                <label onClick={Show}>{show ? <AiFillEye /> : <AiFillEyeInvisible />}</label>
            </div>

            <button onClick={Login}>Login</button>
            <h3>or</h3>
            <button >Signup</button>

        </div>
    )
}

export default Login