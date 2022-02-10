const AuthReducer= (state, action) => {
    switch (action.type) {
      case 1:
        return {
          ...state,
          userAuth: 1,
          errors: null
        };
      case 2:
        return {
          ...state,
          userAuth: 2,
          errors: null
        };
      case 3:
        return {
          ...state,
          userAuth: null,
          errors: null
        };
      default:
        return state;
    }
  };

  export default AuthReducer;