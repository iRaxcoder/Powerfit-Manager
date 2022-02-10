export default (state, action) => {
    switch (action.type) {
      case 1:
        return {
          ...state,
          userAuth: true,
          errors: null
        };
      default:
        return state;
    }
  };