import {
  ADD_FACULTY_FAIL,
  ADD_FACULTY_SUCCESS,
  DELETE_FACULTY_FAIL,
  DELETE_FACULTY_SUCCESS,
  GET_FACULTIES_FAIL,
  GET_FACULTIES_SUCCESS,
  UPDATE_FACULTY_FAIL,
  UPDATE_FACULTY_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  products: [],
  product: {},
  orders: [],
  cartData: {},
  customers: [],
  shops: [],
  error: {},
  productComments: [],
};

const Faculties = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FACULTIES_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    case GET_FACULTIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_FACULTY_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case ADD_FACULTY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_FACULTY_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id.toString() === action.payload.id.toString()
            ? { order, ...action.payload }
            : order
        ),
      };

    case UPDATE_FACULTY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_FACULTY_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_FACULTY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Faculties;
