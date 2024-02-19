import React, { useState } from 'react'
import Image from '../assests/img.png'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate, profileValidation, registerValidation } from '../helper/validate';
import convertBaseTo64 from '../helper/convert'
import useFetch from '../hooks/fetch.hook'
import { useSelector } from 'react-redux'
import { updateUser } from '../helper/helper'




const Profile = () => {
    const navigate = useNavigate()
    // const { username } = useSelector(state => state.auth);
    const [{ isLoading, apiData, serverError }] = useFetch()
    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            firstname: apiData?.firstname || "",
            lastname: apiData?.lastname || "",
            mobilenumber: apiData?.mobilenumber || "",
            email: apiData?.email || "",
            address: apiData?.address || ""
        },
        enableReinitialize: true,
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            values = await Object.assign(values, { profile: file || apiData?.profile || '' })
            let updatePromise = updateUser(values)
            toast.promise(updatePromise, {
                loading: "updating...",
                success: <b>Update Successfully</b>,
                error: <b>Could not update</b>
            })
            console.log(values)
        }
    })
    const onUpload = async (e) => {
        // console.log(e.target.files[0])
        const base64 = await convertBaseTo64(e.target.files[0])
        console.log(base64)
        setFile(base64)
    }
    // logout handler function 
    function userLogout() {
        localStorage.removeItem('token')
        navigate("/")
    }
    if (isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="profile">
                        <img src={apiData?.profile || file || Image} class="round" alt="avatar" />
                    </label>

                    <input onChange={onUpload} type="file" id='profile' name='profile' />
                </div>
                <lable>First Name:</lable>
                <input type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <lable>Last Name:</lable>
                <input type="text" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <lable>Mobile number:</lable>
                <input type="number" name="mobilenumber" value={formik.values.mobilenumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <lable>Email:</lable>
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <lable>Address:</lable>
                <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <button type="submit">Update</button>
            </form>
            <button onClick={userLogout}>logout</button>


        </div>
    )


}

export default Profile