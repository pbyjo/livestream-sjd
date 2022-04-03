import { useMyAuth } from "../context/authContext"
import { Navigate } from "react-router-dom"
import { Fragment } from "react"

import Loading from "@components/Loading.jsx"

const ProtectedRoute = ({children}) => {
    const {user, loading} = useMyAuth()

    if(loading) return <Loading />
    if(!user) return <Navigate to="/register" />

    return <Fragment>{children}</Fragment>
}

export default ProtectedRoute