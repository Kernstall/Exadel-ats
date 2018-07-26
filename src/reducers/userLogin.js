const INITIAL_STATE = {
  logoutResponse: null,
  response: null,
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/Login/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Login/Request':
      return {
        ...state,
        isLoading: true,
      };

    case 'Entity/Login/Success':
      return {
        response: payload.response,
        error: null,
        isLoading: false,
      };

    case 'Entity/Logout/Error':
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };

    case 'Entity/Logout/Request':
      return {
        ...state,
        response: null,
        isLoading: true,
      };

    case 'Entity/Logout/Success':
      return {
        logoutResponse: payload.logoutResponse,
        response: null,
        error: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
