import React, { useState } from "react";
import Banner from "../../components/banner";
import Filters from "../../components/filters";
import Job from "../../components/job";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { SERVICE_Filter_Options_JOB } from "../../RTK/Reducers/Reducers";
import { Alert, Grid, Skeleton, Stack } from "@mui/material";
import ThemeContext from "../../context/ThemeContext";
const Index = ({view}) => {
    const { dark } = React.useContext(ThemeContext);
    const [listView, setListView] = useState(false);
    const dispatch = useDispatch();
    const [data, setData] = React.useState([null]);
    const { allJobs, loading, priceFilterJOB, servicesFilterJOB, ratingFilterJOB, activeTabJOB } = useSelector(store => store.mainReducer)
    React.useEffect(() => {
        if (allJobs?.length > 0) {
            const finalFilterdData = allJobs.filter(dev =>
                (dev.hourlyRate >= priceFilterJOB[0] && dev.hourlyRate <= priceFilterJOB[1]) &&
                (typeof (ratingFilterJOB) === 'number' ? dev.rating >= Number(ratingFilterJOB) : dev.rating >= 5) &&
                ((dev.skills.filter(item => item.toLowerCase().includes(servicesFilterJOB === "All" ? "" : servicesFilterJOB.toLowerCase())))?.length > 0) &&
                (activeTabJOB.toLowerCase() === "all" ? true : dev.mainCategory.toLowerCase() === activeTabJOB.toLowerCase())
            )
            setData(finalFilterdData);
            const specializationSet = [];
            allJobs.forEach(dev => {
                if (activeTabJOB.toLowerCase() === "all" ? true : dev.mainCategory.toLowerCase() === activeTabJOB.toLowerCase()) specializationSet.push(...dev.skills)
            });
            dispatch(SERVICE_Filter_Options_JOB([...new Set(specializationSet)]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allJobs, priceFilterJOB, servicesFilterJOB, ratingFilterJOB, activeTabJOB])
    React.useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 100);
    }, [])



    const LoadSkelton = React.useCallback(() => {
        return (
            <Stack spacing={1}>
                <Skeleton
                    sx={{ bgcolor: dark ? 'grey.900' : 'none', fontSize: '1rem' }}
                    variant="text"
                />
                <Skeleton
                    sx={{ bgcolor: dark ? 'grey.900' : 'none' }}
                    variant="circular"
                    width={40}
                    height={40}
                />
                <Skeleton
                    sx={{ bgcolor: dark ? 'grey.900' : 'none' }}
                    variant="rectangular"
                    height={60}
                />
                <Skeleton
                    sx={{ bgcolor: dark ? 'grey.900' : 'none' }}
                    variant="rounded"
                    height={60}
                />
            </Stack>
        );
    }, [dark]);

    const mapJobs = React.useCallback(
        (user, index) => (
            <Grid item key={index} xs="12" sm="12" md="12" lg="12">
                {LoadSkelton()}
            </Grid>
        ),
        [LoadSkelton]
    );

    const mapJobCards = React.useCallback(
        (job, index) => (
            <Grid item key={job.index} xs="12">
                <Job job={job} index={index} />
            </Grid>
        ),
        []
    );




    return (

        <Grid item container spacing={2}>
            <Grid item xs={12}>
                <Banner filterFor="job" />
            </Grid>
            <Grid item xs={12}>
                <Filters filterFor="job" view={listView} setView={setListView} title="Jobs" hideGridView={true} />
            </Grid>
            {(loading || data?.[0] === null) && ["", "", "", "", "", "", ""].map(mapJobs)}
            {!loading && data?.[0] !== null && data?.length === 0 && (
                <Grid item xs="12">
                    <Alert severity="error">No Profile Found</Alert>
                </Grid>
            )}
            {!loading && data?.[0] !== null && data?.map(mapJobCards)}
        </Grid>
    );



};

export default Index;

