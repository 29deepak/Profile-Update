import React, { useState } from 'react'
import Image from '../assests/img.png'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook'
import { useSelector } from 'react-redux'
import { verifyPassword } from '../helper/helper'

const Password = () => {
    const navigate = useNavigate()
    const { username } = useSelector(state => state.auth);
    const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`)
    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            console.log(values)
            let loginPromise = verifyPassword({ username, password: values.password })
            toast.promise(loginPromise, {
                loading: 'Checking',
                success: <b>Login Successfully</b>,
                error: <b>Password not match</b>
            })
            loginPromise.then(res => {
                let { token } = res.data;
                localStorage.setItem('token', token)
                navigate('/profile')
            })
        }
    })
    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <h4> hello {apiData?.firstname || apiData?.username}</h4>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <img src={apiData?.profile || Image} className='round' alt="avatar" />
                </div>

                <label htmlFor='username'>Password</label>
                <input type="password" name="password" placeholder="admin@123" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <button className='btn btn-primary' type="submit">SIGN In</button>
            </form>
            <h4>forgot password ? <Link to="/recovery"><button>Recover Now</button></Link></h4>


        </div>
    )


}

export default Password