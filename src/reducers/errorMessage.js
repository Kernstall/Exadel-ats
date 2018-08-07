const INITIAL_STATE = {
  messageQueue: [],
  redirectPath: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload, redirectPath } = action;
  switch (type) {
    case 'Entity/ErrorMessage/Request':
      const arr = state.messageQueue.slice(0);
      arr.push(payload);
      return {
        messageQueue: arr,
        redirectPath: redirectPath ? redirectPath : '',
      };
    case 'Entity/ErrorMessage/Redirect':
      return {
        redirectPath: '',
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
