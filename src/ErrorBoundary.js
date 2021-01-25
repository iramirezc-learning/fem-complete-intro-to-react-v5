import React, { Component } from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h1>There has been an error!</h1>
          <h2>
            <Link to="/">Click here</Link> to go back to the homepage.
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
