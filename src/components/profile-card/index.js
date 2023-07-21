import React, { useContext } from "react";
import Images from "../../assets/images";
import { Grid } from "@mui/material";
import "./styles.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ThemeContext from "../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { SELECTED_PROFILE } from "../../RTK/Reducers/Reducers";
import { formatDate } from "../../utils/HELPER";
const profileVerifiedIcon = () => {
  return (
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.73214 20.1967C8.87937 20.6093 7.84369 20.2822 7.4024 19.4595L6.4848 17.7487L4.53366 17.4239C3.5981 17.2681 2.9596 16.4139 3.09688 15.4978L3.38457 13.578L1.99602 12.1888C1.33466 11.5271 1.33466 10.4729 1.99602 9.8112L3.38457 8.422L3.09688 6.50221C2.9596 5.58611 3.5981 4.73191 4.53366 4.57614L6.4848 4.25128L7.4024 2.54054C7.84369 1.71781 8.87937 1.39073 9.73214 1.80328L11.5 2.65855L13.2679 1.80328C14.1206 1.39073 15.1563 1.71781 15.5976 2.54054L16.5152 4.25128L18.4663 4.57614C19.4019 4.73191 20.0404 5.58611 19.9031 6.50221L19.6154 8.422L21.004 9.8112C21.6653 10.4729 21.6653 11.5271 21.004 12.1888L19.6154 13.578L19.9031 15.4978C20.0404 16.4139 19.4019 17.2681 18.4663 17.4239L16.5152 17.7487L15.5976 19.4595C15.1563 20.2822 14.1206 20.6093 13.2679 20.1967L11.5 19.3414L9.73214 20.1967Z"
        fill="#8077F6"
      />
      <path d="M8.64282 11.2679L10.6071 13.2322L14.3571 8.85718" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};
const commentIcon = (dark) => {
  if (dark) return <img loading="lazy" alt='' src={Images.WhiteMsg} />;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.46567 0.666748H12.5345C13.2053 0.666738 13.7589 0.666729 14.2099 0.703577C14.6784 0.741848 15.1089 0.823985 15.5134 1.03006C16.1406 1.34964 16.6505 1.85957 16.9701 2.48678C17.1762 2.89123 17.2583 3.32181 17.2966 3.79023C17.3334 4.24122 17.3334 4.79485 17.3334 5.46565V10.2786C17.3334 10.8368 17.3334 11.2975 17.3077 11.6747C17.281 12.0658 17.2239 12.4275 17.0797 12.7757C16.7414 13.5925 16.0925 14.2414 15.2757 14.5797C14.9275 14.7239 14.5658 14.781 14.1747 14.8077C13.7975 14.8334 13.3368 14.8334 12.7786 14.8334H12.7501C12.3029 14.8334 12.2142 14.8387 12.142 14.8557C12.016 14.8854 11.8988 14.9441 11.7995 15.027C11.7425 15.0745 11.685 15.1424 11.4167 15.5001L10.186 17.1411C10.1082 17.2449 10.0202 17.3623 9.93558 17.4564C9.84225 17.5601 9.68711 17.713 9.45317 17.804C9.16174 17.9173 8.83842 17.9173 8.54699 17.804C8.31305 17.713 8.15792 17.5601 8.06458 17.4564C7.97994 17.3623 7.892 17.2449 7.81421 17.1411L6.58342 15.5001C6.31513 15.1424 6.25769 15.0745 6.20071 15.027C6.10138 14.9441 5.98412 14.8854 5.85821 14.8557C5.78597 14.8387 5.69722 14.8334 5.25008 14.8334H5.22152C4.66336 14.8334 4.20264 14.8334 3.82547 14.8077C3.4344 14.781 3.07265 14.7239 2.72447 14.5797C1.90771 14.2414 1.2588 13.5925 0.920484 12.7757C0.776264 12.4275 0.719152 12.0658 0.692469 11.6747C0.666735 11.2975 0.666741 10.8368 0.666749 10.2786L0.666748 5.46567C0.666738 4.79486 0.666729 4.24122 0.703577 3.79023C0.741848 3.32181 0.823985 2.89123 1.03006 2.48678C1.34964 1.85957 1.85957 1.34964 2.48678 1.03006C2.89123 0.823985 3.32181 0.741848 3.79023 0.703577C4.24122 0.666729 4.79486 0.666738 5.46567 0.666748ZM3.92595 2.36471C3.5606 2.39456 3.37376 2.44866 3.24343 2.51507C2.92983 2.67486 2.67486 2.92983 2.51507 3.24343C2.44866 3.37376 2.39456 3.5606 2.36471 3.92595C2.33406 4.30102 2.33342 4.78627 2.33342 5.50008V10.2501C2.33342 10.8439 2.33387 11.2475 2.35527 11.5612C2.37616 11.8675 2.4142 12.0266 2.46028 12.1379C2.62944 12.5463 2.9539 12.8707 3.36228 13.0399C3.47353 13.086 3.63271 13.124 3.93892 13.1449C4.25262 13.1663 4.65625 13.1667 5.25008 13.1667C5.27356 13.1667 5.29684 13.1667 5.31993 13.1667C5.65791 13.1664 5.95517 13.1661 6.24113 13.2336C6.61886 13.3228 6.97064 13.4987 7.26862 13.7474C7.49419 13.9356 7.67233 14.1736 7.87487 14.4442C7.8887 14.4627 7.90266 14.4813 7.91675 14.5001L9.00008 15.9445L10.0834 14.5001C10.0975 14.4813 10.1115 14.4627 10.1253 14.4442C10.3278 14.1736 10.506 13.9356 10.7315 13.7474C11.0295 13.4987 11.3813 13.3228 11.759 13.2336C12.045 13.1661 12.3423 13.1664 12.6802 13.1667C12.7033 13.1667 12.7266 13.1667 12.7501 13.1667C13.3439 13.1667 13.7475 13.1663 14.0612 13.1449C14.3675 13.124 14.5266 13.086 14.6379 13.0399C15.0463 12.8707 15.3707 12.5463 15.5399 12.1379C15.586 12.0266 15.624 11.8675 15.6449 11.5612C15.6663 11.2475 15.6667 10.8439 15.6667 10.2501V5.50008C15.6667 4.78627 15.6661 4.30102 15.6355 3.92595C15.6056 3.5606 15.5515 3.37376 15.4851 3.24343C15.3253 2.92983 15.0703 2.67486 14.7567 2.51507C14.6264 2.44866 14.4396 2.39456 14.0742 2.36471C13.6991 2.33406 13.2139 2.33342 12.5001 2.33342H5.50008C4.78627 2.33342 4.30102 2.33406 3.92595 2.36471Z"
        fill="#090B0C"
      />
    </svg>
  );
};
const RatingIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.60907 0.938082C9.11405 -0.31367 10.8862 -0.313671 11.3912 0.938082L13.3285 5.7402C13.3992 5.91563 13.563 6.0361 13.7515 6.05148L18.6176 6.44854C19.9371 6.5562 20.4803 8.19563 19.4863 9.0699L15.7938 12.3176C15.6571 12.4378 15.5966 12.6227 15.6357 12.8005L16.8165 18.1675C17.1114 19.5082 15.5997 20.5079 14.4815 19.7117L10.2901 16.7274C10.1166 16.6038 9.88371 16.6038 9.71013 16.7274L5.51878 19.7117C4.40053 20.5079 2.88884 19.5082 3.1838 18.1675L4.36458 12.8005C4.40368 12.6227 4.34312 12.4378 4.20646 12.3176L0.513825 9.06993C-0.480234 8.19566 0.0630239 6.5562 1.38246 6.44854L6.24877 6.05148C6.43731 6.0361 6.60102 5.91563 6.67179 5.7402L8.60907 0.938082Z"
        fill="#8077F6"
      />
    </svg>
  );
};
const ToggleIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_409_3275)">
        <rect width="32" height="32" rx="4" fill="#FBFBFC" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.3334 10.1667C14.3334 9.24619 15.0796 8.5 16 8.5C16.9205 8.5 17.6667 9.24619 17.6667 10.1667C17.6667 11.0871 16.9205 11.8333 16 11.8333C15.0796 11.8333 14.3334 11.0871 14.3334 10.1667ZM14.3334 16C14.3334 15.0795 15.0796 14.3333 16 14.3333C16.9205 14.3333 17.6667 15.0795 17.6667 16C17.6667 16.9205 16.9205 17.6667 16 17.6667C15.0796 17.6667 14.3334 16.9205 14.3334 16ZM14.3334 21.8333C14.3334 20.9129 15.0796 20.1667 16 20.1667C16.9205 20.1667 17.6667 20.9129 17.6667 21.8333C17.6667 22.7538 16.9205 23.5 16 23.5C15.0796 23.5 14.3334 22.7538 14.3334 21.8333Z"
          fill="#768193"
        />
      </g>
      <defs>
        <clipPath id="clip0_409_3275">
          <rect width="32" height="32" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const dialogCommentIcon = () => {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.66663 0.833252C6.12686 0.833252 6.49996 1.20635 6.49996 1.66659V2.49992H11.5V1.66659C11.5 1.20635 11.8731 0.833252 12.3333 0.833252C12.7935 0.833252 13.1666 1.20635 13.1666 1.66659V2.50127C13.5628 2.504 13.9091 2.51218 14.2098 2.53675C14.6782 2.57502 15.1088 2.65715 15.5133 2.86323C16.1405 3.18281 16.6504 3.69274 16.97 4.31995C17.1761 4.7244 17.2582 5.15498 17.2965 5.6234C17.3333 6.07439 17.3333 6.62802 17.3333 7.29882V14.3677C17.3333 15.0385 17.3333 15.5921 17.2965 16.0431C17.2582 16.5115 17.1761 16.9421 16.97 17.3466C16.6504 17.9738 16.1405 18.4837 15.5133 18.8033C15.1088 19.0093 14.6782 19.0915 14.2098 19.1298C13.7588 19.1666 13.2052 19.1666 12.5344 19.1666H5.46552C4.79472 19.1666 4.2411 19.1666 3.79011 19.1298C3.32169 19.0915 2.8911 19.0093 2.48666 18.8033C1.85945 18.4837 1.34952 17.9738 1.02994 17.3466C0.823863 16.9421 0.741726 16.5115 0.703455 16.0431C0.666607 15.5921 0.666616 15.0385 0.666626 14.3677V7.29883C0.666616 6.62803 0.666607 6.07439 0.703455 5.6234C0.741726 5.15498 0.823863 4.7244 1.02994 4.31995C1.34952 3.69274 1.85945 3.18281 2.48666 2.86323C2.8911 2.65715 3.32169 2.57502 3.79011 2.53675C4.09078 2.51218 4.43707 2.504 4.83329 2.50127V1.66659C4.83329 1.20635 5.20639 0.833252 5.66663 0.833252ZM4.83329 4.16805C4.46202 4.17066 4.17048 4.17789 3.92582 4.19788C3.56048 4.22773 3.37364 4.28183 3.24331 4.34824C2.92971 4.50803 2.67474 4.763 2.51495 5.0766C2.44854 5.20693 2.39444 5.39377 2.36459 5.75912C2.33394 6.13419 2.33329 6.61944 2.33329 7.33325V7.49992H15.6666V7.33325C15.6666 6.61944 15.666 6.13419 15.6353 5.75912C15.6055 5.39377 15.5514 5.20693 15.485 5.0766C15.3252 4.763 15.0702 4.50803 14.7566 4.34824C14.6263 4.28183 14.4394 4.22773 14.0741 4.19788C13.8294 4.17789 13.5379 4.17066 13.1666 4.16805V4.99992C13.1666 5.46016 12.7935 5.83325 12.3333 5.83325C11.8731 5.83325 11.5 5.46016 11.5 4.99992V4.16658H6.49996V4.99992C6.49996 5.46016 6.12686 5.83325 5.66663 5.83325C5.20639 5.83325 4.83329 5.46016 4.83329 4.99992V4.16805ZM15.6666 9.16658H2.33329V14.3333C2.33329 15.0471 2.33394 15.5323 2.36459 15.9074C2.39444 16.2727 2.44854 16.4596 2.51495 16.5899C2.67474 16.9035 2.92971 17.1585 3.24331 17.3183C3.37364 17.3847 3.56048 17.4388 3.92582 17.4686C4.3009 17.4993 4.78614 17.4999 5.49996 17.4999H12.5C13.2138 17.4999 13.699 17.4993 14.0741 17.4686C14.4394 17.4388 14.6263 17.3847 14.7566 17.3183C15.0702 17.1585 15.3252 16.9035 15.485 16.5899C15.5514 16.4596 15.6055 16.2727 15.6353 15.9074C15.666 15.5323 15.6666 15.0471 15.6666 14.3333V9.16658Z"
        fill="#090B0C"
      />
    </svg>
  );
};
const modalIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_409_3201)">
        <rect width="32" height="32" rx="4" fill="#FBFBFC" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.4107 10.4108C10.7361 10.0854 11.2638 10.0854 11.5892 10.4108L16 14.8216L20.4107 10.4108C20.7361 10.0854 21.2638 10.0854 21.5892 10.4108C21.9147 10.7363 21.9147 11.2639 21.5892 11.5893L17.1785 16.0001L21.5892 20.4108C21.9147 20.7363 21.9147 21.2639 21.5892 21.5893C21.2638 21.9148 20.7361 21.9148 20.4107 21.5893L16 17.1786L11.5892 21.5893C11.2638 21.9148 10.7361 21.9148 10.4107 21.5893C10.0853 21.2639 10.0853 20.7363 10.4107 20.4108L14.8214 16.0001L10.4107 11.5893C10.0853 11.2639 10.0853 10.7363 10.4107 10.4108Z"
          fill="#090B0C"
        />
      </g>
      <defs>
        <clipPath id="clip0_409_3201">
          <rect width="32" height="32" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Index = ({ user, view }) => {
  const dispatch = useDispatch();
  const { dark } = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    dispatch(SELECTED_PROFILE(user))
  };
  const handleClose = () => setOpen(false);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  return (
    <>
      {view === "List" ? (
        <div className={dark ? "card-list-container card-list-container-dark" : "card-list-container"} onClick={handleClickOpen("paper")}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={6} lg={4}>
              <Grid container spacing={2}>
                <Grid item sm={2.5}>
                  <div className="images-grid-center"><img loading="lazy" alt='avatar' src={user?.avatar} className="List-profile-image" /></div>
                  <div className="profileVerifiedList-Icon">{profileVerifiedIcon()}</div>
                </Grid>
                <Grid item sm={9}>
                  <div className={dark ? "List-profile-name List-profile-name-dark" : "List-profile-name"}>{user?.profileName()}</div>
                  <div className="List-profile-desc">{user?.description}</div>
                  <div className={dark ? "timeList-Container timeList-dark" : "timeList-Container"}>
                    ${user?.hourlyRate} <span className="timehoursList-title">/ hour</span>
                  </div>
                  <div className="commentRating-container">
                    <div className={dark ? "commentsRating-Listcount commentsRating-Listcount-dark" : "commentsRating-Listcount"}>
                      <div className="margin-icon">{commentIcon()}</div> {user?.commentCount()} <span className="commentsRating-Listtitle">Comments</span>
                    </div>
                    <div className={dark ? "commentsRating-Listcount commentsRating-Listcount-dark" : "commentsRating-Listcount"}>
                      {user?.ratingCount()} / 5 <span className="commentsRating-Listtitle">Rating</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5} md={6} lg={4}>
              <div className="images-List-center">
                {user?.specialization.map((e) => (
                  <div className={dark ? "container-List-desc container-List-desc-dark" : "container-List-desc"} key={e}>
                    {e}
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} sm={9} md={6} lg={4}>
              <div className="images-listContainer">
                {
                  user?.projectsThumbs.map(src => <img loading="lazy" alt='' key={src} src={src} className="list-image-style " />)
                }
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div onClick={handleClickOpen("paper")} className={dark ? "card-grid-container card-grid-container-dark" : "card-grid-container"}>
          <div className={dark ? "time-Container time-Container-dark" : "time-Container"}>
            ${user?.hourlyRate} <span className={dark ? "time-hours-title time-hours-title-dark " : "time-hours-title"}>/hour</span>
          </div>
          <div className="images-grid-center">
            {user?.projectsThumbs.map(src => <img loading="lazy" alt='' key={src} src={src} className="grid-image-style" />)}
          </div>
          <div className="images-grid-center" style={{ position: "relative" }}>
            <img loading="lazy" src={user?.avatar} alt='avatar' className={dark ? "grid-profile-image grid-profile-image-dark" : "grid-profile-image"} />
            <div className="profileVerified-Icon">{profileVerifiedIcon()}</div>
          </div>
          <div className={dark ? "grid-profile-name grid-profile-name-dark " : "grid-profile-name"}>{user?.profileName()}</div>
          <div className="grid-profile-desc">{user?.description}</div>
          <div className="images-grid-center">
            {user?.specialization.map((e) => (
              <div className={dark ? "container-grid-desc container-grid-desc-dark" : "container-grid-desc"} key={e}>{e}  </div>
            ))}
          </div>
          <div className={dark ? "Hr-grid Hr-grid-dark" : "Hr-grid"}></div>
          <div className="commentRating-container">
            <div className={dark ? "commentsRating-count commentsRating-count-dark" : "commentsRating-count"}>
              <div className="margin-icon">{commentIcon(dark)}</div> {user?.commentCount()} <span className="commentsRating-title">Comments</span>
            </div>
            <div className={dark ? "commentsRating-count commentsRating-count-dark" : "commentsRating-count"}>
              {user?.ratingCount()} / 5 <span className="commentsRating-title">Rating</span>
            </div>
          </div>
        </div>
      )}
      <div>
        <Dialog
          open={open}
          sx={{
            "& .MuiDialog-container": {
              justifyContent: "flex-end",
              alignItems: "flex-end",
            },
          }}
          PaperProps={
            !dark
              ? { sx: { borderRadius: "15px", width: { xs: "100%", sm: "50%", md: "35%", lg: "24%" }, right: 0, height: "100%", overflow: "hidden" } }
              : { sx: { borderRadius: "15px", background: "#000", border: "1px solid #fff", width: { xs: "100%", sm: "50%", md: "35%", lg: "24%" }, right: 0, height: "100%", overflow: "hidden" } }
          }
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          disableScrollLock
        >
          <DialogTitle>
            <div className="modalHeader-container">
              <div className={dark ? "modalheading modalheading-dark" : "modalheading"}> Reviews</div>
              <div style={{ marginTop: "2px", marginBottom: "-10px" }} onClick={handleClose}>
                {modalIcon()}
              </div>
            </div>
          </DialogTitle>
          <DialogContent
            dividers={scroll === "paper"}
            sx={{
              borderTop: "2px solid #FBFBFC",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "transparent",
              },
            }}
          >
            <DialogContentText sx={{ mb: { xs: 8, md: 0 } }}>
              <Grid container spacing={2}>
                <Grid item sm={2.5}>
                  <img loading="lazy" alt='avatar' src={user?.avatar} className="List-profile-image" />
                  <div className="profileVerified-Icon">{profileVerifiedIcon()}</div>
                </Grid>
              </Grid>
              <div className={dark ? "dialog-profile-name dialog-profile-name-dark " : "dialog-profile-name"}>{user?.profileName()}</div>
              <div className={dark ? "rating-Container rating-Container-dark " : "rating-Container"}>
                {user?.ratingCount()}<span className="timehoursList-title"> / 5</span>
              </div>
              <div className={dark ? "Hr-grid Hr-grid-dark" : "Hr-grid"}></div>
              <div className={dark ? "Comments-dialogTitle Comments-dialogTitle-dark" : "Comments-dialogTitle"}>
                Comments <span className={dark ? "container-commentsCount Comments-dialogTitle-dark" : "container-commentsCount"}> {user?.commentCount()}</span>
              </div>
              {user?.comments?.map((comment, index) => (
                <div className="dialogComment-box" key={index}>
                  <div className="modalHeader-container">
                    <div style={{ display: "flex" }}>
                      {RatingIcon()}
                      <div className={dark ? "rating-ContainerDialog dialogTitle-dark" : "rating-ContainerDialog "}>
                        {comment.rated}<span className="timehoursList-title">/5</span>
                      </div>
                    </div>
                    {ToggleIcon()}
                  </div>
                  <div className={dark ? "commentName-title  dialogTitle-dark" : "commentName-title"}>{comment?.Heading}</div>
                  <div className="Hr-dialog"></div>
                  <div className="commentDesc-title">{comment?.title}</div>
                  <div className="Hr-dialog"></div>
                  <div style={{ display: "flex", marginTop: "12px", marginBottom: "2px" }}>
                    {dialogCommentIcon()} <span className={dark ? "comment-DialogDate  dialogTitle-dark" : "comment-DialogDate"}>{formatDate(comment?.date)}</span>{" "}
                  </div>
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Index;
