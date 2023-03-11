import "./style/LoginPage.css"
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../setup/Firebase-config";
import NavBar from "../components/NavBar";

export default function LogInPage({ IsAuth, setIsAuth }) {


    let navigate = useNavigate();
    console.log(IsAuth);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            
            navigate("/");
        })
    }

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            navigate("/");
        })
        
    }

    return (
        <>
            <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
            }}>
                <div className="view">
                    <div className="header-container">
                        <NavBar page={"login"} IsAuth={IsAuth}/>
                    </div>
                    <div class="users-login-container">
                        <form class="users-login-form">
                            <button id="login-google-button" onClick={signInWithGoogle}><svg class="active" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                                    <g>
                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                        <path fill="none" d="M0 0h48v48H0z"></path>
                                    </g>
                                </svg><span class="icon-loading"></span> <span>Sign in with Google</span></button>

                            <div className="or-seperator">
                                <text>or</text>
                            </div>
                            <label className={"login-input-label"}>Email</label>
                            <input type="email" class="login-input-form" name="email" placeholder="Your email" required />

                            <label className={"login-input-label"}>Password</label>
                            <input type="password" class="login-input-form" name="password" placeholder="Your password" required />
                            
                            <div class="login-checkbox-container">
                                <input type="checkbox" id="remember"/>
                                <label for="remember">Remember me</label>
                                <a href="#" className="login-forgot-password">Forgot Password</a>
                            </div>
                        
                            <p class="form-error"></p>

                            <div class="login-buttons-container">
                                <button type="submit" class="login-form-submit-button"><span class="icon-loading"></span>Log In</button>
                            </div>
                            <div class="login-no-account-container">
                                <text>Don't have an account? </text>
                                <Link to={"/signup"}>
                                    <button type="submit" class="login-sign-up-text" ><span class="icon-loading"></span>Sign Up</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}