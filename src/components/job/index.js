import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import Icons from "../../assets/icons";
import "./styles.css";
const { FileIcon } = Icons;
const Index = ({ job, index }) => {
    const matches = useMediaQuery("(max-width:550px)");

    const { dark } = useContext(ThemeContext);
    const { title, subTitle, description, skills, applications, rating, portfolio, hourlyRate } = job;
    return (
        <div className="job-container" key={index}>
            <div className="job-title-container">
                <h1 className={dark ? "job-title white-text" : "job-title"}>{title}</h1>
                <div className={dark ? "job-hourly-rate job-hourly-rate-dark" : "job-hourly-rate"}>
                    ${hourlyRate} <span className={dark ? "job-hours white-text" : "job-hours"}>/ hour</span>
                </div>
            </div>
            <h3 className={dark ? "job-subTitle white-text" : "job-subTitle"}>{subTitle}</h3>
            <p className={dark ? "job-desc white-text" : "job-desc"}>{description}</p>
            <div className="job-skills">
                {(matches ? getFirstAndLast(skills) : skills).map((e) => (
                    <div className={dark ? "container-List-desc container-List-desc-dark" : "container-List-desc"} key={e}>
                        {e}
                    </div>
                ))}
            </div>
            {portfolio?.length > 0 && (
                <div className="job-portfolio-container">
                    {portfolio.map((img) => (
                        <img loading="lazy" alt='' src={img} key={img} className="job-portfolio-img" />
                    ))}
                </div>
            )}
            <div className="job-hr" />
            <div className="job-title-container">
                <div className="job-appli-container">
                    <img alt='' src={FileIcon} />
                    <p className={dark ? "job-appli white-text" : "job-appli"}>{applications}</p> Applications
                </div>
                <div className="job-appli-container">
                    <p className={dark ? "job-appli white-text" : "job-appli"}>{rating} / 5</p> Rating
                </div>
            </div>
        </div>
    );
};

export default Index;

const getFirstAndLast = (arr) => [arr[0], arr[arr?.length - 1]];
