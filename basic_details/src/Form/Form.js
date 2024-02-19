import React from 'react'
import { useFormik } from 'formik'
import { signupSchema } from '../Schemas'
const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
}

const Form = () => {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        onSubmit: (values, action) => {
            console.log(values)
            action.resetForm()
        }

    })
    console.log(errors)
    return (
        <form onSubmit={handleSubmit}>
            <lable>Name:</lable>
            <input type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
            {errors.name && touched.name ? <p>{errors.name}</p> : null}
            <lable>Email:</lable>
            <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
            {errors.email && touched.email ? <p>{errors.email}</p> : null}
            <lable>Password:</lable>
            <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            {errors.password && touched.password ? <p>{errors.password}</p> : null}
            <lable>Confirm Password:</lable>
            <input type="password" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} />
            {errors.confirmpassword && touched.confirmpassword ? <p>{errors.confirmpassword}</p> : null}
            <button type="button">Register Now</button>
        </form>
    )
}

export default Form