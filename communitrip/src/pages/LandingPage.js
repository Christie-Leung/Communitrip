import NavBar from "../components/NavBar";

export default function LandingPage() {

    return (
        <>
            <div className="window-container" style={{
                    backgroundColor: "white",
                    overflowY: "scroll",
                    overflowX: "hidden",
                }}>
                <div className="view">
                    <div className="header-container">
                        <NavBar page={"home"}/>
                    </div>
                </div>
            </div>
        </>
    )
}