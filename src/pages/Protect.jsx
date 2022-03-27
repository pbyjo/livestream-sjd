import { useMyAuth } from "../context/authContext"
import { Navigate } from "react-router-dom"
import { Fragment } from "react"

const ProtectedRoute = ({children}) => {
    const {user, loading} = useMyAuth()

    if(loading) return <h1>Cargando...</h1>
    if(!user) return <Navigate to="/login" />

    return <Fragment>{children}</Fragment>
}

export default ProtectedRoute