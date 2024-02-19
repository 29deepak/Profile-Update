import React, { useState } from 'react'
import Image from '../assests/img.png'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate, registerValidation } from '../helper/validate';
import convertBaseTo64 from '../helper/convert'
import { registerUser } from '../helper/helper'


const Register = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: ""
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || '' })
            console.log(values)
            let registerPromise = registerUser(values)
            toast.promise(registerPromise, {
                loading: 'Creating..',
                success: <b>Register Successfully..</b>,
                error: <b>could not register</b>
            })
            registerPromise.then(function () { navigate('/') });
        }
    })
    console.log(formik.errors)
    const onUpload = async (e) => {
        // console.log(e.target.files[0])
        const base64 = await convertBaseTo64(e.target.files[0])
        console.log(base64)
        setFile(base64)
    }

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="profile">
                        <img src={file || Image} class="round" alt="avatar" />
                    </label>

                    <input onChange={onUpload} type="file" id='profile' name='profile' />
                </div>
                <lable>Email:</lable>
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <lable>username:</lable>
                <input type="text" name="username" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <lable>Password:</lable>
                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <button type="submit">Register Now</button>
            </form>


        </div>
    )


}

export default Register