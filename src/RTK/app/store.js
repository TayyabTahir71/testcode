import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from '../Reducers/Reducers'
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist-indexeddb-storage';

const persistConfig = {
  key: 'dksh',
  storage: storage('myDB'),
  stateReconciler: autoMergeLevel1,
  blacklist: [
    "allDevelopers",
    "loading",
    "activeTab",
    "priceFilter",
    "servicesFilter",
    "ratingFilter",
    "availableToWorkFilter",
    "proTallentFilter",
    "activeTabJOB",
    "priceFilterJOB",
    "servicesFilterJOB",
    "servicesFilterOptionsJOB",
    "ratingFilterJOB",
    "selectedProfile",
    "currentUser",
    "loginError",
    "signUpError",
    "resetToken",
    "forgotSuccess",
    "forgotError",
    "resetSuccess",
    "resetError",
  ],
  rootReducer: mainReducer
}
const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: { mainReducer: persistedReducer },
});

export const persistor = persistStore(store);