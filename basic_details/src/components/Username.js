import React, { useState } from 'react'
import Image from '../assests/img.png'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameValidate } from '../helper/validate'
import { useDispatch, useSelector } from 'react-redux'
import { userAction } from '../store/userSlice'
const Username = () => {
    const userStore = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handler = () => {

    }
    console.log(userStore)
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            console.log(values)
            dispatch(userAction.setUsername(values))
            navigate("/password")
        }
    })

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor='username'>UserName</label>
                <input type="text" name="username" placeholder="username" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <button className='btn btn-primary' type="submit">Let's Go</button>
            </form>
            <Link to="/register">Register Now</Link>

        </div>
    )


}

export default Username