import React from "react";
import "./styles.css";
import { useDispatch, } from "react-redux";
import { RESET_TOKEN, } from "../../RTK/Reducers/Reducers";
import { useNavigate, useParams } from "react-router-dom";
const Index = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    React.useEffect(() => {
        if (token) {
            dispatch(RESET_TOKEN(token));
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <> </>
    );
};

export default Index;
