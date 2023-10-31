import React, { Component } from 'react';

interface ErrorThrowButtonState {
  shouldThrow: boolean;
}

class ErrorThrowButton extends Component<object, ErrorThrowButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      shouldThrow: false,
    };
  }

  throwError = () => {
    throw new Error('This is a test error!');
  };

  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => this.setState({ shouldThrow: true })}
        >
          Выбросить ошибку
        </button>
        {this.state.shouldThrow && <div>{this.throwError()}</div>}
      </div>
    );
  }
}

export default ErrorThrowButton;
