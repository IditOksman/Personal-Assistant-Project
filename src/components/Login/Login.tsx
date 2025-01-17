import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import chroma from "chroma-js";

export default function LoginPage() {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const startColor = "#FFFF22"; // Red
  const endColor = "#2222FF"; // Blue
  const numberOfSteps = 5;
  // const interpolatedColors = getHCLInterpolatedColors(
  //   startColor,
  //   endColor,
  //   numberOfSteps
  // );
  const gradient = chroma
    .scale([startColor, endColor])
    .mode("hcl")
    .colors(numberOfSteps);
  const CSSGradient = {
    background: `linear-gradient(to right, ${gradient.join(", ")})`,
  };
  // console.log(gradient);

  // function getHCLInterpolatedColors(
  //   color1: string,
  //   color2: string,
  //   steps: number
  // ): string[] {
  //   const startColor = chroma(color1);
  //   const endColor = chroma(color2);

  //   // Convert to HCL
  //   const startHCL = startColor.hcl();
  //   const endHCL = endColor.hcl();

  //   const colors: string[] = [];

  //   for (let i = 0; i < steps; i++) {
  //     const ratio = i / (steps - 1 + 5);

  //     // Interpolate HCL values
  //     const h = startHCL[0] + (endHCL[0] - startHCL[0]) * ratio;
  //     const c = startHCL[1] + (endHCL[1] - startHCL[1]) * ratio;
  //     const l = startHCL[2] + (endHCL[2] - startHCL[2]) * ratio;

  //     // Convert back to hex
  //     const color = chroma.hcl(h, c, l).hex();
  //     colors.push(color);
  //   }

  //   return colors;
  // }

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

  const handleSubmit = (e: React.FormEvent) => {
    console.log("-1");

    e.preventDefault();
    console.log("0");

    if (emailRef.current === null || passwordRef.current === null) return;

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log("1");

    if (loginData.email.trim() !== "" && loginData.password.trim() !== "") {
      console.log("2");
      navigate("/Home");
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
