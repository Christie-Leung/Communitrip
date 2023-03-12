import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { db } from "../setup/Firebase-config";
import "./style/SignUpPage.css"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { uuidv4 } from "@firebase/util";


export default function SignUpPage({ IsAuth, setIsAuth }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pronouns, setPronouns] = useState("");

    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [aboutMe, setAboutMe] = useState("");
    const [interests, setInterests] = useState("");

    const [status, setStatus] = useState("");

    const [isValid, setIsValid] = useState(true);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const [canSubmit, setCanSubmit] = useState(true);

    const [userUID, setUserUID] = useState(null);

    let navigate = useNavigate();

    const handleEmailCheck = (event) => {
        const input = event.target.value;
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        setEmail(input);
        const isValidEmail = regex.test(input);
        setIsValid(isValidEmail);
        if (isValidEmail) {
            handleInputChange();
        }
    };

    const handlePhoneChange = (event) => {
        let input = event.target.value;
        // Remove all non-digits
        input = input.replace(/\D/g, "");
        // Format the phone number
        input = input.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        setPhoneNum(input);
        handleInputChange();
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

    const userCollectionRef = collection(db, "Users");
    const uuid = uuidv4();

    const createUser = async (uid) => {
        await addDoc(userCollectionRef,
            {
                id: uid,
                firstName: firstName,
                lastName: lastName, 
                pronouns: pronouns, 
                emailAddress: email,
                phoneNumber: phoneNum,
                aboutMe: aboutMe, 
                interests: interests,
                status: status,
                events: [],
                profilePicture: file
            }
        )
    }

    const handleInputChange = () => {
        const allFieldsFilled = 
            firstName && lastName && email && phoneNum && password
        setCanSubmit(!allFieldsFilled);
    }

    const handlePasswordCheck = (event) => {
        const validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(event.target.value)
        setIsValid(validPassword);
        if (!validPassword) {
            setError("Please ensure your password is 8 characters long and includes atleast one uppercase letter, one number, and a special character. ")
        }
    }

    const handleUserAuth = () => {
        const auth = getAuth();
        if (!error) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                //Signed in
                const user = userCredentials.user;
                setUserUID(user.uid);
                createUser(user.uid);
                localStorage.setItem("isAuth", true);
                setIsAuth(true);
                navigate(`/profile/${user.uid}`);
            })
            .catch((error) => {
                setError(`${error.code} - ${error.message}`)
            })
        }
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
                        <NavBar page={"signup"} IsAuth={IsAuth}/>
                    </div>
                    <div className="create-profile-full-container">
                        <div className="create-profile-left-container">
                            <img src={image} className="profile-picture-container" alt=""/>
                            <div className="profile-status-container">
                                <input className="profile-upload-picture" type="file" onChange={handleFileInputChange}/>
                            </div>
                            { error ?
                                    <>
                                        <text className="profile-invalid">{error}</text>
                                    </> : <></>
                                }
                            <div className="profile-status-container">
                                <input className="profile-status-input" type="text" 
                                    placeholder="Add a Custom Status!"
                                    onChange={(event) => {
                                        setStatus(event.target.value);
                                    }}></input>
                            </div>
                            
                        </div>
                        <div className="create-profile-right-container">
                        
                            <div className="profile-input-container">
                                <input className="profile-input" type="text" placeholder="First Name*"
                                    onChange={(event) => {
                                        setFirstName(event.target.value);
                                        handleInputChange();
                                    }}></input>

                                <input className="profile-input" type="text" placeholder="Last Name*"
                                    onChange={(event) => {
                                        setLastName(event.target.value);
                                        handleInputChange();
                                    }}></input>
                            </div>
                            <div className="profile-input-container">
                                <input className="profile-input" type="text" placeholder="Pronouns"
                                    onChange={(event) => {
                                        setPronouns(event.target.value);
                                    }}></input>

                                <input className="profile-input" type="tel" 
                                    placeholder="(111) 111-1111*"
                                    value={phoneNum}
                                    onChange={handlePhoneChange}></input>
                            </div>
                            <div className="profile-input-container">
                                <input style={{ width: "90%" }}
                                className="profile-input" type="email" placeholder="user@gmail.com*" 
                                    onChange={(event) => {
                                        setEmail(event.target.value)
                                        handleInputChange();
                                    }}></input>
                            </div>
                            <div className="profile-input-container">
                                <input style={{ width: "90%" }}
                                className="profile-input" type="password" placeholder="Password*" 
                                    onChange={(event) => {
                                        setPassword(event.target.value)
                                        handleInputChange();
                                    }}></input>
                            </div>
                            {isValid ? 
                                    <></> :
                                    <text className="profile-invalid">Invalid email address entered</text>
                            }
                            <div className="seperator"/>
                            <div className="profile-long-input-container">
                                <label className="profile-input-label">About Me</label>
                                <textarea className="profile-long-input" placeholder="Introduce yourself and tell us what you enjoy doing!" 
                                    style={{ minHeight: "min(10vw, 20vh)" }}
                                    onChange={(event) => {
                                        setAboutMe(event.target.value);
                                    }}/>
                            </div>
                            <div className="profile-long-input-container">
                                <label className="profile-input-label">Interests</label>
                                <textarea className="profile-long-input" placeholder="Share your interests and hobbies!" 
                                    style={{ minHeight: "min(10vw, 20vh)" }}
                                    onChange={(event) => {
                                        setInterests(event.target.value);
                                    }}/>
                            </div>
                            <div style={{ display: "flex", justifyContent: "end", marginTop: "4vh"}}>
                                <button type="submit" className="profile-sign-up-button"
                                    onClick={(event) => {
                                        handlePasswordCheck(event);
                                        handleEmailCheck(event);
                                        if (!error) {
                                            handleUserAuth();
                                        }
                                    }}
                                    disabled={canSubmit}
                                    alt={""}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}