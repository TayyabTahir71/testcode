import ThemeContext from "../../context/ThemeContext";
import React, { useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux"
import "./styles.css";
import { ACTIVE_TAB_Filter, ACTIVE_TAB_Filter_JOB } from "../../RTK/Reducers/Reducers";

const imageLeft = () => {
    return (
        <>
            <svg width="48" height="91" viewBox="0 0 48 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M46.9419 8.14547C48.6 7.17764 48.0573 6.79406 47.0293 5.1106C44.7545 1.38531 35.2512 -3.3588 19.5277 3.44931C7.04265 8.85513 -5.39109 24.2839 -14 37.4522C-6.79391 55.026 -5.18357 73.3194 -4.67498 91C1.79126 71.0644 15.7139 26.3738 46.9419 8.14547Z"
                    fill="black"
                    fill-opacity="0.04"
                />
            </svg>
        </>
    );
};
const image2Left = () => {
    return (
        <>
            <svg width="106" height="70" viewBox="0 0 106 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M-3.92548 67.0699C-3.93431 69.4978 -3.88627 68.6399 -4 82.3101C0.621769 83.0231 3.73646 84.0815 7.29765 80.1806C17.8998 68.2937 29.288 57.1569 41.3829 46.8481C42.4785 45.9396 42.4959 45.8149 41.6706 44.6476C39.0608 40.9566 36.6041 37.8648 34.3395 34.2865C34.029 33.796 34.5956 33.245 35.1191 33.2176C40.708 33.3221 46.1405 35.1108 50.7286 38.3573C51.6365 38.9444 51.606 38.945 52.4911 38.3228C58.0579 34.3616 63.9427 30.8837 70.0833 27.9261C71.5535 27.2284 71.6265 26.9665 70.7486 25.5792C68.5493 22.1038 66.1395 19.1825 63.5541 14.5477C63.3758 14.0274 64.014 13.6143 64.5878 13.6139C70.577 13.6101 76.2959 16.9701 82.5413 22.3306C83.2165 22.9102 83.1451 22.8948 83.9967 22.6546C90.577 20.7829 97.3715 19.8022 104.204 19.7379C106.119 19.7206 106.235 19.0375 105.773 17.1105C104.304 10.9771 97.8955 2.24281 84.6491 0.41162C49.2196 -4.48643 14.4469 35.3196 -3.92548 67.0699Z"
                    fill="black"
                    fill-opacity="0.04"
                />
            </svg>
        </>
    );
};
const imageRight = () => {
    return (
        <>
            <svg width="39" height="91" viewBox="0 0 39 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.05811 8.14547C-0.599976 7.17764 -0.0573235 6.79406 0.97068 5.1106C3.24551 1.38531 12.7488 -3.3588 28.4723 3.44931C40.9574 8.85513 53.3911 24.2839 62 37.4522C54.7939 55.026 53.1836 73.3194 52.675 91C46.2087 71.0644 32.2861 26.3738 1.05811 8.14547Z"
                    fill="black"
                    fill-opacity="0.04"
                />
            </svg>
        </>
    );
};
const image2Right = () => {
    return (
        <>
            <svg width="97" height="83" viewBox="0 0 97 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M109.925 67.0699C109.934 69.4978 109.886 68.6399 110 82.3101C105.378 83.0231 102.264 84.0815 98.7024 80.1806C88.1002 68.2937 76.712 57.1569 64.6171 46.8481C63.5215 45.9396 63.5041 45.8149 64.3294 44.6476C66.9392 40.9566 69.3959 37.8648 71.6605 34.2865C71.971 33.796 71.4044 33.245 70.8809 33.2176C65.292 33.3221 59.8595 35.1108 55.2714 38.3573C54.3635 38.9444 54.394 38.945 53.5089 38.3228C47.9421 34.3616 42.0573 30.8837 35.9167 27.9261C34.4465 27.2284 34.3735 26.9665 35.2514 25.5792C37.4507 22.1038 39.8605 19.1825 42.4459 14.5477C42.6242 14.0274 41.986 13.6143 41.4122 13.6139C35.423 13.6101 29.7041 16.9701 23.4587 22.3306C22.7835 22.9102 22.8549 22.8948 22.0033 22.6546C15.423 20.7829 8.62845 19.8022 1.79574 19.7379C-0.11908 19.7206 -0.23513 19.0375 0.226631 17.1105C1.6963 10.9771 8.10446 2.24281 21.3509 0.41162C56.7804 -4.48643 91.5531 35.3196 109.925 67.0699Z"
                    fill="black"
                    fill-opacity="0.04"
                />
            </svg>
        </>
    );
};
const ButtonArr = ["All", "Interfaces", "Branding", "Illustration", "Graphics", "3D", "Animation", "Marketing"];
const Index = ({ filterFor = 'home' }) => {
    const condition = filterFor === "home"
    const matches = useMediaQuery("(min-width:768px)");
    const { dark } = useContext(ThemeContext);
    const dispatch = useDispatch()

    const { activeTab, activeTabJOB, currentUser } = useSelector(store => store.mainReducer);
    const handleTabChange = event => {
        dispatch(
            condition ?
                ACTIVE_TAB_Filter(event.target.innerText)
                :
                ACTIVE_TAB_Filter_JOB(event.target.innerText)
        )
    }
    return (
        <div className={dark ? "banner-container banner-container-dark" : "banner-container"}>
            <div className={dark ? "banner-heading banner-heading-dark" : "banner-heading"}>Welcome, {currentUser?.fullName} ✋ </div>
            <div className={dark ? "banner-Subheading banner-Subheading-dark" : "banner-Subheading"}>Let’s Explore DKSH’s top talent</div>
            <div className={matches ? "banners-button-grid relative-position z-index-2" : "banners-button-grid-responsive relative-position z-index-2"}>
                {ButtonArr.map((item, i) => (
                    <div
                        onClick={handleTabChange}
                        key={i}
                        name={item}
                        style={{ cursor: matches ? "pointer" : 'auto' }}
                        className={dark ? `${(condition ? activeTab : activeTabJOB) === item ? "banner-Btn-active banner-Btn banner-Btn-dark" : "banner-Btn banner-Btn-dark"}` : `${(condition ? activeTab : activeTabJOB) === item ? "banner-Btn banner-Btn-active" : "banner-Btn"}`}
                    >{item}</div>
                ))}
            </div>
            <div style={{ marginTop: "-52px" }} className=" relative-position z-index-1">
                <div style={{ position: "absolute", left: "0px", marginTop: "-28px" }}>{imageLeft()}</div>
                <div style={{ position: "absolute", left: "4px" }}>{image2Left()}</div>
            </div>
            <div style={{ marginTop: "-90px" }} className=" relative-position z-index-1">
                <div style={{ position: "absolute", right: "0px", marginTop: "-28px" }}>{imageRight()}</div>
                <div style={{ position: "absolute", right: "0px" }}>{image2Right()}</div>
            </div>
        </div>
    );
};

export default Index;
