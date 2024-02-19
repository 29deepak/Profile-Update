import React, { useEffect, useState } from 'react'
import Image from '../assests/img.png'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidate } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useSelector } from 'react-redux'
import useFetch from '../hooks/fetch.hook'


const Reset = () => {
    const { username } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')


    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_pwd: ""
        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            console.log(values)
            let resetPromise = resetPassword({ username, password: values.password })
            toast.promise(resetPromise, {
                loading: "updating",
                success: <b>Reset Successfully....</b>,
                error: <b>Could not Reset</b>
            }
            )
            resetPromise.then(function () { navigate('/password') })

        }
    })
    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if (status && status !== 201) return <Navigate to="/password" replace={true}></Navigate>


    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <h4>Enter a new Password</h4>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor='username'>Reset Password</label>
                <input type="password" name="password" placeholder="admin@123" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <input type="text" name="confirm_pwd" placeholder="admin@123" onChange={formik.handleChange} onBlur={formik.handleBlur} />

                <button className='btn btn-primary' type="submit">Reset</button>
            </form>


        </div>
    )


}

export default Reset