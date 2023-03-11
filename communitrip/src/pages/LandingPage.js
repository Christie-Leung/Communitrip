import NavBar from "../components/NavBar";

export default function LandingPage({ IsAuth }) {

    return (
        <>
            <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
                }}>
                    <NavBar IsAuth={IsAuth}/>

            </div>
        </>
    )
}