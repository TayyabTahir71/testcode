import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import axios from 'axios';
const APIS = {
  all_dev: 'http://localhost:8080/alluser',
  all_jobs: 'http://localhost:8080/jobss',
  login: 'http://localhost:8080/api/login',
  signup: 'http://localhost:8080/signup',
  forgot: 'http://localhost:8080/forgot',
  resetpassword: 'http://localhost:8080/resetpassword',
}

// selected Dummy Profile 
const dummy = {
  "jobs": {
    "completed": 102,
    "cancelled": 7,
    "inProgress": 2
  },
  "_id": "6477d04bb132f36d15119a89",
  "firstName": "Hammad",
  "mainCategory": "Interfaces",
  "proTallent": false,
  "availableToWork": true,
  "lastName": "Shafiq",
  "hourlyRate": 140,
  "avatar": "https://avatars.githubusercontent.com/u/42932321?v=4",
  "verified": true,
  "description": "Experienced Full Stack Web Developer adept at building apps from scratch. ",
  "category": "Full Stack developer",
  "revenue": 234000,
  "services": [
    {
      "title": " i will Your Full Stack Developer React || Node js ",
      "description": "",
      "comments": [
        {
          "projectHeading": "Post Textile ",
          "description": "Muhammad Hamad is working on our logistics management system as Full stack developer . He make custom frontend app pure in JavaScript now is working on backend that will be soon live. He always full fill his commitment . I always paid him advance . I never realized I did mistake 100% recommended",
          "commentDate": "2023-03-11T19:00:00.000Z",
          "rated": 5,
          "price": 23000,
          "_id": "6477d04bb132f36d15119a8b"
        },
        {
          "projectHeading": " Digtal Flow ",
          "description": "I've had the pleasure of working with Muhammad, as remote Full Stack developer, for the past three years. He consistently displays professionalism, excellent coding skills, effective communication, and honesty. Muhammad's passion for his work goes beyond financial motivations, driving him to strive for perfection.Highly recommended",
          "commentDate": "2022-04-01T19:00:00.000Z",
          "rated": 5,
          "price": 60000,
          "_id": "6477d04bb132f36d15119a8c"
        }
      ],
      "profile": [
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/293240721/original/6891870e69ea2793c44105520881aa0556da1f9b.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/250604452/original/789892c3543a3199c6f38b416ca1f42bf92a5039.png",
        "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/267148774/original/ddf545f98b847c3cd66c9afe1cf0b680148237f1.png"
      ],
      "_id": "6477d04bb132f36d15119a8a"
    }
  ],
  "comments": [
    {
      "Heading": "Post Textile App",
      "title": "Muhammad Hamad is working on our logistics management system as Full stack developer . He make custom frontend app pure in JavaScript now is working on backend that will be soon live. He always full fill his commitment . I always paid him advance . I never realized I did mistake 100% recommended",
      "date": "2023-07-02T19:00:00.000Z",
      "rated": 5,
      "_id": "6477d04bb132f36d15119a8d"
    },
    {
      "Heading": "stock",
      "title": "I've had the pleasure of working with Muhammad, as remote Full Stack developer, for the past three years. He consistently displays professionalism, excellent coding skills, effective communication, and honesty. Muhammad's passion for his work goes beyond financial motivations, driving him to strive for perfection.Highly recommended",
      "date": "2022-01-14T06:00:00.000Z",
      "rated": 5,
      "_id": "6477d04bb132f36d15119a8e"
    }
  ],
  "specialization": [
    "Full Stack devloper",
    "ReactJs",
    "Node Js"
  ],
  "projectsThumbs": [
    "https://rainbowit.net/themes/inbio/wp-content/uploads/2021/08/portfolio-large-01-340x250.jpg",
    "https://fiverr-res.cloudinary.com/images/t_medium7,q_auto,f_auto,q_auto,f_auto/gigs/150311157/original/b2cffba150592f0c20aece34ffefa82869c3237d/develop-a-web-app-with-react-js-node-js.jpeg",
    "https://rainbowit.net/themes/inbio/wp-content/uploads/2021/08/portfolio-large-03-340x250.jpg"
  ],
  commentCount: function () {
    return this.comments?.length
  },
  ratingCount: function () {
    let number = this.comments.reduce((a, b) => a + b.rated, 0) / this.commentCount()
    return number.toFixed(1)
  },
  profileName: function () {
    return `${this.firstName} ${this.lastName}`
  },
  "__v": 0
};

// ------------------All Asyn Reducers are below ------------------//
let initialState = {
  loading: false,
  allDevelopers: [],
  allJobs: [],
  selectedProfile: dummy,
  loadingV2: false,
  currentUser: null,
  loginError: false,
  signUpError: false,
  forgotSuccess: false,
  forgotError: false,
  resetSuccess: false,
  resetError: false,
  resetToken: false,

  // filters for users
  activeTab: 'All',
  priceFilter: [0, 1000],
  servicesFilter: "All",
  servicesFilterOptions: ["All", "UI Design", "UX Design"],
  ratingFilter: 0,
  availableToWorkFilter: true,
  proTallentFilter: false,

  // filters for users
  activeTabJOB: 'All',
  priceFilterJOB: [0, 1000],
  servicesFilterJOB: "All",
  servicesFilterOptionsJOB: ["All", "UI Design", "UX Design"],
  ratingFilterJOB: 0,

  // 
  openLoginBoxDesk: false,
}

// ________________ Asyn Functions for Calling __________________ //

// allUsersGetter
export const allUsersGetter = createAsyncThunk(
  'mainSlice/allUsersGetter',
  async () => {
    const data = await axios.get(APIS.all_dev)
    return data.data;
  }
);

// allJobsGetter
export const allJobsGetter = createAsyncThunk(
  'mainSlice/allJobsGetter',
  async () => {
    const data = await axios.get(APIS.all_jobs)
    return data.data;
  }
);

// LoginFun
export const LoginFun = createAsyncThunk(
  'mainSlice/LoginFun',
  async ({ email, password }) => {
    const data = await axios.post(APIS.login, { email, password })
    return data.data;
  }
);


// LoginFun
export const SignUpFun = createAsyncThunk(
  'mainSlice/SignUpFun',
  async ({ firstName, role, lastName, contactNo, country, email, password }) => {
    const data = await axios.post(APIS.signup, { firstName, role, lastName, contactNo, country, email, password })
    return data.data;
  }
);


// LoginFun
export const forgotFun = createAsyncThunk(
  'mainSlice/forgotFun',
  async ({ email }) => {
    const data = await axios.post(APIS.forgot, { email })
    return data.data;
  }
);

// LoginFun
export const ResetFun = createAsyncThunk(
  'mainSlice/ResetFun',
  async ({ password, token }) => {
    const data = await axios.post(APIS.resetpassword, { password, token })
    return data.data;
  }
);


// asyn setter
const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    SELECTED_PROFILE: (state, { payload }) => {
      state.selectedProfile = payload;
    },
    ACTIVE_TAB_Filter: (state, { payload }) => {
      state.activeTab = payload;
    },
    PRICE_Filter: (state, { payload }) => {
      state.priceFilter = payload;
    },
    SERVICE_Filter: (state, { payload }) => {
      state.servicesFilter = payload;
    },
    RATING_Filter: (state, { payload }) => {
      state.ratingFilter = payload;
    },
    AVALIABLE_TO_WORK_Filter: (state, { payload }) => {
      state.availableToWorkFilter = payload;
    },
    PRO_TALLENT_Filter: (state, { payload }) => {
      state.proTallentFilter = payload;
    }, SERVICE_Filter_Options: (state, { payload }) => {
      state.servicesFilterOptions = payload;
    }, RESET_Filter: (state, { payload }) => {
      state.activeTab = 'All';
      state.priceFilter = [0, 1000];
      state.servicesFilter = "";
      state.ratingFilter = 0;
      state.availableToWorkFilter = true;
      state.proTallentFilter = false;
    },



    ACTIVE_TAB_Filter_JOB: (state, { payload }) => {
      state.activeTabJOB = payload;
    }, PRICE_Filter_JOB: (state, { payload }) => {
      state.priceFilterJOB = payload;
    }, SERVICE_Filter_JOB: (state, { payload }) => {
      state.servicesFilterJOB = payload;
    }, RATING_Filter_JOB: (state, { payload }) => {
      state.ratingFilterJOB = payload;
    }, SERVICE_Filter_Options_JOB: (state, { payload }) => {
      state.servicesFilterOptionsJOB = payload;
    }, RESET_Filter_JOB: (state, { payload }) => {
      state.activeTabJOB = 'All';
      state.priceFilterJOB = [0, 1000];
      state.servicesFilterJOB = "";
      state.ratingFilterJOB = 0;
    },

    LOGIN_BOX_HANDLE: (state, { payload }) => {
      if (payload) {
        state.openLoginBoxDesk = payload;
      } else {
        state.openLoginBoxDesk = payload;
        state.loadingV2 = payload;
        state.loginError = false;
        state.signUpError = false;
        state.forgotSuccess = false;
        state.forgotError = false;
        state.resetError = false;
        state.resetSuccess = false;
      }
    },
    LOGIN_WITH_GOOGLE_APPLE: (state, { payload }) => {
      state.currentUser = payload;
      state.loadingV2 = 'responded';
    },

    RESET_TOKEN: (state, { payload }) => {
      state.resetToken = payload;
      // state.openLoginBoxDesk = 'responded';
    },

    
    LOG_OUT: (state, { payload }) => {
      state.openLoginBoxDesk = null;
      state.loadingV2 = null;
      state.loginError = false;
      state.signUpError = false;
      state.forgotSuccess = false;
      state.forgotError = false;
      state.resetError = false;
      state.resetSuccess = false;
      state.currentUser = null;
    },
  },

  // thunk reducers Responses
  extraReducers: (builder) =>
    builder
      // allUsersGetter cases
      .addCase(allUsersGetter.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsersGetter.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          const data = payload.users.map(user => {
            return {
              ...user,
              commentCount: function () {
                return this.comments.length
              },
              ratingCount: function () {
                let number = this.comments.reduce((a, b) => a + b.rated, 0) / this.commentCount()
                return number.toFixed(1)
              },
              profileName: function () {
                return `${this.firstName} ${this.lastName}`
              },
            }
          })
          state.allDevelopers = data;
        }
      })
      .addCase(allUsersGetter.rejected, (state, { error }) => {
        state.loading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })


      // allJobsGetter cases
      .addCase(allJobsGetter.pending, (state) => {
        state.loading = true;
      })
      .addCase(allJobsGetter.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.allJobs = payload.list;
        }
      })
      .addCase(allJobsGetter.rejected, (state, { error }) => {
        state.loading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })


      // LoginFun cases 
      .addCase(LoginFun.fulfilled, (state, { payload }) => {
        if (payload.success) {
          state.loadingV2 = 'responded';
          state.currentUser = payload?.user;
          state.loginError = false;
        } else {
          state.loginError = payload.message
        }
      })
      .addCase(LoginFun.rejected, (state, { error }) => {
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

      // SignUpFun 
      .addCase(SignUpFun.fulfilled, (state, { payload }) => {
        // console.log('-signUp', payload);
        if (payload.success) {
          state.loadingV2 = 'responded';
        } else {
          state.signUpError = payload.message
        }
      })
      .addCase(SignUpFun.rejected, (state, { error }) => {
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })


      // forgotFun
      .addCase(forgotFun.pending, (state) => {
        state.forgotloading = true;
      })
      .addCase(forgotFun.fulfilled, (state, { payload }) => {
        state.forgotloading = false;
        if (payload.success) {
          state.forgotSuccess = payload.message;
          // state.resetToken = payload.token;
        } else {
          state.forgotError = payload.message
        }
      })
      .addCase(forgotFun.rejected, (state, { error }) => {
        state.forgotloading = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })


      // ResetFun
      .addCase(ResetFun.pending, (state) => {
        state.resetloading = true;
      })
      .addCase(ResetFun.fulfilled, (state, { payload }) => {
        state.resetloading = false;
        if (payload.success) {
          state.resetSuccess = payload.message;
          // state.resetToken = false;
          // state.openLoginBoxDesk = 'login';
          state.loginError = false;
          state.signUpError = false;
          state.forgotSuccess = false;
          state.forgotError = false;
        } else {
          state.resetError = payload.message
          state.forgotSuccess = false;
        }
      })
      .addCase(ResetFun.rejected, (state, { error }) => {
        state.resetloading = false;
        state.forgotSuccess = false;
        state.forgotError = false;
        Swal.fire({ icon: 'error', title: error.code, text: error.message })
      })

})





export const {
  LOG_IN,
  SELECTED_PROFILE,


  ACTIVE_TAB_Filter,
  PRICE_Filter,
  SERVICE_Filter,
  RATING_Filter,
  AVALIABLE_TO_WORK_Filter,
  PRO_TALLENT_Filter,
  RESET_Filter,
  SERVICE_Filter_Options,


  ACTIVE_TAB_Filter_JOB,
  PRICE_Filter_JOB,
  SERVICE_Filter_JOB,
  RATING_Filter_JOB,
  SERVICE_Filter_Options_JOB,
  RESET_Filter_JOB,

  LOGIN_BOX_HANDLE,
  LOGIN_WITH_GOOGLE_APPLE,
  RESET_TOKEN,
  LOG_OUT,





} = mainSlice.actions;

// ------------------All Asyn Getter Setter Reducers Exporter ------------------//
export const mainReducer = mainSlice.reducer;

