import React, { useEffect, useState } from 'react'
import Image from '../assests/img.png'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { generateOTP, verifyOTP } from '../helper/helper'


const Recovery = () => {
    const { username } = useSelector(state => state.auth);
    console.log(username)
    const [OTP, setOTP] = useState()
    const navigate = useNavigate()
    // const formik = useFormik({
    //     initialValues: {
    //         recovery: ""
    //     },
    //     validateOnBlur: false,
    //     validateOnChange: false,
    //     onSubmit: (values) => {
    //         console.log(values)
    //     }
    // })
    // console.log(formik.errors)
    // useEffect(() => [
    //     generateOTP(username).then((OTP) => {
    //         console.log("otppppppppppppp", OTP, username)
    //         if (OTP) {
    //             toast.success("OTP has been send to your email")
    //         }
    //         return toast.error("problem while generating OTP")
    //     })
    // ], [username])

    async function onSubmit(e) {
        e.preventDefault();
        try {
            let { status } = await verifyOTP({ username, code: OTP })
            if (status === 201) {
                toast.success("Verify Successfully")
                return navigate("/reset")
            }

        } catch (err) {

            return toast.error("wrong OTP ! check email address")
        }
    }
    function resendOTP() {
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise, {
            loading: "Sending...",
            success: <b>OTP has been send to your email</b>,
            error: <b>could not sent !</b>
        })
        sendPromise.then((OTP) => {
            console.log(OTP)
        })
    }

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            {console.log(OTP)}
            <form onSubmit={onSubmit}>

                <label htmlFor='username'>Recovery</label>
                <h4>Enter 6 digit otp sent to email adress</h4>
                <input onChange={(e) => setOTP(e.target.value)} type="number" name="recovery" placeholder="enter otp to reset passwoed" />
                <button className='btn btn-primary' type="submit">SIGN In</button>

            </form>
            <div>
                <span>can't get otp ? <button onClick={resendOTP}>Resend</button></span>
            </div>


        </div>
    )


}

export default Recovery