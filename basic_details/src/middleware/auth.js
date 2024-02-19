import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children
}

export const ProtectRoute = ({ children }) => {
    const username = useSelector(store => store.auth).username
    console.log(username, "password")
    if (!username) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}