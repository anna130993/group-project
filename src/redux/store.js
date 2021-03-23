import { combineReducers, createStore } from 'redux';
import initialState from './initialState';
import { loadState, saveState } from './localStorage';

import cartReducer from './cartRedux';
import categoriesReducer from './categoriesRedux';
import productsReducer from './productsRedux';
import dealsReducer from './dealsRedux';
import deviceTypeReducer from './deviceTypeRedux';

// load persisted state form LocalStorage and combine with initialState
const persistedState = loadState();
const combinedState = Object.assign(initialState, { persistedState });

// define reducers
const reducers = {
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
  deals: dealsReducer,
  deviceType: deviceTypeReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
const store = createStore(
  combinedReducers,
  combinedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// save store to LocalStorage
store.subscribe(() => {
  saveState({
    favourites: store.getState().favourites,
  });
});

export default store;
