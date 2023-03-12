import "./style/ParticipantsContainer.css"

export default function SideProfileView({ profile }) {

    return (
        <div className={"side-profile-view-container"}>
            { profile.profilePicture ? 
                <div className={"small-side-profile-icon"}>
                    <img src={profile.profilePicture} alt="profile"/>
                </div> 
                : <></>
            }
            <text className="profile-icon-name">{profile.firstName}</text>

        </div>
    )

}