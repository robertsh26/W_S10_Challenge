// src/state/reducers.js

import { FETCH_ORDERS, SET_SIZE_FILTER, CREATE_ORDER, ORDER_CREATION_SUCCESS, ORDER_CREATION_FAILURE } from './actionTypes';

const initialState = {
  orders: [],
  sizeFilter: 'All',
  orderStatus: {
    isLoading: false,
    error: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case SET_SIZE_FILTER:
      return {
        ...state,
        sizeFilter: action.payload,
      };
      case CREATE_ORDER:
        return {
          ...state,
          orders: [...state.orders, action.payload], // Add the new order to the orders array
          orderStatus: {
            isLoading: true, // Set isLoading to true when order creation begins
            error: null, // Reset error to null
          }
        };
    case ORDER_CREATION_SUCCESS:
      return {
        ...state,
        orderStatus: {
          isLoading: false,
          error: null,
        },
      };
    case ORDER_CREATION_FAILURE:
      return {
        ...state,
        orderStatus: {
          isLoading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
