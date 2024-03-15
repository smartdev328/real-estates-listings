import { configureStore } from '@reduxjs/toolkit';

import listingReducer from './actions/listingActions';
import authReducer from './actions/authActions';

const store = configureStore({
  reducer: {
    listings: listingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;