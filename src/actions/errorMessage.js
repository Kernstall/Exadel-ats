export const messageRequested = message => ({
  type: 'Entity/ErrorMessage/Request',
  payload: message,
});

/* const messageResolved = () => ({
  type: 'Entity/ErrorMessage/Resolve',
}); */

export default {
  messageRequested, /*
  messageResolved, */
};
