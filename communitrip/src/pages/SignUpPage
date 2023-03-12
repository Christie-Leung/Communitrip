import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./style/SignUpPage.css"

export default function SignUpPage({ IsAuth, setIsAuth }) {

    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const handleEmailChange = (event) => {
        const input = event.target.value;
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        setEmail(input);
        setIsValid(regex.test(input));
    };

    const handlePhoneChange = (event) => {
        let input = event.target.value;
        // Remove all non-digits
        input = input.replace(/\D/g, "");
        // Format the phone number
        input = input.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        setPhoneNum(input);
    }

    const handleFileInputChange = (event) => {

        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);

        let selected = event.target.files[0];
        const types = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg']

        if (selected && types.includes(selected.type)) {
            setFile(file);
        } else {
            setFile(null);
            setError('Please select a valid image file type (png / jpeg / webp / jpg)');
        }
      };

    return (
        <>
         <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
            }}>
                <div className="view">
                    <div className="header-container">
                        <NavBar page={"signup"} IsAuth={IsAuth}/>
                    </div>
                    <div className="create-profile-full-container">
                        <div className="create-profile-left-container">
                            <img src={image} className="profile-picture-container" alt=""/>
                            <div className="profile-status-container">
                            <label htmlFor="profile-image-input" className="custom-file-upload">
                                Upload Image
                            </label>
                                <input id="profile-image-input" className="profile-upload-picture" type="file" onChange={handleFileInputChange}/>
                            </div>
                            { error ?
                                    <>
                                        <text className="profile-invalid">{error}</text>
                                    </> : <></>
                                }
                            <div className="profile-status-container">
                               <input className="profile-status-input" type="text" placeholder="Add a Custom Status!"></input>
                            </div>
                            
                        </div>
                        <div className="create-profile-right-container">
                        
                            <div className="profile-input-container">
                                <input className="profile-input" type="text" placeholder="First Name"></input>

                                <input className="profile-input" type="text" placeholder="Last Name"></input>
                            </div>
                            <div className="profile-input-container">
                                <input className="profile-input" type="text" placeholder="Pronouns"></input>

                                <input className="profile-input" type="tel" 
                                    placeholder="(111) 111-1111"
                                    onChange={handlePhoneChange}
                                    value={phoneNum}></input>
                            </div>
                            <div className="profile-input-container">
                                <input style={{ width: "90%" }}
                                className="profile-input" type="email" value={email} placeholder="user@gmail.com" onChange={handleEmailChange}></input>
                            </div>
                            {isValid ? 
                                    <></> :
                                    <text className="profile-invalid">Invalid email address entered</text>
                            }
                            <div className="seperator"/>
                            <div className="profile-long-input-container">
                                <label className="profile-input-label">About Me</label>
                                <textarea className="profile-long-input" placeholder="Introduce yourself and tell us what you enjoy doing!" style={{ minHeight: "min(10vw, 20vh)" }}/>
                            </div>
                            <div className="profile-long-input-container">
                                <label className="profile-input-label">Interests</label>
                                <textarea className="profile-long-input" placeholder="Share your interests and hobbies!" style={{ minHeight: "min(10vw, 20vh)" }}/>
                            </div>
                            <div style={{ display: "flex", justifyContent: "end"}}>
                                <Link to={`/profile/{id}`}>
                                    <button type="submit" className="profile-sign-up-button">Sign Up</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}