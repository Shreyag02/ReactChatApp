import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store/reducers";

const PrivateRoute = () => {
  const { authData } = useSelector((state: RootState) => state.user);

  return authData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
