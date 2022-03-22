import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          Oops! Something went wrong.
          <Link to="/">Click here</Link> to go back to the homepage. Or wait
          five seconds and we will do it for you.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
