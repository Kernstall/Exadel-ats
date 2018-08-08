export const messageRequested = (message, redirectPath) => ({
  type: 'Entity/ErrorMessage/Request',
  payload: message,
  redirectPath,
});

export const redirectSuccess = () => ({
  type: 'Entity/ErrorMessage/Redirect',
});

/* const messageResolved = () => ({
  type: 'Entity/ErrorMessage/Resolve',
}); */

export default {
  messageRequested,
  redirectSuccess, /*
  messageResolved, */
};
