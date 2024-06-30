import React, { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import s from "../styles/singIn.module.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      const { access_token, refresh_token } = response.data.body;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      navigate("/me");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.signIn_container}>
        <div className={s.signIn_block}>
          <form className={s.form_container} onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className={s.input_email}>
              <label>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className={s.input_password}>
              <label>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button className={s.signIn_btn} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className={s.switchCase_login_container}>
          <div className={s.login_container}>
            <h2>Welcome to login</h2>
            <p>Don't have an account?</p>
            <button onClick={navigateToSignUp} className={s.signUp_btn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
