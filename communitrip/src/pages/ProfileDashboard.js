import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { auth, db } from "../setup/Firebase-config";

export default function ProfileDashboard() {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pronouns, setPronouns] = useState("");

    const [phoneNum, setPhoneNum] = useState("");

    const [aboutMe, setAboutMe] = useState("");
    const [interests, setInterests] = useState("");

    const [status, setStatus] = useState("");

    const [isValid, setIsValid] = useState(true);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    const [canSubmit, setCanSubmit] = useState(true);

    const [userUID, setUserUID] = useState(null);

    const [user, setUser] = useState(null);
    const isAuth = localStorage.getItem("isAuth");
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    
    if (!localStorage.getItem("isAuth")) {
        navigate("login");
    }
    const usersCollectionRef = collection(db, "Users")


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
            uploadImage();
        } else {
            setFile(null);
            setError('Please select a valid image file type (png / jpeg / webp / jpg)');
        }
    };

    const handleInputChange = () => {
        const allFieldsFilled = 
            firstName && lastName && phoneNum 
        setCanSubmit(!allFieldsFilled);
    }

    const updateUserProfile = async () => {
        const userRef = doc(db, "Users", user.docID);

        await updateDoc(userRef, {
            firstName: firstName,
            lastName: lastName,
            aboutMe: aboutMe,
            interests: interests,
            profilePicture: url,
            status: status,
            pronouns: pronouns
        })
        setEdit(false);
        navigate("/");
        navigate(`/profile/${localStorage.getItem("userUID")}`)
    }

    const [url, setUrl] = useState("");

    const uploadImage = () => {
        console.log(file);

        const storage = getStorage();

        const storageRef = ref(storage, `/profilePictures/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('uploaded file')
        }, (err) => {
            setError(err);
        }, async() => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
            console.log(url);
        })
    }

    useEffect(() => {
        const getUser = async () => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUserUID(user.uid);
                    localStorage.setItem("userUID", userUID)
                }
            });

            const q = query(usersCollectionRef, where("id", "==", localStorage.getItem("userUID")));
            const doc_refs = await getDocs(q);

            const res = []
            
            doc_refs.forEach((doc) => {
                res.push({
                    docID: doc.id,
                    ...doc.data()
                })
            })
            setUser(res[0]);
            if (user) {
                setLoading(false);
            }
        };
        getUser();
    })

    return (
        <>
        { loading ? <></> :
             <>
             { !edit ? 
                 <div className="window-container" style={{
                             backgroundColor: "white",
                             overflowY: "scroll",
                             overflowX: "hidden",
                     }}>
                         <div className="view">
                             <div className="header-container">
                                 <NavBar page={"signup"}/>
                             </div>
                             <div className="create-profile-full-container">
                                 <div className="create-profile-left-container">
                                     <img src={user ? user.profilePicture : ""} 
                                        className="profile-picture-container" 
                                        alt=""
                                        style={ user.proflePicture ? { backgroundColor: "transparent" } : {}}/>
                                     <div className="profile-status-container">
                                         <text className="profile-status-input">{user ? user.status : ""}</text>
                                     </div>
                                     
                                 </div>
                                 <div className="create-profile-right-container">
                                 
                                     <div className="profile-input-container">
                                         <text className="profile-input">{user.firstName}</text>
 
                                         <text className="profile-input">{user.lastName}</text>
                                     </div>
                                     <div className="profile-input-container">
                                         <text className="profile-input">{user.pronouns ? user.pronouns : "Pronouns"}</text>
 
                                         <text className="profile-input">{user.phoneNumber}</text>
                                     </div>
                                     <div className="profile-input-container">
                                         <text style={{ width: "90%" }}
                                         className="profile-input">{user.emailAddress}</text>
                                     </div>
                                     <div className="seperator"/>
                                     { user.aboutMe ? 
                                         <div className="profile-long-input-container">
                                             <label className="profile-input-label">About Me</label>
                                             <text className="profile-long-input">{user.aboutMe}</text>
                                         </div>
                                         : <></>
                                     }
                                     { user.interests ?
                                         <div className="profile-long-input-container">
                                             <label className="profile-input-label">Interests</label>
                                             <text className="profile-long-input">{user.interests}</text>
                                         </div>
                                         : <></>
                                     }
 
                                     <div style={{ display: "flex", justifyContent: "end", marginTop: "4vh"}}>
                                         <button type="submit" className="profile-sign-up-button"
                                             onClick={(event) => {
                                                 setEdit(true);
                                                 setFirstName(user.firstName);
                                                 setLastName(user.lastName);
                                                 setPhoneNum(user.phoneNumber);
                                                 handleInputChange();
                                             }}
                                             alt={""}>Edit Profile</button>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
             :
            <div className="window-container" style={{
                backgroundColor: "white",
                overflowY: "scroll",
                overflowX: "hidden",
            }}>
                <div className="view">
                    <div className="header-container">
                        <NavBar page={"profile"}/>
                    </div>
                    <div className="create-profile-full-container">
                        <div className="create-profile-left-container">
                            <img src={image} className="profile-picture-container" alt=""
                                style={ image ? { backgroundColor: "transparent" } : {}}/>
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
                                    value={firstName}
                                    onChange={(event) => {
                                        setFirstName(event.target.value);
                                        handleInputChange();
                                    }}></input>

                                <input className="profile-input" type="text" placeholder="Last Name*"
                                    value={lastName}
                                    onChange={(event) => {
                                        setLastName(event.target.value);
                                        handleInputChange();
                                    }}></input>
                            </div>
                            <div className="profile-input-container">
                                <input className="profile-input" type="text" 
                                    placeholder={user.pronouns ? user.pronouns : "Pronouns"}
                                    value={pronouns}
                                    onChange={(event) => {
                                        setPronouns(event.target.value);
                                    }}></input>

                                <input className="profile-input" type="tel" 
                                    placeholder="(111) 111-1111*"
                                    value={phoneNum}
                                    onChange={(event) => {
                                        setPhoneNum(event.target.value)
                                        handlePhoneChange()
                                    }}></input>
                            </div>
                            <div className="profile-input-container">
                                <input style={{ width: "90%" }} value={user.emailAddress}
                                className="profile-input" type="email" placeholder="user@gmail.com*"></input>
                            </div>
                            <div className="seperator"/>
                            <div className="profile-long-input-container">
                                <label className="profile-input-label">About Me</label>
                                <textarea className="profile-long-input" placeholder="Introduce yourself and tell us what you enjoy doing!" 
                                    style={{ minHeight: "min(10vw, 20vh)" }}
                                    value={user.aboutMe ? user.aboutMe : ""}
                                    onChange={(event) => {
                                        setAboutMe(event.target.value);
                                    }}/>
                            </div>
                            <div className="profile-long-input-container">
                                <label className="profile-input-label">Interests</label>
                                <textarea className="profile-long-input" placeholder="Share your interests and hobbies!" 
                                    style={{ minHeight: "min(10vw, 20vh)" }}
                                    value={user.interests ? user.interests : ""}
                                    onChange={(event) => {
                                        setInterests(event.target.value);
                                    }}/>
                            </div>
                            <div style={{ display: "flex", justifyContent: "end", marginTop: "4vh"}}>
                                <button type="submit" className="profile-sign-up-button"
                                    onClick={(event) => {
                                        updateUserProfile()
                                    }}
                                    disabled={canSubmit}
                                    alt={""}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             }
             </>
        }
        </>

    )
}