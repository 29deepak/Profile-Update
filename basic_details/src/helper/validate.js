
import toast from 'react-hot-toast'

/** validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors;
}
// VALIDATE PASSWORD 
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);

    return errors;
}/** resert validate */
export async function resetPasswordValidate(values) {
    const errors = passwordVerify({}, values);
    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("passsword not match")
    }

    return errors;
}
/** Registration validation  */
export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}
/**validate username */
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Required...!');
    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}

function passwordVerify(error = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        error.password = toast.error("password required")
    }
    else if (values.password.includes(" ")) {
        error.password = toast.error("wrong password")
    }
    else if (values.password.length < 4) {
        error.password = toast.error("password must be more than four characters")
    }
    else if (!specialChars.test(values.password)) {
        error.password = toast.error("Password must have specialcharacters")
    }
    return error
}
/** validate reset password */

/** validate profile page */
export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    // mobileVerify(errors, values)
    return errors;
}
// function mobileVerify(error = {}, values) {
//     if (values.mobilenumber.length !== 10) {
//         error.mobilenumber = toast.error("please check the mobile number")
//     }
// }

/** validate email */
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}