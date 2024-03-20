import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from '../App/App';

const PrivateRoute = (() => {
    const context = useContext(AppContext);
    if (context) {
        return <Outlet />;
    } else {
        return <Navigate to="/"/>
    }
})

export default PrivateRoute;