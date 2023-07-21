import React, { useState, useEffect } from "react";
import "./styles.css";
import { Box, Slider } from "@mui/material";
import Switch from "../form/Switch";
import Icons from "../../assets/icons";
import DropdownButton from "../dropdown";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import SMFilters from "./SmallScreenFilters";
import useTheme from "../../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { AVALIABLE_TO_WORK_Filter, PRICE_Filter, PRICE_Filter_JOB, PRO_TALLENT_Filter, RATING_Filter, RATING_Filter_JOB, RESET_Filter, RESET_Filter_JOB, SERVICE_Filter, SERVICE_Filter_JOB } from "../../RTK/Reducers/Reducers";
const { RatingIcon, ServiceIcon, PriceIcon, FilterIcon, ListIcon, GridIcon, DarkFilterIcon, ListWhite, GridWhite } = Icons;

const Index = (props) => {
    const dispatch = useDispatch();
    const { view, setView, filterFor = 'home' } = props;
    const homeFilter = filterFor === 'home'
    const { allDevelopers, priceFilter, servicesFilter, servicesFilterOptions, ratingFilter, availableToWorkFilter, proTallentFilter,
        priceFilterJOB, servicesFilterOptionsJOB, ratingFilterJOB, servicesFilterJOB,
    } = useSelector(store => store.mainReducer)
    const { dark } = useTheme();
    const [price, setPrice] = useState([0, 1000]);
    const [viewFilters, setViewFilters] = useState(false);
    const [modelViewFilters, setModelViewFilters] = useState(false);
    const matches = useMediaQuery("(max-width:768px)");
    const [ALPHA_FUNCTIONS, setALPHA_FUNCTIONS] = useState(null);
    useEffect(() => {
        if (homeFilter) {
            setPrice(priceFilter);
            setALPHA_FUNCTIONS({
                'AVALIABLE_FUNCTION': AVALIABLE_TO_WORK_Filter,
                'PRICE_FUNCTION': PRICE_Filter,
                'PRO_FUNCTION': PRO_TALLENT_Filter,
                'RATING_FUNCTION': RATING_Filter,
                'RESET_FUNCTION': RESET_Filter,
                "SERVICE_FUNCTION": SERVICE_Filter
            })
        } else {
            setPrice(priceFilterJOB);
            setALPHA_FUNCTIONS({
                'PRICE_FUNCTION': PRICE_Filter_JOB,
                'RATING_FUNCTION': RATING_Filter_JOB,
                'RESET_FUNCTION': RESET_Filter_JOB,
                "SERVICE_FUNCTION": SERVICE_Filter_JOB
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterFor]);
    useEffect(() => {
        if (matches && viewFilters) setViewFilters(false);
        else if (!matches && modelViewFilters) setModelViewFilters(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matches]);
    const handleChangePrice = (e, values) => setPrice(values)
    const handleApplyPrice = () => dispatch(ALPHA_FUNCTIONS.PRICE_FUNCTION(price))
    const handleCancelPrice = () => {
        dispatch(ALPHA_FUNCTIONS.PRICE_FUNCTION([0, 1000]))
        setPrice([0, 1000])
    }

    const handleChangeService = (service) => dispatch(ALPHA_FUNCTIONS.SERVICE_FUNCTION(service))

    const list = ["Top rated", 4, 3, 2, 1];
    const handleChangeRating = (service) => dispatch(ALPHA_FUNCTIONS.RATING_FUNCTION(service))

    const ViewToggleContainer = () => {
        const viewItems = [
            <Box className={!view ? `${dark ? "filter-toggle-active filter-toggle-active-dark" : "filter-toggle-active"}` : "filter-toggle-item"} onClick={() => setView(false)}>
                <img alt='' src={dark ? GridWhite : GridIcon} />
                Grid
            </Box>,
            <Box className={view ? `${dark ? "filter-toggle-active filter-toggle-active-dark" : "filter-toggle-active"}` : "filter-toggle-item"} onClick={() => setView(true)}>
                <img alt='' src={dark ? ListWhite : ListIcon} />
                List
            </Box>,
        ];

        return (
            <Box sx={{ display: { xs: "none", sm: "flex" } }} className={dark ? "filter-toggle-container filter-toggle-container-dark" : "filter-toggle-container"}>
                {viewItems.map((item) => (
                    <>{item}</>
                ))}
            </Box>
        );
    };
    const handleViewFilters = () => {
        if (matches) setModelViewFilters(true);
        else setViewFilters((e) => !e);
    };
    const handleAvailableToWork = event => dispatch(ALPHA_FUNCTIONS.AVALIABLE_FUNCTION(event.target.checked))
    const handleProTallent = event => dispatch(ALPHA_FUNCTIONS.PRO_FUNCTION(event.target.checked))
    const handleResetFilters = event => dispatch(ALPHA_FUNCTIONS.RESET_FUNCTION())
    return (
        <>
            <Box sx={{ ...styleSheet.flex, mt: 2, mb: 3 }}>
                <Box sx={{ ...styleSheet.flex }}>
                    <h2 className={dark ? "talents talents-dark" : "talents"}>{props.title || "Talents"} </h2>
                    <span className={dark ? "number_of_talents number_of_talents-dark" : "number_of_talents"}>{allDevelopers?.length}</span>
                </Box>
                <Box sx={{ ...styleSheet.flex, flexDirection: { xs: "column", sm: "row" } }}>
                    {!props.hideGridView && ViewToggleContainer()}
                    <Button style={{ padding: "15px" }} title={<img alt='' src={viewFilters || modelViewFilters ? FilterIcon : DarkFilterIcon} />} type={viewFilters ? "primary" : "secondary"} onClick={handleViewFilters} />
                </Box>
            </Box>
            {matches && <SMFilters condition={homeFilter} open={modelViewFilters} onClose={() => setModelViewFilters(false)} view={view} setView={setView} />}
            {viewFilters && !matches && (
                <Box sx={{ ...styleSheet.flex, mt: 2, mb: 3, flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" } }}>
                    <Box sx={{ ...styleSheet.flex, flexDirection: { xs: "column", sm: "row" } }}>
                        <FilterButton dark={dark} label="Price per hr : " icon={PriceIcon} value="All" component={
                            <Box sx={{ minWidth: 392, p: 2 }}>
                                <Box className="slider-container">
                                    <Slider
                                        sx={{
                                            color: "#090B0C",
                                            marginTop: "20px",
                                            "& .MuiSlider-thumb": { height: 20, width: 20, border: "5px solid #090B0C", backgroundColor: "#FFFFFF" },
                                            "& .MuiSlider-rail": { backgroundColor: "#E5E8EC" },
                                            "& .MuiSlider-valueLabel": { display: "none" },
                                        }}
                                        mountOnEnter
                                        unmountOnExit
                                        min={0}
                                        max={1000}
                                        getAriaLabel={() => "Price range"}
                                        value={price}
                                        onChange={handleChangePrice}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={valuetext}
                                    />
                                    <Box sx={styleSheet.flex}>
                                        <span className="slider-label ">0$</span>
                                        <span className="slider-label ">1 000$</span>
                                    </Box>
                                    <Box sx={{ ...styleSheet.flex, mt: "25px" }}>
                                        <Input label="From" value={`${price[0]}$`} disabled />
                                        <Input label="To" value={`${price[1]}$`} disabled />
                                    </Box>
                                    <Box sx={{ ...styleSheet.flex, mt: "25px" }}>
                                        <Button title="Cancel" onClick={handleCancelPrice} type="secondary" />
                                        <Button title="Apply" onClick={handleApplyPrice} type="primary" />
                                    </Box>
                                </Box>
                            </Box>
                        } />
                        <FilterButton dark={dark} label="Services : " icon={ServiceIcon} value="All" component={<Box className={dark ? "scrollbox-dark dropdown-list" : "scrollbox dropdown-list"} sx={{ gap: '10px' }} >
                            {(homeFilter ? servicesFilterOptions : servicesFilterOptionsJOB).map((service) => (
                                <Box onClick={() => handleChangeService(service)} key={service} className={(homeFilter ? servicesFilter : servicesFilterJOB) === service ? "dropdown-active-item" : "dropdown-item"}>
                                    {service}
                                </Box>
                            ))}
                        </Box>} />
                        <FilterButton dark={dark} label="Sort by : " icon={RatingIcon} value="Rating" component={<Box className="dropdown-list" sx={{ gap: '10px' }}>
                            {list.map((option) => (
                                <Box onClick={() => handleChangeRating(option)} key={option} className={(homeFilter ? ratingFilter : ratingFilterJOB) === option ? "dropdown-active-item" : "dropdown-item"}>
                                    {option}
                                </Box>
                            ))}
                        </Box>} />
                        <FilterButton dark={dark} label="Reset all" onClick={handleResetFilters} />
                    </Box>
                    {homeFilter && <Box sx={{ ...styleSheet.flex, flexDirection: { xs: "column", sm: "row" } }}>
                        <ToggleButton label="Available to work" onChange={handleAvailableToWork} checked={availableToWorkFilter} dark={dark} />
                        <ToggleButton onChange={handleProTallent} checked={proTallentFilter} label="Pro tallent" dark={dark} />
                    </Box>}
                </Box>
            )}
        </>
    );
};

export default Index;

const FilterButton = ({ icon, label, value, component, dark, onClick, ...rest }) => <DropdownButton onClick={onClick} {...rest} dark={dark} icon={icon} label={label} value={value} children={component} />;

const ToggleButton = ({ label, dark, ...rest }) => {
    return (
        <Box sx={styleSheet.button}>
            <Switch label={label} dark={dark} {...rest} />
        </Box>
    );
};

const styleSheet = {
    flex: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 },
    button: { px: "20px", py: "2px", pr: "0px", border: " 1px solid #ececf0", borderRadius: "10px" },
    filterButton: { px: "20px", py: "10px", border: " 1px solid #ececf0", borderRadius: "10px", cursor: "pointer" },
    label: { fontStyle: "normal", fontWeight: 600, fontSize: "12px", lineHeight: "20px", letterSpacing: "-0.01em", color: "#878F9A" },
};

const valuetext = (value) => `${value}$`;
