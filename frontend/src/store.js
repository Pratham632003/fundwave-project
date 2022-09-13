import {createStore , applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { allUsersReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer
});


// We will provide the initial state of the products heres
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }
};

const middleware = [thunk];


// This is for creating store
const store = createStore(
    reducer,
    initialState,

    // This is for React-dev tools extension
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;