import { FETCH_ORDERS, SET_SIZE_FILTER, CREATE_ORDER, ORDER_CREATION_SUCCESS, ORDER_CREATION_FAILURE } from './actionTypes';
import axios from 'axios';

// Fetch Orders
export const fetchOrders = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:9009/api/pizza/history');
        dispatch({
            type: FETCH_ORDERS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Error fetchong orders:', error)
    }
};

// Set Size Filter
export const setSizeFilter = (size) => ({
  type: SET_SIZE_FILTER,
  payload: size,
});

// Create Order
export const createOrder = (order) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER });
    try {
      const response = await axios.post('http://localhost:9009/api/pizza/order', order);
      dispatch({ type: ORDER_CREATION_SUCCESS, payload: response.data }); // Dispatch with response data if needed
      dispatch(fetchOrders()); // Refetch orders after a successful creation
    } catch (error) {
      dispatch({
        type: ORDER_CREATION_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

// Order Creation Success
export const orderCreationSuccess = () => ({
  type: ORDER_CREATION_SUCCESS,
});

// Order Creation Failure
export const orderCreationFailure = (error) => ({
  type: ORDER_CREATION_FAILURE,
  payload: error,
});
