import { useState } from "react";
import { Navbar } from "@/components/commons/Navbar";

export default function AuthPage() {
  const [active, setActive] = useState(false);  
  

  return (<>
  <Navbar />
      <div className={`auth-container ${active ? "active" : ""}`}>
      
      {/* LOGIN */}
      <div className="form-box login">
        <form>
          <h1>Login</h1>

          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="btn">Login</button>

          <p>or login with social platforms</p>

          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
            <a href="#"><i className="bx bxl-github"></i></a>
            <a href="#"><i className="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      {/* REGISTER */}
      <div className="form-box register">
        <form>
          <h1>Registration</h1>

          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn">Register</button>

          <p>or register with social platforms</p>

          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
            <a href="#"><i className="bx bxl-github"></i></a>
            <a href="#"><i className="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      {/* TOGGLE */}
      <div className="toggle-box">
        
        <div className="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Don't have an account?</p>

          <button
            className="btn register-btn"
            type="button"
            onClick={() => setActive(true)}
          >
            Register
          </button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>Hello, Welcome!</h1>
          <p>Already have an account?</p>

          <button
            className="btn login-btn"
            type="button"
            onClick={() => setActive(false)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
