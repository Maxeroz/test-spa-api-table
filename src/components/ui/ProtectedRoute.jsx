import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useLogin } from "../../features/authentication/useLogin";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate("/login");
    }
  }, [isAuth, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  return isAuth ? children : null;
}

export default ProtectedRoute;
