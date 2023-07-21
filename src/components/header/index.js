import React, { useState, useContext } from "react";
import { Avatar, Box, Button, Divider, Grid, Menu, MenuItem, Stack, alpha, styled } from "@mui/material";
import Images from "../../assets/images";
import MenuIcon from "@mui/icons-material/Menu";
import Icon from "../../assets/icons";
import firebase from '../login-Box-LG/firebase';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ThemeContext from "../../context/ThemeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_TAB_Filter, LOGIN_BOX_HANDLE, LOG_OUT, SELECTED_PROFILE } from "../../RTK/Reducers/Reducers";
import LoginBoxLGHOC from "../login-Box-LG/LoginBoxLGHOC";
import { DarkMode, ExitToApp, LightMode, Login } from "@mui/icons-material";
const { SubtractIcon, SelectIcon, StarIcon, MsgIcon, PeopleGroupIcon, PeopleWhite, HomeWhite, ForwardWhite, FileWhite } = Icon;
const NotificationsIcons = (dark) => {
    if (dark)
        return (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_408_2383)">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.8748 12.5418C16.9688 11.4478 18.4525 10.8333 19.9996 10.8333C21.5467 10.8333 23.0304 11.4478 24.1244 12.5418C25.2184 13.6358 25.833 15.1195 25.833 16.6666C25.833 19.0938 26.443 20.7031 27.0824 21.7308L27.0923 21.7466C27.39 22.2252 27.6254 22.6035 27.7841 22.8788C27.8636 23.0168 27.9361 23.1497 27.9897 23.2678C28.0165 23.3268 28.0464 23.399 28.0699 23.4776C28.0893 23.5428 28.1263 23.6822 28.1124 23.8518C28.1031 23.9658 28.0798 24.1606 27.968 24.3618C27.8563 24.5631 27.7031 24.6857 27.6113 24.7539C27.4027 24.9086 27.1632 24.944 27.0832 24.9558L27.0795 24.9563C26.9567 24.9745 26.8173 24.9836 26.6767 24.989C26.3973 24.9999 26.0105 24.9999 25.5295 24.9999H14.4697C13.9887 24.9999 13.6019 24.9999 13.3226 24.989C13.1819 24.9836 13.0425 24.9745 12.9197 24.9563L12.916 24.9558C12.836 24.944 12.5965 24.9086 12.388 24.7539C12.2961 24.6857 12.143 24.5631 12.0312 24.3618C11.9194 24.1606 11.8962 23.9658 11.8868 23.8518C11.873 23.6822 11.91 23.5428 11.9294 23.4776C11.9528 23.399 11.9827 23.3268 12.0095 23.2678C12.0632 23.1497 12.1356 23.0168 12.2151 22.8788C12.3738 22.6035 12.6092 22.2252 12.9069 21.7467L12.9168 21.7308C13.5563 20.7031 14.1663 19.0938 14.1663 16.6666C14.1663 15.1195 14.7809 13.6358 15.8748 12.5418ZM19.9996 12.4999C18.8945 12.4999 17.8347 12.9389 17.0533 13.7203C16.2719 14.5017 15.833 15.5615 15.833 16.6666C15.833 19.3897 15.1437 21.3066 14.3319 22.6114C14.1545 22.8964 14.0065 23.1344 13.8855 23.3323C14.0577 23.3332 14.2579 23.3333 14.4903 23.3333H25.5089C25.7413 23.3333 25.9416 23.3332 26.1137 23.3323C25.9928 23.1344 25.8447 22.8964 25.6674 22.6114C24.8555 21.3066 24.1663 19.3897 24.1663 16.6666C24.1663 15.5615 23.7273 14.5017 22.9459 13.7203C22.1645 12.9389 21.1047 12.4999 19.9996 12.4999ZM17.4996 27.4999C17.4996 27.0397 17.8727 26.6666 18.333 26.6666H21.6663C22.1265 26.6666 22.4996 27.0397 22.4996 27.4999C22.4996 27.9602 22.1265 28.3333 21.6663 28.3333H18.333C17.8727 28.3333 17.4996 27.9602 17.4996 27.4999Z"
                        fill="white"
                    />
                </g>
                <circle cx="28" cy="12" r="5" fill="#8077F6" stroke="#090B0C" stroke-width="2" />
                <defs>
                    <clipPath id="clip0_408_2383">
                        <rect width="40" height="40" rx="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );

    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_404_13554)">
                <g clip-path="url(#clip1_404_13554)">
                    <path
                        d="M16.25 19.9999C16.9404 19.9999 17.5 19.4403 17.5 18.7499C17.5 18.0596 16.9404 17.4999 16.25 17.4999C15.5597 17.4999 15 18.0596 15 18.7499C15 19.4403 15.5597 19.9999 16.25 19.9999Z"
                        fill="#090B0C"
                    />
                    <path
                        d="M21.25 18.7499C21.25 19.4403 20.6904 19.9999 20 19.9999C19.3097 19.9999 18.75 19.4403 18.75 18.7499C18.75 18.0596 19.3097 17.4999 20 17.4999C20.6904 17.4999 21.25 18.0596 21.25 18.7499Z"
                        fill="#090B0C"
                    />
                    <path
                        d="M23.75 19.9999C24.4404 19.9999 25 19.4403 25 18.7499C25 18.0596 24.4404 17.4999 23.75 17.4999C23.0597 17.4999 22.5 18.0596 22.5 18.7499C22.5 19.4403 23.0597 19.9999 23.75 19.9999Z"
                        fill="#090B0C"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 10.8333C16.1577 10.8333 13.7758 11.6827 12.3953 13.2515C11.0302 14.8027 10.8334 16.8565 10.8334 18.7499C10.8334 20.6441 11.0329 22.6403 12.1389 24.1594C13.2318 25.6605 15.0668 26.5193 17.8774 26.6021L19.3018 28.7882C19.4556 29.0242 19.7183 29.1666 20 29.1666C20.2818 29.1666 20.5444 29.0242 20.6982 28.7882L22.1199 26.6063C24.9324 26.5487 26.7693 25.6893 27.8625 24.1793C28.9673 22.6535 29.1667 20.6438 29.1667 18.7499C29.1667 16.8565 28.9699 14.8027 27.6048 13.2515C26.2243 11.6827 23.8424 10.8333 20 10.8333ZM12.5 18.7499C12.5 16.8934 12.7199 15.4055 13.6465 14.3525C14.5576 13.3171 16.3424 12.4999 20 12.4999C23.6577 12.4999 25.4424 13.3171 26.3536 14.3525C27.2802 15.4055 27.5 16.8934 27.5 18.7499C27.5 20.606 27.2828 22.138 26.5126 23.2019C25.7895 24.2005 24.4338 24.9694 21.675 24.942L21.218 24.9375L20 26.8068L18.785 24.942H18.3334C15.5696 24.942 14.2103 24.1728 13.4862 23.1784C12.7172 22.1222 12.5 20.6057 12.5 18.7499Z"
                        fill="#090B0C"
                    />
                </g>
            </g>
            <circle cx="28" cy="12" r="5" fill="#8077F6" stroke="white" stroke-width="2" />
            <defs>
                <clipPath id="clip0_404_13554">
                    <rect width="40" height="40" rx="20" fill="white" />
                </clipPath>
                <clipPath id="clip1_404_13554">
                    <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                </clipPath>
            </defs>
        </svg>
    );
};
const iconBell = (dark) => {
    if (dark)
        return (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_408_2380)">
                    <g clip-path="url(#clip1_408_2380)">
                        <path
                            d="M16.2497 19.9999C16.94 19.9999 17.4997 19.4403 17.4997 18.7499C17.4997 18.0596 16.94 17.4999 16.2497 17.4999C15.5593 17.4999 14.9997 18.0596 14.9997 18.7499C14.9997 19.4403 15.5593 19.9999 16.2497 19.9999Z"
                            fill="white"
                        />
                        <path
                            d="M21.2497 18.7499C21.2497 19.4403 20.69 19.9999 19.9997 19.9999C19.3093 19.9999 18.7497 19.4403 18.7497 18.7499C18.7497 18.0596 19.3093 17.4999 19.9997 17.4999C20.69 17.4999 21.2497 18.0596 21.2497 18.7499Z"
                            fill="white"
                        />
                        <path
                            d="M23.7497 19.9999C24.44 19.9999 24.9997 19.4403 24.9997 18.7499C24.9997 18.0596 24.44 17.4999 23.7497 17.4999C23.0593 17.4999 22.4997 18.0596 22.4997 18.7499C22.4997 19.4403 23.0593 19.9999 23.7497 19.9999Z"
                            fill="white"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.9997 10.8333C16.1573 10.8333 13.7754 11.6827 12.3949 13.2515C11.0299 14.8027 10.833 16.8565 10.833 18.7499C10.833 20.6441 11.0325 22.6403 12.1385 24.1594C13.2314 25.6605 15.0665 26.5193 17.8771 26.6021L19.3015 28.7882C19.4553 29.0242 19.7179 29.1666 19.9997 29.1666C20.2814 29.1666 20.5441 29.0242 20.6979 28.7882L22.1195 26.6063C24.932 26.5487 26.7689 25.6893 27.8622 24.1793C28.9669 22.6535 29.1663 20.6438 29.1663 18.7499C29.1663 16.8565 28.9695 14.8027 27.6044 13.2515C26.2239 11.6827 23.842 10.8333 19.9997 10.8333ZM12.4997 18.7499C12.4997 16.8934 12.7195 15.4055 13.6461 14.3525C14.5573 13.3171 16.342 12.4999 19.9997 12.4999C23.6573 12.4999 25.4421 13.3171 26.3532 14.3525C27.2799 15.4055 27.4997 16.8934 27.4997 18.7499C27.4997 20.606 27.2825 22.138 26.5122 23.2019C25.7891 24.2005 24.4334 24.9694 21.6746 24.942L21.2176 24.9375L19.9997 26.8068L18.7846 24.942H18.333C15.5693 24.942 14.2099 24.1728 13.4859 23.1784C12.7169 22.1222 12.4997 20.6057 12.4997 18.7499Z"
                            fill="white"
                        />
                    </g>
                </g>
                <circle cx="28" cy="12" r="5" fill="#8077F6" stroke="#090B0C" stroke-width="2" />
                <defs>
                    <clipPath id="clip0_408_2380">
                        <rect width="40" height="40" rx="20" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_408_2380">
                        <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                    </clipPath>
                </defs>
            </svg>
        );

    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_404_13557)">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.8752 12.5418C16.9692 11.4478 18.4529 10.8333 20 10.8333C21.5471 10.8333 23.0308 11.4478 24.1248 12.5418C25.2187 13.6358 25.8333 15.1195 25.8333 16.6666C25.8333 19.0938 26.4433 20.7031 27.0828 21.7308L27.0926 21.7466C27.3904 22.2252 27.6258 22.6035 27.7845 22.8788C27.864 23.0168 27.9365 23.1497 27.9901 23.2678C28.0169 23.3268 28.0468 23.399 28.0702 23.4776C28.0896 23.5428 28.1266 23.6822 28.1128 23.8518C28.1034 23.9658 28.0802 24.1606 27.9684 24.3618C27.8566 24.5631 27.7035 24.6857 27.6116 24.7539C27.4031 24.9086 27.1636 24.944 27.0836 24.9558L27.0799 24.9563C26.9571 24.9745 26.8177 24.9836 26.677 24.989C26.3977 24.9999 26.0109 24.9999 25.5299 24.9999H14.4701C13.9891 24.9999 13.6023 24.9999 13.3229 24.989C13.1823 24.9836 13.0429 24.9745 12.9201 24.9563L12.9164 24.9558C12.8364 24.944 12.5969 24.9086 12.3883 24.7539C12.2965 24.6857 12.1434 24.5631 12.0316 24.3618C11.9198 24.1606 11.8965 23.9658 11.8872 23.8518C11.8733 23.6822 11.9103 23.5428 11.9297 23.4776C11.9532 23.399 11.9831 23.3268 12.0099 23.2678C12.0635 23.1497 12.136 23.0168 12.2155 22.8788C12.3742 22.6035 12.6095 22.2252 12.9073 21.7467L12.9172 21.7308C13.5566 20.7031 14.1667 19.0938 14.1667 16.6666C14.1667 15.1195 14.7812 13.6358 15.8752 12.5418ZM20 12.4999C18.8949 12.4999 17.8351 12.9389 17.0537 13.7203C16.2723 14.5017 15.8333 15.5615 15.8333 16.6666C15.8333 19.3897 15.1441 21.3066 14.3322 22.6114C14.1549 22.8964 14.0068 23.1344 13.8859 23.3323C14.058 23.3332 14.2583 23.3333 14.4907 23.3333H25.5093C25.7417 23.3333 25.9419 23.3332 26.1141 23.3323C25.9931 23.1344 25.8451 22.8964 25.6677 22.6114C24.8559 21.3066 24.1667 19.3897 24.1667 16.6666C24.1667 15.5615 23.7277 14.5017 22.9463 13.7203C22.1649 12.9389 21.1051 12.4999 20 12.4999ZM17.5 27.4999C17.5 27.0397 17.8731 26.6666 18.3333 26.6666H21.6667C22.1269 26.6666 22.5 27.0397 22.5 27.4999C22.5 27.9602 22.1269 28.3333 21.6667 28.3333H18.3333C17.8731 28.3333 17.5 27.9602 17.5 27.4999Z"
                    fill="#090B0C"
                />
            </g>
            <circle cx="28" cy="12" r="5" fill="#8077F6" stroke="white" stroke-width="2" />
            <defs>
                <clipPath id="clip0_404_13557">
                    <rect width="40" height="40" rx="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
const searchIcon = (dark) => {
    if (dark)
        return (
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.4301 10.4842L2.16028 10.3129L1.4301 10.4842ZM1.4301 5.93667L2.16028 6.10794L1.4301 5.93667ZM14.3248 5.93667L15.0549 5.76539L14.3248 5.93667ZM14.3248 10.4842L15.0549 10.6555L14.3248 10.4842ZM10.1512 14.6578L9.97992 13.9276L10.1512 14.6578ZM5.60366 14.6578L5.43238 15.3879L5.60366 14.6578ZM5.60366 1.76311L5.43238 1.03293V1.03293L5.60366 1.76311ZM10.1512 1.76311L10.3225 1.03293L10.1512 1.76311ZM15.6367 17.0303C15.9296 17.3232 16.4044 17.3232 16.6973 17.0303C16.9902 16.7374 16.9902 16.2626 16.6973 15.9697L15.6367 17.0303ZM2.16028 10.3129C1.8359 8.93004 1.8359 7.49084 2.16028 6.10794L0.699918 5.76539C0.322683 7.3736 0.322683 9.04728 0.699918 10.6555L2.16028 10.3129ZM13.5946 6.10795C13.919 7.49084 13.919 8.93004 13.5946 10.3129L15.0549 10.6555C15.4322 9.04728 15.4322 7.3736 15.0549 5.76539L13.5946 6.10795ZM9.97992 13.9276C8.59703 14.252 7.15783 14.252 5.77494 13.9276L5.43238 15.3879C7.04059 15.7652 8.71427 15.7652 10.3225 15.3879L9.97992 13.9276ZM5.77494 2.49329C7.15783 2.1689 8.59703 2.1689 9.97992 2.49329L10.3225 1.03293C8.71427 0.655691 7.04059 0.655692 5.43238 1.03293L5.77494 2.49329ZM5.77494 13.9276C3.9814 13.5069 2.58099 12.1065 2.16028 10.3129L0.699918 10.6555C1.25073 13.0037 3.08421 14.8371 5.43238 15.3879L5.77494 13.9276ZM10.3225 15.3879C12.6707 14.8371 14.5041 13.0037 15.0549 10.6555L13.5946 10.3129C13.1739 12.1065 11.7735 13.5069 9.97992 13.9276L10.3225 15.3879ZM9.97992 2.49329C11.7735 2.91399 13.1739 4.31441 13.5946 6.10795L15.0549 5.76539C14.5041 3.41721 12.6707 1.58373 10.3225 1.03293L9.97992 2.49329ZM5.43238 1.03293C3.0842 1.58373 1.25073 3.41721 0.699918 5.76539L2.16028 6.10794C2.58099 4.3144 3.9814 2.91399 5.77494 2.49329L5.43238 1.03293ZM12.5826 13.9763L15.6367 17.0303L16.6973 15.9697L13.6433 12.9156L12.5826 13.9763Z"
                    fill="white"
                />
            </svg>
        );

    return (
        <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.42986 10.4842L2.16004 10.3129L1.42986 10.4842ZM1.42986 5.93667L2.16004 6.10794L1.42986 5.93667ZM14.3245 5.93667L15.0547 5.76539L14.3245 5.93667ZM14.3245 10.4842L15.0547 10.6555L14.3245 10.4842ZM10.151 14.6578L9.97968 13.9276L10.151 14.6578ZM5.60342 14.6578L5.43214 15.3879L5.60342 14.6578ZM5.60342 1.76311L5.43214 1.03293V1.03293L5.60342 1.76311ZM10.151 1.76311L10.3222 1.03293L10.151 1.76311ZM15.6364 17.0303C15.9293 17.3232 16.4042 17.3232 16.6971 17.0303C16.99 16.7374 16.99 16.2626 16.6971 15.9697L15.6364 17.0303ZM2.16004 10.3129C1.83565 8.93004 1.83565 7.49084 2.16004 6.10794L0.699674 5.76539C0.322439 7.3736 0.322439 9.04728 0.699674 10.6555L2.16004 10.3129ZM13.5943 6.10795C13.9187 7.49084 13.9187 8.93004 13.5943 10.3129L15.0547 10.6555C15.4319 9.04728 15.4319 7.3736 15.0547 5.76539L13.5943 6.10795ZM9.97968 13.9276C8.59678 14.252 7.15759 14.252 5.77469 13.9276L5.43214 15.3879C7.04034 15.7652 8.71403 15.7652 10.3222 15.3879L9.97968 13.9276ZM5.77469 2.49329C7.15759 2.1689 8.59679 2.1689 9.97968 2.49329L10.3222 1.03293C8.71403 0.655691 7.04034 0.655692 5.43214 1.03293L5.77469 2.49329ZM5.77469 13.9276C3.98115 13.5069 2.58074 12.1065 2.16004 10.3129L0.699674 10.6555C1.25048 13.0037 3.08396 14.8371 5.43214 15.3879L5.77469 13.9276ZM10.3222 15.3879C12.6704 14.8371 14.5039 13.0037 15.0547 10.6555L13.5943 10.3129C13.1736 12.1065 11.7732 13.5069 9.97968 13.9276L10.3222 15.3879ZM9.97968 2.49329C11.7732 2.91399 13.1736 4.31441 13.5943 6.10795L15.0547 5.76539C14.5039 3.41721 12.6704 1.58373 10.3222 1.03293L9.97968 2.49329ZM5.43214 1.03293C3.08396 1.58373 1.25048 3.41721 0.699674 5.76539L2.16004 6.10794C2.58074 4.3144 3.98115 2.91399 5.77469 2.49329L5.43214 1.03293ZM12.5824 13.9763L15.6364 17.0303L16.6971 15.9697L13.643 12.9156L12.5824 13.9763Z"
                fill="#090B0C"
            />
        </svg>
    );
};
const searchButton = (searchDropdown, dark) => {
    if (searchDropdown) return <img alt="" src={SubtractIcon} style={{ marginTop: "5px", width: "20px" }} />;
    if (dark) return <img alt="" src={ForwardWhite} />;
    return (
        <svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.666748" width="24" height="28" rx="8" fill="#EDF0F3" />
            <path d="M10.0147 19.722H8.43275L15.0827 6.45H16.6647L10.0147 19.722Z" fill="#090B0C" />
        </svg>
    );
};
const networkButton = (dark) => {
    if (dark) return <img alt="" src={PeopleWhite} />;
    return (
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.24987 2.33341C5.63904 2.33341 4.33321 3.63925 4.33321 5.25008C4.33321 6.86091 5.63904 8.16675 7.24987 8.16675C8.8607 8.16675 10.1665 6.86091 10.1665 5.25008C10.1665 3.63925 8.8607 2.33341 7.24987 2.33341ZM2.66654 5.25008C2.66654 2.71878 4.71857 0.666748 7.24987 0.666748C9.78118 0.666748 11.8332 2.71878 11.8332 5.25008C11.8332 7.78139 9.78118 9.83341 7.24987 9.83341C4.71857 9.83341 2.66654 7.78139 2.66654 5.25008ZM11.9203 1.51902C12.1251 1.10687 12.6253 0.938799 13.0374 1.14362C14.5445 1.8926 15.5832 3.44928 15.5832 5.25008C15.5832 7.05088 14.5445 8.60756 13.0374 9.35654C12.6253 9.56136 12.1251 9.39329 11.9203 8.98114C11.7155 8.56899 11.8835 8.06884 12.2957 7.86402C13.2581 7.38575 13.9165 6.39405 13.9165 5.25008C13.9165 4.10611 13.2581 3.11441 12.2957 2.63614C11.8835 2.43132 11.7155 1.93117 11.9203 1.51902ZM7.24987 13.1667C5.13423 13.1667 3.15614 14.2712 1.65514 16.1816C1.37081 16.5435 0.846927 16.6064 0.48503 16.322C0.123133 16.0377 0.0602609 15.5138 0.3446 15.1519C2.08775 12.9333 4.51414 11.5001 7.24987 11.5001C9.9856 11.5001 12.412 12.9333 14.1551 15.1519C14.4395 15.5138 14.3766 16.0377 14.0147 16.322C13.6528 16.6064 13.1289 16.5435 12.8446 16.1816C11.3436 14.2712 9.36551 13.1667 7.24987 13.1667ZM13.574 12.6285C13.7637 12.2092 14.2575 12.0231 14.6768 12.2129C16.075 12.8456 17.3116 13.8661 18.3218 15.1519C18.6062 15.5138 18.5433 16.0377 18.1814 16.322C17.8195 16.6064 17.2956 16.5435 17.0113 16.1816C16.1423 15.0757 15.1105 14.2385 13.9897 13.7313C13.5703 13.5416 13.3842 13.0478 13.574 12.6285Z"
                fill="#768193"
            />
        </svg>
    );
};
const ArrowIcon = () => {
    return (
        <>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.528636 0.528514C0.788986 0.268165 1.2111 0.268165 1.47145 0.528514L5.00004 4.05711L8.52864 0.528514C8.78899 0.268165 9.2111 0.268165 9.47145 0.528514C9.7318 0.788864 9.7318 1.21097 9.47145 1.47132L5.47145 5.47132C5.2111 5.73167 4.78899 5.73167 4.52864 5.47132L0.528636 1.47132C0.268287 1.21097 0.268287 0.788864 0.528636 0.528514Z"
                    fill="#768193"
                />
            </svg>
        </>
    );
};
const JobsIcon = (dark) => {
    if (dark) return <img alt="" src={FileWhite} />;
    return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.21864 0.666543C9.2563 0.666564 9.29451 0.666584 9.33329 0.666584C9.37207 0.666584 9.41028 0.666564 9.44794 0.666543C10.1108 0.666184 10.603 0.665918 11.0294 0.780165C12.1797 1.08839 13.0782 1.98688 13.3864 3.13719C13.455 3.39341 13.4823 3.67341 13.4931 3.99992L15.0321 3.99992C15.4714 3.9999 15.8503 3.99989 16.1625 4.02539C16.4919 4.05231 16.8196 4.11174 17.1349 4.2724C17.6053 4.51209 17.9878 4.89454 18.2275 5.36494C18.3881 5.68026 18.4476 6.00794 18.4745 6.33739C18.5 6.64953 18.5 7.0285 18.5 7.46778V13.8654C18.5 14.3047 18.5 14.6836 18.4745 14.9958C18.4476 15.3252 18.3881 15.6529 18.2275 15.9682C17.9878 16.4386 17.6053 16.8211 17.1349 17.0608C16.8196 17.2214 16.4919 17.2809 16.1625 17.3078C15.8503 17.3333 15.4714 17.3333 15.0321 17.3333H3.63449C3.19521 17.3333 2.81624 17.3333 2.5041 17.3078C2.17465 17.2809 1.84697 17.2214 1.53165 17.0608C1.06125 16.8211 0.678795 16.4386 0.439111 15.9682C0.278449 15.6529 0.21902 15.3252 0.192102 14.9958C0.166599 14.6836 0.166612 14.3047 0.166627 13.8654V7.4678C0.166612 7.02851 0.166599 6.64954 0.192102 6.33739C0.21902 6.00794 0.278449 5.68026 0.439111 5.36494C0.678795 4.89454 1.06125 4.51208 1.53165 4.2724C1.84697 4.11174 2.17465 4.05231 2.5041 4.02539C2.81625 3.99989 3.19522 3.9999 3.63451 3.99992L5.17347 3.99992C5.18425 3.67341 5.21155 3.39341 5.28021 3.13719C5.58843 1.98688 6.48692 1.08839 7.63723 0.780165C8.06361 0.665918 8.55582 0.666184 9.21864 0.666543ZM3.66663 5.66658C3.18617 5.66658 2.87594 5.66723 2.63982 5.68652C2.41344 5.70502 2.32951 5.73642 2.2883 5.75741C2.1315 5.83731 2.00402 5.96479 1.92412 6.12159C1.90313 6.1628 1.87173 6.24673 1.85323 6.47311C1.83394 6.70923 1.83329 7.01946 1.83329 7.49992V13.8333C1.83329 14.3137 1.83394 14.6239 1.85323 14.8601C1.87173 15.0864 1.90313 15.1704 1.92412 15.2116C2.00402 15.3684 2.1315 15.4959 2.2883 15.5758C2.32951 15.5968 2.41344 15.6281 2.63982 15.6466C2.87594 15.6659 3.18617 15.6666 3.66663 15.6666H15C15.4804 15.6666 15.7906 15.6659 16.0268 15.6466C16.2531 15.6281 16.3371 15.5968 16.3783 15.5758C16.5351 15.4959 16.6626 15.3684 16.7425 15.2116C16.7635 15.1704 16.7949 15.0864 16.8134 14.8601C16.8326 14.6239 16.8333 14.3137 16.8333 13.8333V7.49992C16.8333 7.01946 16.8326 6.70923 16.8134 6.47311C16.7949 6.24673 16.7635 6.1628 16.7425 6.12159C16.6626 5.96479 16.5351 5.83731 16.3783 5.75741C16.3371 5.73642 16.2531 5.70502 16.0268 5.68652C15.7906 5.66723 15.4804 5.66658 15 5.66658H3.66663ZM11.8251 3.99992H6.84151C6.84917 3.78527 6.86356 3.66754 6.89008 3.56855C7.0442 2.9934 7.49344 2.54415 8.0686 2.39004C8.25383 2.34041 8.50467 2.33325 9.33329 2.33325C10.1619 2.33325 10.4128 2.34041 10.598 2.39004C11.1731 2.54415 11.6224 2.9934 11.7765 3.56855C11.803 3.66754 11.8174 3.78527 11.8251 3.99992Z"
                fill="#768193"
            />
        </svg>
    );
};
const HomeButtonIcon = (dark) => {
    if (dark) return <img alt="" src={HomeWhite} />;
    return (
        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5 10.8333C13.5 13.1345 11.6345 15 9.33331 15C7.03212 15 5.16665 13.1345 5.16665 10.8333C5.16665 8.53213 7.03212 6.66665 9.33331 6.66665C11.6345 6.66665 13.5 8.53213 13.5 10.8333ZM11.8333 10.8333C11.8333 12.214 10.714 13.3333 9.33331 13.3333C7.9526 13.3333 6.83331 12.214 6.83331 10.8333C6.83331 9.4526 7.9526 8.33331 9.33331 8.33331C10.714 8.33331 11.8333 9.4526 11.8333 10.8333Z"
                fill="#090B0C"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.6958 1.14168C9.86729 0.603162 8.79934 0.603163 7.97084 1.14168L1.43789 5.3881C0.621873 5.91851 0.18785 6.87429 0.325489 7.83776L1.63727 17.0202C1.81321 18.2518 2.86801 19.1666 4.11214 19.1666H14.5545C15.7986 19.1666 16.8534 18.2518 17.0294 17.0202L18.3411 7.83776C18.4788 6.87429 18.0448 5.91851 17.2287 5.3881L10.6958 1.14168ZM8.87916 2.53909C9.15532 2.35958 9.51131 2.35958 9.78747 2.53909L16.3204 6.78551C16.5924 6.96231 16.7371 7.28091 16.6912 7.60206L15.3794 16.7845C15.3208 17.195 14.9692 17.5 14.5545 17.5H4.11214C3.69743 17.5 3.34583 17.195 3.28718 16.7845L1.9754 7.60206C1.92952 7.2809 2.0742 6.96231 2.34621 6.78551L8.87916 2.53909Z"
                fill="#090B0C"
            />
        </svg>
    );
};

const SearchFieldWithDropdown = (searchDropdown, setSearchDropdown, dark, matches, allDevelopers, handleClickUser, handleClickService, searchIt, setsearchIt, userSelector, setUserSelector) => {
    const users = allDevelopers.map(dev => {
        return { id: dev._id, profileImg: dev.avatar, username: dev.profileName(), rating: dev.ratingCount(), comments: dev.commentCount() }
    });
    const [services, setServices] = useState([]);

    const servicesFunction = React.useMemo(() => {
        const filteredServices = allDevelopers.reduce((count, item) => {
            const mainCategory = item.mainCategory;
            const userName = item.firstName.toLowerCase() + ' ' + item.lastName.toLowerCase();

            if (
                mainCategory.toLowerCase().includes(searchIt.toLowerCase()) ||
                userName.includes(searchIt.toLowerCase())
            ) {
                count[mainCategory] = (count[mainCategory] || 0) + 1;
            } else {
                count[mainCategory] = count[mainCategory] || 0;
            }

            return count;
        }, {});

        return Object.entries(filteredServices).map(([category, count]) => ({
            title: category,
            search_result: count,
        }));
    }, [allDevelopers, searchIt]);

    const handleEffect = React.useCallback(() => {
        setServices(servicesFunction);
    }, [servicesFunction]);

    React.useEffect(handleEffect, [handleEffect]);


    const handleClose = () => setSearchDropdown(false)
    const activeViewDown = () => {
        const activeList = users.filter(dev => dev.username.toLowerCase().includes(searchIt.toLowerCase()))
        const newIndex = Math.abs((userSelector.index - 1) % activeList?.length)
        document.getElementById('user-container').scrollTop -= (userSelector.index < 4 || userSelector.index < activeList?.length - 4 ? 40 : 5);
        setUserSelector({ index: newIndex, thisUser: activeList[newIndex] })
    }
    const activeViewUp = () => {
        const activeList = users.filter(dev => dev.username.toLowerCase().includes(searchIt.toLowerCase()))
        const newIndex = Math.abs((userSelector.index + 1) % users?.length);
        document.getElementById('user-container').scrollTop = newIndex === 0 ? 0 : userSelector.index * 40;
        setUserSelector({ index: newIndex, thisUser: activeList[newIndex] })
    }
    const selectUser = () => {
        handleClickUser(userSelector.thisUser);
        handleClose()
    }

    React.useEffect(() => {
        if (searchDropdown && typeof (userSelector.index) === "number") {
            document.getElementById('user-container').scrollTop = userSelector.index * (userSelector.index < 4 ? 5 : 30);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDropdown])

    return (
        <div className={"search-bar"}>
            <div className={dark ? "search-input-container search-input-container-dark" : "search-input-container"}>
                <div className="search-icon">{searchIcon(dark)}</div>
                <input
                    type="text"
                    onClick={() => setSearchDropdown(true)}
                    className={dark ? "search-input search-input-dark" : "search-input"}
                    placeholder="Search candidate, competencies, services"
                    onChange={e => setsearchIt(e.target.value)}
                />
                <div onClick={() => setSearchDropdown(false)} style={{ cursor: 'pointer' }} className={dark ? "right-image right-image-dark" : "right-image"}>{searchButton(searchDropdown, dark)}</div>
            </div>

            {searchDropdown &&
                <div className={dark ? "search-dropdown-container search-dropdown-container-dark " : "search-dropdown-container"} style={{ width: "100%" }}>
                    <div className={dark ? "search-dropdown-content-container search-dropdown-content-container-dark" : "search-dropdown-content-container"}>
                        <div className="dropdown-header" style={{ paddingBottom: 8 }}>
                            <h4 style={{ margin: 0 }}>
                                Talents{" "}
                                <span className="number_of_talents" style={{ paddingLeft: 20 }}>
                                    {allDevelopers?.length}
                                </span>
                            </h4>
                            <div className="see-all">See All</div>
                        </div>
                        <div className={dark ? "scrollbox-dark" : "scrollbox"} id='user-container'>
                            {(users.filter(dev => dev.username.toLowerCase().includes(searchIt.toLowerCase()))).map((user, k) => (
                                <Box
                                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgb(0, 120, 212,.1)' }, tranisition: '.2s', paddingRight: '5px', backgroundColor: userSelector.index === k ? 'rgb(0, 120, 212,.1)' : 'none' }}
                                    className="dropdown-content" key={k}
                                    onClick={e => { handleClickUser(user, k); setSearchDropdown(false) }}>
                                    <div className="dis-flex">
                                        {CustomIcon(<img alt="" width={25} src={user.profileImg} style={{ borderRadius: "50%", background: "none" }} />)}
                                        <label className="searched-username"> {user.username}</label>
                                    </div>
                                    <div className="dis-flex" style={{ gap: 20 }}>
                                        <div className="dis-flex">
                                            <img alt="" src={StarIcon} width={22} />
                                            <label className={dark ? "label label-dark" : "label"}> {user.rating} / 5</label>
                                        </div>
                                        <div className="dis-flex">
                                            <img alt="" src={!dark ? MsgIcon : Images.IconDarkLight} width={21} height={19} />
                                            <label className={dark ? "label label-dark" : "label"}> {user.comments}</label>
                                        </div>
                                    </div>
                                </Box>
                            ))}
                        </div>
                        <div className="dropdown-header" style={{ paddingBottom: 10, paddingTop: 6 }}>
                            <h4 style={{ margin: 0 }}>
                                Services{" "}
                                <span className="number_of_talents" style={{ paddingLeft: 20 }}>
                                    {services?.length}
                                </span>
                            </h4>
                            <div className="see-all">See All</div>
                        </div>
                        <div className={dark ? "scrollbox-dark" : "scrollbox"}>
                            {services?.map((service, k) => (
                                <Box
                                    sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgb(0, 120, 212,.1)' }, tranisition: '.2s', paddingRight: '5px' }}
                                    className="dropdown-content" key={k}
                                    onClick={e => { handleClickService(service); setSearchDropdown(false) }}>
                                    <div className="dis-flex">
                                        {CustomIcon(searchIcon())}
                                        <label className="searched-username"> {service.title}</label>
                                    </div>
                                    <div className="dis-flex">
                                        <img alt="" src={dark ? PeopleWhite : PeopleGroupIcon} width={18} />
                                        <label className={dark ? "label label-dark" : "label"}> {service.search_result}</label>
                                    </div>
                                </Box>
                            ))}
                        </div>
                    </div>
                    <div className={dark ? "dropdown-footer dropdown-footer-dark" : "dropdown-footer"} style={{ display: "flex", flexWrap: 'wrap' }}>
                        <div className="dis-flex">
                            {CustomIcon(<ExpandLessIcon />, activeViewDown)}
                            {CustomIcon(<ExpandMoreIcon />, activeViewUp)}
                            <h5>To navigate</h5>
                        </div>
                        <div className="dis-flex">
                            {CustomIcon(<img alt="" src={SelectIcon} />, selectUser)}
                            <h5>To select</h5>
                        </div>
                        <div className="dis-flex">
                            {CustomIcon(<img alt="" src={SelectIcon} />, handleClose)}
                            <h5>To dismiss</h5>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
const Index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const matches = useMediaQuery("(min-width:768px)");
    const { dark, setDark } = useContext(ThemeContext);
    const [searchDropdown, setSearchDropdown] = useState(false);
    const [userSelector, setUserSelector] = useState({ index: '0', thisUser: '' });
    const [searchIt, setsearchIt] = useState("");
    const { allDevelopers, currentUser } = useSelector(store => store.mainReducer)
    const handleClickUser = (profile, index) => {
        const user = allDevelopers.filter(dev => dev._id === profile.id);
        setUserSelector({ index: index, thisUser: user[0] })
        dispatch(SELECTED_PROFILE(user[0]))
        navigate('/network');
    }
    const handleClickService = (service) => {
        dispatch(ACTIVE_TAB_Filter(service.title))
        navigate('/')
    }

    const handleLogin = () => dispatch(LOGIN_BOX_HANDLE('login'))
    const handleSignUp = () => dispatch(LOGIN_BOX_HANDLE('signup'))


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogOut = async () => {
        await firebase.auth().signOut();
        dispatch(LOG_OUT())
        handleClose()
    }

    const handleDarkMode = () => {
        setDark((e) => !e);
        localStorage.setItem("dark-theme", !dark);
    }


    // Mobile View
    if (!matches)
        return (
            <div className={dark ? "header-container header-container-dark " : "header-container"} style={{ display: "block", paddingTop: "12px" }}>
                <LoginBoxLGHOC />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div
                    >
                        {currentUser ?
                            <div className="profile-container"
                                style={{ cursor: 'pointer' }}
                                id="profile-button"
                                aria-controls={open ? 'profile-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                variant="contained"
                                disableElevation
                                onClick={handleClick} >
                                {currentUser?.avatar && <Avatar className="header-Profile-icon" alt={currentUser?.firstName} src={currentUser?.avatar} />}
                                {!currentUser?.avatar && <Avatar className="header-Profile-icon" >{(currentUser?.firstName).charAt(0).toUpperCase()}</Avatar>}

                                <div className={dark ? "header-Profile-Name header-Profile-Name-dark" : "header-Profile-Name"}>{currentUser?.fullName} </div>
                                <div style={{ paddingLeft: 10 }}>{ArrowIcon()}</div>
                            </div>
                            :
                            <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2}>
                                <Button sx={{ ...signUpBtn }} size='small' onClick={handleSignUp} className='signUpBtn'>Sign Up</Button>
                                <Button disableElevation disableRipple sx={{ ...loginBtn, color: dark ? '#FFFFFF' : '#090B0C', '&:hover': { background: dark ? '#090B0C' : '#FBFBFC' } }} size='small' onClick={handleLogin}>Login</Button>
                            </Stack>
                        }
                    </div>
                    <div>
                        <div className="header-notification-btn">
                            {NotificationsIcons(dark)}
                            {iconBell(dark)}
                        </div>
                    </div>
                </div>

                <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                    {SearchFieldWithDropdown(searchDropdown, setSearchDropdown, dark, matches, allDevelopers, handleClickUser, handleClickService, searchIt, setsearchIt, userSelector, setUserSelector)}
                </Grid>

                <StyledMenu
                    id="profile-menu"
                    sx={{ '& ul': dark ? { background: '#121619', border: '1px solid #5D6974', color: 'white !important' } : {} }}
                    MenuListProps={{
                        'aria-labelledby': 'profile-button',
                        backgronudColor: 'red'
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogOut} disableRipple sx={{ fontSize: '13px' }}>
                        {currentUser ? <ExitToApp sx={{ color: dark ? '#CCCCCC !important' : 'inherit' }} /> : <Login sx={{ color: dark ? '#CCCCCC !important' : 'inherit' }} />}
                        Logout
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleDarkMode} disableRipple sx={{ fontSize: '13px' }}>
                        {dark ? <LightMode sx={{ color: '#CCCCCC !important' }} /> : <DarkMode />}
                        {dark ? 'Day Mode' : 'Night Mode'}
                    </MenuItem>

                </StyledMenu>
            </div>
        );
    // desktop view

    return <div className={dark ? "header-container header-container-dark " : "header-container"}>
        <LoginBoxLGHOC />
        <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
            <Grid item xs={10.5} sm={2} md={1.5} lg={1.7} sx={{ display: { sm: "none", md: "block" } }}>
                <img alt="" src={dark ? Images.WhiteLogo : Images.Logo} className="header-logo" />
            </Grid>
            <Grid item sx={{ display: { xs: "none", sm: "block" } }} xs={5} sm={6} md={currentUser ? 2.5 : 3.5} lg={4}>
                {SearchFieldWithDropdown(searchDropdown, setSearchDropdown, dark, matches, allDevelopers, handleClickUser, handleClickService, searchIt, setsearchIt, userSelector, setUserSelector)}
            </Grid>
            <Grid item sx={{ display: { xs: "block", sm: "none", md: "none", lg: "none" } }} xs={1.5}>
                <MenuIcon className="Menu-Icon" />
            </Grid>
            <Grid item sx={{ display: { sm: "none", md: "block" } }} xs={12} sm={6} md={currentUser ? 3.5 : 2}>
                <div className="header-button-flex">
                    <div className={dark ? "header-Home-btn header-Home-btn-dark" : "header-Home-btn"} onClick={() => navigate("/")}>
                        {HomeButtonIcon(dark)} <span className="Home-margin">Home</span>
                    </div>
                    {currentUser && <div className="header-jobs-btn" onClick={() => navigate("/network")}>
                        {networkButton(dark)} <span className="Home-margin">My network</span>
                    </div>}
                    <div className="header-jobs-btn" onClick={() => navigate("/jobs")}>
                        {JobsIcon(dark)} <span className="Home-margin">Jobs</span>
                    </div>
                </div>
            </Grid>
            <Grid item sx={{ display: { xs: "none", sm: "block" } }} xs={5} sm={2} md={1}  >
                <div className="header-notification-btn">
                    {NotificationsIcons(dark)}
                    {iconBell(dark)}
                </div>
            </Grid>
            <Grid
                item
                sx={{ display: { xs: "none", sm: "block" } }}
                xs={7}
                sm={3}
                md={currentUser ? 1.5 : 2}
            >
                {currentUser ?
                    <div className="profile-container"
                        style={{ cursor: 'pointer' }}
                        id="profile-button"
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick} >
                        <div className={dark ? "header-Profile-Name header-Profile-Name-dark" : "header-Profile-Name"}>{currentUser?.fullName}</div>
                        {currentUser?.avatar && <Avatar className="header-Profile-icon" alt={currentUser?.firstName} src={currentUser?.avatar} />}
                        {!currentUser?.avatar && <Avatar className="header-Profile-icon" >{(currentUser?.firstName).charAt(0).toUpperCase()}</Avatar>}
                        <div>{ArrowIcon()}</div>
                    </div>
                    :
                    <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2}>
                        <Button disableElevation disableRipple sx={{ ...loginBtn, color: dark ? '#FFFFFF' : '#090B0C', '&:hover': { background: dark ? '#090B0C' : '#FBFBFC' } }} size='small' onClick={handleLogin}>Login</Button>
                        <Button sx={{ ...signUpBtn }} size='small' onClick={handleSignUp} className='signUpBtn'>Sign Up</Button>
                    </Stack>
                }

            </Grid>
        </Grid>
        <StyledMenu
            id="profile-menu"
            sx={{ '& ul': dark ? { background: '#121619', border: '1px solid #5D6974', color: 'white !important' } : {} }}
            MenuListProps={{
                'aria-labelledby': 'profile-button',
                backgronudColor: 'red'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleLogOut} disableRipple sx={{ fontSize: '13px' }}>
                {currentUser ? <ExitToApp sx={{ color: dark ? '#CCCCCC !important' : 'inherit' }} /> : <Login sx={{ color: dark ? '#CCCCCC !important' : 'inherit' }} />}
                Logout
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleDarkMode} disableRipple sx={{ fontSize: '13px' }}>
                {dark ? <LightMode sx={{ color: '#CCCCCC !important' }} /> : <DarkMode />}
                {dark ? 'Day Mode' : 'Night Mode'}
            </MenuItem>

        </StyledMenu>
    </div>
};

export default Index;

const loginBtn = {
    textTransform: 'capitalize',
    fontSize: '13px',
    lineHeight: '20px',
    letterSpacing: '-0.21px',
    fontWeight: 600,
};
const signUpBtn = {
    textTransform: 'capitalize',
    fontSize: '12px',
    "borderRadius": "12px",
    "background": "#8077F6",
    lineHeight: '20px',
    letterSpacing: '-0.12px',
    color: 'white',
    padding: '8px 24px',
    fontWeight: 500,
    '&:hover': { background: '#8077F6' },
    boxShadow: 'none'

}

const CustomIcon = (icon, clickAction) => <div onClick={clickAction} style={{ cursor: 'pointer' }} className="custom-icon">{icon}</div>;
