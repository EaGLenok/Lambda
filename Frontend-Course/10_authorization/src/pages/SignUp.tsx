import React, { useState } from "react";
import { signUp } from "../api/api";
import { useNavigate } from "react-router-dom";
import s from "../styles/signUp.module.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const navigateTosignUp = () => {
    navigate("/sign-in");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/sign-in");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.signUp_container}>
        <div className={s.signUp_block}>
          <form className={s.form_container} onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
            <button className={s.signUp_btn} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className={s.switchCase_register_container}>
          <div className={s.register_container}>
            <h2>Welcome to login</h2>
            <p>Have an account?</p>
            <button onClick={navigateTosignUp} className={s.signIn_btn}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
