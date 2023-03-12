import "./style/ParticipantsContainer.css"

export default function SideProfileView({ profile, profileStyle, textStyle }) {

    if (profile === "1" || profile === "2") {
        return (
            <div className={"side-profile-view-container"} style={profileStyle}>
            { profile === "1" ? 
            <>
                <div className={"small-side-profile-icon-container"} >
                    <img className={"small-side-profile-icon"} src={require("../assets/images/spiderman.png")} alt="profile"/>
                </div> 
                <div className="profile-icon-name-container">
                    <text className="profile-icon-name" style={textStyle}>Spiderman</text>
                </div>
                </>
                : 
                <>
                <div className={"small-side-profile-icon-container"}>
                    <img className={"small-side-profile-icon"} src={require("../assets/images/batman.png")} alt="profile"/>
                </div> 
                <div className="profile-icon-name-container">
                    <text className="profile-icon-name" style={textStyle}>Batman</text>
                </div>
                </>
            }

        </div>
        )
    }

    if (profile === "bot") {
        return (
            <div className={"side-profile-view-container"} style={profileStyle}>
                <div className={"small-side-profile-icon-container"}>
                    <img className={"small-side-profile-icon"} src={require("../assets/images/plane_logo.png")} alt="profile"/>
                </div> 
                <div className="profile-icon-name-container">
                    <text className="profile-icon-name" style={textStyle}>CommuniTrip AI</text>
                </div>
            </div>
        )
    }

    return (
        <div className={"side-profile-view-container"} style={profileStyle}>
            { profile.profilePicture ? 
                <div className={"small-side-profile-icon-container"}>
                    <img className={"small-side-profile-icon"} src={profile.profilePicture} alt="profile"/>
                </div> 
                : <div className={"small-side-profile-icon-container"}>
                    <img className={"small-side-profile-icon"} src={require("../assets/images/spiderman.png")} alt="profile"/>
                </div> 
            }
            <div className="profile-icon-name-container">
                <text className="profile-icon-name" style={textStyle}>{profile.firstName}</text>
            </div>
        </div>
    )

}