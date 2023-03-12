import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import NavBar from "../components/NavBar";

export default function ResetPassword() {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [err, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setSuccess("Successfully sent!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(`${errorCode} - ${errorMessage}`);
        });
    }

    return (
         <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
            }}>
                <div className="view">
                    <div className="header-container">
                        <NavBar page={"login"}/>
                    </div>
                    <div className="users-login-container">
                        <form className="users-login-form">
                            <label className={"login-input-label"}>Email</label>
                            <input type="email" class="login-input-form" 
                                name="email" placeholder="Your email" 
                                required
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }} />

                            <div className="login-buttons-container">
                                <button type="submit" className="login-form-submit-button" onClick={handleResetPassword}>Send Reset Password Email</button>
                            </div>
                            { err ? 
                                <text className="profile-invalid">{err}</text>
                                : <></>
                            }
                            { success ? 
                                <text style={{ color: "##4BB543"}}>{success}</text>
                                : <></>
                            }
                        </form>
                </div>
            </div> 
        </div>
    )
}