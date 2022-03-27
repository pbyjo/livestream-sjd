import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

/* Components */
import Header from '@components/Header.jsx'
import Layout from '@containers/Layout.jsx'
import ProtectedRoute from '@pages/Protect.jsx';

/* Páginas */
import Home from '@pages/Home.jsx'
import Login from '@pages/Login.jsx'
import SignUp from '@pages/SignUp.jsx'
import NotFound from '@pages/NotFound.jsx'

const MyRoutes = () => {
    return(
        <BrowserRouter>
            <Header />
            <Layout>
                <Routes>
                    <Route 
                        exact 
                        path='/' 
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )  
}

export default MyRoutes;