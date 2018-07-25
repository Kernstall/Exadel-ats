import React from 'react';
import { connect } from 'react-redux';
import ErrorWindow from './ErrorWindow';
import { requestErrorMessage } from '../../../commands/errorMessage';

class ErrorDispatcher extends React.Component {
  constructor() {
    super();
    this.errorWindowOnCLick = this.errorWindowOnCLick.bind(this);
  }

  /*  componentDidMount() {
    this.props.requestErrorMessage('test1');
    this.props.requestErrorMessage('test2');
    this.props.requestErrorMessage('test3');
    this.props.requestErrorMessage('test4');
  } */

  errorWindowOnCLick() {
    this.props.messageQueue.shift();
    this.forceUpdate();
  }

  render() {
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
});

const mapCommandsToProps = dispatch => ({
  requestErrorMessage: message => dispatch(requestErrorMessage(message)),
});

export default connect(mapStateToProps, mapCommandsToProps)(ErrorDispatcher);
