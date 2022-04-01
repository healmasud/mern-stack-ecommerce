import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  const success = useSelector((state) => state.user.success);
  useEffect(() => {
    if (success) history.push("/");
  }, [success]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.0)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{ color: "#4889c2", fontSize: "80px", fontWeight: "normal" }}
        >
          Admin Panel
        </h1>
        <input
          style={{
            padding: 10,
            marginBottom: 20,
            width: "20%",
            border: "2px solid #4889c2",
            outline: "none",
          }}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{
            padding: 10,
            marginBottom: 20,
            width: "20%",
            border: "2px solid #4889c2",
            outline: "none",
          }}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          style={{
            padding: 10,
            width: 120,
            border: "2px solid #4889c2",
            cursor: "pointer",
            backgroundColor: "#4889c2",
            color: "white",
            fontWeight: "600",
          }}
        >
          Login
        </button>
        {error && <span style={{ marginTop: "10px" }}>Wrong Details !</span>}
      </div>
    </div>
  );
};

export default Login;
