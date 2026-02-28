import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { broadcastLogin } from "../utils/broadcastChannel";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(broadcastLogin());
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2 className="title">Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
