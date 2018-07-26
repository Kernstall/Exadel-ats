import { errorMessage as Actions } from '../actions';

// eslint-disable-next-line

export const requestErrorMessage = message => (dispatch) => {
  dispatch(Actions.messageRequested(message));
};
