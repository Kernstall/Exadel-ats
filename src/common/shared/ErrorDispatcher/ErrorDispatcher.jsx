import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorWindow from './ErrorWindow';
import { requestErrorMessage, flushRedirectPath } from '../../../commands/errorMessage';

class ErrorDispatcher extends React.Component {
  constructor() {
    super();
    this.redirectPath = '';
    this.errorWindowOnCLick = this.errorWindowOnCLick.bind(this);
  }

  /* componentDidMount() {
    this.props.requestErrorMessage('test1');
    this.props.requestErrorMessage('test2');
    this.props.requestErrorMessage('test3');
    this.props.requestErrorMessage('test4');
  } */

  errorWindowOnCLick() {
    this.props.messageQueue.shift();
    this.redirectPath = this.props.redirectPath;
    this.props.flushRedirectPath();
    this.forceUpdate();
  }

  render() {
    debugger;
    if (this.redirectPath !== '') {
      return (<Redirect to={this.redirectPath} />);
    }
    return (
      this.props.messageQueue.length
        ? (
          <ErrorWindow
            message={this.props.messageQueue[0]}
            callback={() => (this.errorWindowOnCLick())}
          />
        ) : null
    );
  }
}

const mapStateToProps = state => ({
  messageQueue: state.errorMessage.messageQueue,
  redirectPath: state.errorMessage.redirectPath,
});

const mapCommandsToProps = dispatch => ({
  requestErrorMessage: message => dispatch(requestErrorMessage(message)),
  flushRedirectPath: () => dispatch(flushRedirectPath()),
});

export default connect(mapStateToProps, mapCommandsToProps)(ErrorDispatcher);
