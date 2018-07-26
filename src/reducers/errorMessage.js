const INITIAL_STATE = {
  messageQueue: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'Entity/ErrorMessage/Request':
      const arr = state.messageQueue.slice(0);
      arr.push(payload);
      return {
        messageQueue: arr,
      };
    default:
      return state;
  }
};

export default reducer;
