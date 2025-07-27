import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import chroma from "chroma-js";

export default function LoginPage() {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const startColor = "#db146a"; // Red
  const endColor = "#2222FF"; // Blue
  const numberOfSteps = 3;

  const gradient = chroma
    .scale([startColor, endColor])
    .mode("hcl")
    .colors(numberOfSteps);
  const CSSGradient = {
    background: `linear-gradient(to right, ${gradient.join(", ")})`,
  };

  function onEmailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (emailRef.current) {
      emailRef.current.value = event.target.value;
      console.log("email");
    }
  }

  function onPasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (passwordRef.current) {
      passwordRef.current.value = event.target.value;
      console.log("password");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailRef.current === null || passwordRef.current === null) return;

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (loginData.email.trim() !== "" && loginData.password.trim() !== "") {
      try {
        const response = await fetch(
          "http://localhost:3000/api/validate-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.success) {
          console.log("Login successful");
          navigate("/Home");
        } else {
          console.log("Login failed:", result.message);
          // Handle login failure (show error message, etc.)
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle error (show error message, etc.)
      }
    }
  };

  return (
    <div className={classes.login} style={CSSGradient}>
      <div className={classes.headerContainer}>
        <h2 className={classes.header}>Login Page</h2>
      </div>
      <div className={classes.detailsContainer}>
        <form onSubmit={handleSubmit}>
          <div className={classes.details}>
            <div className={classes.email}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                onChange={onEmailHandler}
              />
            </div>
            <div className={classes.password}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                onChange={onPasswordHandler}
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
