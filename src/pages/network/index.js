import React, { useContext } from "react";
import { Grid } from "@mui/material";
import ThemeContext from "../../context/ThemeContext";
import Rating from "@mui/material/Rating";
import "./styles.css";
import UserNetwork from "../../components/uesr-network";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/HELPER";

function formatNumber(number = 0) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(0) + "m";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(0) + "k";
    }
    return number.toString();
}
const Index = () => {
    const starColor = "#8077F6";
    const { dark } = useContext(ThemeContext);
    const { selectedProfile } = useSelector(store => store.mainReducer)
    const navigate = useNavigate();
    React.useEffect(() => {
        if (selectedProfile === null) { navigate('/') }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <UserNetwork user={selectedProfile} />
            <Grid item container spacing={2} marginTop={3}>
                <Grid item xs="12" sm="12" md="3" lg="3">
                    <div className={dark ? "network-container dark-border" : "network-container"}>
                        <div>
                            <h1 className={dark ? "network-title white-text" : "network-title"}>${formatNumber(selectedProfile?.revenue)}</h1>
                            <h3 className={dark ? "network-subTitle white-text" : "network-subTitle"}>Total Earnings</h3>
                        </div>
                        <div>
                            <h1 className={dark ? "network-title white-text" : "network-title"}>{selectedProfile?.jobs?.completed}</h1>
                            <h3 className={dark ? "network-subTitle white-text" : "network-subTitle"}>Total Jobs</h3>
                        </div>
                    </div>
                </Grid>
                <Grid item xs="12" sm="12" md="9" lg="9">
                    {selectedProfile?.services.map(gig => <div key={gig._id}>
                        <div className={dark ? "network-detail-container dark-border" : "network-detail-container"}>
                            <h1 className={dark ? "network-detail-title white-text" : "network-detail-title"}>{gig.title}</h1>
                            <h3 className="commentDesc-title">
                                {gig.description}
                            </h3>
                        </div>
                        <div className={dark ? "network-detail-container dark-border" : "network-detail-container "}>
                            <h1 className={dark ? "network-detail-title white-text" : "network-detail-title"}>Reviews</h1>
                            {gig?.comments?.map((review, index) => (
                                <div key={index}>
                                    <h3 className={dark ? "network-detail-sub_title white-text" : "network-detail-sub_title"}>{review.projectHeading}</h3>
                                    <div className={dark ? "network-detail-stats white-text" : "network-detail-stats"}>
                                        <span className="network-star">
                                            <Rating name="read-only" value={review.rated} readOnly sx={{ "& .MuiRating-iconFilled": { color: starColor, fontSize: 15 } }} />
                                        </span>
                                        <span>{review.rated} out of 5 star . </span>
                                        <span>{formatDate(review.commentDate, false)}</span>
                                    </div>
                                    <h3 className="commentDesc-title">
                                        {review.description}
                                    </h3>
                                    <div className={dark ? "network-detail-statsPrice white-text" : "network-detail-statsPrice"}>
                                        <span className="network-outcome">${review.price} </span>
                                        <span>
                                            ${selectedProfile.hourlyRate}/<span className="network-outcome_hour">hour</span>
                                        </span>
                                    </div>
                                    {index === 0 && <div className={dark ? "network-break-line network-break-line-dark" : "network-break-line"}></div>}
                                </div>
                            ))}
                        </div>
                        <div className={dark ? "img-container dark-border " : "img-container"}>
                            <h1 className={dark ? "network-detail-title white-text" : "network-detail-title"} style={{ paddingLeft: "11px" }}>
                                Portfolio
                            </h1>
                            <div className="network-container-img">
                                {gig?.profile.map((img) => (
                                    <img loading="lazy" alt={img} src={img} className="list-image-style " key={img} />
                                ))}
                            </div>
                        </div>
                    </div>)}
                </Grid>
            </Grid>
        </>
    );
};

export default Index;
