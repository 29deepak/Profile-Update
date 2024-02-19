
import * as Yup from "yup";
const password = "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$"
export const signupSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("please enter your name"),
    email: Yup.string().email().required("please Enter your Email"),
    password: Yup.string().min(6).required('Please Enter your password').matches(password, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    confirmpassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match")
})