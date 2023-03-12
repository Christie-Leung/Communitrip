import React from "react";
import Banner from "./Banner";
import Card from "./Card";
import "./style/PageBody.css";

function PageBody() {
    return (
        <div className="body">
            <Banner/>
            <div className="cards">
                <Card
                    src="https://www.chrisistace.com/wp-content/uploads/2019/07/Pogo-Mountain_Hike-Vancouver-Island_Chris-Istace_feature-image.jpg"
                    title="Pogo Mountain Hike"
                    description="Daytrip hike near Vancouver. Looking for a group with experience or willingness to do a challenging hike near Vancouver!"/>
                <Card
                    src="https://media-cdn.tripadvisor.com/media/photo-s/1a/e4/81/dc/caption.jpg"
                    title="Cultural Tour of Dubai"
                    description="Weeklong trip to Dubai hopefully packed with exploration of the city sights and cultural experience."
                    />
                <Card
                    src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/10/22/09/isle-of-mull-scallop-cooked-overwood.jpg?width=1200&auto=webp&quality=75"
                    title="Core Michelin Restaurant"
                    description="Have reservations at Core restaurant but friends can't make it, don't want to go alone but don't want to cancel either"
                />
            </div>
        </div>
    )
}

export default PageBody;