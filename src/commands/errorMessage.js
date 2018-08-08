import { errorMessage as Actions } from '../actions';

// eslint-disable-next-line

export const requestErrorMessage = (message, redirectPath) => (dispatch) => {
  dispatch(Actions.messageRequested(message, redirectPath));
};

export const flushRedirectPath = () => (dispatch) => {
  dispatch(Actions.redirectSuccess());
};
